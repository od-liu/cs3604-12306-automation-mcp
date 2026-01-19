# UI 调整迭代日志（trains 页面）

## Iteration 1（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_1.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_1_verify3.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **查询按钮样式不一致** - 右上“查询”按钮区域 - **位置/尺寸/样式**
   - 参考图为 92×30 的小按钮，文字水平居中；复刻图按钮尺寸/排版不一致（出现竖排/尺寸偏大）。
2. **出发日输入框展示格式不一致** - 查询条件栏“出发日”输入框 - **样式**
   - 参考图为 `YYYY-MM-DD`；复刻图为 `1月19日 周一` 形式。
3. **车次列表表头背景不一致** - 列表区域表头（蓝色条） - **颜色/视觉效果**
   - 参考图为渐变/贴图风格表头；复刻图为纯色蓝条且高度/内边距不同。
4. **列表外框与分割线不一致** - 列表整体边框与行分割线 - **颜色/视觉效果**
   - 参考图外框为明显蓝色边框；复刻图外框/阴影/圆角与参考图不一致。
5. **列表斑马纹不一致** - 列表数据行区域 - **颜色**
   - 参考图首行/交替行有浅灰蓝底色；复刻图行底色与交替规则不一致。
6. **“预订”按钮风格不一致** - 列表最右侧按钮 - **样式**
   - 参考图按钮为贴图按钮（含蓝底与角标效果）；复刻图为普通按钮（尺寸/背景/角标不同）。

### 从原网站提取的信息（用于精确对齐）
- **查询按钮（#query_ticket.btn92s）**
  - 尺寸：92×30；圆角 4px；`font-size: 12px`；`line-height: 30px`
  - 背景：`bg_btn.png`（repeat-x，position `0 0`）
- **列表表头背景**
  - `background-image: bg_tlisthd.png`（repeat-x，position `50% 0`）
  - 外框：`border: 1px solid rgb(41, 140, 206)`（#298CCE）
- **预订按钮（.btn72）**
  - 尺寸：72×30；圆角 4px；`font-size: 12px`；`line-height: 30px`
  - 背景：`bg_btn.png`（repeat-x，position `0 -250px`）
- **列表斑马纹**
  - 交替行底色（示例）：`rgb(238, 241, 248)`（#EEF1F8）

