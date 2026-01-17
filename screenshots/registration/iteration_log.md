# UI 调整迭代日志

## Iteration 1
- **差异点**（从 `target_image.png` vs `replica_page_iteration_1_verify.png` 纯视觉对比）：
  1. **顶部右侧登录区**：目标为“您好，请 登录 注册”文字+链接；复刻页此前为两个按钮，已改为文字/链接样式，但字体/间距仍与目标略有差异（右上角区域）。
  2. **顶部 Logo 区域**：目标为单一 Logo（无额外中文/英文双行标题）；复刻页使用主页组件，仍包含“12306 CHINA RAILWAY”等附加文字（左上角区域）。
  3. **蓝色导航栏下拉箭头**：目标为小号下拉符号（chevron 形态）；复刻页使用 CSS 三角形模拟，形态/位置仍有细微差异（导航栏各菜单项右侧）。
  4. **表单卡片背景与白底覆盖**：目标卡片内部为纯白内容区，外层为蓝色描边与轻微纹理；复刻页已引入 `bg.png` 并用白底覆盖内容区，但边缘纹理露出/留白与目标仍略不同（表单卡片区域）。
  5. **字段排版细节**：目标标签文字有固定空格排版（如“用 户 名”“登 录 密 码”），提示语为橙色并对齐在输入框右侧；复刻页已调整主要标签与提示颜色，但局部对齐与行间距仍有差异（表单各行右侧提示区域）。
  6. **下拉选项内容**：目标“优惠（待）类型”包含“残疾军人”，手机区号下拉包含港/澳/台；复刻页此前缺失，已补齐（表单下半部分区域）。

- **从目标参考图/目标站点提取的信息（用于修复）**：
  - **注册卡片外框**：宽约 980px、蓝色边框、背景纹理 `bg.png`。
  - **“下一步”按钮**：122×30，白字，背景图 `bg_btn.png`（repeat-x）。
  - **“优惠（待）类型”选项**：成人 / 儿童 / 学生 / 残疾军人。
  - **手机号区号选项**：+86 中国 / +852 中国香港 / +853 中国澳门 / +886 中国台湾。

- **修复内容**：
  - **修改文件**：
    - `frontend/src/pages/RegistrationPage.tsx`
    - `frontend/src/pages/RegistrationPage.css`
    - `frontend/src/components/RegistrationForm/RegistrationForm.tsx`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
    - `frontend/src/components/SecondaryNav/SecondaryNav.tsx`
    - `frontend/src/components/SecondaryNav/SecondaryNav.css`
    - `frontend/src/components/HomeTopBar/HomeTopBar.tsx`
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
  - **新增资源**：
    - `frontend/public/images/registration/bg.png`
    - `frontend/public/images/registration/bg_btn.png`
  - **修复的差异点**（本轮主要修复）：
    - 注册页顶部栏/导航栏替换为主页同款（结构对齐）。
    - 表单卡片引入目标站点背景纹理与蓝色描边，按钮换为目标背景图按钮。
    - 标签空格排版、提示语颜色/文本、下拉选项与手机号区号补齐。
    - 导航栏下拉箭头由“▼文本”替换为 CSS 三角形（更接近目标）。
    - 面包屑宽度与居中对齐调整。

- **验证结果**：部分修复（整体结构与表单风格已接近，仍存在顶部 Logo/间距、导航箭头细节、表单卡片留白的差异）
- **本轮截图**：
  - `replica_page_iteration_1.png`
  - `replica_page_iteration_1_verify.png`
  - `target_image.png`

