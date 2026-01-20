# UI 调整迭代日志

## Iteration 1
- **差异点（基于 `target_image.png` vs `replica_page_iteration_1.png` 的截图肉眼对比）**：
  1. **左侧侧边栏“个人中心”标题块宽度/字号不一致**（左侧菜单顶部区域）- 缺失/尺寸
  2. **乘车人表格区域出现横向溢出**（右侧表格面板区域）- 尺寸/布局
  3. **“请输入乘客姓名”输入框与“查询”按钮样式不一致**（右侧面板顶部搜索区域）- 样式
  4. **表格操作区“添加/批量删除”图标风格不一致**（表格标题下方浅蓝操作行）- 缺失/样式
  5. **表格行“核验状态/编辑/删除”图标不一致**（表格内容行右侧）- 缺失/样式
- **修复内容（迭代1阶段性）**：
  - 修改文件：`frontend/src/pages/PersonalInfoPage.css`、`frontend/src/components/SideMenu/SideMenu.css`、`frontend/src/components/PassengerManagePanel/PassengerManagePanel.tsx`、`frontend/src/components/PassengerManagePanel/PassengerManagePanel.css`
  - 结果：主内容区宽度调整为与目标一致的 1200px 体系；侧栏宽度调整为 160px；为后续 iconfont 接入做了结构铺垫
- **验证结果**：部分修复（仍需继续迭代）

## Iteration 2
- **差异点（基于 `target_image.png` vs `replica_page_iteration_2.png` 的截图肉眼对比）**：
  1. **左侧“个人中心”标题字号/高度不一致**（左侧菜单最上方）- 样式/尺寸
  2. **右侧搜索框旁“清空”按钮位置不一致，导致面板视觉上更“挤/超宽”**（搜索框右侧）- 位置/尺寸
  3. **表格操作行“添加/批量删除”图标不来自目标站点**（浅蓝操作行左侧）- 缺失/样式
  4. **表格行“核验状态/编辑/删除”图标不来自目标站点**（表格右侧两列）- 缺失/样式
  5. **核验状态徽章风格与目标（绿色实心圆+白色对勾）不一致**（表格“核验状态”列）- 样式
- **从目标网页提取的信息（`browser_evaluate`）**：
  - 侧栏标题 `.menu-tit`：`font-size: 14px; font-weight: 700; height: 30px; line-height: 30px; padding: 0 10px; width: 130px`
  - 搜索输入框：`width:160px; height:30px; padding:4px 10px; border:1px solid #dedede; border-radius:0; font-size:14px`
  - 查询按钮：`width:100px; height:30px; padding:4px 10px; border:1px solid #dedede; border-radius:6px; font-size:14px`
  - 图标来源：`https://kyfw.12306.cn/otn/fonts/iconfont.css`（font-family: `icon`）
- **修复内容**：
  - 修改文件：
    - `frontend/src/components/SideMenu/SideMenu.css`（将 `.menu-header` 调整为 14px/30px）
    - `frontend/public/assets/fonts/kyfw-iconfont.woff`（下载目标站 iconfont）
    - `frontend/src/styles/kyfw-iconfont.css`、`frontend/src/main.tsx`（全局引入 iconfont）
    - `frontend/src/components/PassengerManagePanel/PassengerManagePanel.tsx`、`frontend/src/components/PassengerManagePanel/PassengerManagePanel.css`
  - 修复点：
    - **搜索清空按钮**：移入输入框内部（避免 `scrollWidth` 撑大导致“超宽”）
    - **全套图标**：使用目标站点 iconfont（添加/批量删除/编辑/删除/核验）
    - **核验状态徽章**：改为绿色实心圆+白色 icon
- **验证结果**：已修复主要问题（未再出现横向溢出；图标来源已对齐目标站）
- **剩余问题**：如仍存在细微对齐/颜色差异，进入下一轮继续微调