### 修复内容
- **新增资源**
  - `frontend/public/images/trains/bg_tlisthd.png`（从原站下载）
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainList/TrainList.tsx`
  - `frontend/src/components/TrainList/TrainList.css`
  - `frontend/src/pages/TrainListPage.css`
- **已修复/优化**
  - 出发日输入框显示改为 `YYYY-MM-DD`
  - 查询按钮改为贴图按钮（92×30，bg_btn.png）
  - 列表外框改为 #298CCE；表头改为 `bg_tlisthd.png`；行高/字号/斑马纹靠近参考图
  - “预订”按钮改为贴图按钮（72×30，bg_btn.png，position `0 -250px`）

### 验证结果
- **部分修复**：查询按钮尺寸/日期格式/表头贴图/边框与斑马纹已有明显接近；仍存在细节差异（如列宽、部分图标/角标效果、数据量不同导致的列表高度差异等）。

### 剩余问题（下一轮继续）
- 列表列宽/对齐仍与参考图不完全一致（尤其是“车次/站点/时间/席别”列的精确宽度与文本对齐）
- “预订”按钮角标效果与参考图仍有差异（需要继续对齐贴图/伪元素实现）
- 筛选区的分割线、文字间距与控件大小仍需更精细对齐

## Iteration 2（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_2.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_2_after_patch_query_filter.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **查询按钮宽度异常收缩** - 查询条件栏右侧“查询”按钮 - **位置/尺寸**
   - 参考图为 92×30 的按钮；复刻图里按钮被压缩成极窄宽度（视觉上只剩一个字的空间）。
2. **“交换”图标样式不一致** - 出发地与目的地中间 - **缺失元素/样式**
   - 参考图为小尺寸蓝色交换图标（sprite）；复刻图为圆形按钮+SVG 图标，视觉不一致。
3. **日期输入缺少日历图标** - 出发日/返程日输入框右侧 - **缺失元素**
   - 参考图在日期输入框内有灰色日历图标；复刻图缺失。
4. **输入框尺寸与边框风格不一致** - 出发/到达/日期输入 - **尺寸/样式**
   - 参考图输入框更紧凑（约 30px 高、细边框、直角）；复刻图输入框更高、圆角更明显。
5. **日期快捷按钮排版不一致** - 查询栏下方日期快捷区 - **样式/排版**
   - 参考图按钮显示“MM-DD + 周几”两行（且有选中态）；复刻图仅显示“1-19”等单行样式，信息密度与排版不同。
6. **筛选区整体更“松”** - 车次类型/车站/席别筛选行 - **间距/尺寸**
   - 参考图筛选行更紧凑；复刻图行高与间距偏大，“筛选”按钮尺寸/定位也不一致。

### 从原网站提取的信息（用于精确对齐）
- **查询按钮（#query_ticket.btn92s）**
  - 尺寸：92×30；`font-size: 12px`；`line-height: 30px`
  - 背景：`bg_btn.png`（repeat-x，position `0 0`）
- **交换按钮（#change_station）**
  - 尺寸：16×16
  - 背景：`bg02.png`（`background-position: -67px -96px`）
- **日期图标（#date_icon_1.i-date）**
  - 尺寸：20×20
  - 背景：`icon.png`（`background-position: 0 -250px`）
- **日期/站点输入（#fromStationText/#toStationText/#train_date）**
  - 总高度：30px（input 本体 `height: 18px` + `padding: 5px 0 5px 5px`）
  - 边框：`1px solid rgb(207, 205, 199)`

### 修复内容
- **新增资源（从原站下载）**
  - `frontend/public/images/train-list/bg02.png`
  - `frontend/public/images/train-list/icon.png`
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.tsx`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
- **已修复/优化**
  - 查询按钮强制固定宽度（不再被 flex 压缩），恢复 92×30 视觉
  - 交换图标改为 sprite（`bg02.png`，`-67px -96px`）
  - 出发日/返程日补齐日历图标（`icon.png`，`0 -250px`）
  - 输入框尺寸/边框风格向原站靠拢（30px 高、细边框、直角）
  - 日期快捷按钮改为“MM-DD + 周几”的两行样式，更接近参考图的信息密度

### 验证结果
- **部分修复**：查询/筛选区的关键控件（查询按钮、交换图标、日期图标、日期按钮排版）已明显接近参考图；仍有细节差异待继续迭代（如筛选行的精确间距、部分文字/控件对齐、选中态逻辑等）。

## Iteration 3（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_3.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_3_verify_full.png`（另：`replica_page_iteration_3_verify.png`）

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **出发日日期不一致** - 查询条件栏“出发日”输入框 - **内容/样式**
   - 参考图显示 `2026-01-19`；复刻图显示 `2026-01-18`（尽管日期快捷条高亮为 01-19）。
2. **查询栏文案不一致** - 查询条件栏“出发/目的”标签 - **文字**
   - 参考图为“出发地/目的地”；复刻图为“出发城市/目的城市”。
3. **筛选按钮形态/位置不一致** - 筛选区右下角 - **位置/尺寸/样式**
   - 参考图右侧为更贴近原站的“筛选”控件样式；复刻图为单独的橙色矩形按钮（位置与视觉不同）。
4. **结果摘要信息排版不一致** - 列表标题行（北京→上海、日期、车次数） - **文字/排版**
   - 参考图为“北京 --> 上海（1月19日 周一）共计36个车次”；复刻图为“北京 → 上海 (2026-01-18) 共5个车次”，日期/箭头/文案结构不同。
