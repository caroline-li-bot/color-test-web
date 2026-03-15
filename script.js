// 色彩测试核心逻辑
class ColorTest {
    constructor() {
        this.fileInput = document.getElementById('file-input');
        this.uploadArea = document.getElementById('upload-area');
        this.previewContainer = document.getElementById('preview-container');
        this.previewImage = document.getElementById('preview-image');
        this.removeImageBtn = document.getElementById('remove-image');
        this.analyzeBtn = document.getElementById('analyze-btn');
        this.uploadSection = document.getElementById('upload-section');
        this.loadingSection = document.getElementById('loading-section');
        this.comparisonSection = document.getElementById('comparison-section');
        this.resultContainer = document.getElementById('result-container');
        this.comparisonContainer = document.getElementById('comparison-container');
        this.comparisonTitle = document.getElementById('comparison-title');
        this.comparisonSubtitle = document.getElementById('comparison-subtitle');
        this.comparisonImage = document.getElementById('comparison-image');
        this.currentColorName = document.getElementById('current-color-name');
        this.currentColorScore = document.getElementById('current-color-score');
        this.currentColorDescription = document.getElementById('current-color-description');
        this.prevColorBtn = document.getElementById('prev-color');
        this.nextColorBtn = document.getElementById('next-color');
        this.colorIndicators = document.getElementById('color-indicators');
        this.showReportBtn = document.getElementById('show-report-btn');
        
        this.currentColorIndex = 0;
        this.testColors = [];
        this.analysisResult = null;
        this.imageBase64 = null; // 保存图片base64
        
        this.selectedFile = null;
        this.initEventListeners();
    }