## Iteration 2（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_2.png`
  - 修复后验证：`replica_page_iteration_2_verify.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_2.png` 纯视觉对比，≥5）：
  1. **登录密码 placeholder 文案**：目标为“6-20位字母、数字或符号”，复刻为“6-20位字母、数字或下划线”（表单第 2 行输入框）。
  2. **密码强度区域缺失/样式不一致**：目标在密码输入框右侧显示“密码强度”与 3 段条形指示器（首段红、其余灰），复刻无“密码强度”文字且条形高度/圆角/颜色不同（表单第 2 行右侧）。
  3. **提示语橙色不一致**：目标提示语为更“偏红”的橙色，复刻橙色偏黄（如用户名提示、姓名/证件提示、手机提示等，表单右侧提示区域）。
  4. **中间虚线分隔缺失**：目标在“优惠（待）类型”与“邮箱”之间有一条浅灰虚线，复刻缺失（表单中部区域）。
  5. **下拉框箭头形态不一致**：目标为浏览器原生下拉箭头样式，复刻为自绘黑色三角箭头（证件类型/优惠类型/区号下拉）。
  6. **输入框尺寸/密度不一致**：目标输入框视觉更“扁平紧凑”（内容区更矮），复刻输入框略高/略宽（用户名/密码/确认密码等输入框）。
  7. **勾选协议行字号/复选框尺寸不一致**：目标复选框更小（约 13×13）且文字为 12px 黑色，复刻复选框偏大且文字偏灰偏大（协议行）。

- **从原网站提取的信息**（用于精确对齐样式）：
  - **提示语颜色**：`rgb(255, 127, 0)`（约 `#ff7f00`）
  - **输入框**：`width: 195px; height: 18px; padding: 5px 0 5px 5px; border: 1px solid #cfcdb7; border-radius: 0`
  - **标签列宽**：约 `375px`，右对齐，`font: 12px Tahoma, 宋体; line-height: 30px`
  - **密码强度条（默认“弱”态）**：
    - 3 段：每段 `40×6`，段间距 `1px`
    - 颜色：首段 `#ff0000`，其余 `#999999`
  - **分隔线**：`height: 1px; border-top: 1px dashed #DEDEDE; margin: 15px 0`
  - **复选框尺寸**：`13×13`，右侧外边距约 `4px`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/RegistrationForm/RegistrationForm.tsx`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
  - **修复的差异点**：
    - 密码 placeholder 文案对齐为“符号”
    - 补齐“密码强度”文字与 40×6 三段强度条（默认显示首段红）
    - 提示语橙色对齐为 `#ff7f00`
    - 补齐中间虚线分隔线
    - 下拉框改为原生箭头样式（移除自绘三角）
    - 输入框与协议行字号/复选框尺寸按原站点对齐

- **验证结果**：已明显接近（`replica_page_iteration_2_verify.png` 中密码强度/虚线分隔/提示色/输入框密度与目标更一致；仍可继续微调表单整体留白与顶部区域细节）

# UI 调整迭代日志

## 初始准备 (Initial Setup)

- **目标参考图片**: `target_image.png`（项目根目录）
- **目标页面**: `https://kyfw.12306.cn/otn/resources/login.html`
- **复刻页面**: `http://localhost:5174/login`
- **说明**: 背景图为轮播（每次截图可能不同），**轮播内容差异不需要修复**。

---

## Iteration 3（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_3.png`
  - 修复后验证：`replica_page_iteration_3_verify.png`

- **差异点（基于截图对比，≥5）**：
  1. 面包屑“您现在的位置…”区域：target 文字为黑色、垂直居中且紧贴注册面板上边缘；复刻在面包屑文字颜色偏灰、上方留白更大且与面板之间存在额外间距 - 页面中上部面包屑区域
  2. 注册面板标题条“账户信息”：target 标题字重偏常规、标题条视觉更贴近原站样式；复刻标题更“粗/重”观感 - 注册面板顶部标题条
  3. 表单行纵向间距：target 每行更紧凑；复刻每行之间间距偏大导致整体表单更“松” - 注册面板表单区域（从“用户名”到“手机号码”）
  4. “密码强度”提示：target 的“密码强度”文字与红/灰强度条的组合更紧凑；复刻该区域的内间距略不一致 - “登录密码”行右侧强度指示区域
  5. 多处橙色提示文本的垂直对齐：target 中橙色提示更贴近对应输入框垂直居中；复刻部分提示相对输入框有轻微上下偏移 - “姓名/证件号码/手机号码”行右侧提示区域

