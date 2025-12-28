const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Disable SSL certificate validation for downloading public resources
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Resources to download based on requirements
const resources = [
  // Logo (顶部导航)
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/logo.png',
    filename: '登录页面-顶部导航-12306Logo.png',
    category: 'logo',
    naturalWidth: null,
    naturalHeight: null,
    displayWidth: 200,
    displayHeight: 50,
    cssStrategy: 'background-image'
  },
  
  // 背景图片 (主内容区域, 2张)
  {
    url: 'https://www.12306.cn/index/images/pic/banner-login-20200924.jpg',
    filename: '登录页面-主内容区-背景图1.jpg',
    category: 'background',
    naturalWidth: null,
    naturalHeight: null,
    displayWidth: 1497,
    displayHeight: 600,
    cssStrategy: 'background-image, background-position: 50% 50%, background-repeat: no-repeat'
  },
  {
    url: 'https://www.12306.cn/index/images/pic/banner-login-20200629.jpg',
    filename: '登录页面-主内容区-背景图2.jpg',
    category: 'background',
    naturalWidth: null,
    naturalHeight: null,
    displayWidth: 1497,
    displayHeight: 600,
    cssStrategy: 'background-image, background-position: 50% 50%, background-repeat: no-repeat'
  },
  
  // 友情链接 (4个)
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/link05.png',
    filename: '登录页面-底部导航-中国国家铁路集团logo.png',
    category: 'partner-logo',
    naturalWidth: 300,
    naturalHeight: 51,
    displayWidth: 200,
    displayHeight: 34,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/link02.png',
    filename: '登录页面-底部导航-中国铁路财产保险logo.png',
    category: 'partner-logo',
    naturalWidth: 400,
    naturalHeight: 68,
    displayWidth: 200,
    displayHeight: 34,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/link03.png',
    filename: '登录页面-底部导航-中国铁路95306网logo.png',
    category: 'partner-logo',
    naturalWidth: 800,
    naturalHeight: 136,
    displayWidth: 200,
    displayHeight: 34,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/link04.png',
    filename: '登录页面-底部导航-中铁快运logo.png',
    category: 'partner-logo',
    naturalWidth: 400,
    naturalHeight: 68,
    displayWidth: 200,
    displayHeight: 34,
    cssStrategy: 'img tag, object-fit: contain'
  },
  
  // 二维码 (4个)
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/zgtlwb.png',
    filename: '登录页面-底部导航-中国铁路官方微信二维码.png',
    category: 'qrcode',
    naturalWidth: 344,
    naturalHeight: 344,
    displayWidth: 80,
    displayHeight: 80,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/zgtlwx.png',
    filename: '登录页面-底部导航-中国铁路官方微博二维码.png',
    category: 'qrcode',
    naturalWidth: 800,
    naturalHeight: 800,
    displayWidth: 80,
    displayHeight: 80,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/public.png',
    filename: '登录页面-底部导航-12306公众号二维码.png',
    category: 'qrcode',
    naturalWidth: 258,
    naturalHeight: 258,
    displayWidth: 80,
    displayHeight: 80,
    cssStrategy: 'img tag, object-fit: contain'
  },
  {
    url: 'https://kyfw.12306.cn/otn/resources/images/download.png',
    filename: '登录页面-底部导航-铁路12306二维码.png',
    category: 'qrcode',
    naturalWidth: 258,
    naturalHeight: 258,
    displayWidth: 80,
    displayHeight: 80,
    cssStrategy: 'img tag, object-fit: contain'
  }
];

const outputDir = path.join(__dirname, 'images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Download function
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(dest)}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlink(dest, () => {}); // Delete the file
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {}); // Delete the file
      reject(err);
    });
  });
}

// Main download process
async function downloadAll() {
  console.log('Starting resource download...\n');
  
  const metadata = {
    timestamp: new Date().toISOString(),
    resources: []
  };
  
  for (const resource of resources) {
    try {
      const destPath = path.join(outputDir, resource.filename);
      await downloadFile(resource.url, destPath);
      
      // Add to metadata
      metadata.resources.push({
        filename: resource.filename,
        originalUrl: resource.url,
        category: resource.category,
        dimensions: {
          natural: {
            width: resource.naturalWidth,
            height: resource.naturalHeight
          },
          display: {
            width: resource.displayWidth,
            height: resource.displayHeight
          },
          scale: resource.naturalWidth && resource.displayWidth 
            ? (resource.displayWidth / resource.naturalWidth).toFixed(2)
            : 'N/A'
        },
        cssStrategy: resource.cssStrategy
      });
    } catch (error) {
      console.error(`✗ Failed to download ${resource.filename}:`, error.message);
      metadata.resources.push({
        filename: resource.filename,
        originalUrl: resource.url,
        error: error.message
      });
    }
  }
  
  // Save metadata
  const metadataPath = path.join(outputDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\n✓ Metadata saved to: ${metadataPath}`);
  console.log(`\nTotal resources: ${resources.length}`);
  console.log(`Successfully downloaded: ${metadata.resources.filter(r => !r.error).length}`);
  console.log(`Failed: ${metadata.resources.filter(r => r.error).length}`);
}

// Run the download
downloadAll().catch(console.error);