5. **列表列数/信息密度不一致** - 车次列表表格区域 - **布局**
   - 参考图表头列更多（含“优选一等座/二等包座/软卧动卧/其它”等）；复刻图列更少，信息密度不同。
6. **查询条件栏布局明显不合理（中间空白过大）** - 导航栏下方查询条件栏 - **位置/尺寸**
   - 参考图查询栏各控件紧凑排列；复刻图“出发/目的/日期”控件被拉伸，导致中间出现很大空白区域。

### 从原网站提取的信息（用于定位“样式重名覆盖”类问题）
- **原站查询输入**（#fromStationText / #toStationText / #train_date）
  - 输入框高度约 30px；`padding: 5px 0 5px 5px`；边框 `1px solid rgb(207, 205, 199)`
- **原站查询按钮**（#query_ticket.btn92s）
  - 尺寸 92×30；圆角 4px；`font-size: 12px`；背景为 `bg_btn.png`（repeat-x）

### 修复内容
- **问题定位**：存在**全局样式重名覆盖**导致查询栏布局被撑开：
  - `frontend/src/components/TrainSearchForm/TrainSearchForm.css` 定义了全局 `.station-input` / `.date-input`（并带 `!important`），会覆盖 trains 页面 `TrainSearchBar` 内同名 class，导致控件宽度被错误放大，从而出现“中间空白过大”。
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
  - `frontend/src/pages/TrainListPage.css`
- **已修复/优化**
  - **TrainSearchBar 布局修复**：增加更高特异性规则 `.train-search-bar .station-input/.date-input`，强制固定宽度并禁止 flex-grow，避免被全局样式撑开；同时将查询栏高度压至接近原站（约 76px）。
  - **TrainFilterPanel 紧凑化**：压缩行高与 padding，并补齐蓝色边框，让筛选区更接近原站信息密度。
  - **查询区整体间距**：将 `search-filter-container` 顶部外边距调整为更贴近原站（10px）。

### 验证结果
- **已修复核心问题**：查询栏不再被“全局重名样式”撑开，中间大空白明显消失；查询/筛选区布局与原站更接近（验证截图见 `replica_page_iteration_3.png`）。

### 剩余问题（下一轮继续）
- 日期快捷条选中 01-19 与查询栏/结果摘要仍显示 01-18（需要把日期快捷选择与查询参数联动，属于前端状态同步问题）

## Iteration 4（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_4.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_4_verify.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **页面整体底色不一致** - 页面内容区（查询/筛选/列表块周围） - **颜色**
   - 参考图整体背景更偏白；复刻图（迭代开始）整体为浅灰底（#F5F5F5）。
2. **筛选区“日期快捷条”的结构与位置不一致** - 查询栏下方、筛选区上方日期条 - **布局/结构**
   - 参考图日期条在蓝色边框筛选框外（上方一条）；复刻图（迭代开始）日期条在筛选框内部（与筛选行混在同一块里）。
3. **筛选区信息密度偏松** - 蓝色边框筛选框内部（车次类型/车站/席别等行） - **间距/尺寸**
   - 参考图筛选行更紧凑（行距/内边距更小）；复刻图（迭代开始）padding/行高偏大导致区域更高。
4. **查询条件栏的字体体系不一致** - 查询条件栏（单程/往返、普通/学生、输入框） - **字体**
   - 参考图为 12px 的 Tahoma/宋体风格；复刻图（迭代开始）部分为系统字体/字号偏大。
5. **输入框文本颜色与 box-sizing 细节不一致** - 出发/目的输入框与出发日输入框 - **样式**
   - 参考图城市输入值为灰色（#999），日期更深（#333）；复刻图（迭代开始）输入值颜色与 box-sizing 细节不一致，导致视觉密度略不同。