- **从原网站提取的信息**（用于精确对齐样式）：
  - 面包屑 `.crumbs`：`height: 32px; line-height: 32px; padding: 0; margin: 0; color: rgb(0,0,0); font-size: 12px`
  - 表单行（对应 `li`）：`margin-bottom: 5px; height: 30px`
  - 注册面板 `.layout.reg`：`width: 980px; border: 1px solid rgb(22, 120, 190); border-radius: 5px 5px 0 0; background-image: url(.../bg.png)`
  - “下一步”按钮：`width: 122px; height: 30px; background-repeat: repeat-x; background-image: url(.../bg_btn.png); border-radius: 4px; font-size: 12px`

- **修复内容**：
  - 修改文件：
    - `frontend/src/pages/RegistrationPage.css`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
  - 关键调整：
    - 面包屑：改为 `height: 32px; line-height: 32px; padding: 0; color: #000; margin-bottom: 0`，消除与面板之间的额外空隙
    - 标题条：将“账户信息”字重调整为更接近原站的常规（`font-weight: 400`）
    - 表单行间距：将 `.form-row` 的 `margin-bottom` 从 `10px` 调整为 `5px`，匹配原站紧凑度

- **验证结果**：
  - 使用 `replica_page_iteration_3_verify.png` 对比 `target_image.png`：面包屑高度/颜色与面板贴合关系明显更接近目标；表单纵向紧凑度改善；仍有少量细节差异集中在橙色提示文本的轻微垂直对齐与“密码强度”区域的观感细节。
## Iteration 4（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_4.png`
  - 修复后验证：`replica_page_iteration_4_verify.png`（由 `replica_page_iteration_4_after_patch3.png` 固化）

- **差异点**（从 `target_image.png` vs `replica_page_iteration_4.png` 纯视觉对比，≥5）：
  1. **注册面板内容区左右内边距**：目标内容区左右有明显“缩进”，复刻内容更贴边（注册面板内部白底内容区）。
  2. **中间虚线分隔线宽度/左右缩进**：目标分隔线两侧不贴边、与内容对齐；复刻分隔线更接近全宽（表单中部虚线区域）。
  3. **标题条圆角观感**：目标标题条自身不额外“圆角突出”，圆角由外框承担；复刻标题条圆角更明显（注册面板顶部标题条）。
  4. **标题条垂直居中（line-height）**：目标标题文字更居中；复刻文字略偏上/偏下（“账户信息”标题文字区域）。
  5. **“下一步”按钮水平留白**：目标按钮左右有固定外边距（按钮不会“贴边”）；复刻按钮留白不同（注册面板底部按钮区域）。
  6. **注册面板底部留白/面板高度**：目标面板整体更紧凑；复刻底部留白偏大（注册面板底部、按钮上下空白区域）。

- **从原网站提取的信息**（用于精确对齐样式）：
  - 注册面板外框 `.layout.reg`：`width: 980px; border: 1px solid #1678be; border-radius: 5px 5px 0 0`
  - 标题条 `.lay-hd`：`height: 32px; line-height: 32px; padding-left: 20px`
  - 内容区 `.lay-bd`：`padding: 0 10px`
  - 标签列 `.label`：`width: 375px; padding-right: 5px; text-align: right; line-height: 30px`
  - 分隔线：`height: 1px; border-top: 1px dashed #DEDEDE; margin: 15px 0`（且随内容区左右缩进）
  - “下一步”按钮：`width: 122px; height: 30px; margin: 0 10px; display: inline-block`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
  - **修复的差异点**：
    - 内容区内边距对齐为左右 `10px`，带动分隔线与内容对齐
    - 标题条 line-height 对齐为 `32px`，并移除标题条自身圆角（由外框圆角呈现）
    - “下一步”按钮按原站补齐 `margin: 0 10px`
    - 调整表单 padding，压缩面板整体高度（更接近目标图的紧凑程度）