## Iteration 3
- **差异点（基于 `target_page_iteration_3.png` vs `replica_page_iteration_3.png/4.png` 的截图肉眼对比，聚焦表格区域）**：
  1. **表头与表体列宽不一致，右侧“操作”列发生溢出/被裁切**（表格最右侧）- 尺寸/布局
  2. **表格分割线样式不一致**：目标仅在“序号”列有竖分割线，其余列主要靠横向分割线（表体行）- 样式
  3. **表头字体颜色/字重不一致**：目标为灰色(#666)且字重 400；本地偏深偏粗 - 样式
  4. **表体行高与 padding 不一致**：目标行高约 61px、padding 15px 6px - 尺寸
  5. **核验状态图标不一致**：目标不是字体图标，而是 20×20 的背景图 `user-verification-success.png` - 缺失/样式
- **从目标网页提取的信息（`browser_evaluate`）**：
  - 表头 `.order-panel-head`：宽 988px、背景 `rgb(248,248,248)`、`th` padding `0 10px`、`font-weight:400`、`color:#666`
  - 表体 `.order-item-table td`：`height:61px`、`padding:15px 6px`、`line-height:22px`、顶部分割线 `#dedede`；仅首列有 `border-right:1px solid #dedede`
  - 核验图标：`.verification-status-common.user-check-success` 使用 `background-image`：
    - `user-verification-success.png` (1x)
    - `user-verification-success@2x.png` (2x)
- **修复内容**：
  - 修改/新增文件：
    - `frontend/public/assets/images/center/user-verification-success.png`
    - `frontend/public/assets/images/center/user-verification-success@2x.png`
    - `frontend/src/components/PassengerManagePanel/PassengerManagePanel.tsx`
    - `frontend/src/components/PassengerManagePanel/PassengerManagePanel.css`
  - 修复点：
    - **修复“操作”列溢出**：去掉 `.passenger-manage-panelBorder` 额外 padding/border（避免把表格区域挤窄），并让 `.passenger-tablePanel` 实际宽度回到 988px；同时确保 `scrollWidth == clientWidth`
    - **列宽/分割线对齐**：按目标 col 宽度与分割线策略重设（首列竖线+横向分割线）
    - **核验图标**：改为 `span.passenger-statusIconSuccess` 使用 target 的 image-set 背景图
- **验证结果**：表格右侧不再溢出，表头/表体列宽对齐；核验状态图标与目标一致

# UI 调整迭代日志

## Iteration 1（个人信息页 /my-account）
- **对比图片**：
  - `target_image.png`（参考）
  - `replica_page_iteration_1.png`（修复前复刻截图）
  - `replica_page_iteration_1_verify.png`（修复后验证截图）

- **差异点**（至少 5 处，按优先级排序：缺失/多余 > 位置和尺寸 > 颜色 > 其他）：
  1. **“联系方式”手机号行布局不一致**：参考图中“已通过核验”与手机号同一行、位于右侧；复刻图中为纵向堆叠/位置不对（右侧主卡片-联系方式区域）- **位置/尺寸**
  2. **字段标签列宽度与对齐不一致**：参考图标签列明显更宽、右对齐且为灰色；复刻图标签列偏窄且颜色更深（右侧主卡片-所有字段行）- **位置/尺寸**
  3. **Section 标题样式不一致**：参考图标题较小且无蓝色下划线；复刻图标题更大并带蓝色下划线（右侧主卡片-基本信息/联系方式/附加信息标题）- **其他样式**
  4. **Section 分割线样式不一致**：参考图使用点线/虚线分割；复刻图使用实线分割（右侧主卡片-各 section 之间）- **颜色/其他样式**
  5. **左侧菜单子项尺寸/内边距不一致**：参考图“查看个人信息”选中态为 30px 高、约 130px 宽、无圆角，左右内边距固定；复刻图选中态与未选中态的尺寸/圆角/缩进不一致（左侧菜单-个人信息分组）- **位置/尺寸**

- **从原网页提取的信息**（`https://kyfw.12306.cn/otn/view/information.html`，用于精确对齐）：
  - **右侧内容卡片容器**：`border: 1px solid #DEDEDE; padding: 20px; border-radius: 0`
  - **字段标签（示例：手机号标签）**：`width: 360px; padding: 5px 5px 5px 0; text-align: right; color: #666; font-size: 14px; line-height: 20px`
  - **“已通过核验”提示**：`color: #FF8000; font-size: 14px; margin-left: 5px`（与手机号同一行）
  - **编辑按钮**：`width: 80px; height: 30px; padding: 4px 10px; border: 1px solid #DEDEDE; border-radius: 6px; background: #FFF`
  - **左侧菜单选中项**：`width: 130px; height: 30px; padding: 0 10px 0 20px; background: #3B99FC; color: #FFF; border-radius: 0`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/pages/PersonalInfoPage.css`
    - `frontend/src/components/PersonalInfoPanel/PersonalInfoPanel.css`
    - `frontend/src/components/SideMenu/SideMenu.css`
  - **修复的差异点**：
    - 调整右侧卡片边框颜色/圆角为参考一致
    - 将字段 label 列宽改为 360px 并匹配 padding/颜色/对齐
    - 将“手机号 + 已通过核验”布局改为同一行（`info-value-group` 改为 row）
    - Section 标题字号/字重对齐参考，移除蓝色下划线
    - Section 分割线改为 dotted
    - 左侧菜单子项尺寸/内边距/圆角对齐参考

- **验证结果**：已修复（基于 `replica_page_iteration_1_verify.png` 与 `target_image.png` 对比）

- **剩余问题**：
  - 顶部栏/底部栏按要求未调整；若后续需要进一步像素级细化，可继续从左侧菜单折叠图标、细微间距入手做 Iteration 2。

## Iteration 2（个人信息页 /my-account）
- **对比图片**：
  - `target_image.png`（参考）
  - `replica_page_iteration_2.png`（修复前复刻截图）
  - `replica_page_iteration_2_verify.png`（修复后验证截图）

- **差异点**（至少 5 处，按优先级排序：缺失/多余 > 位置和尺寸 > 颜色 > 其他）：
  1. **“已通过核验”位置偏移**：参考图中紧跟手机号内容，复刻图中被推到更靠右位置（右侧主卡片-联系方式-手机号行）- **位置/尺寸**
  2. **左侧菜单折叠箭头缺少“方框按钮”形态**：参考图为 16×16 的小方块内含下箭头；复刻图为裸箭头（左侧菜单-订单中心/个人信息/常用信息管理 等分组标题右侧）- **缺失元素/其他样式**
  3. **折叠箭头尺寸/对齐不一致**：参考图箭头垂直居中并贴近标题右边缘；复刻图箭头大小/位置偏差（左侧菜单-分组标题右侧）- **位置/尺寸**
  4. **手机号行不应换行**：参考图手机号与“已通过核验”同一行且不折行；复刻图存在潜在换行/挤压（右侧主卡片-联系方式-手机号行）- **位置/尺寸**
  5. **折叠箭头颜色不一致**：参考图为浅灰；复刻图颜色偏深/不统一（左侧菜单-分组标题右侧）- **颜色**

- **从原网页提取的信息**（`https://kyfw.12306.cn/otn/view/information.html`，用于精确对齐）：
  - **“已通过核验”提示**：`width: 70px; height: 21px; margin-left: 5px; color: #FF8000; font-size: 14px; line-height: 21px`
  - **折叠箭头（图标字体实现）**：
    - `i.icon-switch`：`width: 16px; height: 16px; position: absolute; top: 7px; right: 0; font-family: icon; font-size: 16px; line-height: 16px; color: #999`
    - `i.icon-switch::before`：`content: ""`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/PersonalInfoPanel/PersonalInfoPanel.css`
    - `frontend/src/components/SideMenu/SideMenu.css`
  - **修复的差异点**：
    - 通过将 `.info-value-group .info-value` 设为 `flex: 0 0 auto`，避免手机号占满剩余宽度，确保“已通过核验”紧跟手机号
    - 禁止手机号行换行（`flex-wrap: nowrap`）并为核验提示加 `white-space: nowrap`
    - 左侧折叠箭头改为 16×16 方框按钮形态，并对齐到 `top: 7px; right: 0`，颜色统一为浅灰

- **验证结果**：已修复（基于 `replica_page_iteration_2_verify.png` 与 `target_image.png` 对比）

- **剩余问题**：
  - 若继续 Iteration 3，可进一步细抠左侧分组标题与其下方子项的垂直间距，以及分割线虚线的粗细/透明度。

# UI 调整迭代日志

## Iteration 1（购票成功页 /success/:orderId）
- **对比基准**：
  - 目标参考图：`target_image.png`
  - 复刻截图（修改前）：`replica_page_iteration_1.png`
  - 复刻截图（修改后）：`replica_page_iteration_1_after2.png`

- **差异点（按优先级：缺失/多余 > 位置和尺寸 > 颜色 > 其他）**：
  1. **主内容区宽度不一致**：目标页主内容列明显更窄并居中（约 980px），复刻页主内容列更宽、左右留白不一致（主内容区）- **位置/尺寸**
  2. **成功提示框排版不一致**：目标页为“图标 + 单行 greet（含订单号）+ 两段 12px 灰字说明”，复刻页原先为多行/字号偏大且对齐方式不同（成功提示框）- **位置/尺寸**
  3. **操作按钮尺寸不一致**：目标页按钮约 120×28/122×30、12px 字号，复刻页原先按钮更大（操作按钮区）- **位置/尺寸**
  4. **订单信息模块宽度/标题栏样式不一致**：目标页订单信息模块与成功提示框同列宽（约 978px），标题栏字号/内边距更小；复刻页原先模块更宽且字号偏大（订单信息区）- **位置/尺寸**
  5. **温馨提示模块内边距/字号不一致**：目标页温馨提示块 padding 更小、标题为 14px 常规字重；复刻页原先 padding 更大、字号偏大（温馨提示区）- **位置/尺寸**
  6. **广告横幅宽度不一致**：目标页广告横幅与主内容列宽一致，复刻页原先更宽（广告区）- **位置/尺寸**

- **从目标官网提取的关键信息（用于精确对齐）**：
  - 成功提示框 `.t-succ`：宽约 **978px**；内层 `.pay-tips` padding **15px 0 0 45px**；图标区域约 **42×42**
  - 文本段落 `p`：font-size **12px**、color **#666**、line-height **20px**、padding-left **60px**；第二段为 bold
  - 订单号高亮 `.colorA`：color **rgb(251, 116, 3)**、font-size **12px**
  - 按钮：继续购票 **120×28**、查询订单详情 **122×30**、font-size **12px**、border-radius **4px**、margin **0 10px**

- **修复内容**：
  - **修改文件**：
    - `frontend/src/pages/PurchaseSuccessPage.css`
    - `frontend/src/components/PurchaseSuccess/SuccessBanner.tsx`
    - `frontend/src/components/PurchaseSuccess/SuccessBanner.css`
    - `frontend/src/components/PurchaseSuccess/SuccessOrderInfo.css`
    - `frontend/src/components/PurchaseSuccess/SuccessActions.css`
    - `frontend/src/components/PurchaseSuccess/SuccessTips.tsx`
    - `frontend/src/components/PurchaseSuccess/SuccessTips.css`
  - **主要调整**：
    - 主内容区收窄并居中（980px 逻辑），广告横幅按主列宽对齐
    - 成功提示区改为更贴近官网结构/字号/内边距（pay-tips/greet/p）
    - 操作按钮调整为官网尺寸/字号/边框与间距
    - 订单信息区宽度与标题栏字号/内边距对齐官网量级
    - 温馨提示区 padding/字号对齐官网量级，二维码文案对齐官网

- **验证结果**：**部分修复**
  - ✅ 主内容居中列宽、按钮大小、成功提示排版、温馨提示/广告宽度已明显更接近目标参考图
  - ⏳ 仍有细微差异（后续迭代再收敛）：如局部行高、边框颜色/粗细、部分间距等

## Iteration 2（购票成功页 /success/:orderId）
- **对比基准**：
  - 目标参考图：`target_image.png`
  - 复刻截图（修改前）：`replica_page_iteration_2.png`
  - 复刻截图（修改后）：`replica_page_iteration_2_after3.png`

- **差异点（按优先级：缺失/多余 > 位置和尺寸 > 颜色 > 其他）**：
  1. **订单信息模块外框样式不一致**：目标图外框为蓝色描边+顶部圆角且与标题栏风格一致；复刻页此前为灰边框/直角（订单信息区）- **颜色/其他**
  2. **表格分隔线样式不一致**：目标图表格为清晰的单元格网格线；复刻页此前采用“仅行分隔/虚线”的观感偏离（订单信息表格）- **颜色/其他**
  3. **“已支付”颜色不一致**：目标图为更偏橙的高亮；复刻页此前橙色值偏浅（订单状态列）- **颜色**
  4. **订单信息标题栏边框/下沿不一致**：目标图标题栏下沿有更明显的浅蓝分隔线；复刻页此前不明显（订单信息标题栏）- **颜色/其他**
  5. **表头底色不一致**：目标图表头为浅灰底；复刻页此前色值偏差（表格表头）- **颜色**

- **从目标官网提取的信息（用于确认是否文字/图片与关键值）**：
  - 成功提示框 `.t-succ`：背景 **#EDFFCC**，边框 **#298CCE**
  - “已支付” `.colorA`：color **rgb(251, 116, 3)**（#FB7403）
  - 订单信息容器 `.layout.b-info`：边框 **#1678BE**，顶部圆角 **5px**

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/PurchaseSuccess/SuccessOrderInfo.css`
  - **主要调整**：
    - 订单信息外框：改为 **#1678BE** 边框 + 顶部圆角 **5px**
    - 标题栏：恢复与目标图一致的蓝色渐变标题条与下沿浅蓝分隔
    - 表格：恢复单元格网格线（1px #D0D0D0）、表头浅灰底、表体浅蓝底
    - “已支付”：颜色调整为 **#FB7403**

- **验证结果**：**部分修复**
  - ✅ 订单信息区整体框架（边框/圆角/标题栏）与表格网格线观感更接近目标参考图
  - ⏳ 仍有细微差异：如局部间距、表格列宽/字重、个别灰线粗细等（后续迭代继续收敛）

## Iteration 3（购票成功页 /success/:orderId）
- **对比基准**：
  - 目标参考图：`target_image.png`
  - 目标区域特写：`requirements/images/purchase-success/组件特写截图/订单详情区域.png`
  - 复刻区域截图（修复前）：`replica_page_iteration_3_orderinfo_current.png`
  - 复刻区域截图（修复后）：`replica_page_iteration_3_orderinfo_after2.png`

- **差异点（按优先级：缺失/多余 > 位置和尺寸 > 颜色 > 其他）**：
  1. **星期几展示错误且被硬编码**：目标图星期几随日期变化；复刻页此前固定写死“周日”（车次信息行）- **其他**
  2. **目的地车站样式不一致**：目标图仅出发站为红色大字，目的地站为黑色常规；复刻页此前目的地也为红色大字（车次信息行）- **颜色/其他**
  3. **车次信息行的文本拼接/间距不一致**：目标图为“G103次”紧凑展示，时间括号内有空格“06:20 开”；复刻页此前存在多余空格/拼接不一致（车次信息行）- **位置/其他**
  4. **表格表头对齐不一致**：目标图表头文字居中；复刻页此前因样式覆盖导致表头偏左（订单信息表格）- **位置**
  5. **订单状态高亮不一致**：目标图“已支付”为橙色高亮；复刻页此前因选择器优先级问题被表格 `td` 颜色覆盖显示为黑色（订单状态列）- **颜色**

- **从目标官网提取/确认的关键信息（用于精确对齐）**：
  - 出发站：红色 **#FF0000**、字号约 **26px**、粗体
  - “已支付”高亮：橙色 **#FB7403**（rgb(251,116,3)）

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/PurchaseSuccess/SuccessOrderInfo.tsx`
    - `frontend/src/components/PurchaseSuccess/SuccessOrderInfo.css`
  - **主要调整**：
    - 星期几：改为根据 `orderInfo.date` 动态计算（不再硬编码）
    - 车次信息行：区分出发/到达站样式（仅出发站红色大字），并对齐“次/站/时间括号空格/分隔符”展示
    - 表格：恢复表头居中 + 表体浅蓝底，并修复 `.status-paid` 选择器特异性（确保橙色高亮生效）

- **验证结果**：**部分修复**
  - ✅ 星期几已动态计算；目的地站不再红色加大；“已支付”橙色高亮恢复；表格对齐与底色更接近参考图
  - ⏳ 仍有细微差异：如车次信息行个别字重/间距、表格列宽与下方分隔线细节（后续迭代继续收敛）
