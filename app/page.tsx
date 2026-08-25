'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Movie = { title: string; year: string; score: string; series: number; images: number; line: string; story: string; reflection: string };

const series = [
  { name: '宫崎骏', color: '#c8734b', paper: '纸卷1.webp', music: '宫崎骏.mp3' },
  { name: '新海诚', color: '#5b82a6', paper: '纸卷2.webp', music: '新海诚.mp3' },
  { name: '欧美电影', color: '#c7a25a', paper: '纸卷3.webp', music: '欧美.mp3' },
  { name: '国产电影', color: '#8c4c45', paper: '纸卷4.webp', music: '国风.mp3' },
  { name: '其他', color: '#68836e', paper: '纸卷5.webp', music: '其他.mp3' },
];

const movies: Movie[] = [
  {title:'哈尔的移动城堡',year:'2004',score:'9.1',series:0,images:3,line:'环境可以让我一时失去信心，却不能替我决定以后怎样生活。',story:'帽店姑娘苏菲被荒野女巫施下诅咒，变成一位老妇人。她离开家乡，住进魔法师哈尔的移动城堡。哈尔看起来任性又爱漂亮，却不断化身巨鸟阻止战争，也越来越难恢复人形。苏菲照顾着这个混乱的家，在相处中爱上哈尔，并循着他的童年记忆找到那颗交给卡西法的心。她救回哈尔的心，也在被爱与爱人的过程中解除束缚自己的诅咒。',reflection:'她没有等谁来告诉她值得被爱，手先动起来，路也跟着出现了。看到她，我会想到自己被压力困住的时候。把眼前的小事做好，再朝真正想去的地方走。'},
  {title:'风之谷',year:'1984',score:'8.9',series:0,images:4,line:'众生有灵，必须活下去。',story:'火之七日摧毁工业文明千年后，毒气弥漫的腐海不断扩张，巨型昆虫守卫着这片森林。风之谷公主娜乌西卡能够理解虫群，也秘密研究腐海的植物。多鲁美奇亚军队入侵风之谷，企图复活古代巨神兵并烧毁腐海。娜乌西卡卷入国家之间的战争，又发现腐海正在净化被人类污染的土地。面对失控的王虫群，她选择独自阻止一场毁灭性的冲突。',reflection:'真正的强大可以保护生命，也能在仇恨最响的时候保留理解。娜乌西卡的善良带着判断和行动。'},
  {title:'红猪',year:'1992',score:'8.6',series:0,images:2,line:'新的信任，仍会把人往岸边拉一点。',story:'第一次世界大战后的亚得里亚海，波鲁克以一张猪脸生活，驾驶红色水上飞机追捕空贼。酒店老板吉娜多年来一直等他结束漂泊，年轻机械师菲儿则为他重造飞机，陪他重返天空。波鲁克把战争留下的伤痛藏在玩笑和沉默里，也始终不肯回应吉娜的等待。与卡地士的决斗结束后，他是否恢复人类面貌没有被明说，那段迟迟没有结果的感情也留在海风之中。',reflection:'我在文档里只写了菲儿和“坚定与勇敢”。她敢接下一项大工程，也敢为自己的判断负责。'},
  {title:'侧耳倾听',year:'1995',score:'8.9',series:0,images:3,line:'能看见不足并继续写下去，比一句“我有天赋”更能带我往前。',story:'初中生月岛雯发现借书卡上总有天泽圣司的名字，后来才知道，圣司曾借阅许多书，希望她能够注意到自己。两人从拌嘴走到相互欣赏，圣司准备前往意大利学习制作小提琴，雯也想证明自己能够写作。短暂的分别让她完成第一部小说，也让两个人确认彼此的感情。他们在清晨骑车登上山坡，一起谈起梦想和将来，青涩的爱情没有要求谁放弃自己的方向。',reflection:'梦想在这里没有被说得很轻松。喜欢一件事以后还要花时间练习，相信自己，也接受自己的不足。'},
  {title:'千与千寻',year:'2001',score:'9.4',series:0,images:3,line:'名字不能丢，心里的尺度也不能丢。',story:'十岁的千寻跟随父母搬家，途中误入神灵居住的世界。父母因贪吃变成猪，千寻只能在汤婆婆经营的浴场工作，并被夺走名字，改称小千。她认识了白龙、锅炉爷爷和无脸男，也在一次次劳动中学会照顾别人。为了救出父母和受伤的白龙，千寻离开浴场寻找钱婆婆。她最终记起白龙真正的名字，也重新找回了自己。',reflection:'勇敢不等于从此不怕。她一直会怕，只是每一次都多走了一步；善良也没有让她软弱。'},
  {title:'猫的报恩',year:'2002',score:'8.2',series:0,images:4,line:'选择自己的生活，从把“我不愿意”说清楚开始。',story:'高中生小春在放学路上救下一只险些被汽车撞到的猫，随后发现它是猫王国的王子。猫王为了报恩，擅自决定让小春嫁给王子。慌乱之中，小春找到猫事务所，向猫男爵、胖猫和乌鸦多多求助。她仍被带进猫王国，身体也开始变成猫。想要回到原来的生活，小春必须拒绝别人替她安排的幸福，并在天亮前逃出王国。',reflection:'很多困境没有恶龙，只有一句句替你安排好的话。开口的那一刻，自信已经开始长出来。'},
  {title:'幽灵公主',year:'1997',score:'8.9',series:0,images:3,line:'理解不能替代选择，却能让我少被愤怒牵着走。',story:'少年阿席达卡身中诅咒，前往西方寻找灾祸的源头，来到炼铁城与森林诸神交战的地方。他在那里遇见被山犬神养大、憎恨人类的少女小桑。阿席达卡几次救下她，也拒绝把她当作需要被改变的人。小桑无法原谅人类，仍愿意相信阿席达卡。两人的感情没有消除森林与炼铁城的矛盾，却让他们在仇恨中保留了理解对方的可能。',reflection:'我喜欢这个少年英雄，因为他的坚定不靠把谁说成纯粹的坏人。他背着宿命前行，仍坚持用清醒的眼睛看双方。'},
  {title:'追逐繁星的孩子',year:'2011',score:'7.4',series:1,images:3,line:'放不下也可以，人不必先毫无牵挂，才继续生活。',story:'少女明日菜常用父亲留下的矿石收音机聆听陌生音乐。她在山间遇见来自地下世界雅戈泰的少年瞬，两人刚刚靠近，瞬便突然死去。明日菜放不下这段短暂的相遇，跟随长相酷似瞬的心和想让亡妻复生的老师森崎进入雅戈泰。三个人都在追赶已经失去的感情，却逐渐看见复活死者需要付出的代价。',reflection:'它是我最喜欢的新海诚作品之一。我在老师身上看到一种难堪又真实的执念。承认想念，随后带着它回来。'},
  {title:'铃芽之旅',year:'2022',score:'7.2',series:1,images:2,line:'有些安慰等不到别人补上，我可以试着回去接住自己。',story:'高中生铃芽遇见负责关闭灾祸之门的青年草太。她误放出要石大臣，草太也被变成一把三条腿的儿童椅。两人一路经过四国、神户和东京，在废墟中共同关闭一道道门。短暂同行让铃芽越来越在意草太，当他被迫成为新的要石，她不愿接受用他的生命换取平静。铃芽进入往门后的世界救他，也在那里重新面对自己失去母亲的童年。',reflection:'我最喜欢草太消失后铃芽重燃斗志的那一段。勇敢在这里有一个清楚的瞬间，知道可能失败，还是出发。'},
  {title:'天气之子',year:'2019',score:'7.0',series:1,images:2,line:'再宏大的正确，也要看代价究竟由谁支付。',story:'离家出走的帆高在阴雨不断的东京遇见阳菜。阳菜能够通过祈祷让天空放晴，两人便一起接受委托，在短暂的晴空下逐渐靠近。阳菜使用力量越多，身体便越接近天空，最终成为平息异常天气的祭品。整个东京都因她的消失重见阳光，帆高却无法接受这个结果。他闯入云层把阳菜带回人间，选择与喜欢的人共同面对一座长期被雨水淹没的城市。',reflection:'阳菜是一位晴女，也是小太阳。电影提醒我，别轻易把一个人的牺牲说成理所当然。'},
  {title:'言叶之庭',year:'2013',score:'8.3',series:1,images:3,line:'在最难走的一段路上，互相陪一会儿。',story:'想成为鞋匠的高中生秋月孝雄，每到下雨的早晨便逃课去日本庭园画鞋。他在那里遇见无法回学校任教的雪野百香里。两人没有立即说明身份，只在雨天见面，分享食物和沉默。孝雄开始为雪野制作一双能够重新走路的鞋，感情也在一次次等待下雨中生长。雨季结束后，他们终于说出压在心里的话，却仍要回到各自的人生，学习独自向前走。',reflection:'我把它当作夏日雨天专属的治愈电影。听从内心不等于马上得到结局，继续往前已经是一份温柔的答案。'},
  {title:'春天不是读书天',year:'1986',score:'8.0',series:2,images:3,line:'真正的松弛，也包含对选择负责。',story:'临近毕业的高中生费里斯假装生病，瞒过父母和学校，邀请女友斯隆与好友卡梅伦去芝加哥玩一天。他借走卡梅伦父亲珍爱的跑车，三人逛博物馆、看球赛，还混进游行队伍。教导主任鲁尼认定费里斯逃课，亲自赶往他家寻找证据。一路从容的费里斯享受着自由，焦虑的卡梅伦则不得不面对跑车损坏以及长期压抑他的父亲。',reflection:'它给我的不只是一句“活在当下”。休息和快乐并不可耻，而长大也意味着愿意承担选择的后果。'},
  {title:'本杰明巴顿奇事',year:'2008',score:'9.0',series:2,images:3,line:'时间会带走许多东西，至少在拥有时好好看着它。',story:'本杰明出生时拥有老人的身体，随后越活越年轻。他从小认识热爱舞蹈的黛西，两人一生反复相遇，又因航海、事业和各自的感情经历错过彼此。直到身体年龄接近，他们才拥有一段能够并肩生活的时光，并生下女儿。随着本杰明继续年轻，他害怕自己最终成为黛西需要抚养的孩子，只能离开家庭。多年后，黛西仍陪着失去记忆的他走到生命尽头。',reflection:'我最喜欢迈克船长。这部电影让我珍惜能够同行的那一段。爱无法让两个人停在同一个年龄，仍然值得认真相遇。'},
  {title:'弱点',year:'2009',score:'8.7',series:2,images:2,line:'帮助一个人，需要给他条件，也要把选择还给他。',story:'无家可归的少年迈克尔辗转于寄养家庭和学校，学习基础薄弱，也很少表达自己。陶西一家在寒冷的夜里遇见他，将他接回家中，并逐渐让他成为家庭成员。迈克尔凭借出色的体格和保护意识进入橄榄球队，却需要补上成绩才能获得大学资格。教练、老师与陶西一家围绕他的升学投入许多精力，他也开始为自己的未来作出选择。',reflection:'爱使奥赫成为自己，而尊重比替他决定更重要。温暖故事不能代替当事人的声音。'},
  {title:'魔法奇缘',year:'2007',score:'7.3',series:2,images:2,line:'认清现实以后，仍然满怀希望。',story:'动画王国的吉赛尔准备嫁给爱德华王子，却被纳丽莎推入魔井，来到现实中的纽约。离婚律师罗伯特和女儿摩根收留了她。吉赛尔起初相信爱情会在第一次见面后直接通向婚礼，和罗伯特相处后，她开始理解争吵、约会和彼此了解也是感情的一部分。爱德华随后赶到纽约，吉赛尔却发现自己真正牵挂的人已经改变。最后救醒她的吻也来自罗伯特。',reflection:'长大不必把心里所有会唱歌的地方都关掉。允许自己保留天真，同时练习判断。'},
  {title:'白日梦想家',year:'2013',score:'8.6',series:2,images:3,line:'美好的东西，从不会寻求关注。',story:'沃尔特在《生活》杂志管理底片，习惯躲进幻想，也一直不敢向同事谢莉尔表达好感。最后一期封面的底片失踪后，他沿着摄影师尚恩留下的线索前往格陵兰、冰岛和喜马拉雅山区。谢莉尔的歌声曾在他的想象中给他跳上直升机的勇气，这段朦胧的感情也推动他走出现有生活。完成旅程后，沃尔特终于能够站在她面前，用真实经历与她重新认识彼此。',reflection:'肖恩遇见雪豹时放下相机，只看了一会儿。我想少在想象里预演人生，多走出一步。'},
  {title:'律政俏佳人',year:'2001',score:'7.7',series:2,images:3,line:'把能力练出来，也不必换掉自己的颜色。',story:'艾丽为了追回男友华纳考入哈佛法学院，却发现华纳已经与别人订婚，也始终轻视她的能力。她在学习和案件实习中逐渐找到自己的方向，助教埃米特则认真听取她的判断，鼓励她继续留下。艾丽最终依靠专业知识赢得庭审，也彻底看清华纳。她没有把新的感情当作另一次证明自己的机会，埃米特是在尊重和并肩工作中走近她的人。',reflection:'她没有模仿别人心中律师的样子。认真和漂亮可以同时存在，温柔也能在法庭上站稳。'},
  {title:'与玛格丽特的午后',year:'2010',score:'9.0',series:2,images:2,line:'人与人的善意，有时就藏在一个普通的午后。',story:'热尔曼几乎不识字，从小因学习困难遭到母亲和老师贬低，成年后靠零工生活。一天，他在公园长椅上遇见九十五岁的玛格丽特。两人一起给鸽子取名，玛格丽特也把小说读给他听。热尔曼起初难以跟上书中的句子，后来开始主动查词和阅读。当玛格丽特视力衰退，又被家人送进养老院时，他决定去接她回来。',reflection:'阅读可以发生在很晚的时候。曾经不擅长的事，不代表永远进不去。'},
  {title:'哪吒',year:'2025',score:'8.4',series:3,images:2,line:'生而为魔，那又如何。',story:'天劫过后，哪吒与敖丙只剩下魂魄，太乙真人试图用七色宝莲为他们重塑肉身。龙族的处境、陈塘关遭遇的袭击和阐教设下的考验，让哪吒再次被推到仙妖秩序之间。为了救回父母和百姓，他与敖丙从对立走向联手，并逐渐查清无量仙翁对妖族的利用。两人最终面对的不只是一场战斗，还有早已替所有人划定身份的规则。',reflection:'出生和标签会影响一个人，却不能把结局提前写完。把判断自己的权力拿回来，也别急着用阵营判断别人。'},
  {title:'霸王别姬',year:'1993',score:'9.6',series:3,images:1,line:'更珍惜平常生活里，能够自由选择的时刻。',story:'程蝶衣和段小楼从小在戏班接受严苛训练，后来凭借《霸王别姬》成为京剧名角。蝶衣长期扮演虞姬，也将对师兄的爱带入戏外。段小楼迎娶菊仙后，蝶衣的执念、菊仙对婚姻的守护和小楼的软弱纠缠在一起。战争与政治运动接连到来，三个人在审判中互相揭伤。多年后，蝶衣再次与小楼排演旧戏，最终把自己的一生留在了虞姬的结局里。',reflection:'我很难把希望说得轻巧。这部电影让我看见人在时代里怎样被塑造，也怎样守住一点自己。'},
  {title:'心灵奇旅',year:'2020',score:'8.7',series:4,images:2,line:'我不必等到完成某个大目标，才算开始生活。',story:'中学音乐老师乔伊一直想成为职业爵士乐手，终于得到与知名乐队同台演出的机会，却意外跌入灵魂世界。为了返回身体，他被安排帮助尚未找到火花的灵魂二十二。一次混乱让二十二进入乔伊的身体，乔伊则困在一只猫体内。二十二第一次感受到披萨、街道和风吹落叶，乔伊也开始重新观察自己一直忽略的日常生活。',reflection:'舞台之后，第二天仍会到来。把注意力放回今天，认真感受正在发生的事。'},
  {title:'垫底辣妹',year:'2015',score:'8.3',series:4,images:2,line:'想改变，就把今晚能做的一页先做完。',story:'高中生沙耶加长期沉迷玩乐，成绩处在全年级末尾。母亲把她送进补习班后，坪田老师没有嘲笑她薄弱的基础，反而和她定下考取庆应大学的目标。沙耶加从小学水平重新学起，承受同学议论、父亲反对和多次模拟考试失利。她一度想要放弃，随后重新回到书桌前。漫长的备考也让她与母亲、老师和家人的关系发生变化。',reflection:'逆袭在剪辑里只有几分钟，在生活里却是一道题一道题做出来的。别用现在的排名给未来封口。'},
];

