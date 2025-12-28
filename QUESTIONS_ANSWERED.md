# 用户问题解答总结

## 问题1: "前端验证-密码过短" 场景是否能保证用户名框中输入了正确的用户名？

### 原始问题
`requirements/initial-requirements.yaml:96-111` 中的场景只清空了密码框，没有填写用户名。

### 答案
**❌ 原始版本无法保证。** 该场景会触发"用户名为空"错误，而不是"密码过短"错误。

### 已修复
```yaml
steps:
  # ✅ 1. 清空所有输入框
  - action: evaluate
    script: |
      document.querySelector('input[placeholder*="用户名"]').value = '';
      document.querySelector('input[type="password"]').value = '';
  
  # ✅ 2. 填写用户名（从凭证读取）
  - action: type
    target: "用户名输入框"
    value: "${LOGIN_CREDENTIALS.username}"
  
  # ✅ 3. 填写短密码（触发正确的错误）
  - action: type
    target: "密码输入框"
    value: "123"
```

---

## 问题2: 登录凭证是否会自动填入正确用户名？

### 答案
**✅ 是的，通过变量替换机制自动填入。**

**工作原理**:
1. Agent 从 `credentials.env` 文件读取 `LOGIN_USERNAME`
2. 在执行 `type` action 时，将 `${LOGIN_CREDENTIALS.username}` 替换为真实值
3. 所有场景统一使用变量，确保一致性

**示例**:
```yaml
# 场景定义中使用变量
value: "${LOGIN_CREDENTIALS.username}"

# Agent 执行时自动替换为
value: "testuser"  # 从 credentials.env 读取的实际值
```

---

## 问题3: agent-prompts/ui-analyzer-prompt.txt 是否告诉 agent 如何处理交互场景截图？

### 答案
**✅ 已完整添加指导。**

### 三个方面的完整指导：

#### 1️⃣ 如何执行交互场景（Phase 7）

在 Phase 7 开头添加了"关键原则"章节：

```markdown
**🔑 关键原则：确保每个场景的初始状态一致**

1. **场景独立性**：每个场景从干净状态开始
   - 第一步必须清空所有相关输入框
   
2. **凭证变量替换**：所有敏感信息使用变量
   - 用户名：${LOGIN_CREDENTIALS.username}
   - 密码：${LOGIN_CREDENTIALS.password}
   
3. **场景命名规范**：
   - 格式：{组件名}-{状态}-{场景描述}.png
```

#### 2️⃣ 如何在需求文档中记录交互截图

在 Phase 6 添加了详细的记录格式：

```yaml
**交互状态截图**（由 Phase 7 自动生成）:

> 📸 **重要说明**：以下截图展示了登录表单在不同交互场景下的状态...

1. **错误状态 - 用户名为空**
   - 截图路径: `./images/交互状态截图/登录表单-错误-用户名为空.png`
   - 触发场景: 用户不输入用户名直接点击"立即登录"按钮
   - 展示内容: 红色错误提示"请输入用户名！"
   - 用途: 展示前端验证的错误提示样式（颜色、字体、位置）
   - 关键信息: 错误提示在用户名输入框上方，红色文字，小图标
```

**格式标准**:
- ✅ 说明性引言（强调截图价值）
- ✅ 编号列表（结构清晰）
- ✅ 5个关键字段（路径、场景、内容、用途、关键信息）
- ✅ 区分静态截图和交互截图

#### 3️⃣ 如何参考交互截图进行 UI 分析

**在 ui-style-guide.md 中**:

```css
/* ========== 4.2 错误提示（参考交互截图）========== */
/* 📸 参考截图: requirements/images/交互状态截图/登录表单-错误-用户名为空.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 错误提示位置：输入框上方，margin-bottom: 8px
 * - 错误提示颜色：#f44336（红色文字）
 * - 错误提示背景：#fff1f0（浅红色背景）
 * - 错误提示边框：1px solid #ffccc7
 * - 错误提示圆角：4px
 */
.login-form-error {
  padding: 10px 15px !important;
  background-color: #fff1f0 !important;
  color: #f44336 !important;
  /* ... */
}
```

**使用指南**:
```markdown
**📋 如何使用交互截图进行样式提取**:
1. 打开交互截图 `登录表单-错误-用户名为空.png`
2. 观察错误提示的位置（输入框上方/下方？）
3. 观察错误提示的颜色（文字颜色、背景色、边框色）
4. 观察错误提示的字体大小和图标
5. 将这些参数精确地转换为 CSS 代码
```

**新增 Phase 7 的步骤6**:
```markdown
**步骤6: 将交互截图信息整合到文档**

⚠️ **关键步骤**：Phase 7 完成后，必须返回修改 Phase 6 生成的文档

**6.1 更新 ui-requirements.yaml**
添加 "**交互状态截图**" 章节

**6.2 更新 ui-style-guide.md**
添加引用交互截图的 CSS 注释

**6.3 验证清单**
- [ ] 每个执行了交互场景的组件都添加了截图章节
- [ ] 每个截图都有完整说明
- [ ] CSS 注释中详细说明了提取的样式参数
```

---

## 📊 改进总结

| 问题 | 原始状态 | 改进后 |
|-----|---------|--------|
| **场景完整性** | ❌ 场景定义不完整，触发错误的错误 | ✅ 清空输入框 + 填写必要字段 |
| **凭证一致性** | ❌ 部分硬编码，部分变量 | ✅ 统一使用变量 |
| **执行指导** | ⚠️ 只有示例，无明确原则 | ✅ 关键原则 + 正反示例 |
| **记录格式** | ⚠️ 格式不统一 | ✅ 5字段标准格式 |
| **文档整合** | ❌ 无明确步骤 | ✅ 步骤6：系统化整合 |
| **样式提取** | ❌ 无使用指南 | ✅ 5步提取法 + CSS 注释 |

---

## ✅ 验证检查

### 检查场景定义
```bash
# 1. 检查是否有清空步骤
grep -B 2 -A 5 "action: evaluate" requirements/initial-requirements.yaml

# 2. 检查是否使用变量
grep "LOGIN_CREDENTIALS" requirements/initial-requirements.yaml
```

### 检查提示词完整性
```bash
# 1. 检查关键原则是否存在
grep -A 20 "关键原则：确保每个场景的初始状态一致" agent-prompts/ui-analyzer-prompt.txt

# 2. 检查步骤6是否存在
grep -A 30 "步骤6: 将交互截图信息整合到文档" agent-prompts/ui-analyzer-prompt.txt
```

---

## 📚 相关文档

完整的改进说明请查看：[INTERACTIVE_SCENARIOS_IMPROVEMENTS.md](INTERACTIVE_SCENARIOS_IMPROVEMENTS.md)