- **验证结果**：
  - 使用 `replica_page_iteration_4_verify.png` 对比 `target_image.png`：注册面板的内容区缩进、虚线分隔、标题条居中与按钮留白已明显更接近目标；仍可能存在少量细节差异（例如页面整体上下留白的像素级差异），可在下一轮继续微调。

## Iteration 5（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_5.png`
  - 修复后验证：
    - `replica_page_iteration_5_after_patch1.png`
    - `replica_page_iteration_5_after_patch2.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_5.png` 纯视觉对比，≥5；优先关注多余/缺失元素）：
  1. **“登录密码”右侧提示文字多余**：目标仅显示红/灰强度条；复刻多出灰色“密码强度”文字（表单第 2 行右侧）。
  2. **顶部右侧分隔符间距不一致**：目标 `|` 分隔更紧凑；复刻各项之间留白更大导致视觉更“松”（页面右上角链接区）。
  3. **顶部右侧下拉箭头缺失**：目标在 `English` 与 `我的12306` 后各有一个小下拉箭头；复刻最初缺失（页面右上角链接区）。
  4. **顶部整体高度导致面包屑位置偏移**：目标面包屑区域更靠上、与导航条贴合更紧；复刻顶部区域略高导致面包屑整体下移（导航条下方“您现在的位置…”区域）。
  5. **底部资源/布局轻微不一致**：未传入注册页 `pageType` 时底部可能使用登录页资源，导致二维码/友情链接块的对齐观感偏差（页面底部二维码与友情链接区域）。

- **从原网站提取的信息**（用于精确对齐样式/布局）：
  - 顶部导航条（`.nav-box`）：`height: 40px`，背景色 `rgb(59, 153, 252)`
  - 面包屑（`.crumbs`）：`top ≈ 120px`，`height: 32px; line-height: 32px; font-size: 12px; color: rgb(0,0,0); width: 980px`
  - 顶部右侧菜单分隔符：DOM 内为独立的 `|` 列表项（视觉上更紧凑）
  - 页面内**无**“密码强度”文字（仅强度条形指示器）

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/RegistrationForm/RegistrationForm.tsx`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
    - `frontend/src/components/HomeTopBar/HomeTopBar.tsx`
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
    - `frontend/src/pages/RegistrationPage.tsx`
  - **修复的差异点**：
    - 移除表单中的可见“密码强度”文字（仅保留强度条形）
    - 顶部栏高度对齐（84 → 80），缩小顶部右侧 `|` 分隔间距
    - 补齐 `English / 我的12306` 后的小下拉箭头
    - 注册页底部传入 `pageType=\"registration\"`，使用注册页资源与布局配置

- **验证结果**：
  - 使用 `replica_page_iteration_5_after_patch2.png` 对比 `target_image.png`：顶部右侧箭头与分隔紧凑度更接近，表单“密码强度”多余文字已消除，整体布局（含面包屑与底部区域）更贴近目标；仍可继续做像素级微调（如导航项间距/字体抗锯齿带来的细微差异）。

## Iteration 6（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_6.png`
  - 修复后验证：
    - `replica_page_iteration_6_after_patch1.png`
    - `replica_page_iteration_6_after_patch2.png`
    - `replica_page_iteration_6_after_patch3.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_6.png` 纯视觉对比，≥5；优先缺失/多余元素）：
  1. **二级导航下拉箭头形态/间距**：目标为更小更紧凑的下拉箭头；复刻箭头偏大、与文字间距偏大（蓝色导航栏各菜单项右侧）。
  2. **面包屑结构与链接样式**：目标为“客运首页 > 注册”均为黑色无下划线链接样式；复刻“注册”不是链接/或链接样式不同（蓝色导航栏下方 32px 高的面包屑区域）。
  3. **顶部搜索框细节**：目标搜索按钮为 30×30 蓝色方块且输入框更扁平（12px 字号、边框更接近 #cfcdb7）；复刻搜索框圆角/字号/按钮尺寸有差异（页头中间搜索区域）。
  4. **邮箱标签文本排版**：目标邮箱标签为“邮    箱：”带固定空格排版；复刻为“邮箱：”或空格不足（表单下半部分“邮箱”行左侧）。
  5. **底部灰条右侧“无障碍服务”Logo**：目标在灰条右侧存在该 Logo；复刻曾被误删（页面最底部灰色版权区右侧）。

