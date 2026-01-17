# 首页城市下拉框修复总结

## 问题描述
1. 点击出发地和到达地输入框时，没有出现城市候选下拉框
2. 点击"查询"按钮不会跳转到车次列表页

## 根本原因
1. **API路径错误**：`apiClient` 的 `baseURL` 已设置为 `/api`，但代码中又使用了 `/api/trains/cities`，导致实际请求路径变成 `/api/api/trains/cities`（404错误）
2. **缺少城市下拉框实现**：组件中只有 `console.log` 占位符，没有实际的下拉框UI和交互逻辑
3. **查询跳转未实现**：查询按钮只显示 `alert`，没有调用 `navigate` 跳转

## 解决方案

### 1. 修复API路径
**文件**: `frontend/src/components/TrainSearchForm/TrainSearchForm.tsx`

**修改前**:
```typescript
const response = await apiClient.get('/api/trains/cities');
```

**修改后**:
```typescript
const response = await apiClient.get('/trains/cities');
```

### 2. 实现城市下拉框功能

#### 2.1 添加状态管理
```typescript
// 城市列表和下拉框状态
const [cities, setCities] = useState<string[]>([]);
const [showFromCityDropdown, setShowFromCityDropdown] = useState(false);
const [showToCityDropdown, setShowToCityDropdown] = useState(false);
const [filteredFromCities, setFilteredFromCities] = useState<string[]>([]);
const [filteredToCities, setFilteredToCities] = useState<string[]>([]);
```

#### 2.2 实现数据获取
```typescript
const fetchCities = async () => {
  try {
    const response = await apiClient.get('/trains/cities');
    if (response.data.success && response.data.cities) {
      setCities(response.data.cities);
    }
  } catch (error) {
    console.error('获取城市列表失败:', error);
  }
};

useEffect(() => {
  // 组件加载时获取城市列表
  fetchCities();
}, []);
```

#### 2.3 实现交互逻辑
```typescript
// 出发地处理
const handleFromCityFocus = () => {
  setShowFromCityDropdown(true);
  setShowToCityDropdown(false);
  setFilteredFromCities(cities);
};

const handleFromCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setFromCity(value);
  setErrorMessage('');
  
  // 实时过滤城市列表
  if (value.trim()) {
    const filtered = cities.filter(city => city.includes(value));
    setFilteredFromCities(filtered);
  } else {
    setFilteredFromCities(cities);
  }
  setShowFromCityDropdown(true);
};

const handleSelectFromCity = (city: string) => {
  setFromCity(city);
  setShowFromCityDropdown(false);
  setErrorMessage('');
};

// 到达地处理（类似逻辑）
// ...
```

#### 2.4 添加UI渲染
```tsx
<div className="input-with-icon" style={{ position: 'relative' }}>
  <div className="station-input">
    <input 
      type="text" 
      placeholder="请选择城市" 
      className="station-input-field"
      value={fromCity}
      onChange={handleFromCityChange}
      onFocus={handleFromCityFocus}
    />
  </div>
  <svg className="location-icon">...</svg>
  
  {/* 城市下拉框 */}
  {showFromCityDropdown && filteredFromCities.length > 0 && (
    <div className="city-dropdown">
      {filteredFromCities.slice(0, 10).map((city, index) => (
        <div 
          key={index} 
          className="city-dropdown-item"
          onClick={() => handleSelectFromCity(city)}
        >
          {city}
        </div>
      ))}
    </div>
  )}
</div>
```

#### 2.5 添加CSS样式
**文件**: `frontend/src/components/TrainSearchForm/TrainSearchForm.css`

```css
/* 城市下拉框样式 */
.city-dropdown {
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  right: 0 !important;
  background-color: #ffffff !important;
  border: 1px solid #ddd !important;
  border-top: none !important;
  max-height: 300px !important;
  overflow-y: auto !important;
  z-index: 1000 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
  margin-top: -1px !important;
}

.city-dropdown-item {
  padding: 10px 15px !important;
  cursor: pointer !important;
  font-size: 14px !important;
  color: #333 !important;
  transition: background-color 0.2s !important;
}

.city-dropdown-item:hover {
  background-color: #f5f5f5 !important;
}
```

#### 2.6 点击外部关闭下拉框
```typescript
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.input-with-icon')) {
      setShowFromCityDropdown(false);
      setShowToCityDropdown(false);
    }
  };
  
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);
```

### 3. 实现查询跳转功能

**修改前**:
```typescript
// 临时：显示成功提示
alert(`查询成功！\n出发地：${fromCity}...`);
```

**修改后**:
```typescript
// 跳转至车次列表页，传递查询参数
navigate('/trains', { 
  state: {
    fromCity,
    toCity,
    departureDate,
    isStudent,
    isHighSpeed
  }
});
```

## 验证结果

### ✅ 城市下拉框功能
1. ✅ 点击出发地输入框，显示所有城市（16个城市）
2. ✅ 输入文字时实时过滤城市列表
3. ✅ 点击城市项自动填充并关闭下拉框
4. ✅ 点击外部区域关闭下拉框
5. ✅ 到达地输入框功能相同

### ✅ 查询跳转功能
1. ✅ 选择北京 → 上海
2. ✅ 点击"查询"按钮
3. ✅ 成功跳转到 `/trains` 页面
4. ✅ 车次列表页正确显示查询条件

### ✅ API配置
1. ✅ 后端服务：运行在 5001 端口
2. ✅ 前端代理：`/api` → `http://localhost:5001`
3. ✅ API端点：`GET /api/trains/cities` 返回16个城市
4. ✅ 数据库：cities表包含16条数据

## 技术栈确认
- **前端框架**: React + TypeScript + Vite
- **路由**: React Router v6
- **HTTP客户端**: Axios
- **后端**: Express.js + SQLite
- **端口**: 前端5174，后端5001

## 文件清单
- ✅ `frontend/src/components/TrainSearchForm/TrainSearchForm.tsx` - 主要逻辑修改
- ✅ `frontend/src/components/TrainSearchForm/TrainSearchForm.css` - 样式添加
- ✅ `frontend/src/api/index.ts` - API客户端配置（无需修改，已正确）
- ✅ `frontend/vite.config.ts` - 代理配置（无需修改，已正确）
- ✅ `backend/src/routes/api.js` - API路由（无需修改，已正确）
- ✅ `backend/src/database/operations.js` - 数据库操作（无需修改，已正确）

## 后续建议
1. 考虑添加防抖（debounce）优化输入过滤性能
2. 可以添加键盘导航支持（上下箭头选择城市）
3. 考虑添加最近搜索/热门城市功能
4. 优化下拉框的无障碍支持（ARIA属性）

---
**修复日期**: 2026-01-17
**修复人员**: AI Assistant
**测试状态**: ✅ 通过