### 从原网站提取的信息（用于精确对齐）
- **城市/日期输入（#fromStationText/#toStationText/#train_date）**
  - `width: 113px; height: 18px; padding: 5px 0 5px 5px; border: 1px solid rgb(207, 205, 199)`
  - `font-size: 12px; font-family: Tahoma`
  - 城市输入值颜色偏灰：`color: rgb(153, 153, 153)`
- **筛选区（.sear-sel-bd）**
  - 边框：`border: 1px solid rgb(51, 145, 208)`
  - padding：`3px 0 30px`
- **查询条件栏容器（.sear-box）**
  - 背景：`rgb(238, 241, 248)`（截图视觉一致的淡蓝灰）

### 修复内容
- **修改文件**
  - `frontend/src/pages/TrainListPage.css`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.tsx`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
- **已修复/优化**
  - 页面整体背景由浅灰调整为白色（更贴近参考图的整体底色观感）
  - 筛选区结构调整：将“日期快捷条”从 `.train-filter-panel` 内移到外层（更贴近 12306：日期条在蓝色筛选框上方）
  - 筛选区紧凑化：将 `.train-filter-panel` padding 调整为 `3px 0 30px`，并压缩行内间距
  - 查询条件栏字体对齐：整体回归 `12px` + `Tahoma/宋体`，降低单程/往返、普通/学生的字号
  - 输入框细节对齐：城市输入值颜色改为 #999、日期更深；并将输入框 `box-sizing` 改为 `content-box` 以贴近原站计算方式

### 验证结果
- **已修复（明显接近）**：通过 `replica_page_iteration_4_verify.png` 可见查询框/筛选框的信息密度、结构位置（日期条）与整体底色均更接近参考图；仍有少量细节差异可在下一轮继续抠（如部分控件的精确对齐、列表区域细微间距等）。

## Iteration 5（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_5.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_5_verify2.png`（另：`replica_page_iteration_5_verify.png`）

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **查询条件栏控件横向位置不对齐/间距过大** - 顶部导航下方“单程/出发地/交换/目的地/日期/查询”一行 - **位置/尺寸**
   - 参考图为更“表格化”的固定列宽排布；复刻图控件被 flex 拉伸后，间距松散、交换按钮与查询按钮基线不稳定。
2. **查询条件栏标签文案不一致** - “出发城市/目的城市”区域 - **文字**
   - 参考图为“出发地/目的地”；复刻图为“出发城市/目的城市”。
3. **列表表头缺少竖向分隔线贴图** - 表头蓝色条每一列的右侧 - **缺失元素**
   - 参考图表头每列之间有明显的竖向分隔线；复刻图此前为纯蓝底无分隔线。
4. **列表表头列不一致（缺少“其他”列）** - “无座/备注”之间 - **缺失元素/布局**
   - 参考图存在“其他”列；复刻图此前缺失，导致列对齐与信息密度不一致。
5. **“预订”按钮右上角角标缺失** - 车次列表右侧“预订”按钮 - **视觉效果**
   - 参考图按钮右上角有橙色角标；复刻图此前缺失。

### 从原网站提取的信息（用于精确对齐）
- **表头竖向分隔线**
  - 单元格背景图：`line_tlisth.png`（原站：`https://kyfw.12306.cn/otn/resources/images/line_tlisth.png`）

