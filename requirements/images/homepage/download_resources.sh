#!/bin/bash

# 首页图片资源下载脚本
# 自动生成时间: 2026-01-15

BASE_URL="http://localhost:5173"
OUTPUT_DIR="."

echo "开始下载首页图片资源..."

# 1. Logo（顶部导航）
echo "下载 Logo..."
curl -s "${BASE_URL}/images/logo.png" -o "${OUTPUT_DIR}/首页-顶部导航-Logo.png"

# 2. 搜索图标
echo "下载搜索图标..."
curl -s "${BASE_URL}/images/search.svg" -o "${OUTPUT_DIR}/首页-顶部导航-搜索图标.svg"

# 3. 快捷服务入口（中部大图）
echo "下载快捷服务入口图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5%E4%B8%AD%E9%83%A8.png" -o "${OUTPUT_DIR}/首页-快捷服务入口.png"

# 4. 宣传推广区域 - 会员服务
echo "下载会员服务图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5-%E4%BC%9A%E5%91%98%E6%9C%8D%E5%8A%A1-%E5%B7%A6%E4%B8%8A.jpg" -o "${OUTPUT_DIR}/首页-宣传推广-会员服务.jpg"

# 5. 宣传推广区域 - 餐饮特产
echo "下载餐饮特产图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5-%E9%A4%90%E9%A5%AE%E7%89%B9%E4%BA%A7-%E5%8F%B3%E4%B8%8A.jpg" -o "${OUTPUT_DIR}/首页-宣传推广-餐饮特产.jpg"

# 6. 宣传推广区域 - 铁路保险
echo "下载铁路保险图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5-%E9%93%81%E8%B7%AF%E4%BF%9D%E9%99%A9-%E5%B7%A6%E4%B8%8B.jpg" -o "${OUTPUT_DIR}/首页-宣传推广-铁路保险.jpg"

# 7. 宣传推广区域 - 计次定期票
echo "下载计次定期票图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5-%E8%AE%A1%E6%AC%A1%E5%AE%9A%E6%9C%9F%E7%A5%A8-%E5%8F%B3%E4%B8%8B.png" -o "${OUTPUT_DIR}/首页-宣传推广-计次定期票.png"

# 8. 底部发布信息图片
echo "下载底部发布信息图片..."
curl -s "${BASE_URL}/images/%E9%A6%96%E9%A1%B5-%E5%BA%95%E9%83%A8%E5%8F%91%E5%B8%83.png" -o "${OUTPUT_DIR}/首页-底部发布信息.png"

# 9. 友情链接 - 中国国家铁路集团
echo "下载友情链接 - 中国国家铁路集团Logo..."
curl -s "${BASE_URL}/images/%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5-%E5%B7%A6%E4%B8%8A.png" -o "${OUTPUT_DIR}/首页-底部导航-中国国家铁路集团Logo.png"

# 10. 友情链接 - 中国铁路客户保险总公司
echo "下载友情链接 - 中国铁路客户保险总公司Logo..."
curl -s "${BASE_URL}/images/%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5-%E5%8F%B3%E4%B8%8A.png" -o "${OUTPUT_DIR}/首页-底部导航-中国铁路客户保险Logo.png"

# 11. 友情链接 - 中铁银通支付
echo "下载友情链接 - 中铁银通支付Logo..."
curl -s "${BASE_URL}/images/%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5-%E5%B7%A6%E4%B8%8B.png" -o "${OUTPUT_DIR}/首页-底部导航-中铁银通支付Logo.png"

# 12. 友情链接 - 中铁程科技
echo "下载友情链接 - 中铁程科技Logo..."
curl -s "${BASE_URL}/images/%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5-%E5%8F%B3%E4%B8%8B.png" -o "${OUTPUT_DIR}/首页-底部导航-中铁程科技Logo.png"

# 13. 二维码 - 中国铁路官方微信
echo "下载中国铁路官方微信二维码..."
curl -s "${BASE_URL}/images/%E4%B8%AD%E5%9B%BD%E9%93%81%E8%B7%AF%E5%AE%98%E6%96%B9%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png" -o "${OUTPUT_DIR}/首页-底部导航-中国铁路官方微信二维码.png"

# 14. 二维码 - 中国铁路官方微博
echo "下载中国铁路官方微博二维码..."
curl -s "${BASE_URL}/images/%E4%B8%AD%E5%9B%BD%E9%93%81%E8%B7%AF%E5%AE%98%E6%96%B9%E5%BE%AE%E5%8D%9A%E4%BA%8C%E7%BB%B4%E7%A0%81.png" -o "${OUTPUT_DIR}/首页-底部导航-中国铁路官方微博二维码.png"

# 15. 二维码 - 12306公众号
echo "下载12306公众号二维码..."
curl -s "${BASE_URL}/images/12306%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png" -o "${OUTPUT_DIR}/首页-底部导航-12306公众号二维码.png"

# 16. 二维码 - 铁路12306
echo "下载铁路12306二维码..."
curl -s "${BASE_URL}/images/%E9%93%81%E8%B7%AF12306%E4%BA%8C%E7%BB%B4%E7%A0%81.png" -o "${OUTPUT_DIR}/首页-底部导航-铁路12306二维码.png"

echo "所有图片资源下载完成！"