    initEventListeners() {
        // 点击上传区域
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // 文件选择
        this.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileSelect(file);
            }
        });

        // 拖拽上传
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFileSelect(file);
            }
        });

        // 移除图片
        this.removeImageBtn.addEventListener('click', () => {
            this.removeImage();
        });

        // 分析按钮
        this.analyzeBtn.addEventListener('click', () => {
            this.analyzeImage();
        });

        // 重新测试
        this.retestBtn.addEventListener('click', () => {
            this.resetTest();
        });



        // 色彩对比页面按钮的事件绑定会在showColorComparison里做
    }

    handleFileSelect(file) {
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }

        this.selectedFile = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.previewImage.src = e.target.result;
            this.previewContainer.classList.remove('hidden');
            this.analyzeBtn.disabled = false;
            this.uploadArea.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    }

    removeImage() {
        this.selectedFile = null;
        this.previewImage.src = '';
        this.previewContainer.classList.add('hidden');
        this.analyzeBtn.disabled = true;
        this.uploadArea.classList.remove('hidden');
        this.fileInput.value = '';
    }

    async analyzeImage() {
        if (!this.selectedFile) return;

        // 显示加载状态
        this.uploadSection.classList.add('hidden');
        this.loadingSection.classList.remove('hidden');

        try {
            // 转换图片为base64并保存
            const reader = new FileReader();
            this.imageBase64 = await new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(this.selectedFile);
            });

            // 隐藏加载，直接显示色彩对比页面（先不调用AI）
            this.loadingSection.classList.add('hidden');
            this.showColorComparison();
            
        } catch (error) {
            console.error('处理图片失败:', error);
            alert('处理图片失败，请重试');
            this.uploadSection.classList.remove('hidden');
            this.loadingSection.classList.add('hidden');
        }
    }

    // 初始化测试颜色（固定的6种基础测试色，不需要AI返回）
    getDefaultTestColors() {
        return [
            {
                color: '#FF6B6B',
                name: '珊瑚橙',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            },
            {
                color: '#B0C4DE',
                name: '雾霾蓝',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            },
            {
                color: '#D2691E',
                name: '焦糖色',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            },
            {
                color: '#DC143C',
                name: '正红色',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            },
            {
                color: '#98FB98',
                name: '薄荷绿',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            },
            {
                color: '#9370DB',
                name: '薰衣草紫',
                score: '待AI分析',
                description: '点击"查看AI最终报告"获取专业分析'
            }
        ];
    }

    // 测试颜色库
    getTestColors(seasonType) {
        const colorSets = {
            '春季型': [
                {
                    color: '#FF6B6B',
                    name: '珊瑚橙',
                    score: 9,
                    description: '温暖明亮的珊瑚橙色能很好地衬托出你的好气色，让肤色看起来更加通透有光泽。'
                },
                {
                    color: '#FFA07A',
                    name: '桃粉色',
                    score: 8.5,
                    description: '柔和的桃粉色会让你看起来甜美可爱，很有少女感。'
                },
                {
                    color: '#FFD700',
                    name: '柠檬黄',
                    score: 8,
                    description: '明亮的柠檬黄非常适合你，能凸显你活泼阳光的气质。'
                },
                {
                    color: '#98FB98',
                    name: '薄荷绿',
                    score: 8.5,
                    description: '清新的薄荷绿和你的肤色相得益彰，显得干净清爽。'
                },
                {
                    color: '#87CEFA',
                    name: '天蓝色',
                    score: 7.5,
                    description: '淡蓝色能很好地平衡你的暖色调，给人清新的感觉。'
                },
                {
                    color: '#DDA0DD',
                    name: '淡紫色',
                    score: 7,
                    description: '柔和的淡紫色会让你看起来温柔优雅，很有气质。'
                }
            ],
            '夏季型': [
                {
                    color: '#B0C4DE',
                    name: '雾霾蓝',
                    score: 9,
                    description: '高级的雾霾蓝非常适合你，能完美衬托出你清冷优雅的气质。'
                },
                {
                    color: '#9370DB',
                    name: '薰衣草紫',
                    score: 8.5,
                    description: '浪漫的薰衣草紫色和你的冷调肤色特别搭，显得温柔又有品味。'
                },
                {
                    color: '#D8BFD8',
                    name: '豆沙粉',
                    score: 8,
                    description: '柔和的豆沙粉色会让你看起来非常有气质，高级感十足。'
                },
                {
                    color: '#8FBC8F',
                    name: '灰绿色',
                    score: 8.5,
                    description: '低饱和度的灰绿色很适合你，显得文艺又清新。'
                },
                {
                    color: '#F5F5F5',
                    name: '米白色',
                    score: 9,
                    description: '纯净的米白色能最大程度凸显你的气质，简约又高级。'
                },
                {
                    color: '#B0E0E6',
                    name: '淡蓝色',
                    score: 8,
                    description: '柔和的淡蓝色会让你看起来更加宁静温柔，很有亲和力。'
                }
            ],
            '秋季型': [
                {
                    color: '#D2691E',
                    name: '焦糖色',
                    score: 9.5,
                    description: '浓郁的焦糖色是你的本命色，能完美衬托出你成熟醇厚的气质。'
                },
                {
                    color: '#CD853F',
                    name: '驼色',
                    score: 9,
                    description: '经典的驼色和你的暖调肤色完美融合，高级感扑面而来。'
                },
                {
                    color: '#556B2F',
                    name: '橄榄绿',
                    score: 8.5,
                    description: '复古的橄榄绿非常适合你，显得很有品味和质感。'
                },
                {
                    color: '#B22222',
                    name: '枫叶红',
                    score: 9,
                    description: '浓郁的枫叶红会让你看起来气场十足，非常有韵味。'
                },
                {
                    color: '#DAA520',
                    name: '芥末黄',
                    score: 8,
                    description: '温暖的芥末黄能很好地衬托出你的肤色，显得温暖又有活力。'
                },
                {
                    color: '#8B4513',
                    name: '深棕色',
                    score: 8.5,
                    description: '深沉的棕色系会让你看起来非常有质感，低调又奢华。'
                }
            ],
            '冬季型': [
                {
                    color: '#DC143C',
                    name: '正红色',
                    score: 9.5,
                    description: '明艳的正红色是你的最佳选择，能完美凸显你强大的气场。'
                },
                {
                    color: '#4169E1',
                    name: '宝蓝色',
                    score: 9,
                    description: '高贵的宝蓝色和你冷调的肤色特别搭，显得既高贵又神秘。'
                },
                {
                    color: '#000000',
                    name: '纯黑色',
                    score: 9,
                    description: '纯粹的黑色能最大程度凸显你的对比度优势，气场全开。'
                },
                {
                    color: '#FFFFFF',
                    name: '纯白色',
                    score: 8.5,
                    description: '干净的白色和你形成鲜明对比，显得你既纯粹又有气场。'
                },
                {
                    color: '#800080',
                    name: '紫色',
                    score: 8,
                    description: '浓郁的紫色会让你看起来既神秘又高贵，很有个性。'
                },
                {
                    color: '#008080',
                    name: '祖母绿',
                    score: 8.5,
                    description: '深邃的祖母绿色非常适合你，显得既高贵又有品味。'
                }
            ]
        };

        return colorSets[seasonType] || colorSets['春季型'];
    }

    // 调用豆包API进行真实分析
    async analyzeWithDoubao(imageBase64) {
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageBase64
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const result = await response.json();
            // AI返回结果后更新测试颜色的评分和描述
        if (result.testColors) {
            this.testColors = result.testColors;
            // 更新当前显示的颜色信息
            this.updateColorDisplay();
        }
            return result;
        } catch (error) {
            console.error('豆包API调用失败，使用模拟数据:', error);
            // 失败时使用模拟数据
            return this.mockAnalysis();
        }
    }

    // 模拟分析结果（备用）
    async mockAnalysis() {
        console.log('使用模拟数据进行分析');
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 随机返回一个季节类型
        const seasons = [
            {
                type: '春季型',
                subtype: '亮春',
                description: '你属于亮春季型人，肤色明亮偏暖，如同春日的阳光般清新透亮。你的整体色彩属性是明亮、温暖、鲜艳，适合饱和度高的暖色调。',
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
                ],
                clothing: '适合明亮的暖色调，如珊瑚橙、桃粉色、柠檬黄、薄荷绿、天蓝色等鲜艳活泼的颜色。穿搭上可以大胆尝试撞色，会非常出彩。',
                jewelry: '最适合金色、玫瑰金、黄铜色等暖色调首饰，珍珠也是不错的选择。尽量避免哑光银色、铂金等冷色调首饰。',
                makeup: '适合暖色调的彩妆，珊瑚色、西柚色口红，橘色系、杏色系腮红，暖调大地色眼影都是你的最佳选择。避开冷调的粉色、紫色系彩妆。',
                avoid: '尽量避免暗沉的冷色调，如深灰色、藏蓝色、暗紫色、深棕色等，这些颜色会让你看起来气色不佳，显得沉闷。',
                testColors: this.getTestColors('春季型')
            },
            {
                type: '夏季型',
                subtype: '柔夏',
                description: '你属于柔夏季型人，肤色柔和偏冷，如同夏日的湖水般宁静淡雅。你的整体色彩属性是柔和、清冷、灰度适中，适合低饱和度的冷色调。',
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
                ],
                clothing: '适合柔和的冷色调，如雾霾蓝、薰衣草紫、豆沙粉、灰绿色、米白色等低饱和度的颜色。穿搭上适合同色系渐变，显得高级有气质。',
                jewelry: '最适合银色、铂金、白金色等冷色调首饰，钻石、珍珠也非常适合你。尽量避免金色、黄铜色等过于暖调的首饰。',
                makeup: '适合冷色调的彩妆，豆沙色、玫瑰色口红，粉色系、豆沙色腮红，灰调大地色、紫色系眼影都很适合你。避开过于艳丽的暖橘色、大红色。',
                avoid: '尽量避免过于鲜艳的暖色调，如亮橙色、明黄色、正红色等，这些颜色会显得和你的气质格格不入，过于突兀。',
                testColors: this.getTestColors('夏季型')
            }
        ];

        // 随机返回一个季节类型
        const result = seasons[Math.floor(Math.random() * seasons.length)];
        console.log('模拟分析结果:', result);
        return result;
    }

    // 显示色彩对比页面
    showColorComparison() {
        // 隐藏加载，显示对比页面
        this.loadingSection.classList.add('hidden');
        this.comparisonSection.classList.remove('hidden');
        
        // 设置用户照片
        this.comparisonImage.src = this.previewImage.src;
        
        // 使用默认测试颜色（不需要AI返回）
        this.testColors = this.getDefaultTestColors();
        
        // 生成指示器
        this.colorIndicators.innerHTML = '';
        this.testColors.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `w-3 h-3 rounded-full transition-all ${index === 0 ? 'bg-white scale-125' : 'bg-white bg-opacity-40'}`;
            indicator.addEventListener('click', () => {
                this.currentColorIndex = index;
                this.updateColorDisplay();
            });
            this.colorIndicators.appendChild(indicator);
        });
        
        // 显示第一个颜色
        this.currentColorIndex = 0;
        this.updateColorDisplay();
        
        // 这里先不调用AI，等用户点击按钮后再调用
        console.log('=== 色彩对比页面加载完成 ===');
        console.log('用户可以切换不同背景色查看效果');
        console.log('点击"查看AI最终报告"按钮后开始AI分析');
        console.log('==================');
        
        // 绑定事件（因为这些元素是动态显示的，需要在显示后再绑定）
        this.prevColorBtn = document.getElementById('prev-color');
        this.nextColorBtn = document.getElementById('next-color');
        this.showReportBtn = document.getElementById('show-report-btn');
        
        this.prevColorBtn.addEventListener('click', () => {
            this.navigateColor(-1);
        });

        this.nextColorBtn.addEventListener('click', () => {
            this.navigateColor(1);
        });

        this.showReportBtn.addEventListener('click', () => {
            console.log('点击了查看AI报告按钮'); // 先打个日志确认点击
            this.showResult();
        });
        
        // 滚动到对比区域
        this.comparisonSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 更新颜色显示
    updateColorDisplay() {
        const colorData = this.testColors[this.currentColorIndex];
        
        // 更新背景色
        this.comparisonContainer.style.backgroundColor = colorData.color;
        
        // 计算文本颜色（根据背景色亮度选择黑/白）
        const rgb = hexToRgb(colorData.color);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        const textColor = brightness > 128 ? '#1f2937' : '#ffffff';
        
        // 更新文本颜色
        this.comparisonTitle.style.color = textColor;
        this.comparisonSubtitle.style.color = textColor;
        this.currentColorName.style.color = textColor;
        this.currentColorScore.style.color = textColor;
        this.currentColorDescription.style.color = textColor;
        this.prevColorBtn.style.color = textColor;
        this.nextColorBtn.style.color = textColor;
        
        // 更新颜色信息
        this.currentColorName.textContent = colorData.name;
        this.currentColorScore.textContent = `适合度: ${colorData.score}/10`;
        this.currentColorDescription.textContent = colorData.description;
        
        // 更新指示器
        Array.from(this.colorIndicators.children).forEach((indicator, index) => {
            if (index === this.currentColorIndex) {
                indicator.classList.remove('bg-opacity-40');
                indicator.classList.add('scale-125');
            } else {
                indicator.classList.add('bg-opacity-40');
                indicator.classList.remove('scale-125');
            }
        });
    }

    // 导航颜色
    navigateColor(direction) {
        this.currentColorIndex += direction;
        if (this.currentColorIndex < 0) {
            this.currentColorIndex = this.testColors.length - 1;
        } else if (this.currentColorIndex >= this.testColors.length) {
            this.currentColorIndex = 0;
        }
        this.updateColorDisplay();
    }

    // 点击查看AI报告后触发
    async showResult() {
        console.log('showResult函数被调用了');
        
        // 禁用按钮，防止重复点击
        this.showReportBtn.disabled = true;
        this.showReportBtn.textContent = 'AI 正在分析中...';
        
        console.log('=== 开始调用豆包AI分析 ===');
        console.log('图片大小:', this.imageBase64.length, 'bytes');
        
        try {
            // 显示加载状态
            const loadingHtml = `
                <div class="bg-white rounded-2xl shadow-xl p-12 text-center mt-8" id="ai-loading">
                    <div class="loading-spinner mx-auto mb-6"></div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">AI 正在分析中...</h3>
                    <p class="text-gray-600">请稍候，AI正在分析你的面部特征和色彩属性</p>
                </div>
            `;
            this.resultContainer.innerHTML = loadingHtml;
            
            // 滚动到加载区域
            document.getElementById('ai-loading').scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // 调用豆包API分析
            const startTime = Date.now();
            const result = await this.analyzeWithDoubao(this.imageBase64);
            const endTime = Date.now();
            
            console.log('AI分析完成，耗时:', (endTime - startTime) / 1000, '秒');
            console.log('AI返回结果:', result);
            console.log('=== AI分析结束 ===');
            
            this.analysisResult = result;
            
            // 显示最终结果
            this.displayResult(result);
            
        } catch (error) {
            console.error('AI分析失败:', error);
            alert('AI分析失败，请重试');
            this.resultContainer.innerHTML = '';
        } finally {
            // 恢复按钮状态
            this.showReportBtn.disabled = false;
            this.showReportBtn.textContent = '查看 AI 最终报告 ↓';
        }
    }

    displayResult(result) {
        // 动态生成结果HTML
        const resultHtml = `
        <div class="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">你的色彩测试结果</h2>
            
            <!-- Season Result -->
            <div class="text-center mb-8">
                <div class="inline-block px-6 py-3 rounded-full bg-purple-100 text-purple-700 font-semibold text-lg mb-4">
                    <span>${result.type}</span> · <span>${result.subtype}</span>
                </div>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    ${result.description}
                </p>
            </div>

            <!-- 3 Attributes Analysis -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center">色彩属性分析</h3>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Warm/Cold -->
                    <div class="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-semibold text-gray-800">冷暖调</h4>
                            <span class="text-purple-600 font-bold">${result.warmColdScore}/10</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div class="bg-gradient-to-r from-blue-400 to-orange-400 h-full rounded-full" style="width: ${result.warmColdScore * 10}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 mb-2">
                            <span>冷调</span>
                            <span>暖调</span>
                        </div>
                        <p class="text-sm text-gray-600">${result.warmColdDesc}</p>
                    </div>

                    <!-- Light/Dark -->
                    <div class="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-semibold text-gray-800">明度</h4>
                            <span class="text-purple-600 font-bold">${result.lightDarkScore}/10</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div class="bg-gradient-to-r from-gray-800 to-white h-full rounded-full" style="width: ${result.lightDarkScore * 10}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 mb-2">
                            <span>深暗</span>
                            <span>明亮</span>
                        </div>
                        <p class="text-sm text-gray-600">${result.lightDarkDesc}</p>
                    </div>

                    <!-- Saturation -->
                    <div class="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-semibold text-gray-800">饱和度</h4>
                            <span class="text-purple-600 font-bold">${result.saturationScore}/10</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div class="bg-gradient-to-r from-gray-400 to-red-500 h-full rounded-full" style="width: ${result.saturationScore * 10}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 mb-2">
                            <span>低饱和</span>
                            <span>高饱和</span>
                        </div>
                        <p class="text-sm text-gray-600">${result.saturationDesc}</p>
                    </div>
                </div>
            </div>

            <!-- Color Palettes -->
            <div class="mb-10">
                <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center">专属色板推荐</h3>
                
                <!-- Basic Colors -->
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <span class="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        基础色系 · 日常百搭
                    </h4>
                    <div class="grid grid-cols-6 md:grid-cols-12 gap-3 justify-items-center" id="basic-colors">
                        <!-- Color swatches will be inserted here -->
                    </div>
                </div>

                <!-- Bright Colors -->
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                        提亮色系 · 提升气色
                    </h4>
                    <div class="grid grid-cols-6 md:grid-cols-12 gap-3 justify-items-center" id="bright-colors">
                        <!-- Color swatches will be inserted here -->
                    </div>
                </div>

                <!-- Accent Colors -->
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        点睛色系 · 点缀使用
                    </h4>
                    <div class="grid grid-cols-6 md:grid-cols-12 gap-3 justify-items-center" id="accent-colors">
                        <!-- Color swatches will be inserted here -->
                    </div>
                </div>

                <!-- Occasion Colors -->
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                        <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        场合色系 · 特殊场景
                    </h4>
                    <div class="grid grid-cols-6 md:grid-cols-12 gap-3 justify-items-center" id="occasion-colors">
                        <!-- Color swatches will be inserted here -->
                    </div>
                </div>
            </div>

            <!-- Matching Ideas -->
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    经典搭配方案
                </h3>
                <div class="grid md:grid-cols-2 gap-3">
                    ${(result.matchingIdeas || []).map(idea => `
                        <div class="bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-lg flex items-center">
                            <span class="w-1.5 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-3"></span>
                            <span class="text-gray-700">${idea}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Recommendations -->
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <!-- Clothing -->
                <div class="season-card bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <div class="text-blue-600 mb-3">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-2">服装色彩</h4>
                    <p class="text-gray-600 text-sm">
                        ${result.clothing}
                    </p>
                </div>

                <!-- Jewelry -->
                <div class="season-card bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl">
                    <div class="text-amber-600 mb-3">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-2">首饰选择</h4>
                    <p class="text-gray-600 text-sm">
                        ${result.jewelry}
                    </p>
                </div>

                <!-- Makeup -->
                <div class="season-card bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
                    <div class="text-pink-600 mb-3">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                        </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-2">彩妆建议</h4>
                    <p class="text-gray-600 text-sm">
                        ${result.makeup}
                    </p>
                </div>
            </div>

            <!-- Hair Color Recommendations -->
            <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    发色建议
                </h3>
                <div class="grid md:grid-cols-3 gap-4">
                    <!-- Best Hair Colors -->
                    <div>
                        <h4 class="font-semibold text-green-700 mb-3 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            最适合
                        </h4>
                        <div class="space-y-2">
                            ${(result.bestHairColors || []).map(color => `
                                <div class="bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-lg">
                                    <p class="font-medium text-gray-800 text-sm">${color.name}</p>
                                    <p class="text-gray-600 text-xs">${color.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- OK Hair Colors -->
                    <div>
                        <h4 class="font-semibold text-blue-700 mb-3 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            可以尝试
                        </h4>
                        <div class="space-y-2">
                            ${(result.okHairColors || []).map(color => `
                                <div class="bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-lg">
                                    <p class="font-medium text-gray-800 text-sm">${color.name}</p>
                                    <p class="text-gray-600 text-xs">${color.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Avoid Hair Colors -->
                    <div>
                        <h4 class="font-semibold text-red-700 mb-3 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            尽量避免
                        </h4>
                        <div class="space-y-2">
                            ${(result.avoidHairColors || []).map(color => `
                                <div class="bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-lg">
                                    <p class="font-medium text-gray-800 text-sm">${color.name}</p>
                                    <p class="text-gray-600 text-xs">${color.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avoid Colors -->
            <div class="bg-red-50 p-6 rounded-xl mb-8">
                <h4 class="font-semibold text-red-700 mb-2 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    需要避开的颜色
                </h4>
                <p class="text-red-600 text-sm">
                    ${result.avoid}
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap justify-center gap-4">
                <button id="dynamic-retest-btn" class="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition">
                    重新测试
                </button>
                <button id="dynamic-share-btn" class="gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
                    分享结果
                </button>
            </div>
        </div>
        `;

        // 插入到结果容器
        this.resultContainer.innerHTML = resultHtml;

        // 生成所有色板
        const generateSwatches = (containerId, colors) => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'w-10 h-10 rounded-full shadow-md transition hover:scale-110';
                swatch.style.backgroundColor = color;
                swatch.title = color;
                container.appendChild(swatch);
            });
        };

        // 确保所有数组字段都有默认值
        result.warmColdScore = result.warmColdScore || 5;
        result.warmColdDesc = result.warmColdDesc || '正在分析冷暖调属性';
        result.lightDarkScore = result.lightDarkScore || 5;
        result.lightDarkDesc = result.lightDarkDesc || '正在分析明度属性';
        result.saturationScore = result.saturationScore || 5;
        result.saturationDesc = result.saturationDesc || '正在分析饱和度属性';
        
        generateSwatches('basic-colors', result.basicColors || []);
        generateSwatches('bright-colors', result.brightColors || []);
        generateSwatches('accent-colors', result.accentColors || []);
        generateSwatches('occasion-colors', result.occasionColors || []);

        // 绑定按钮事件
        document.getElementById('dynamic-retest-btn').addEventListener('click', () => {
            this.resetTest();
        });

        document.getElementById('dynamic-share-btn').addEventListener('click', () => {
            this.shareResult();
        });
    }

    resetTest() {
        this.removeImage();
        this.comparisonSection.classList.add('hidden');
        this.resultContainer.innerHTML = ''; // 清空结果
        this.uploadSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    shareResult() {
        const seasonType = document.getElementById('season-type').textContent;
        const seasonSubtype = document.getElementById('season-subtype').textContent;
        const shareText = `我刚做了AI个人色彩测试，我的色彩类型是${seasonType}·${seasonSubtype}！你也来试试吧~`;
        
        if (navigator.share) {
            navigator.share({
                title: 'AI个人色彩测试结果',
                text: shareText,
                url: window.location.href
            });
        } else {
            // 复制链接到剪贴板
            navigator.clipboard.writeText(`${shareText} ${window.location.href}`).then(() => {
                alert('结果链接已复制到剪贴板，快去分享给朋友吧！');
            });
        }
    }

    // 百度AI API调用（实际开发时使用）
    async callBaiduFaceAPI(imageBase64) {
        // TODO: 实际部署时需要后端代理，避免暴露API密钥
        const apiKey = 'YOUR_BAIDU_API_KEY';
        const secretKey = 'YOUR_BAIDU_SECRET_KEY';
        
        // 1. 获取access_token
        const tokenResponse = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`);
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. 调用人脸分析API
        const analyzeResponse = await fetch(`https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageBase64.split(',')[1], // 去掉data:image/...前缀
                image_type: 'BASE64',
                face_field: 'age,gender,skin_color,lip_color,eye_color,hair_color'
            })
        });

        const analyzeData = await analyzeResponse.json();
        return analyzeData;
    }

    // 根据百度API返回的特征分析色彩类型
    analyzeColorType(faceFeatures) {
        // TODO: 实现色彩匹配算法
        // 根据skin_color, hair_color, eye_color等特征匹配到对应的季节类型
        // 这里需要结合韩国色彩测试的专业规则来实现
    }
}

// 辅助函数：十六进制颜色转RGB
function hexToRgb(hex) {
    // 处理简写形式，如 #fff
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ColorTest();
});

// 百度API配置提示
console.log('提示：部署到生产环境时，请将script.js中的百度API密钥替换为你自己的，并通过后端代理调用API，避免密钥泄露。');