### 修复内容
- **新增资源（从原站下载）**
  - `frontend/public/images/trains/line_tlisth.png`
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainList/TrainList.tsx`
  - `frontend/src/components/TrainList/TrainList.css`
- **已修复/优化**
  - 查询条件栏改为固定列宽 grid（更接近参考图的紧凑对齐），并将栏宽固定为 1160px 居中
  - 查询条件栏文案改为“出发地/目的地”
  - 列表表头补齐竖向分隔线贴图（`line_tlisth.png`）
  - 列表补齐“其他”列
  - “预订”按钮补齐右上角橙色角标（伪元素实现），置灰态隐藏角标

### 验证结果
- **部分修复**：通过 `replica_page_iteration_5_verify2.png` 可见查询条件栏排布更紧凑且对齐稳定，表头分隔线/“其他”列/预订角标已补齐；仍存在列宽精确值与参考图不完全一致、以及参考图车次数量/席别列更多导致的信息密度差异等问题（下一轮可继续抠列宽与车次徽标细节）。

## Iteration 6（/trains）
- **参考图**：`target_image.png`
- **复刻截图（迭代开始）**：`replica_page_iteration_6.png`
- **复刻截图（修复后验证）**：`replica_page_iteration_6_verify.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **“单程/往返”所在列与后续输入列对齐不稳定** - 查询条件栏左侧（单程/往返）区域 - **位置/尺寸**
   - 参考图“单程/往返”列更窄且与输入框上沿对齐更规整；复刻图该列在截图中视觉上更容易挤压/漂移。
2. **查询条件栏整体宽度与内容区宽度不一致** - 查询条件栏外框 - **尺寸**
   - 参考图查询条件栏外框与筛选外框宽度一致（同一内容区宽）；复刻图此前查询栏为 1160px，左右对齐与筛选框存在细小偏差。
3. **查询按钮未贴右对齐** - 查询条件栏右侧“查询”按钮 - **位置**
   - 参考图按钮更靠近查询框右边界（与外框留白一致）；复刻图此前“查询”随 grid 固定列宽排列，右侧留白偏大。
4. **筛选区中“车次类型”一行的按钮/复选项间距不规整** - 蓝色筛选框第 1 行（车次类型） - **位置/间距**
   - 参考图“车次类型：”标签宽固定且“全部”按钮紧贴标签右侧，后续复选框沿一行紧凑排列；复刻图此前在不同组件/全局样式影响下存在间距/换行风险。
5. **筛选区存在样式重名覆盖风险导致布局回归凌乱** - 查询条件栏与筛选区整体 - **优先级/样式**
   - 参考图整体非常“表格化”；复刻图此前使用 `.station-input/.date-input/.checkbox-label` 等通用类名，容易被其他页面/组件 CSS 覆盖，导致“单程/往返”“车次类型”区域错位。

### 从原网站提取的信息（用于精确对齐）
- **查询条件栏容器（`.sear-box.quick-sear-box.sear-box-lg`）**
  - `padding: 12px 10px; border: 1px solid #298CCE; border-radius: 3px; background: #EEF1F8`
  - 参考布局宽：约 1190px（截图视觉一致）
- **“单程/往返”列（#dfc）**
  - 宽高：`80×48`；右侧 `margin-right: 20px`
- **筛选区外框（`.sear-sel-bd`）**
  - `border: 1px solid #3391D0; padding: 3px 0 30px; position: relative`
- **车次类型标签/按钮（`.section-hd` / `#train_type_btn_all`）**
  - 标签宽：80px；“全部”按钮宽：33px，右侧 margin 10px