- **从原网站提取的信息**（用于精确对齐）：
  - 导航下拉箭头：`<i class="icon icon-down">`，`font-size: 12px; margin-left: 4px; line-height: 40px; color: #fff`
  - 搜索按钮：`30×30`，背景色 `rgb(59, 153, 252)`
  - 面包屑 `.crumbs`：`height: 32px; line-height: 32px; font-size: 12px; color: rgb(0,0,0)`，链接颜色 `rgb(51,51,51)` 且无下划线
  - 邮箱标签：文本为 `邮    箱：`（包含空格）

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/SecondaryNav/SecondaryNav.css`
    - `frontend/src/pages/RegistrationPage.tsx`
    - `frontend/src/pages/RegistrationPage.css`
    - `frontend/src/components/RegistrationForm/RegistrationForm.tsx`
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
    - `frontend/src/components/BottomNavigation/BottomNavigation.tsx`
  - **修复的差异点**：
    - 二级导航下拉箭头尺寸/间距调整（更接近目标紧凑度）
    - 面包屑结构改为 `客运首页 > 注册`，且链接样式改为黑色无下划线
    - 顶部搜索框按原站更扁平的输入框样式与 30×30 搜索按钮对齐
    - 邮箱标签改为“邮    箱：”
    - 恢复底部灰条右侧“无障碍服务”Logo（此前误删，已恢复）

- **验证结果**：部分修复（导航箭头/面包屑/邮箱标签/搜索框更接近；后续仍可继续对齐导航项间距、表单细节与底部灰条的像素级差异）

## Iteration 7（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_7.png`
  - 修复后验证：`replica_page_iteration_7_after_patch1.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_7.png` 纯视觉对比，≥5；按优先级：缺失/多余 > 位置/尺寸 > 颜色 > 其他）：
  1. **顶部搜索框尺寸/边框**：目标搜索框更“扁平”，输入框有浅灰边框且按钮为 30×30 蓝色方块；复刻搜索输入框高度偏小、边框观感不一致（页头中间搜索区域）。
  2. **顶部内容整体左右缩进**：目标顶栏内容在页面中居中，左右留白更大；复刻顶栏更“铺满”，整体偏散（页头整体区域）。
  3. **二级导航菜单项布局**：目标蓝色导航条每个菜单项点击区等宽、间距均匀；复刻为不等宽文字链接，分布更靠左且不均匀（蓝色导航条区域）。
  4. **二级导航字号/观感**：目标导航文字更“细/小”；复刻导航文字观感略大（蓝色导航条文字区域）。
  5. **表单下拉框边框深浅**：目标下拉框边框更深（对比输入框更明显）；复刻下拉框边框偏浅，与输入框近似（证件类型/优惠类型等下拉框）。

- **从原网站提取的信息**（用于精确对齐，本轮重点）：
  - 顶部/导航通用居中容器：`max-width ≈ 1190px`（1512 宽视口下左右外边距约 161px）
  - 顶部搜索输入框：`width: 350px; height: 30px; padding: 4px 10px; border: 1px solid rgb(239,239,239); font-size: 14px; line-height: 20px`
  - 搜索按钮：`30×30`，背景色 `rgb(59,153,252)`
  - 二级导航条：`height: 40px; background: rgb(59,153,252)`；每个一级菜单点击区宽度约 `145px`
  - 表单输入框边框：`rgb(207,205,199)`；下拉框边框：`rgb(118,118,118)`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
    - `frontend/src/components/SecondaryNav/SecondaryNav.css`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
  - **修复的差异点**：
    - 顶部栏改为 `1190px` 居中容器，收敛左右间距（更接近目标顶栏留白）
    - 搜索框按原站对齐为 `350×30` 输入 + `30×30` 按钮，补齐浅灰边框与字号/行高
    - 二级导航容器对齐为 `1190px`，菜单项改为 `145px` 等宽点击区并居中显示
    - 表单输入框/下拉框边框颜色对齐（输入框 `#cfcdc7`，下拉框 `#767676`），并补齐输入框 `box-sizing: content-box` 以匹配外观尺寸

