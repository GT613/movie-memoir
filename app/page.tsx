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
  {title:'哈尔的移动城堡',year:'2004',score:'9.1',series:0,images:3,line:'环境可以让我一时失去信心，却不能替我决定以后怎样生活。',story:'苏菲被荒野女巫变成老妇人后离开家，闯进哈尔那座摇摇晃晃的城堡。衰老的外表反倒让她不再缩手缩脚。她照顾卡西法，敢对哈尔发火，也敢走进战争留下的荒地。',reflection:'她没有等谁来告诉她值得被爱，手先动起来，路也跟着出现了。看到她，我会想到自己被压力困住的时候。把眼前的小事做好，再朝真正想去的地方走。'},
  {title:'风之谷',year:'1984',score:'8.9',series:0,images:4,line:'众生有灵，必须活下去。',story:'腐海扩张，人类在毒雾和战争的阴影里争夺活路。娜乌西卡却愿意俯下身观察孢子，也愿意靠近被众人惧怕的王虫。',reflection:'真正的强大可以保护生命，也能在仇恨最响的时候保留理解。娜乌西卡的善良带着判断和行动。'},
  {title:'红猪',year:'1992',score:'8.6',series:0,images:2,line:'新的信任，仍会把人往岸边拉一点。',story:'波鲁克开着红色飞机追捕空贼，也把自己藏在猪的面孔后面。年轻的菲儿闯进他的生活，修飞机、谈判，并站到决斗场中央。',reflection:'我在文档里只写了菲儿和“坚定与勇敢”。她敢接下一项大工程，也敢为自己的判断负责。'},
  {title:'侧耳倾听',year:'1995',score:'8.9',series:0,images:3,line:'能看见不足并继续写下去，比一句“我有天赋”更能带我往前。',story:'月岛雯遇见认真学习做小提琴的天泽圣司，也决定把自己的梦想落到纸上。她熬夜写完第一部并不成熟的小说，终于看见了起点。',reflection:'梦想在这里没有被说得很轻松。喜欢一件事以后还要花时间练习，相信自己，也接受自己的不足。'},
  {title:'千与千寻',year:'2001',score:'9.4',series:0,images:3,line:'名字不能丢，心里的尺度也不能丢。',story:'千寻误入神灵世界，只能独自去油屋找工作。她记住自己的名字，照顾受伤的白龙，也在一次次选择中长出胆量。',reflection:'勇敢不等于从此不怕。她一直会怕，只是每一次都多走了一步；善良也没有让她软弱。'},
  {title:'猫的报恩',year:'2002',score:'8.2',series:0,images:4,line:'选择自己的生活，从把“我不愿意”说清楚开始。',story:'小春救下一只猫，稀里糊涂成了猫王国的贵客。起初畏畏缩缩的她，终于在逃离猫国时大声说出自己的意愿。',reflection:'很多困境没有恶龙，只有一句句替你安排好的话。开口的那一刻，自信已经开始长出来。'},
  {title:'幽灵公主',year:'1997',score:'8.9',series:0,images:3,line:'理解不能替代选择，却能让我少被愤怒牵着走。',story:'阿席达卡被邪魔诅咒，来到山林与炼铁场的边界。每一方都有活下去的理由，也都伤害着另一方。',reflection:'我喜欢这个少年英雄，因为他的坚定不靠把谁说成纯粹的坏人。他背着宿命前行，仍坚持用清醒的眼睛看双方。'},
  {title:'追逐繁星的孩子',year:'2011',score:'7.4',series:1,images:3,line:'放不下也可以，人不必先毫无牵挂，才继续生活。',story:'明日菜跟随森崎老师穿过生死之门。老师想复活亡妻，她也放不下刚刚得到又失去的相遇。旅程尽头，死者仍不能被完整带回。',reflection:'它是我最喜欢的新海诚作品之一。我在老师身上看到一种难堪又真实的执念。承认想念，随后带着它回来。'},
  {title:'铃芽之旅',year:'2022',score:'7.2',series:1,images:2,line:'有些安慰等不到别人补上，我可以试着回去接住自己。',story:'铃芽和被变成椅子的草太一路关门，从九州走到东京。草太成为要石后，她哭过，仍决定赶往常世把他带回。',reflection:'我最喜欢草太消失后铃芽重燃斗志的那一段。勇敢在这里有一个清楚的瞬间，知道可能失败，还是出发。'},
  {title:'天气之子',year:'2019',score:'7.0',series:1,images:2,line:'再宏大的正确，也要看代价究竟由谁支付。',story:'帆高在连绵大雨里遇见能让天空放晴的阳菜。城市要求她牺牲时，他闯过重重阻拦，把她从天空带回。',reflection:'阳菜是一位晴女，也是小太阳。电影提醒我，别轻易把一个人的牺牲说成理所当然。'},
  {title:'言叶之庭',year:'2013',score:'8.3',series:1,images:3,line:'在最难走的一段路上，互相陪一会儿。',story:'雨天，喜欢做鞋的孝雄在新宿御苑遇见暂时逃开生活的雪野。雨季结束，两个人也得重新走回各自的人生。',reflection:'我把它当作夏日雨天专属的治愈电影。听从内心不等于马上得到结局，继续往前已经是一份温柔的答案。'},
  {title:'春天不是读书天',year:'1986',score:'8.0',series:2,images:3,line:'真正的松弛，也包含对选择负责。',story:'菲利斯装病逃课，带朋友闯进芝加哥。笑声下面，卡梅伦一直怕父亲；法拉利冲出车库后，他终于决定自己面对。',reflection:'它给我的不只是一句“活在当下”。休息和快乐并不可耻，而长大也意味着愿意承担选择的后果。'},
  {title:'本杰明巴顿奇事',year:'2008',score:'9.0',series:2,images:3,line:'时间会带走许多东西，至少在拥有时好好看着它。',story:'本杰明逆向生长，与黛西在不同年龄里靠近，又总被时间错开。奎妮、迈克船长与朋友教他进入世界，也教他告别。',reflection:'我最喜欢迈克船长。这部电影让我珍惜能够同行的那一段。爱无法让两个人停在同一个年龄，仍然值得认真相遇。'},
  {title:'弱点',year:'2009',score:'8.7',series:2,images:2,line:'帮助一个人，需要给他条件，也要把选择还给他。',story:'陶西一家在寒夜里把沉默的迈克尔·奥赫带回家。莉安提醒他，把队友当成需要保护的家人。',reflection:'爱使奥赫成为自己，而尊重比替他决定更重要。温暖故事不能代替当事人的声音。'},
  {title:'魔法奇缘',year:'2007',score:'7.3',series:2,images:2,line:'认清现实以后，仍然满怀希望。',story:'童话王国的吉赛尔公主意外来到纽约。这里没有自动出现的王子，她仍唱歌、相信善意，也学会辨认真正的感情。',reflection:'长大不必把心里所有会唱歌的地方都关掉。允许自己保留天真，同时练习判断。'},
  {title:'白日梦想家',year:'2013',score:'8.6',series:2,images:3,line:'美好的东西，从不会寻求关注。',story:'沃尔特管理着《生活》杂志的底片，一张失踪的照片让他真正走进想象了无数次的远方。',reflection:'肖恩遇见雪豹时放下相机，只看了一会儿。我想少在想象里预演人生，多走出一步。'},
  {title:'律政俏佳人',year:'2001',score:'7.7',series:2,images:3,line:'把能力练出来，也不必换掉自己的颜色。',story:'艾丽一路追到哈佛法学院，从挽回爱情的念头出发，却靠扎实准备与独特经验赢得尊重。',reflection:'她没有模仿别人心中律师的样子。认真和漂亮可以同时存在，温柔也能在法庭上站稳。'},
  {title:'与玛格丽特的午后',year:'2010',score:'9.0',series:2,images:2,line:'人与人的善意，有时就藏在一个普通的午后。',story:'识字不多的热尔曼在公园长椅上遇见九十五岁的玛格丽特。她读书给他听，把书里的世界一点点递给他。',reflection:'阅读可以发生在很晚的时候。曾经不擅长的事，不代表永远进不去。'},
  {title:'哪吒',year:'2025',score:'8.4',series:3,images:2,line:'生而为魔，那又如何。',story:'哪吒与敖丙面对龙族困局、阐教规训和被写好的秩序，终于看见是谁在定义妖与仙。',reflection:'出生和标签会影响一个人，却不能把结局提前写完。把判断自己的权力拿回来，也别急着用阵营判断别人。'},
  {title:'霸王别姬',year:'1993',score:'9.6',series:3,images:1,line:'更珍惜平常生活里，能够自由选择的时刻。',story:'程蝶衣和段小楼唱着《霸王别姬》，也被时代从民国推过战火与运动年月。戏里有固定唱词，戏外却一次次被迫改口。',reflection:'我很难把希望说得轻巧。这部电影让我看见人在时代里怎样被塑造，也怎样守住一点自己。'},
  {title:'心灵奇旅',year:'2020',score:'8.7',series:4,images:2,line:'我不必等到完成某个大目标，才算开始生活。',story:'乔伊终于得到登台机会，却跌进灵魂世界。披萨的味道、风吹树叶的声音，让他与22号重新理解所谓火花。',reflection:'舞台之后，第二天仍会到来。把注意力放回今天，认真感受正在发生的事。'},
  {title:'垫底辣妹',year:'2015',score:'8.3',series:4,images:2,line:'想改变，就把今晚能做的一页先做完。',story:'成绩垫底的沙耶加与坪田老师定下考庆应大学的目标。她补基础，反复受挫，又一次次回到书桌。',reflection:'逆袭在剪辑里只有几分钟，在生活里却是一道题一道题做出来的。别用现在的排名给未来封口。'},
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
    {scene==='loading' && <section className="loading-scene"><video className="loading-video" autoPlay muted loop playsInline><source src="/assets/loading/background.mp4" type="video/mp4"/></video><div className="loading-shade"/><div className="loading-copy"><div className="title-loader" aria-label={`电影回忆录，加载 ${progress}%`}><span className="title-base">电影回忆录</span><span className="title-fill" style={{clipPath:`inset(${100-progress}% 0 0 0)`}}>电影回忆录</span><span className="waterline" style={{top:`${100-progress}%`}}/></div><div className="progress-row"><span>LOADING</span><i><b style={{width:`${progress}%`}}/></i><span>{String(progress).padStart(3,'0')}%</span></div>{progress===100 && <button className="start-button" onClick={enterRaffle}><span>开始</span><small>ENTER</small></button>}</div><p className="loading-note">一个记录我看过的电影<br/>同时向大家推荐好电影的网站</p></section>}

    {scene==='raffle' && <section className="raffle-scene"><header className="topbar"><button className="brand" onClick={()=>setScene('loading')}>电影回忆录<small>MOVIE MEMOIR</small></button><div className="top-actions"><span>不知道看什么？</span><button className="sound" onClick={()=>setMuted(!muted)}>{muted?'♫ OFF':'♫ ON'}</button></div></header><aside className="legend"><p className="eyebrow">FIVE COLLECTIONS</p><h2>五种电影<br/>五种心情</h2><div className="legend-list">{series.map((s,i)=><button key={s.name} onClick={()=>{const pool=movies.filter(m=>m.series===i);setPicked(pool[Math.floor(Math.random()*pool.length)])}}><i style={{background:s.color}}/><span>{s.name}<small>{movies.filter(m=>m.series===i).length} 部收藏</small></span></button>)}</div><p className="hint">不知道看什么电影时<br/>点击玻璃瓶，随机抽取一部。</p></aside><div className="bottle-stage"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><p className="bottle-label"><span>SHAKE</span>摇一摇<br/>让电影替今晚做决定</p><button className="bottle-button" onClick={draw} aria-label="点击玻璃瓶随机抽取电影"><img src="/assets/raffle/%E7%93%B6%E5%AD%90.png" alt="装着五色纸卷的玻璃瓶"/><span>点击抽取</span></button></div>{picked && <div className="reveal" role="dialog" aria-modal="true"><button className="reveal-close" onClick={()=>setPicked(null)}>关闭 ×</button><div className="paper-wrap"><img src={`/assets/raffle/${encodeURIComponent(series[picked.series].paper)}`} alt="展开的纸卷"/><div className="paper-copy"><span style={{color:series[picked.series].color}}>{series[picked.series].name} · 今晚推荐</span><button onClick={()=>openDetail(picked)}>{picked.title}</button><p>{picked.line}</p></div></div><div className="reveal-actions"><button className="primary" onClick={()=>openDetail(picked)}>跳转电影介绍 <span>↗</span></button><button onClick={draw}>再摇一次</button><button onClick={()=>setPicked(null)}>返回摇摇乐</button></div></div>}</section>}

    {scene==='detail' && <section className="detail-scene"><header className="detail-nav"><button className="brand light" onClick={enterRaffle}>电影回忆录<small>MOVIE MEMOIR</small></button><nav><button onClick={enterRaffle}>摇摇乐</button><button onClick={()=>setMenuOpen(!menuOpen)}>片单目录　{menuOpen?'×':'☰'}</button><button className="sound" onClick={()=>setMuted(!muted)}>{muted?'♫ OFF':'♫ ON'}</button></nav></header>{menuOpen && <div className="movie-menu">{series.map((s,i)=><div key={s.name}><h3 style={{color:s.color}}>{s.name}</h3>{movies.filter(m=>m.series===i).map(m=><button key={m.title} onClick={()=>{setDetail(m);setMenuOpen(false);window.scrollTo(0,0)}}>{m.title}</button>)}</div>)}</div>}<div className="detail-hero"><div className="hero-number">{String(movies.indexOf(detail)+1).padStart(2,'0')}<span>/ 22</span></div><div><p className="eyebrow" style={{color:series[detail.series].color}}>{series[detail.series].name} · {detail.year}</p><h1>《{detail.title}》</h1><p className="hero-line">{detail.line}</p><div className="meta"><span>豆瓣 {detail.score}</span><span>{detail.year} 年</span><span>第 {movies.indexOf(detail)+1} 部回忆</span></div></div></div><article className="movie-article"><div className="image-stack">{Array.from({length:detail.images},(_,i)=><figure key={i}><img src={imagePath(detail,i+1)} alt={`${detail.title} 电影画面 ${i+1}`}/><figcaption>{String(i+1).padStart(2,'0')} / {String(detail.images).padStart(2,'0')}</figcaption></figure>)}</div><div className="essay"><section><p className="eyebrow">STORY</p><h2>电影里的故事</h2><p>{detail.story}</p></section><blockquote>“{detail.line}”</blockquote><section><p className="eyebrow">MY NOTE</p><h2>我从中带走的东西</h2><p>{detail.reflection}</p></section></div></article><footer className="detail-footer"><p className="eyebrow">KEEP EXPLORING</p><h2>下一部，也许就在这里</h2><div className="next-list">{related.slice(0,3).map(m=><button key={m.title} onClick={()=>{setDetail(m);window.scrollTo({top:0,behavior:'smooth'})}}><span>{m.year}</span><strong>{m.title}</strong><i>→</i></button>)}</div><button className="back-raffle" onClick={enterRaffle}>跳转摇摇乐 <span>↗</span></button></footer></section>}
  </main>;
}