### 修复内容
- **核心策略（避免样式重名覆盖）**：将查询/筛选区所有高风险通用类名替换为组件前缀类名，并使用容器选择器提升特异性，避免被 `TrainSearchForm.css` 等全局样式覆盖。
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.tsx`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
  - `frontend/src/pages/TrainListPage.css`
- **已修复/优化**
  - 查询条件栏：宽度改为 1190px，与内容区对齐；grid 增加 `1fr` spacer，使“查询”按钮靠右贴齐
  - 查询条件栏：通用类名替换为 `trainSearchBar-*` 前缀，彻底规避 `.station-input/.date-input` 重名覆盖
  - 筛选区：通用类名替换为 `trainFilterPanel-*` 前缀，规避 `.checkbox-label` 等重名覆盖，减少“车次类型”行错位风险
  - 内容区：`train-list-content` 最大宽度调整为 1190px，与原站主体宽一致

### 验证结果
- **已明显改善**：`replica_page_iteration_6_verify.png` 中“单程/往返”与“车次类型”两块的对齐更规整，且已从根源规避样式重名覆盖导致的布局回退；仍可在下一轮继续抠“车次类型”行的精确间距与筛选框内各行的细微对齐。

## Iteration 7（/trains）
- **参考图（分区域）**：
  - 查询表单：`target_iteration_7_query.png`
  - 筛选表单：`target_iteration_7_filter.png`
  - 车次表：`target_iteration_7_table.png`
- **复刻截图（分区域，迭代开始）**：
  - 查询表单：`replica_iteration_7_query.png`
  - 筛选表单：`replica_iteration_7_filter.png`
  - 车次表：`replica_iteration_7_table.png`
- **复刻截图（修复后验证）**：
  - 查询表单：`replica_iteration_7_query_after_patch.png`
  - 筛选表单：`replica_iteration_7_filter_after_patch.png`
  - 车次表：`replica_iteration_7_table_after_patch.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **查询表单缺少竖向分隔线** - “往返/出发地/日期/普通学生”之间 - **缺失元素**
2. **单程状态下返程日不显示日期** - 查询表单返程日输入框 - **内容/样式**
3. **筛选表单日期条选中态不一致** - 日期快捷条（01-19 周一） - **颜色/视觉效果**
4. **筛选表单“全部”按钮视觉不一致** - 车次类型/出发车站/到达车站/车次席别行的“全部” - **颜色/样式**
5. **筛选表单右下角“筛选”按钮样式/位置不一致** - 蓝色筛选框右下角 - **样式/位置**
6. **车次表条目数量与目标不同导致高度差异** - 车次表区域 - **内容差异（可忽略，仅对齐样式）**

### 从原网站提取的信息（用于精确对齐）
- **查询条件栏容器**（`.sear-box.quick-sear-box.sear-box-lg`）
  - `padding: 12px 10px; border: 1px solid #298CCE; border-radius: 3px; background: #EEF1F8`
- **查询按钮**（`#query_ticket.btn92s`）
  - 尺寸：92×30；`line-height: 30px`；背景：`bg_btn.png`（repeat-x，`0 0`）
- **日期条选中态**
  - 背景：`bg_s2.png`
- **筛选按钮**（`.up`）
  - 背景：`quick.png`；`padding-left: 10px`；高度约 22px；位于右下角

### 修复内容
- **新增资源（从原站下载）**
  - `frontend/public/images/train-list/bg_s2.png`
  - `frontend/public/images/train-list/quick.png`
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.tsx`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
- **已修复/优化**
  - 查询表单补齐两处竖向分隔线（更接近原站布局分组）
  - 单程时返程日输入框显示 `出发日 - 1 天`（与截图一致的 `2026-01-18`），并保持禁用态
  - 日期条：补齐“昨天 + 今天”结构（包含 01-18），并将选中态改为 `bg_s2.png`（蓝字贴图）
  - 筛选区“全部”按钮改为蓝底白字（贴近原站）
  - 右下角“筛选”按钮改用 `quick.png` 贴图（包含右侧小三角）

### 验证结果
- **已明显接近**：查询表单分隔线、返程日显示、日期条选中态与右下角筛选按钮贴图效果与目标截图更接近；车次表仍存在“数据量不同导致的高度差异”，但表头/行风格已基本一致。

## Iteration 8（/trains）
- **目标截图（分区域）**：
  - 查询表单：`target_iteration_8_query.png`
  - 筛选表单：`target_iteration_8_filter.png`
  - 车次表表头：`target_iteration_8_table_header.png`
  - 车次表首行：`target_iteration_8_table_row1.png`
- **复刻验证截图（分区域）**：
  - 查询表单：`replica_iteration_8_query_verify4.png`（另：`replica_iteration_8_query_verify.png`）
  - 筛选表单：`replica_iteration_8_filter_verify.png`
  - 车次表表头：`replica_iteration_8_table_header_verify.png`
  - 车次表首行：`replica_iteration_8_table_row1_verify.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **筛选区顶部“日期快捷条”呈现不一致** - 筛选区顶部 - **缺失/布局**
   - 目标图在筛选表单截图中包含日期快捷条（01-18 ~ 02-01，含选中态）；复刻截图未包含该条（或与筛选区切分方式/位置关系不同）。