- **验证结果**：
  - 使用 `replica_page_iteration_7_after_patch1.png` 对比 `target_image.png`：顶栏整体左右留白与搜索框形态明显更接近；二级导航菜单项分布改为等宽后观感更一致；仍可在下一轮继续微调导航下拉箭头形态/字号与个别控件细节。

## Iteration 8（注册页 /register）

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_8.png`
  - 修复后验证：
    - `replica_page_iteration_8_after_patch1.png`
    - `replica_page_iteration_8_after_patch2.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_8.png` 纯视觉对比，≥5；按优先级：缺失/多余 > 位置/尺寸 > 颜色 > 其他）：
  1. **顶部栏右侧链接区**：目标右侧链接整体更“紧凑”且字号更小；复刻右侧链接字号偏大、分隔符颜色/间距不一致（页面右上角）。
  2. **顶部栏右侧“登录/注册”颜色与间距**：目标“登录/注册”为更深蓝色且注册与登录之间有固定间距；复刻颜色/间距不一致（页面右上角）。
  3. **二级导航下拉箭头形态**：目标为更小、更贴近文字基线的下拉箭头；复刻箭头形态/占位不一致（蓝色导航条各带下拉项）。
  4. **表单提示文字与输入框的间距**：目标提示（橙色 tips）与输入框之间间隔更紧；复刻提示与输入框之间偏宽（表单各行右侧提示区域）。
  5. **手机号行组合控件对齐**：目标区号下拉宽度更接近 108px、手机号输入更窄，右侧提示起始对齐线更靠左；复刻手机号输入偏宽导致提示起始位置偏右（表单“手机号码”行）。

- **从原网站提取的信息**（用于精确对齐）：
  - 顶部右侧链接（无障碍/敬老版/English/我的12306）：
    - `font-size: 12px; line-height: 40px`
    - 分隔符 `|`：颜色 `rgb(172,209,249)`（约 `#acd1f9`），并有固定水平间距（原站列表项 margin-left 约 10px）
    - “登录/注册”链接色：`rgb(0,119,255)`（约 `#0077ff`），且“注册”有 `margin-left: 10px`
  - 二级导航条（原站 `.nav-box/.nav`）：
    - 高度 `40px`，背景 `rgb(59,153,252)`
    - 一级菜单点击区：`145px` 等宽
    - 下拉箭头：`font-size: 12px; margin-left: 4px; line-height: 40px`（占满 40px 高）
  - 表单提示（原站 `.tips`）：
    - `margin-left: 8px; line-height: 30px; font-size: 12px; color: rgb(255,127,0)`
  - 手机号行（原站）：
    - 区号下拉宽约 `108px`
    - 手机号输入内容宽约 `84px`（padding 后视觉宽约 `91px`）

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
    - `frontend/src/components/SecondaryNav/SecondaryNav.css`
    - `frontend/src/components/RegistrationForm/RegistrationForm.css`
  - **修复的差异点**：
    - 顶部右侧链接区：字号/行高/分隔符颜色与间距、登录注册颜色对齐到原站
    - 二级导航下拉箭头：改为“40px 高占位 + 内部小三角”的盒模型，贴近原站 icon-down 的视觉占位
    - 表单提示与输入：将 wrapper `gap` 调整为 8px（贴近原站 tips margin-left）
    - 手机号行：区号下拉宽度/间距/手机号输入宽度对齐，右侧提示起始线更接近原站