function imagePath(movie: Movie, index: number) { return `/assets/movies/${encodeURIComponent(movie.title)}${index}.webp`; }

export default function Home() {
  const [scene, setScene] = useState<'loading'|'raffle'|'detail'>('loading');
  const [progress, setProgress] = useState(0);
  const [picked, setPicked] = useState<Movie|null>(null);
  const [detail, setDetail] = useState<Movie>(movies[0]);
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const audioPreloads = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    const start = performance.now(); let frame = 0;
    const tick = (now:number) => { const p = Math.min(100, Math.round(((now-start)/4200)*100)); setProgress(p); if(p<100) frame=requestAnimationFrame(tick); };
    frame=requestAnimationFrame(tick); return()=>cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    audioPreloads.current = series.map((item) => {
      const track = new Audio(`/assets/audio/${encodeURIComponent(item.music)}`);
      track.preload = 'auto';
      track.load();
      return track;
    });
    return () => audioPreloads.current.forEach((track) => { track.pause(); track.src = ''; });
  }, []);

  useEffect(() => {
    if (!audio.current || scene === 'loading') return;
    const movie = scene === 'detail' ? detail : picked;
    const src = `/assets/audio/${encodeURIComponent(series[movie?.series ?? 4].music)}`;
    if (audio.current.dataset.track !== src) {
      audio.current.dataset.track = src;
      audio.current.src = src;
      audio.current.load();
    }
    audio.current.volume = .28;
    audio.current.muted = muted;
    audio.current.play().catch(()=>{});
  }, [scene, detail, picked, muted]);

  const related = useMemo(()=>movies.filter(m=>m.series===detail.series && m.title!==detail.title),[detail]);
  const enterRaffle = () => { setScene('raffle'); setPicked(null); audio.current?.play().catch(()=>{}); };
  const draw = () => { let next=movies[Math.floor(Math.random()*movies.length)]; if(picked && movies.length>1) while(next.title===picked.title) next=movies[Math.floor(Math.random()*movies.length)]; setPicked(next); };
  const openDetail = (m:Movie) => { setDetail(m); setScene('detail'); setPicked(null); window.scrollTo({top:0,behavior:'smooth'}); };

  return <main><audio ref={audio} loop preload="auto" />
    {scene==='loading' && <section className="loading-scene"><video className="loading-video" autoPlay muted loop playsInline><source src="/assets/loading/background.mp4" type="video/mp4"/></video><div className="loading-shade"/><div className="loading-copy"><div className="title-loader" aria-label={`电影回忆录，加载 ${progress}%`}><span className="title-base">电影回忆录</span><span className="title-fill" style={{clipPath:`inset(0 ${100-progress}% 0 0)`}}>电影回忆录</span><span className="waterline" style={{left:`${progress}%`}}/></div><div className="progress-row"><span>LOADING</span><i><b style={{width:`${progress}%`}}/></i><span>{String(progress).padStart(3,'0')}%</span></div><div className="start-slot">{progress===100 && <button className="start-button" onClick={enterRaffle}><span>开始</span><small>ENTER</small></button>}</div></div><p className="loading-note">一个记录我看过的电影<br/>同时向大家推荐好电影的网站</p></section>}

    {scene==='raffle' && <section className="raffle-scene"><header className="topbar"><button className="brand" onClick={()=>setScene('loading')}>电影回忆录<small>MOVIE MEMOIR</small></button><div className="top-actions"><span>不知道看什么？</span><button className="sound" onClick={()=>setMuted(!muted)}>{muted?'♫ OFF':'♫ ON'}</button></div></header><aside className="legend"><p className="eyebrow">FIVE COLLECTIONS</p><h2>五种电影<br/>五种心情</h2><div className="legend-list">{series.map((s,i)=><button key={s.name} onClick={()=>{const pool=movies.filter(m=>m.series===i);setPicked(pool[Math.floor(Math.random()*pool.length)])}}><i style={{background:s.color}}/><span>{s.name}<small>{movies.filter(m=>m.series===i).length} 部收藏</small></span></button>)}</div><p className="hint">不知道看什么电影时<br/>点击玻璃瓶，随机抽取一部。</p></aside><div className="bottle-stage"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><p className="bottle-label"><span>SHAKE</span>摇一摇<br/>让电影替今晚做决定</p><button className="bottle-button" onClick={draw} aria-label="点击玻璃瓶随机抽取电影"><img src="/assets/raffle/%E7%93%B6%E5%AD%90.png" alt="装着五色纸卷的玻璃瓶"/><span>点击抽取</span></button></div>{picked && <div className="reveal" role="dialog" aria-modal="true"><button className="reveal-close" onClick={()=>setPicked(null)}>关闭 ×</button><div className="paper-wrap"><img src={`/assets/raffle/${encodeURIComponent(series[picked.series].paper)}`} alt="展开的纸卷"/><div className="paper-copy"><span style={{color:series[picked.series].color}}>{series[picked.series].name} · 今晚推荐</span><button onClick={()=>openDetail(picked)}>{picked.title}</button><p>{picked.line}</p></div></div><div className="reveal-actions"><button className="primary" onClick={()=>openDetail(picked)}>跳转电影介绍 <span>↗</span></button><button onClick={draw}>再摇一次</button><button onClick={()=>setPicked(null)}>返回摇摇乐</button></div></div>}</section>}

    {scene==='detail' && <section className="detail-scene"><header className="detail-nav"><button className="brand light" onClick={enterRaffle}>电影回忆录<small>MOVIE MEMOIR</small></button><nav><button onClick={enterRaffle}>摇摇乐</button><button onClick={()=>setMenuOpen(!menuOpen)}>片单目录　{menuOpen?'×':'☰'}</button><button className="sound" onClick={()=>setMuted(!muted)}>{muted?'♫ OFF':'♫ ON'}</button></nav></header>{menuOpen && <div className="movie-menu">{series.map((s,i)=><div key={s.name}><h3 style={{color:s.color}}>{s.name}</h3>{movies.filter(m=>m.series===i).map(m=><button key={m.title} onClick={()=>{setDetail(m);setMenuOpen(false);window.scrollTo(0,0)}}>{m.title}</button>)}</div>)}</div>}<div className="detail-hero"><div className="hero-number">{String(movies.indexOf(detail)+1).padStart(2,'0')}<span>/ 22</span></div><div><p className="eyebrow" style={{color:series[detail.series].color}}>{series[detail.series].name} · {detail.year}</p><h1>《{detail.title}》</h1><p className="hero-line">{detail.line}</p><div className="meta"><span>豆瓣 {detail.score}</span><span>{detail.year} 年</span><span>第 {movies.indexOf(detail)+1} 部回忆</span></div></div></div><article className="movie-article"><div className="image-stack">{Array.from({length:detail.images},(_,i)=><figure key={i}><img src={imagePath(detail,i+1)} alt={`${detail.title} 电影画面 ${i+1}`}/><figcaption>{String(i+1).padStart(2,'0')} / {String(detail.images).padStart(2,'0')}</figcaption></figure>)}</div><div className="essay"><section><p className="eyebrow">STORY</p><h2>电影里的故事</h2><p>{detail.story}</p></section><blockquote>“{detail.line}”</blockquote><section><p className="eyebrow">MY NOTE</p><h2>我从中带走的东西</h2><p>{detail.reflection}</p></section></div></article><footer className="detail-footer"><p className="eyebrow">KEEP EXPLORING</p><h2>下一部，也许就在这里</h2><div className="next-list">{related.slice(0,3).map(m=><button key={m.title} onClick={()=>{setDetail(m);window.scrollTo({top:0,behavior:'smooth'})}}><span>{m.year}</span><strong>{m.title}</strong><i>→</i></button>)}</div><button className="back-raffle" onClick={enterRaffle}>跳转摇摇乐 <span>↗</span></button></footer></section>}
  </main>;
}