2. **筛选表单信息密度差异明显** - “车次类型/出发车站/到达车站/车次席别”行 - **位置/尺寸/间距**
   - 目标图复选项更紧凑、同一行容纳更多选项；复刻图间距更大、每行可容纳项更少，右侧空白更多。
3. **筛选表单控件形态不一致** - “全部”按钮、复选框、右侧“发车时间”下拉 - **样式**
   - 目标图“全部”为小胶囊按钮、复选框更小且对齐更规整；复刻图按钮/复选框尺寸偏大，文字基线与框体对齐略不同。
4. **车次表表头列结构不一致** - 表头蓝色条 - **布局/缺失元素**
   - 目标图包含“优选一等座/二等包座/软卧/动卧/其它”等列；复刻图列为“硬座/无座/其他”等，列集合与顺序均不同。
5. **车次表表头高度与分隔线细节不一致** - 表头蓝色条 - **尺寸/视觉效果**
   - 目标图表头更“扁平/紧凑”，列分隔线与文字垂直居中方式不同；复刻图表头更高、渐变/分隔线视觉不同。
6. **车次表首行内容与“预订”按钮样式不一致** - 首行右侧按钮区域 - **样式/视觉效果**
   - 目标图按钮更小、更“贴图化”且角标不同；复刻图按钮更大、圆角与高光不同（车次数据不同可忽略，但按钮视觉需要对齐）。

### 从目标页面提取的信息（用于精确对齐）
- **查询表单关键控件 x 坐标（相对查询栏左边框）**：
  - `fromInput=153`, `swapBtn=306`, `toInput=384`, `depInput=574`, `retInput=764`, `queryBtn=1042`

