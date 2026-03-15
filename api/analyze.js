import { HmacSHA256 } from 'crypto-js';
const { getCompleteSeasonData } = require('./color-data.js');

// 豆包API配置
const DOUBao_API_URL = 'https://aquasearch.volcengineapi.com/api/v3/chat/completions';
const ACCESS_KEY_ID = 'api-key-yehjvnbklcbw80b7wft4';
const SECRET_ACCESS_KEY = '91a2ace5-1953-4073-9516-152905513b19';
const REGION = 'cn-beijing';
const SERVICE = 'aquasearch';

export const config = {
  runtime: 'edge',
};

// 生成请求签名
function generateSignature(method, path, headers, payload, timestamp) {
  const canonicalURI = path;
  const canonicalQueryString = '';
  
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map(key => `${key.toLowerCase()}:${headers[key].trim()}\n`)
    .join('');
  
  const signedHeaders = Object.keys(headers)
    .sort()
    .map(key => key.toLowerCase())
    .join(';');
  
  const hashedPayload = HmacSHA256(JSON.stringify(payload)).toString();
  
  const canonicalRequest = `${method}\n${canonicalURI}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;
  
  const algorithm = 'HMAC-SHA256';
  const date = new Date(timestamp).toISOString().split('T')[0].replace(/-/g, '');
  
  const credentialScope = `${date}/${REGION}/${SERVICE}/request`;
  const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${HmacSHA256(canonicalRequest).toString()}`;
  
  const kDate = HmacSHA256(date, SECRET_ACCESS_KEY);
  const kRegion = HmacSHA256(REGION, kDate);
  const kService = HmacSHA256(SERVICE, kRegion);
  const kSigning = HmacSHA256('request', kService);
  
  const signature = HmacSHA256(stringToSign, kSigning).toString();
  
  return `${algorithm} Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { image } = await request.json();
    
    if (!image) {
      return new Response(JSON.stringify({ error: 'Image is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const dateStr = new Date(timestamp * 1000).toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';

    const headers = {
      'Content-Type': 'application/json',
      'X-Date': dateStr,
      'Host': 'aquasearch.volcengineapi.com',
    };

    const payload = {
      model: 'doubao-4-vision',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `你是专业的色彩分析师，擅长韩国四季色彩测试理论。请分析这张人物照片，严格按照以下要求返回完整的JSON结果，**所有字段都必须返回，不能缺失任何字段**：

⚠️ 重要要求：必须包含下面列出的所有字段，不要遗漏任何一个，否则用户会看不到完整的分析结果。

1. 基础信息：
   - type: 色彩类型（只能是春季型/夏季型/秋季型/冬季型中的一个）
   - subtype: 子类型（亮春/暖春/浅春/柔夏/冷夏/浅夏/深秋/暖秋/柔秋/冷冬/亮冬/深冬中的一个）
   - description: 详细的色彩分析描述，不少于100字

2. 三大属性分析：
   - warmColdScore: 冷暖调评分（1-10的数字，1=极冷，10=极暖）
   - warmColdDesc: 冷暖调分析说明，说明用户是冷调还是暖调，为什么
   - lightDarkScore: 明度评分（1-10的数字，1=极深，10=极浅）
   - lightDarkDesc: 明度分析说明，说明用户适合深色还是浅色
   - saturationScore: 饱和度评分（1-10的数字，1=极灰，10=极艳）
   - saturationDesc: 饱和度分析说明，说明用户适合鲜艳的颜色还是柔和的颜色

3. 颜色推荐（每个数组必须包含6个十六进制颜色代码，比如"#FF6B6B"）：
   - basicColors: 基础色系（6个，日常百搭的颜色）
   - brightColors: 提亮色系（6个，能提升气色的颜色）
   - accentColors: 点睛色系（6个，适合作为点缀的颜色）
   - occasionColors: 场合色系（6个，适合特殊场合的颜色）

4. 搭配方案：
   - matchingIdeas: 数组，包含5组经典穿搭搭配方案，每组都是字符串，比如"珊瑚橙上衣 + 白色阔腿裤 + 金色项链"

5. 发色建议（每个数组包含对象，对象必须有name和desc字段）：
   - bestHairColors: 数组，3-5个最适合的发色，每个对象结构：{"name": "颜色名称", "desc": "适合的原因说明"}
   - okHairColors: 数组，3-5个可以尝试的发色，每个对象结构：{"name": "颜色名称", "desc": "适合的场景说明"}
   - avoidHairColors: 数组，2-3个需要避免的发色，每个对象结构：{"name": "颜色名称", "desc": "为什么不适合的说明"}

6. 原有建议：
   - clothing: 服装色彩建议，不少于80字
   - jewelry: 首饰选择建议，不少于50字
   - makeup: 彩妆建议，不少于80字
   - avoid: 需要避开的颜色说明，不少于50字

7. 测试颜色：
   - testColors: 数组，6个测试颜色，每个对象包含：
     - color: 十六进制颜色代码
     - name: 颜色中文名称
     - score: 1-10的数字，适合度评分
     - description: 适合度说明文字

返回格式必须是严格的JSON，不要包含任何其他文字、解释、markdown格式，不要在JSON外面加任何内容，直接返回JSON对象。
{
  "type": "春季型",
  "subtype": "亮春",
  "description": "详细描述",
  "warmColdScore": 8,
  "warmColdDesc": "你的肤色偏黄调，属于明显的暖色调，适合暖色系列的颜色",
  "lightDarkScore": 7,
  "lightDarkDesc": "你的整体色彩明度偏高，适合明亮浅淡的颜色",
  "saturationScore": 7,
  "saturationDesc": "你的色彩饱和度中等偏高，适合鲜艳明快的颜色",
  "basicColors": ["#FFFFFF", "#F5F5DC", "#E6E6FA", "#FFF0F5", "#F0FFF0", "#FAF0E6"],
  "brightColors": ["#FF6B6B", "#FFA07A", "#FFD700", "#98FB98", "#87CEFA", "#DDA0DD"],
  "accentColors": ["#FF1493", "#FF4500", "#32CD32", "#1E90FF", "#9400D3", "#FF6347"],
  "occasionColors": ["#DC143C", "#4169E1", "#8B008B", "#006400", "#FF8C00", "#4B0082"],
  "matchingIdeas": [
    "珊瑚橙上衣 + 白色阔腿裤 + 金色项链",
    "薄荷绿连衣裙 + 白色帆布鞋 + 珍珠耳钉"
  ],
  "bestHairColors": [
    {"name": "暖棕色", "desc": "最适合你，能提亮肤色，显得温暖有活力"},
    {"name": "蜂蜜茶色", "desc": "很显白，让你看起来更有气色"}
  ],
  "okHairColors": [
    {"name": "亚麻金", "desc": "可以尝试，适合时尚个性的造型"},
    {"name": "焦糖色", "desc": "温暖百搭，不容易出错"}
  ],
  "avoidHairColors": [
    {"name": "闷青色", "desc": "冷调绿色会让你的肤色显得暗沉发黄"},
    {"name": "蓝黑色", "desc": "太深的冷色调会显得你没有精神"}
  ],
  "clothing": "服装建议",
  "jewelry": "首饰建议",
  "makeup": "彩妆建议",
  "avoid": "避开的颜色",
  "testColors": [
    {
      "color": "#FF6B6B",
      "name": "珊瑚橙",
      "score": 9,
      "description": "温暖明亮的珊瑚橙色能很好地衬托出你的好气色"
    }
  ]
}`
            },
            {
              type: 'image_url',
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    };

    const signature = generateSignature('POST', '/api/v3/chat/completions', headers, payload, timestamp);
    headers['Authorization'] = signature;

    const response = await fetch(DOUBao_API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('豆包API错误:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // 打印原始API返回结果
    console.log('豆包API原始返回:', aiResponse);
    
    // 解析AI返回的JSON
    let result;
    try {
      // 尝试提取JSON部分（有时候AI会返回多余的文字）
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = JSON.parse(aiResponse);
      }
      
      // 确保所有必填字段都有默认值
      result.warmColdScore = result.warmColdScore || 5;
      result.warmColdDesc = result.warmColdDesc || '你的肤色色调适中，冷暖色都可以尝试，更偏向暖色调。';
      result.lightDarkScore = result.lightDarkScore || 5;
      result.lightDarkDesc = result.lightDarkDesc || '你的整体色彩明度适中，适合中等亮度的颜色。';
      result.saturationScore = result.saturationScore || 5;
      result.saturationDesc = result.saturationDesc || '你的色彩饱和度适中，适合中等饱和度的颜色。';
      
      result.basicColors = result.basicColors || ['#FFFFFF', '#F5F5F5', '#E6E6FA', '#FFF0F5', '#F0FFF0', '#FAF0E6'];
      result.brightColors = result.brightColors || ['#FF6B6B', '#FFA07A', '#FFD700', '#98FB98', '#87CEFA', '#DDA0DD'];
      result.accentColors = result.accentColors || ['#FF1493', '#FF4500', '#32CD32', '#1E90FF', '#9400D3', '#FF6347'];
      result.occasionColors = result.occasionColors || ['#DC143C', '#4169E1', '#8B008B', '#006400', '#FF8C00', '#4B0082'];
      
      result.matchingIdeas = result.matchingIdeas || [
        '基础款上衣 + 牛仔裤 + 简约首饰',
        '连衣裙 + 小白鞋 + 精致耳钉',
        '针织衫 + 西装裤 + 气质手表'
      ];
      
      result.bestHairColors = result.bestHairColors || [
        {"name": "自然黑", "desc": "最适合你，显白又百搭，永远不会出错"},
        {"name": "深棕色", "desc": "很显气质，衬托肤色更加透亮"}
      ];
      result.okHairColors = result.okHairColors || [
        {"name": "栗棕色", "desc": "可以尝试，温暖又自然"},
        {"name": "黑茶色", "desc": "低调有质感，适合各种场合"}
      ];
      result.avoidHairColors = result.avoidHairColors || [
        {"name": "夸张亮色", "desc": "太鲜艳的颜色会显得突兀，和你的气质不符"}
      ];
      
      // 用我们的标准数据库补充完整字段，确保没有缺失
      const completeData = getCompleteSeasonData(result.type, result.subtype);
      
      // 合并AI返回的结果和我们的标准数据
      result = {
        ...completeData,
        ...result, // AI返回的字段优先
        // 确保数组字段不会为空
        basicColors: result.basicColors || completeData.basicColors,
        brightColors: result.brightColors || completeData.brightColors,
        accentColors: result.accentColors || completeData.accentColors,
        occasionColors: result.occasionColors || completeData.occasionColors,
        matchingIdeas: result.matchingIdeas || completeData.matchingIdeas,
        bestHairColors: result.bestHairColors || completeData.bestHairColors,
        okHairColors: result.okHairColors || completeData.okHairColors,
        avoidHairColors: result.avoidHairColors || completeData.avoidHairColors
      };
      
      // 打印最终的完整结果
      console.log('最终完整分析结果:', result);
      
    } catch (parseError) {
      console.error('JSON解析失败，原始响应:', aiResponse);
      console.error('解析错误:', parseError);
      // 如果解析失败，返回模拟数据
      result = getMockResult();
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('分析失败:', error);
    // 出错时返回模拟数据
    return new Response(JSON.stringify(getMockResult()), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 模拟数据（备用）
function getMockResult() {
  const seasons = [
    {
      type: '春季型',
      subtype: '亮春',
      description: '你属于亮春季型人，肤色明亮偏暖，如同春日的阳光般清新透亮。你的整体色彩属性是明亮、温暖、鲜艳，适合饱和度高的暖色调。',
      colors: ['#FF6B6B', '#FFA07A', '#FFD700', '#98FB98', '#87CEFA', '#DDA0DD', '#FFB6C1', '#F4A460', '#90EE90', '#ADD8E6'],
      clothing: '适合明亮的暖色调，如珊瑚橙、桃粉色、柠檬黄、薄荷绿、天蓝色等鲜艳活泼的颜色。穿搭上可以大胆尝试撞色，会非常出彩。',
      jewelry: '最适合金色、玫瑰金、黄铜色等暖色调首饰，珍珠也是不错的选择。尽量避免哑光银色、铂金等冷色调首饰。',
      makeup: '适合暖色调的彩妆，珊瑚色、西柚色口红，橘色系、杏色系腮红，暖调大地色眼影都是你的最佳选择。避开冷调的粉色、紫色系彩妆。',
      avoid: '尽量避免暗沉的冷色调，如深灰色、藏蓝色、暗紫色、深棕色等，这些颜色会让你看起来气色不佳，显得沉闷。',
      testColors: [
        { color: '#FF6B6B', name: '珊瑚橙', score: 9, description: '温暖明亮的珊瑚橙色能很好地衬托出你的好气色，让肤色看起来更加通透有光泽。' },
        { color: '#FFA07A', name: '桃粉色', score: 8.5, description: '柔和的桃粉色会让你看起来甜美可爱，很有少女感。' },
        { color: '#FFD700', name: '柠檬黄', score: 8, description: '明亮的柠檬黄非常适合你，能凸显你活泼阳光的气质。' },
        { color: '#98FB98', name: '薄荷绿', score: 8.5, description: '清新的薄荷绿和你的肤色相得益彰，显得干净清爽。' },
        { color: '#87CEFA', name: '天蓝色', score: 7.5, description: '淡蓝色能很好地平衡你的暖色调，给人清新的感觉。' },
        { color: '#DDA0DD', name: '淡紫色', score: 7, description: '柔和的淡紫色会让你看起来温柔优雅，很有气质。' }
      ]
    },
    {
      type: '夏季型',
      subtype: '柔夏',
      description: '你属于柔夏季型人，肤色柔和偏冷，如同夏日的湖水般宁静淡雅。你的整体色彩属性是柔和、清冷、灰度适中，适合低饱和度的冷色调。',
      colors: ['#E6E6FA', '#B0C4DE', '#87CEEB', '#9370DB', '#D8BFD8', '#F08080', '#98FB98', '#B0E0E6', '#DDA0DD', '#F4978E'],
      clothing: '适合柔和的冷色调，如雾霾蓝、薰衣草紫、豆沙粉、灰绿色、米白色等低饱和度的颜色。穿搭上适合同色系渐变，显得高级有气质。',
      jewelry: '最适合银色、铂金、白金色等冷色调首饰，钻石、珍珠也非常适合你。尽量避免金色、黄铜色等过于暖调的首饰。',
      makeup: '适合冷色调的彩妆，豆沙色、玫瑰色口红，粉色系、豆沙色腮红，灰调大地色、紫色系眼影都很适合你。避开过于艳丽的暖橘色、大红色。',
      avoid: '尽量避免过于鲜艳的暖色调，如亮橙色、明黄色、正红色等，这些颜色会显得和你的气质格格不入，过于突兀。',
      testColors: [
        { color: '#B0C4DE', name: '雾霾蓝', score: 9, description: '高级的雾霾蓝非常适合你，能完美衬托出你清冷优雅的气质。' },
        { color: '#9370DB', name: '薰衣草紫', score: 8.5, description: '浪漫的薰衣草紫色和你的冷调肤色特别搭，显得温柔又有品味。' },
        { color: '#D8BFD8', name: '豆沙粉', score: 8, description: '柔和的豆沙粉色会让你看起来非常有气质，高级感十足。' },
        { color: '#8FBC8F', name: '灰绿色', score: 8.5, description: '低饱和度的灰绿色很适合你，显得文艺又清新。' },
        { color: '#F5F5F5', name: '米白色', score: 9, description: '纯净的米白色能最大程度凸显你的气质，简约又高级。' },
        { color: '#B0E0E6', name: '淡蓝色', score: 8, description: '柔和的淡蓝色会让你看起来更加宁静温柔，很有亲和力。' }
      ]
    }
  ];
  
  const result = seasons[Math.floor(Math.random() * seasons.length)];
  // 补充完整字段
  const completeData = getCompleteSeasonData(result.type, result.subtype);
  return { ...completeData, ...result };
}
