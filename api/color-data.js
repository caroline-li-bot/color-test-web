// 各季节类型的完整数据
const seasonData = {
  '春季型': {
    '亮春': {
      warmColdScore: 8,
      warmColdDesc: '你的肤色偏黄调，属于明显的暖色调，暖色系列的颜色能更好地衬托你的好气色。',
      lightDarkScore: 7,
      lightDarkDesc: '你的整体色彩明度偏高，发色和瞳孔色与肤色对比适中，适合明亮浅淡的颜色。',
      saturationScore: 7,
      saturationDesc: '你的色彩饱和度中等偏高，适合鲜艳明快的颜色，太灰的颜色会让你显得没有精神。',
      basicColors: ['#FFFFFF', '#F5F5DC', '#FFF8DC', '#FFF0F5', '#F0FFF0', '#FAF0E6'],
      brightColors: ['#FF6B6B', '#FFA07A', '#FFD700', '#98FB98', '#87CEFA', '#DDA0DD'],
      accentColors: ['#FF1493', '#FF4500', '#32CD32', '#1E90FF', '#9400D3', '#FF6347'],
      occasionColors: ['#DC143C', '#FF8C00', '#3CB371', '#4169E1', '#9932CC', '#FF69B4'],
      matchingIdeas: [
        '珊瑚橙上衣 + 白色阔腿裤 + 金色项链',
        '薄荷绿连衣裙 + 白色帆布鞋 + 珍珠耳钉',
        '鹅黄色针织衫 + 浅蓝色牛仔裤 + 小白鞋',
        '桃粉色卫衣 + 灰色运动裤 + 橙色运动鞋',
        '天蓝色衬衫 + 米白色西装裤 + 金色手表'
      ],
      bestHairColors: [
        {"name": "暖棕色", "desc": "最适合你，能提亮肤色，显得温暖有活力"},
        {"name": "蜂蜜茶色", "desc": "很显白，让你看起来更有气色"},
        {"name": "焦糖色", "desc": "温暖百搭，衬托得肤色更加透亮"}
      ],
      okHairColors: [
        {"name": "亚麻金", "desc": "可以尝试，适合时尚个性的造型"},
        {"name": "蜜茶棕", "desc": "低调温柔，不容易出错"},
        {"name": "浅棕色", "desc": "提亮效果好，适合喜欢浅色的你"}
      ],
      avoidHairColors: [
        {"name": "闷青色", "desc": "冷调绿色会让你的肤色显得暗沉发黄"},
        {"name": "蓝黑色", "desc": "太深的冷色调会显得你没有精神"}
      ]
    },
    '暖春': {
      warmColdScore: 9,
      warmColdDesc: '你的肤色黄调非常明显，属于典型的暖色调，只有暖色系列才适合你。',
      lightDarkScore: 6,
      lightDarkDesc: '你的整体色彩明度中等，适合中等亮度的暖色调。',
      saturationScore: 6,
      saturationDesc: '你的色彩饱和度中等，适合饱和度适中的温暖颜色。',
      basicColors: ['#FFFFFF', '#FAF0E6', '#FFF5EE', '#F5DEB3', '#FFE4E1', '#F0FFF0'],
      brightColors: ['#FF7F50', '#FFA500', '#FFD700', '#9ACD32', '#40E0D0', '#EE82EE'],
      accentColors: ['#FF6347', '#FF8C00', '#228B22', '#4682B4', '#9932CC', '#FF1493'],
      occasionColors: ['#B22222', '#FF4500', '#2E8B57', '#4169E1', '#800080', '#C71585'],
      matchingIdeas: [
        '南瓜色毛衣 + 卡其色休闲裤 + 棕色短靴',
        '焦糖色大衣 + 米白色高领 + 金色耳环',
        '暖橙色卫衣 + 深色牛仔裤 + 棕色运动鞋',
        '姜黄色针织衫 + 白色半身裙 + 裸色高跟鞋',
        '土橘色连衣裙 + 棕色皮带 + 编织包包'
      ],
      bestHairColors: [
        {"name": "焦糖色", "desc": "最适合你，温暖又显白，和你的暖调肤色完美搭配"},
        {"name": "蜂蜜棕", "desc": "非常显白，让你看起来气色很好"},
        {"name": "金棕色", "desc": "带点金色调，很有活力，适合你"}
      ],
      okHairColors: [
        {"name": "栗棕色", "desc": "自然温暖，日常又好看"},
        {"name": "枫叶红", "desc": "很有个性，适合秋冬季节"},
        {"name": "浅金色", "desc": "可以尝试，非常时尚亮眼"}
      ],
      avoidHairColors: [
        {"name": "蓝黑色", "desc": "冷调太深，和你的暖调肤色冲突"},
        {"name": "闷青色", "desc": "绿色调会让你肤色发黄，很没气色"},
        {"name": "奶奶灰", "desc": "太浅的冷灰色，会让你看起来很憔悴"}
      ]
    }
  },
  
  '夏季型': {
    '柔夏': {
      warmColdScore: 3,
      warmColdDesc: '你的肤色偏粉调，属于冷色调，冷色系的颜色能更好地衬托你的优雅气质。',
      lightDarkScore: 6,
      lightDarkDesc: '你的整体色彩明度中等，发色和瞳孔色比较柔和，适合柔和淡雅的颜色。',
      saturationScore: 4,
      saturationDesc: '你的色彩饱和度偏低，适合低饱和度的莫兰迪色系，太鲜艳的颜色会显得突兀。',
      basicColors: ['#FFFFFF', '#F5F5F5', '#E6E6FA', '#F0F8FF', '#FFF5EE', '#F8F8FF'],
      brightColors: ['#B0C4DE', '#9370DB', '#D8BFD8', '#8FBC8F', '#F08080', '#B0E0E6'],
      accentColors: ['#BA55D3', '#4682B4', '#CD5C5C', '#9932CC', '#3CB371', '#FFB6C1'],
      occasionColors: ['#800080', '#4169E1', '#C71585', '#2F4F4F', '#483D8B', '#BC8F8F'],
      matchingIdeas: [
        '雾霾蓝连衣裙 + 银色耳钉 + 白色高跟鞋',
        '薰衣草紫针织衫 + 灰色西装裤 + 小白鞋',
        '豆沙粉衬衫 + 深蓝色牛仔裤 + 银色项链',
        '灰绿色卫衣 + 白色运动裤 + 灰色运动鞋',
        '米白色大衣 + 紫色针织裙 + 珍珠项链'
      ],
      bestHairColors: [
        {"name": "冷棕色", "desc": "最适合你，显白又高级，衬托你的清冷气质"},
        {"name": "奶茶色", "desc": "温柔显白，非常有气质"},
        {"name": "灰棕色", "desc": "低调高级，很适合你的冷调肤色"}
      ],
      okHairColors: [
        {"name": "亚麻灰", "desc": "可以尝试，时尚感强，很有个性"},
        {"name": "黑茶色", "desc": "自然低调，显白不挑人"},
        {"name": "浅灰色", "desc": "适合喜欢个性造型的你"}
      ],
      avoidHairColors: [
        {"name": "橘黄色", "desc": "暖调的黄色会让你的肤色显得发黄暗沉"},
        {"name": "焦糖色", "desc": "太暖的颜色和你的冷调肤色不搭"}
      ]
    },
    '冷夏': {
      warmColdScore: 2,
      warmColdDesc: '你的肤色粉调明显，属于典型的冷色调，只有冷色系才最适合你。',
      lightDarkScore: 5,
      lightDarkDesc: '你的整体色彩明度中等，适合中等亮度的冷色调。',
      saturationScore: 5,
      saturationDesc: '你的色彩饱和度中等，适合饱和度适中的冷色。',
      basicColors: ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#F8F8FF', '#F0FFF0', '#FFF0F5'],
      brightColors: ['#87CEEB', '#9370DB', '#DDA0DD', '#90EE90', '#F08080', '#B0C4DE'],
      accentColors: ['#4169E1', '#8A2BE2', '#DC143C', '#2E8B57', '#9400D3', '#FF69B4'],
      occasionColors: ['#000080', '#4B0082', '#8B008B', '#006400', '#8B0000', '#C71585'],
      matchingIdeas: [
        '天蓝色衬衫 + 灰色西装裤 + 银色手表',
        '紫色连衣裙 + 银色高跟鞋 + 钻石耳钉',
        '粉色针织衫 + 深蓝色牛仔裤 + 小白鞋',
        '薄荷绿卫衣 + 黑色运动裤 + 白色运动鞋',
        '灰色大衣 + 蓝色针织裙 + 珍珠项链'
      ],
      bestHairColors: [
        {"name": "黑茶色", "desc": "最适合你，自然显白，又有气质"},
        {"name": "冷棕色", "desc": "高级显白，很适合你的冷调肤色"},
        {"name": "蓝黑色", "desc": "个性十足，非常酷炫，适合你"}
      ],
      okHairColors: [
        {"name": "深灰色", "desc": "时尚高级，很有质感"},
        {"name": "紫灰色", "desc": "带点紫调，很有个性"},
        {"name": "奶茶灰", "desc": "温柔显白，日常又好看"}
      ],
      avoidHairColors: [
        {"name": "暖棕色", "desc": "暖调的棕色会让你肤色发黄，很不协调"},
        {"name": "橘色", "desc": "太暖的颜色和你的冷调肤色冲突"},
        {"name": "金黄色", "desc": "太亮的暖黄色，会让你看起来很没精神"}
      ]
    }
  },

  '秋季型': {
    '深秋': {
      warmColdScore: 8,
      warmColdDesc: '你的肤色偏黄调，属于暖色调，浓郁厚重的暖色系最适合你的气质。',
      lightDarkScore: 4,
      lightDarkDesc: '你的整体色彩明度偏低，发色和瞳孔色较深，适合浓郁厚重的颜色。',
      saturationScore: 7,
      saturationDesc: '你的色彩饱和度中等偏高，适合饱和度高的暖色调，太浅的颜色会压不住你的气质。',
      basicColors: ['#FFFFF0', '#F5F5DC', '#FFFAF0', '#FAF0E6', '#FFF8DC', '#F5DEB3'],
      brightColors: ['#CD853F', '#D2691E', '#B8860B', '#556B2F', '#4682B4', '#800080'],
      accentColors: ['#A0522D', '#CD5C5C', '#2E8B57', '#4169E1', '#9932CC', '#FF6347'],
      occasionColors: ['#8B4513', '#B22222', '#006400', '#000080', '#4B0082', '#800000'],
      matchingIdeas: [
        '焦糖色大衣 + 米白色高领 + 棕色长靴',
        '驼色西装 + 咖啡色针织衫 + 卡其色裤子',
        '橄榄绿风衣 + 白色内搭 + 棕色马丁靴',
        '枫叶红毛衣 + 深色牛仔裤 + 棕色短靴',
        '芥末黄连衣裙 + 棕色皮带 + 复古包包'
      ],
      bestHairColors: [
        {"name": "深棕色", "desc": "最适合你，浓郁厚重，和你的气质完美匹配"},
        {"name": "焦糖色", "desc": "温暖有质感，显白又高级"},
        {"name": "巧克力棕", "desc": "浓郁有光泽，非常适合你"}
      ],
      okHairColors: [
        {"name": "红棕色", "desc": "带点红调，很有女人味"},
        {"name": "栗棕色", "desc": "自然温暖，日常又好看"},
        {"name": "蜂蜜棕", "desc": "带点光泽感，很显气质"}
      ],
      avoidHairColors: [
        {"name": "浅金色", "desc": "太浅的颜色压不住你的气质，会显得很轻浮"},
        {"name": "闷青色", "desc": "冷调绿色会让你肤色发黄，很没气色"},
        {"name": "奶奶灰", "desc": "太浅的冷灰色，和你的暖调气质不符"}
      ]
    },
    '暖秋': {
      warmColdScore: 9,
      warmColdDesc: '你的肤色黄调非常明显，属于典型的暖色调，浓郁的大地色系最适合你。',
      lightDarkScore: 5,
      lightDarkDesc: '你的整体色彩明度中等，适合中等亮度的浓郁暖色调。',
      saturationScore: 8,
      saturationDesc: '你的色彩饱和度偏高，适合饱和度高的温暖颜色，太淡的颜色会显得没有精神。',
      basicColors: ['#FAF0E6', '#FFF5EE', '#F5DEB3', '#FFEBCD', '#FFE4C4', '#F5F5DC'],
      brightColors: ['#D2691E', '#CD853F', '#B8860B', '#8B4513', '#556B2F', '#A0522D'],
      accentColors: ['#FF8C00', '#FF4500', '#B22222', '#2E8B57', '#800080', '#C71585'],
      occasionColors: ['#8B0000', '#FF7F50', '#006400', '#483D8B', '#800080', '#8B4513'],
      matchingIdeas: [
        '南瓜色大衣 + 黑色高领 + 棕色长靴',
        '焦糖色毛衣 + 卡其色阔腿裤 + 米色短靴',
        '土橘色连衣裙 + 棕色腰带 + 复古皮鞋',
        '姜黄色针织衫 + 深色牛仔裤 + 棕色短靴',
        '橄榄绿外套 + 棕色内搭 + 卡其色裤子'
      ],
      bestHairColors: [
        {"name": "焦糖色", "desc": "最适合你，温暖浓郁，显白又有气质"},
        {"name": "红棕色", "desc": "温暖有光泽，非常显白"},
        {"name": "巧克力色", "desc": "浓郁厚重，很适合你的气质"}
      ],
      okHairColors: [
        {"name": "栗棕色", "desc": "自然温暖，日常百搭"},
        {"name": "蜂蜜茶色", "desc": "带点金色调，很有活力"},
        {"name": "深棕色", "desc": "经典百搭，永远不会出错"}
      ],
      avoidHairColors: [
        {"name": "浅金色", "desc": "太浅的颜色和你的浓郁气质不符"},
        {"name": "蓝黑色", "desc": "冷调太深，和你的暖调肤色冲突"},
        {"name": "奶奶灰", "desc": "太浅的冷灰色，会让你看起来很憔悴"}
      ]
    }
  },

  '冬季型': {
    '冷冬': {
      warmColdScore: 2,
      warmColdDesc: '你的肤色偏冷调，对比分明，高饱和度的冷色系最能凸显你的气场。',
      lightDarkScore: 5,
      lightDarkDesc: '你的整体色彩明度对比强烈，适合对比度高的颜色。',
      saturationScore: 8,
      saturationDesc: '你的色彩饱和度偏高，适合饱和度高的纯粹颜色，太浑浊的颜色会降低你的气场。',
      basicColors: ['#FFFFFF', '#F8F8FF', '#F0F8FF', '#FFF0F5', '#F0FFF0', '#F5F5F5'],
      brightColors: ['#FF0000', '#0000FF', '#9400D3', '#00CED1', '#FF1493', '#1E90FF'],
      accentColors: ['#DC143C', '#4169E1', '#9932CC', '#008B8B', '#C71585', '#000000'],
      occasionColors: ['#8B0000', '#000080', '#800080', '#006400', '#C71585', '#000000'],
      matchingIdeas: [
        '正红色连衣裙 + 黑色高跟鞋 + 钻石耳钉',
        '宝蓝色西装 + 白色内搭 + 银色项链',
        '黑色大衣 + 红色针织裙 + 黑色长靴',
        '紫色毛衣 + 黑色皮裤 + 银色短靴',
        '白色衬衫 + 黑色西装裤 + 银色手表'
      ],
      bestHairColors: [
        {"name": "自然黑", "desc": "最适合你，纯粹的黑色最能凸显你的强大气场"},
        {"name": "蓝黑色", "desc": "带点蓝调，个性十足，非常酷炫"},
        {"name": "深棕色", "desc": "自然有光泽，显白又有气质"}
      ],
      okHairColors: [
        {"name": "深灰色", "desc": "高级有质感，很有个性"},
        {"name": "黑茶色", "desc": "自然低调，显白不挑人"},
        {"name": "酒红色", "desc": "带点红调，很有女人味"}
      ],
      avoidHairColors: [
        {"name": "暖棕色", "desc": "暖调的棕色会降低你的对比度，显得没有精神"},
        {"name": "橘黄色", "desc": "暖调的黄色会让你肤色发黄，很不协调"},
        {"name": "浅金色", "desc": "太浅的颜色会削弱你的气场，显得很轻浮"}
      ]
    },
    '亮冬': {
      warmColdScore: 3,
      warmColdDesc: '你的肤色偏冷调，色彩对比鲜明，明亮鲜艳的冷色系最适合你。',
      lightDarkScore: 6,
      lightDarkDesc: '你的整体色彩明度较高，适合明亮鲜艳的颜色。',
      saturationScore: 9,
      saturationDesc: '你的色彩饱和度很高，适合最纯粹的高饱和颜色，越鲜艳越好看。',
      basicColors: ['#FFFFFF', '#000000', '#F8F8FF', '#F0F8FF', '#FFF0F5', '#F5F5F5'],
      brightColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
      accentColors: ['#FF1493', '#1E90FF', '#32CD32', '#FFD700', '#9400D3', '#FF4500'],
      occasionColors: ['#DC143C', '#4169E1', '#00CED1', '#FFD700', '#9932CC', '#000000'],
      matchingIdeas: [
        '正红色大衣 + 黑色内搭 + 黑色长靴',
        '宝蓝色连衣裙 + 白色高跟鞋 + 银色首饰',
        '亮黄色毛衣 + 黑色皮裤 + 白色运动鞋',
        '玫粉色上衣 + 黑色裙子 + 银色高跟鞋',
        '黑白经典搭配 + 亮色包包点缀'
      ],
      bestHairColors: [
        {"name": "自然黑", "desc": "最适合你，纯粹的黑色能最大程度凸显你的对比度优势"},
        {"name": "蓝黑色", "desc": "带点蓝调，个性十足，很适合你"},
        {"name": "深紫色", "desc": "带点紫调，神秘又有个性"}
      ],
      okHairColors: [
        {"name": "深灰色", "desc": "高级有质感，很有特色"},
        {"name": "黑茶色", "desc": "自然低调，显白又好看"},
        {"name": "酒红色", "desc": "浓郁鲜艳，很适合你的气质"}
      ],
      avoidHairColors: [
        {"name": "暖棕色", "desc": "暖调的棕色会降低你的对比度，显得没有精神"},
        {"name": "焦糖色", "desc": "太暖的颜色和你的冷调气质不符"},
        {"name": "浅金色", "desc": "太浅的颜色会削弱你的气场"}
      ]
    }
  }
};

// 根据季节类型和子类型获取完整数据
function getCompleteSeasonData(type, subtype) {
  // 如果有对应数据，返回完整数据
  if (seasonData[type] && seasonData[type][subtype]) {
    return seasonData[type][subtype];
  }
  
  // 如果没有精确匹配，找同季节的第一个类型
  if (seasonData[type]) {
    const firstSubtype = Object.keys(seasonData[type])[0];
    return seasonData[type][firstSubtype];
  }
  
  // 默认返回春季型数据
  return seasonData['春季型']['亮春'];
}

module.exports = { getCompleteSeasonData };