### 修复内容（本轮重点：查询表单布局严重错位）
- **问题定位**：查询栏曾使用 `grid-template-columns` 中的 `1fr` 作为 spacer，但 DOM 未提供占位节点导致 `1fr` 列不生效，查询按钮落在错误列；同时 “目的地”字段的局部间距覆盖被后续通用规则覆盖，导致 5px 偏差长期存在。
- **修改文件**
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.tsx`
  - `frontend/src/components/TrainSearchBar/TrainSearchBar.css`
- **已修复/优化**
  - 查询栏改为固定列宽 + 固定 gap 的 grid（避免 `1fr` 带来的对齐不确定性）
  - 为四个字段块增加专用 class（`trainSearchBar-fromField/toField/depDateField/retDateField`）并用 `grid-column` 强制落位
  - 将 “目的地”微调规则放到 `stationField` 通用规则之后，确保 gap 覆盖生效

### 验证结果
- **查询表单：已修复（关键位置对齐）**：关键控件 x 坐标已与目标一致（见 `replica_iteration_8_query_verify4.png`）。
- **筛选/表头/首行：仍有明显差异**：已按区域截图记录（见 `replica_iteration_8_filter_verify.png` / `replica_iteration_8_table_header_verify.png` / `replica_iteration_8_table_row1_verify.png`），下一轮优先对齐筛选区日期条、筛选行信息密度与表头列结构。

## Iteration 9（/trains）
- **目标截图（同一批次 / 同一查询）**：
  - 筛选（含日期条）：`target_iteration_9_filter.png`
  - 车次表表头：`target_iteration_9_table_header.png`
  - 车次表首行：`target_iteration_9_table_row1.png`
- **复刻验证截图（修复后）**：
  - 筛选（含日期条）：`replica_iteration_9_filter_full_verify4.png`
  - 车次表表头：`replica_iteration_9_table_header_verify6.png`
  - 车次表首行：`replica_iteration_9_table_row1_verify7.png`

### 差异点（至少 5 处；缺失/多余 > 位置尺寸 > 颜色 > 其他）
1. **筛选日期条起始日期不一致** - 筛选区顶部日期快捷条 - **内容/结构**
   - 目标为从 01-19 开始；复刻此前包含 01-18（昨天），导致整体位移与视觉不一致。
2. **筛选日期条“未选中”底色/边框质感不一致** - 日期快捷条 - **颜色/视觉效果**
   - 目标为浅灰渐变底 + 细边框；复刻此前为纯白底，缺少“灰渐变按钮条”的质感。
3. **筛选区席别选项缺失** - “车次席别”行 - **缺失元素**
   - 目标包含“优选一等座”；复刻此前缺失该项。
4. **车次表表头列宽不一致** - 表头蓝色条 - **尺寸/对齐**
   - 目标列宽为固定 16 列（table width=1188），其中大量席别列为 66px，最后“备注”为 108px；复刻此前使用了“经验列宽”，导致列分隔线与文字对齐偏移。
5. **车次表数据行缺少竖向分隔线** - 首行各列之间 - **视觉效果**
   - 目标行内有浅色竖向分隔线；复刻此前仅有横向分隔线，整体“表格感”不足。
6. **首行站名样式被全局样式污染（异常红字）** - 首行“出发站/到达站” - **样式覆盖**
   - 复刻曾被其他页面的全局 `.station-name`（红色/超大字号）覆盖，导致站名异常；目标为 12px 黑色加粗并带“始/终”背景 icon。
7. **首行“预订”按钮位置/角标细节不一致** - 首行右侧按钮 - **位置/视觉效果**
   - 目标按钮宽 72、高 30、右侧留白且右上角有橙色角标；复刻此前按钮贴边且缺少右侧留白与竖分隔线配合的“收口”。

### 从目标页面提取的信息（用于精确对齐）
- **表头列宽（table width=1188）**：`90 / 100 / 82 / 82 / 66×11 / 108`
- **站名 strong（icon + padding）**：
  - `strong.start-s`: `width=100`, `height=18`, `padding-left=18`, `background-position: 0 -546`
  - `strong.end-s`: `width=100`, `height=18`, `padding-left=18`, `background-position: 0 -496`
- **预订按钮（.btn72）**：
  - `width=72`, `height=30`, `border-radius=4`, `background: bg_btn.png repeat-x (0 -250)`

### 修复内容
- **修改文件**
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.tsx`
  - `frontend/src/components/TrainFilterPanel/TrainFilterPanel.css`
  - `frontend/src/components/TrainList/TrainList.tsx`
  - `frontend/src/components/TrainList/TrainList.css`
- **已修复/优化**
  - 日期条改为从“今天”开始（不再包含 01-18），并补齐未选中态灰渐变底/边框质感
  - 席别补齐“优选一等座”
  - 表头列宽改为目标站实测的 16 列固定宽度（与 1188px table 宽一致）
  - 首行添加浅色竖向分隔线，增强表格感
  - 修复全局样式重名覆盖：`TrainList` 内将通用 class 替换为 `trainList-*` 前缀（避免 `.station-name` 污染）
  - 备注列增加右侧 padding，使“预订”按钮与目标视觉更接近

### 验证结果
- **部分修复（明显接近）**：筛选日期条起始日期/灰渐变质感已贴近；表头列宽与分隔线对齐明显提升；首行站名不再被全局污染，且“始/终” icon 位置与目标一致。
- **剩余问题**：表头排序三角图标仍与目标的橙色/位置细节有差异；个别筛选行（车次席别）的换行策略与目标仍略不同，可在下一轮继续微调。
