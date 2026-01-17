#!/bin/bash

# 订单填写页图片资源下载脚本
# 生成时间: 2026-01-17

BASE_URL="http://localhost:5173"
OUTPUT_DIR="requirements/images/order-fill"

echo "🚀 开始下载订单填写页图片资源..."

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 下载订单页特有图片（保险广告）
echo "📥 下载保险广告图片..."
curl -s "${BASE_URL}/images/order.jpg" -o "$OUTPUT_DIR/order-fill-保险广告.jpg"

# 检查下载结果
if [ -f "$OUTPUT_DIR/order-fill-保险广告.jpg" ]; then
  SIZE=$(du -h "$OUTPUT_DIR/order-fill-保险广告.jpg" | cut -f1)
  echo "✅ order-fill-保险广告.jpg (${SIZE})"
else
  echo "❌ 下载失败: order-fill-保险广告.jpg"
fi

echo ""
echo "📋 资源下载完成！"
echo ""
echo "ℹ️  注意：以下资源可复用首页资源，无需重复下载："
echo "   - Logo: requirements/images/logo.png"
echo "   - 搜索图标: requirements/images/search.svg"
echo "   - 友情链接（4张）: requirements/images/友情链接-*.png"
echo "   - 二维码（4张）: requirements/images/*二维码.png"