- **验证结果**：
  - 使用 `replica_page_iteration_8_after_patch2.png` 对比 `target_image.png`：顶部右侧链接区的字号/行高/分隔符与登录注册色更接近目标；导航箭头占位与位置更贴近；表单提示与输入的间距更紧凑，手机号行提示起始位置更接近目标。
  - **剩余可迭代点**（若继续迭代）：顶部 Logo 区的文字细节、导航箭头“形状”细微差异、以及表单局部字体渲染/抗锯齿造成的像素级差异。

## Iteration 9（注册页 /register）— 顶部栏 / 导航栏精修

- **截图**：
  - 对比基准：`target_image.png`
  - 复刻本轮截图：`replica_page_iteration_9.png`
  - 修复后验证（顶部栏/导航栏视口截图）：
    - `replica_page_iteration_9_after_patch1_header_nav.png`
    - `replica_page_iteration_9_after_patch3_header_nav.png`

- **差异点**（从 `target_image.png` vs `replica_page_iteration_9.png` 纯视觉对比，≥5；按优先级：缺失/多余 > 位置/尺寸 > 颜色 > 其他）：
  1. **顶部右侧下拉小箭头（English / 我的12306）形态**：目标箭头更大、更“粗”且与文字间距更紧；复刻箭头偏小且更“尖”（页面右上角链接区）。
  2. **二级导航各菜单项宽度分布**：目标各项宽度并非全等（中后段更宽），复刻此前全部等宽导致各菜单项的分割位置与目标不一致（蓝色导航条）。
  3. **二级导航下拉箭头形态**：目标下拉箭头更像细小的 “V/chevron”，复刻箭头形状/粗细与目标不一致（蓝色导航条各带下拉项右侧）。
  4. **顶部搜索框水平位置**：目标搜索框相对 logo 更靠右一些；复刻搜索框整体略偏左（页面顶部中间搜索区域）。
  5. **顶部右侧链接区整体分布**：目标右侧链接区更贴近右侧但仍保持 1190 容器内对齐；复刻右侧链接区整体起始位置略偏左/右（页面右上角链接区整体）。

- **从原网站提取的信息**（用于精确对齐）：
  - 顶部右侧链接（English / 我的12306）：
    - `font-size: 12px; line-height: 40px`
    - 下拉箭头 `.caret`：`width: 10px; height: 5px; margin-left: 5px; border-top: 5px solid rgb(172,209,249)`
  - 二级导航（原站 `.nav`）：
    - 高度 `40px`，背景 `rgb(59,153,252)`
    - 一级菜单点击区宽度：`145px`（前两个）与 `150px`（后六个），总和 `1190px`
    - 下拉箭头：`<i class="icon icon-down">`，`font-size: 12px; margin-left: 4px; line-height: 40px`

- **修复内容**：
  - **修改文件**：
    - `frontend/src/components/HomeTopBar/HomeTopBar.css`
    - `frontend/src/components/SecondaryNav/SecondaryNav.css`
  - **修复的差异点**：
    - 顶部右侧下拉箭头（English / 我的12306）：改为与原站 `.caret` 一致的 10×5 三角形（border 方案），并对齐 margin-left
    - 二级导航：将菜单项宽度调整为（145×2 + 150×6），使 8 项合计宽度=1190px，分割位置更贴近目标
    - 二级导航下拉箭头：改为更接近 “V/chevron” 的细线形状（匹配 icon-down 的视觉效果）
    - 顶部搜索框：通过 `margin-left` 小步迭代右移，贴近目标站搜索框水平位置

- **验证结果**：
  - 使用 `replica_page_iteration_9_after_patch3_header_nav.png` 对比 `target_image.png`：顶部右侧箭头形态与二级导航的分割位置更接近目标，导航下拉箭头更贴近目标 “V” 形态，搜索框水平位置差异显著缩小。
  - **剩余可迭代点**（若继续迭代）：搜索框水平位置仍可能存在 1–4px 的差异，导航箭头与字体抗锯齿导致的像素级差异可在下一轮继续微调。
