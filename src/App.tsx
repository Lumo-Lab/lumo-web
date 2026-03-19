import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(0,76,115,.15);color:#004C73}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
:root{--jk:'Plus Jakarta Sans',sans-serif;--in:'Inter',sans-serif;--blue:#004C73;--teal:#4ECDC4;--bg:#fff;--bg2:#F6F8FA;--txt:#0F1C24;--txt2:#3A4F5C;--txt3:#6B8394;--txt4:#9BB0BD;--brd:rgba(0,30,50,.08);--bl:rgba(0,76,115,.06)}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}
@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
.fi{animation:fadeUp .8s cubic-bezier(.22,1,.36,1) both}
.d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.55s}.d5{animation-delay:.7s}
.mq-t{display:flex;gap:56px;animation:marquee 40s linear infinite;width:max-content}
.cta-m{display:inline-flex;align-items:center;gap:10px;background:var(--blue);color:#fff;padding:14px 28px;border-radius:50px;font-family:var(--jk);font-size:14px;font-weight:700;text-decoration:none;border:none;cursor:pointer;transition:all .3s}
.cta-m:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,76,115,.2)}
.cta-g{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--txt2);padding:14px 28px;border-radius:50px;font-family:var(--jk);font-size:14px;font-weight:600;text-decoration:none;border:1px solid var(--brd);cursor:pointer;transition:all .3s}
.cta-g:hover{border-color:var(--blue);color:var(--blue)}
.card{border:1px solid var(--brd);border-radius:16px;padding:28px 24px;background:#fff;transition:all .35s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--blue),transparent);opacity:0;transition:opacity .3s}
.card:hover{border-color:rgba(0,76,115,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,30,50,.05)}
.card:hover::before{opacity:1}
.er{padding:22px 0;border-bottom:1px solid rgba(0,30,50,.05);transition:padding-left .3s}
.er:hover{padding-left:12px}
.er:hover h4{color:var(--blue)}
.er:hover .ea{opacity:1;transform:translateX(4px)}
.ea{opacity:0;transition:all .3s;color:var(--blue)}
.ft{padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;border:1px solid rgba(0,76,115,.12);color:var(--blue);font-family:var(--jk);background:var(--bl)}
.fb{background:#fff;border:1px solid var(--brd);color:var(--txt3);padding:7px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;font-family:var(--jk)}
.fb.active{border-color:var(--blue);color:#fff;background:var(--blue)}
.sd{border:1px solid var(--brd);border-radius:16px;padding:36px 32px;background:#fff;transition:all .3s;cursor:pointer;position:relative;overflow:hidden}
.sd:hover{border-color:rgba(0,76,115,.1)}
.ul{position:relative;text-decoration:none;color:var(--txt)}.ul::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--blue);transition:width .3s}.ul:hover::after{width:100%}
@media(max-width:900px){
  .lumo div[style*="display: grid"],.lumo div[style*="display:grid"]{display:flex!important;flex-direction:column!important;gap:24px!important}
  .lumo div[style*="grid-column"]{grid-column:auto!important}
  .lumo div[style*="position: sticky"],.lumo div[style*="position:sticky"]{position:static!important}
  .lumo h1{font-size:clamp(24px,7vw,42px)!important;line-height:1.05!important}
  .lumo h2{font-size:clamp(22px,5vw,32px)!important;line-height:1.1!important}
  .lumo section{padding-top:56px!important;padding-bottom:56px!important}
  .lumo .hero-s{min-height:auto!important;padding-top:100px!important;padding-bottom:48px!important}
  .lumo .nav-links{display:none!important}
  .lumo footer{flex-direction:column!important;gap:8px!important;text-align:center!important}
  .cf>div:last-child{display:none!important}
  /* Footer 3-col fix */
  .lumo .footer-grid{display:flex!important;flex-direction:column!important;gap:32px!important}
  /* Founder bar fix */
  .lumo .founder-bar{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
  .lumo .founder-bar .cta-m{width:100%!important;justify-content:center!important}
  /* Testimonial card */
  .lumo .test-card{padding:28px 20px!important}
  /* Process timeline hide middle column */
  .lumo .proc-grid{display:flex!important;flex-direction:column!important;gap:24px!important}
  .lumo .proc-grid>div:nth-child(2){display:none!important}
  .lumo .proc-grid>div:first-child{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:8px!important}
  .lumo .proc-grid>div:first-child>div{padding:8px 0!important;border-bottom:none!important}
}
@media(max-width:600px){
  .hero-stats{flex-direction:column!important;gap:12px!important}
  .hero-stats>div{border-right:none!important;padding:8px 0!important;border-bottom:1px solid rgba(255,255,255,.06)}
  .hero-stats>div:last-child{border-bottom:none}
  .hero-stats>div>div:first-child{font-size:28px!important}
  .cta-m,.cta-g{width:100%!important;justify-content:center!important}
  .sd{padding:24px 18px!important}
  .card{padding:20px 16px!important}
  /* Case study detail sections */
  .lumo div[style*="grid-template-columns: 160px"]{display:flex!important;flex-direction:column!important;gap:12px!important}
  /* Service accordion inner grid */
  .sd div[style*="grid-template-columns: 1fr 1fr"]{display:flex!important;flex-direction:column!important;gap:20px!important}
  /* Engagement model inner */
  .lumo div[style*="grid-template-columns: 300px"]{display:flex!important;flex-direction:column!important;gap:32px!important}
  /* About page story grid */
  .lumo div[style*="grid-template-columns: 1fr 1fr"]{display:flex!important;flex-direction:column!important;gap:20px!important}
  /* Filter buttons wrap */
  .fb{padding:6px 12px!important;font-size:12px!important}
  /* Role detail view */
  .lumo div[style*="grid-template-columns: 1fr auto"]{display:flex!important;flex-direction:column!important}
  /* Testimonial card */
  .test-card{padding:24px 18px!important}
  .test-card p[style*="font-size"]{font-size:16px!important}
  /* Footer columns text align left on mobile */
  .footer-grid>div{text-align:left!important}
  /* Hero CTA buttons */
  .lumo .hero-s button{width:100%!important;justify-content:center!important}
}
`;

const W=({children,style={}}:{children:ReactNode,style?:CSSProperties})=><div style={{maxWidth:1200,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",...style}}>{children}</div>;
const SL=({ch,light}:{ch:string,light?:boolean})=><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36}}><div style={{width:28,height:2,background:light?"rgba(255,255,255,.3)":"var(--blue)"}}/><span style={{fontSize:11,color:light?"rgba(255,255,255,.4)":"var(--txt4)",fontWeight:700,textTransform:"uppercase",letterSpacing:3,fontFamily:"var(--jk)"}}>{ch}</span></div>;
const Arr=({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const QSvg=()=><svg width="32" height="24" viewBox="0 0 48 36" fill="none" style={{marginBottom:16,opacity:.1}}><path d="M0 36V20C0 8.95 8.95 0 20 0h2v8h-2c-6.63 0-12 5.37-12 12v2h12v14H0zm28 0V20c0-11.05 8.95-20 20-20v8c-6.63 0-12 5.37-12 12v2h12v14H28z" fill="#004C73"/></svg>;

function AnimNum({end,suffix="",delay=0}:{end:number,suffix?:string,delay?:number}){const[v,setV]=useState(0);useEffect(()=>{const tm=setTimeout(()=>{const s=performance.now();const t=(n:number)=>{const p=Math.min((n-s)/2000,1);setV(Math.round((1-Math.pow(1-p,4))*end));if(p<1)requestAnimationFrame(t);};requestAnimationFrame(t);},delay);return()=>clearTimeout(tm);},[end,delay]);return <span>{v}{suffix}</span>;}

/* ── DATA ── */
const cl=["nomo","farmwave","mobilityONE","drift","Noctrix Health","Ziik","ONCE","beUnity","crossiety","trusttoken","Katana Safety","Gamestar+","Aspire Academy"];
const cl3=[...cl,...cl,...cl];
const svcs=[
  {n:"01",t:"Technology Strategy & Advisory",hl:"We diagnose before we prescribe.",d:"We immerse in your business context and user needs to build a strategic roadmap that reduces risk and maximizes ROI.",del:["Technology assessment","Strategic roadmap","Architecture advisory","Risk analysis"],tech:["Workshops","Market Analysis","System Design","Roadmapping"],span:true},
  {n:"02",t:"Product & Experience Design",hl:"Interfaces informed by insight.",d:"Research-driven design aligning user needs with business outcomes.",del:["User research","Wireframes & prototypes","Design system strategy","Usability validation"],tech:["Figma","User Testing","Design Systems","Accessibility"]},
  {n:"03",t:"Solution Engineering",hl:"Strategy-led delivery.",d:"Native iOS, Android, cross-platform, and web solutions — architected for scale.",del:["Native iOS & Android","Cross-platform","Web applications","CI/CD & DevOps"],tech:["React","Swift","Kotlin","Node.js","TypeScript","AWS"]},
  {n:"04",t:"IoT & Connected Systems",hl:"From sensor to insight.",d:"End-to-end IoT ecosystems — architecture, data pipelines, edge computing.",del:["Architecture advisory","Cloud infrastructure","Data pipelines","Edge computing"],tech:["BLE","MQTT","AWS IoT","Edge AI","C++"]},
  {n:"05",t:"AI & Data Strategy",hl:"Turn data into a strategic asset.",d:"AI/ML solutions that automate decisions, surface insights, and create intelligent capabilities.",del:["AI/ML strategy","Data pipelines","Analytics infrastructure","Automation"],tech:["Python","TensorFlow","Data Engineering","ML Ops"]},
];
const engs=[{t:"Technology Strategy & Advisory",d:"We assess your landscape and recommend a clear path forward."},{t:"Embedded Consulting Teams",d:"Our team integrates with yours and delivers alongside you."},{t:"Defined Engagements",d:"Scoped initiative, dedicated team, predictable outcome."},{t:"Knowledge Transfer & Workshops",d:"Sessions that level up your in-house capabilities."},{t:"Startup Partnership",d:"We co-invest our expertise. Risk, vision, and equity shared."}];
const proc=[{ph:"Assess",n:"01",d:"Deep-dive into your business and technology landscape."},{ph:"Advise",n:"02",d:"Every recommendation backed by research and aligned with objectives."},{ph:"Deliver",n:"03",d:"Clean, scalable solutions in iterative sprints."},{ph:"Evolve",n:"04",d:"Ongoing advisory. We guide your technology evolution."}];
const tests=[{q:"Our partnership with Lumo has been instrumental in shaping our long-term vision.",n:"Kevin Ray",r:"Co-Founder & CEO",co:"Nomo International"},{q:"Lumo has done more for us in 7 months than internal teams did in 18 months.",n:"Craig Gannsle",r:"CEO",co:"Farmwave Inc"},{q:"Their communication and user-centric approach have significantly contributed to our app's success.",n:"Jen McCarthy",r:"Business Development",co:"Drift App Inc"}];
const cases=[
  {id:"nomo",name:"NOMO Smart Care",cat:"Health",tags:["IoT","AI/ML","Mobile"],brief:"Full-stack smart care ecosystem with AI-powered elderly monitoring.",ch:"Enable real-time home monitoring and safety alerts for caregivers.",ap:"Full technology assessment — backend architecture, AI strategy for fall detection, native iOS/Android apps.",re:"A scalable smart care platform serving caregivers across multiple countries.",q:"Our partnership with Lumo has been instrumental in shaping our long-term vision.",qn:"Kevin Ray",qr:"Co-Founder & CEO @ Nomo International"},
  {id:"farmwave",name:"Farmwave",cat:"AgTech",tags:["AgTech","Edge AI","DevOps"],brief:"Award-winning AI harvest monitoring with Edge AI.",ch:"Reduce harvest loss using real-time visual data from farm machinery.",ap:"End-to-end platform — backend, real-time dashboard, Edge AI on combines even offline.",re:"AI Harvest Vision Solution of the Year 2025.",q:"Lumo has done more for us in 7 months than internal teams did in 18 months.",qn:"Craig Gannsle",qr:"CEO @ Farmwave Inc"},
  {id:"drift",name:"Drift App",cat:"AgTech",tags:["AgTech","iOS","Geospatial"],brief:"Native iOS tool for herbicide spray drift control.",ch:"Help farmers control spray drift with real-time weather data.",ap:"Native iOS strategy integrating weather APIs, geospatial mapping, and compliance records.",re:"Adopted across the US for spray planning and compliance.",q:"Their communication and user-centric approach contributed to our app's success.",qn:"Jen McCarthy",qr:"Business Development @ Drift App Inc"},
  {id:"noctrix",name:"Noctrix Health",cat:"Health",tags:["Health","iOS","Bluetooth"],brief:"iOS clinician app for a medical wearable device.",ch:"Build a digital interface for the NTX100 neurostimulation system.",ap:"Bluetooth integration architecture and iOS Clinician App for remote therapy management.",re:"A reliable clinical tool for a prescription medical device.",q:"",qn:"",qr:""},
  {id:"mobility",name:"MobilityOne",cat:"Mobility",tags:["SaaS","Frontend"],brief:"SaaS fleet management platform.",ch:"Centralize fleet operational data into a single web app.",ap:"SaaS architecture for mileage, fuel, maintenance, and assignment tracking.",re:"Companies reduce fleet costs through data-driven decisions.",q:"",qn:"",qr:""},
  {id:"beunity",name:"beUnity",cat:"Social",tags:["Mobile","Hybrid"],brief:"Mobile app for organizational communication.",ch:"Replace fragmented channels with a purpose-built mobile platform.",ap:"Hybrid architecture delivering native-like experience on iOS/Android.",re:"Organizations manage all communication through a single channel.",q:"",qn:"",qr:""},
];
const vals=[{n:"01",t:"Understand First",d:"Every engagement starts with listening."},{n:"02",t:"Strategic Clarity",d:"We turn complexity into clear direction."},{n:"03",t:"Long-term Advisory",d:"Partnerships, not one-off projects."},{n:"04",t:"One Team",d:"We embed alongside your people."},{n:"05",t:"Outcome-driven",d:"Every recommendation tied to results."},{n:"06",t:"Delivery Excellence",d:"Strategy backed by engineering."}];
const tl=[{y:"2017",t:"Founded in Croatia",d:"Jurica starts Lumo: understand the challenge before recommending technology."},{y:"2018",t:"First international clients",d:"Strategic partnerships with NOMO and Farmwave."},{y:"2021",t:"Enterprise scale",d:"MobilityOne expands advisory into fleet management."},{y:"2025",t:"Technology consultancy",d:"Lumo formally positions as a consultancy."}];
const blogs=[
  {id:"b1",title:"Why We Stopped Calling Ourselves an Agency",cat:"Strategy",date:"Mar 2025",read:"5 min",excerpt:"The shift from agency to consultancy reflects how we deliver value.",body:"For years, Lumo operated as a software agency. But our best projects were ones where we pushed back on the brief — asked 'why' before 'how.' So in 2025, we made it official. We assess before we advise. We recommend, not just execute. We think long-term."},
  {id:"b2",title:"The Build vs. Buy Decision Framework",cat:"Strategy",date:"Feb 2025",read:"7 min",excerpt:"A structured approach to one of the most consequential tech decisions.",body:"Build when software IS your competitive advantage. Buy when the problem is already solved. Consider total cost over 3-5 years. Factor in speed and team capacity."},
  {id:"b3",title:"IoT Architecture Patterns We Actually Use",cat:"Engineering",date:"Jan 2025",read:"8 min",excerpt:"Battle-tested patterns from healthcare and agriculture IoT.",body:"Edge-first processing. Event-driven backends with MQTT. Device shadow pattern. Separate hot and cold data paths. OTA updates from day one."},
  {id:"b4",title:"Separating AI Hype from AI Value",cat:"AI & Data",date:"Dec 2024",read:"6 min",excerpt:"Not every problem needs AI. Here's where it creates real value.",body:"AI creates value with clear, measurable problems involving pattern recognition at scale. Our framework: Do you have data? Is the problem defined? What's the cost of being wrong? Can you measure success?"},
];
const blogCats=["All","Strategy","Engineering","AI & Data"];
const roles=[
  {id:"r1",title:"Senior Frontend Developer",type:"Full-time",loc:"Remote (EU)",team:"Engineering",desc:"Lead frontend architecture and deliver polished interfaces.",reqs:["5+ years React/TypeScript","Design systems experience","Performance & accessibility focus"],offer:["Direct impact on real products","Senior team","Flexible remote"]},
  {id:"r2",title:"Full-Stack Developer",type:"Full-time",loc:"Remote (EU)",team:"Engineering",desc:"End-to-end development — APIs, frontends, deployment pipelines.",reqs:["3+ years full-stack","AWS experience","CI/CD and testing"],offer:["Diverse tech stacks","Mentorship","Client interaction"]},
  {id:"r3",title:"IoT Engineer",type:"Full-time",loc:"Remote / Croatia",team:"Engineering",desc:"Design and build connected device systems.",reqs:["4+ years IoT/embedded","BLE, MQTT, AWS IoT","Edge computing"],offer:["Lead IoT architecture","Meaningful products","Equity options"]},
  {id:"r4",title:"UX/UI Design Lead",type:"Full-time",loc:"Remote (EU)",team:"Design",desc:"Own the design practice — research, systems, and shipped interfaces.",reqs:["5+ years UX/UI","Figma & design systems","User research"],offer:["Define design culture","Diverse domains","Product influence"]},
];
const perks=[{i:"🌍",t:"Remote-first",d:"Work from anywhere in EU timezones."},{i:"📈",t:"Growth equity",d:"Senior roles include equity."},{i:"🎯",t:"Meaningful work",d:"Healthcare, agriculture, AI."},{i:"🤝",t:"Client-facing",d:"Direct client access."},{i:"📚",t:"Learning budget",d:"Conferences, courses, tools."},{i:"🏖️",t:"Flexible PTO",d:"Generous time off."}];
const catList=["All",...Array.from(new Set(cases.map(c=>c.cat)))];

/* ── NAV ── */
function Nav({page,go}:{page:string,go:(p:string)=>void}){
  return <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(255,255,255,.88)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(0,30,50,.04)",height:60}}>
    <W style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%"}}>
      <button onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0}}>
        <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
          <circle cx="72" cy="16" r="10" fill="#004C73"/>
          <path d="M20 28 L20 100 C20 106 24 110 30 110 L68 110 C74 110 78 106 78 100 L78 28" stroke="#004C73" strokeWidth="12" strokeLinecap="round" fill="none"/>
          <path d="M36 18 L72 56 L36 56 Z" fill="#8FAFC0" opacity=".7"/>
          <rect x="52" y="8" width="28" height="28" rx="3" fill="#004C73" opacity=".5" transform="rotate(-5 66 22)"/>
        </svg>
        <span style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--txt)"}}>lumo</span>
      </button>
      <div className="nav-links" style={{display:"flex",alignItems:"center",gap:2}}>
        {[{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Work",p:"cases"},{l:"Blog",p:"blog"},{l:"Careers",p:"careers"}].map(({l,p})=>
          <button key={l} onClick={()=>go(p)} style={{color:page===p?"var(--blue)":"var(--txt3)",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:page===p?600:500,fontFamily:"var(--in)",padding:"6px 12px",borderRadius:6}}>{l}</button>
        )}
        <button onClick={()=>go("home")} className="cta-m" style={{padding:"8px 20px",fontSize:12,marginLeft:8}}>Let's talk</button>
      </div>
    </W>
  </nav>;
}
function Back({go,to,label}:{go:(to:string)=>void,to:string,label:string}){return <button onClick={()=>go(to)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--txt3)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:32,fontFamily:"var(--jk)",padding:0}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{label}</button>;}

/* ── HOME ── */
function Home({go}:{go:(p:string)=>void}){
  const[at,setAt]=useState(0);const[ap,setAp]=useState(0);const tlR=useRef<HTMLElement>(null);
  useEffect(()=>{const i=setInterval(()=>setAt(p=>(p+1)%tests.length),5000);return()=>clearInterval(i);},[]);
  useEffect(()=>{const h=()=>{if(!tlR.current)return;const r=tlR.current.getBoundingClientRect();const p=Math.max(0,Math.min(1,(-r.top+200)/(r.height-300)));setAp(Math.min(3,Math.floor(p*4)));};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);

  return <div>
    {/* HERO */}
    <section className="hero-s" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(155deg,#002840,#004C73 40%,#003B5C 70%,#004C73)"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",backgroundSize:"72px 72px",opacity:.4}}/>
      <div style={{position:"absolute",top:"-15%",left:"-10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(78,205,196,.1),transparent 70%)"}}/>
      <W style={{position:"relative",zIndex:2,paddingTop:100,paddingBottom:60,color:"#fff"}}>
        <h1 className="fi d2" style={{fontFamily:"var(--jk)",fontSize:"clamp(36px,6vw,72px)",fontWeight:800,lineHeight:.95,letterSpacing:"-0.035em",marginBottom:24,maxWidth:700}}>
          We advise, guide,<br/>and <span style={{background:"linear-gradient(135deg,#4ECDC4,#7DB9E8,#A8D0E6)",backgroundSize:"200% 200%",animation:"gradShift 6s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>deliver.</span>
        </h1>
        <p className="fi d3" style={{fontSize:17,color:"rgba(255,255,255,.5)",lineHeight:1.7,maxWidth:480,marginBottom:32}}>Lumo is a technology consultancy that brings clarity to complex decisions — from first assessment to long-term partnership.</p>
        <div className="fi d4" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button onClick={()=>go("cases")} style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"var(--blue)",padding:"14px 28px",borderRadius:50,fontFamily:"var(--jk)",fontSize:14,fontWeight:700,border:"none",cursor:"pointer"}}>See our work <Arr s={14} c="var(--blue)"/></button>
          <button onClick={()=>go("about")} className="cta-g" style={{color:"rgba(255,255,255,.7)",borderColor:"rgba(255,255,255,.15)"}}>Learn more</button>
        </div>
        <div className="fi d5 hero-stats" style={{display:"flex",marginTop:56,borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:24}}>
          {[{n:8,s:"yr",l:"Track record"},{n:15,s:"+",l:"Global clients"},{n:6,s:"",l:"Verticals"}].map((s,i)=>(
            <div key={i} style={{flex:1,borderRight:i<2?"1px solid rgba(255,255,255,.05)":"none",paddingRight:i<2?16:0,paddingLeft:i>0?16:0}}>
              <div style={{fontFamily:"var(--jk)",fontSize:40,fontWeight:800,letterSpacing:-2,lineHeight:1}}><AnimNum end={s.n} suffix={s.s} delay={600+i*150}/></div>
              <p style={{fontSize:10,color:"rgba(255,255,255,.25)",marginTop:6,fontWeight:600,textTransform:"uppercase",letterSpacing:2,fontFamily:"var(--jk)"}}>{s.l}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
    {/* MARQUEE */}
    <div style={{borderBottom:"1px solid var(--brd)",padding:"14px 0",overflow:"hidden"}}><div className="mq-t">{cl3.map((c,i)=><span key={i} style={{fontSize:13,color:"var(--txt4)",fontWeight:600,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:12,opacity:.4}}>{c}<span style={{width:3,height:3,borderRadius:"50%",background:"var(--blue)",opacity:.2}}/></span>)}</div></div>
    {/* SERVICES */}
    <section style={{padding:"100px 0"}}><W>
      <SL ch="Services"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginBottom:48}}>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,40px)",fontWeight:800,lineHeight:1.05,color:"var(--txt)"}}>How we help you <span style={{color:"var(--blue)"}}>move forward.</span></h2>
        <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.75,paddingTop:4}}>From initial assessment to long-term advisory — always focused on clarity, quality, and measurable outcomes.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {svcs.map((s,i)=><div key={i} className="card" style={{gridColumn:s.span?"span 2":"span 1",cursor:"pointer"}} onClick={()=>go("services")}>
          <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{s.n}</span>
          <h3 style={{fontFamily:"var(--jk)",fontSize:s.span?18:16,fontWeight:700,margin:"10px 0 6px",color:"var(--txt)"}}>{s.t}</h3>
          <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6}}>{s.hl}</p>
        </div>)}
      </div>
    </W></section>
    {/* PROCESS */}
    <section ref={tlR} style={{padding:"100px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",minHeight:"90vh"}}>
      <W>
        <SL ch="Process"/>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,40px)",fontWeight:800,color:"var(--txt)",marginBottom:56}}>From assessment to <span style={{color:"var(--blue)"}}>impact.</span></h2>
        <div className="proc-grid" style={{display:"grid",gridTemplateColumns:"140px 2px 1fr",gap:"0 36px"}}>
          <div style={{position:"sticky",top:100}}>{proc.map((p,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?"1px solid var(--brd)":"none",cursor:"pointer",fontFamily:"var(--jk)"}} onClick={()=>setAp(i)}>
            <span style={{fontSize:11,fontWeight:700,color:ap===i?"var(--blue)":"var(--txt4)",letterSpacing:2,opacity:ap===i?1:.4,display:"block",marginBottom:2}}>{p.n}</span>
            <span style={{fontSize:13,fontWeight:ap===i?700:500,color:ap===i?"var(--txt)":"var(--txt4)"}}>{p.ph}</span>
          </div>)}</div>
          <div style={{background:"var(--brd)",borderRadius:2,position:"relative",minHeight:300}}>
            <div style={{position:"absolute",top:0,left:0,width:"100%",background:"linear-gradient(var(--blue),var(--teal))",borderRadius:2,transition:"height .5s",height:`${((ap+1)/4)*100}%`}}/>
            {proc.map((_,i)=><div key={i} style={{position:"absolute",top:`${(i/3)*100}%`,left:"50%",transform:"translate(-50%,-50%)",width:10,height:10,borderRadius:"50%",border:`2px solid ${i<=ap?"var(--blue)":"var(--brd)"}`,background:i<=ap?"var(--blue)":"#fff",transition:"all .4s",zIndex:2}}/>)}
          </div>
          <div>{proc.map((p,i)=><div key={i} style={{padding:"16px 0 36px",borderBottom:i<3?"1px solid var(--brd)":"none",opacity:ap>=i?1:.15,transition:"all .5s"}}>
            <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{p.n}</span>
            <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,margin:"6px 0 8px",color:"var(--txt)"}}>{p.ph}</h3>
            <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,maxWidth:420}}>{p.d}</p>
          </div>)}</div>
        </div>
      </W>
    </section>
    {/* TESTIMONIALS */}
    <section style={{padding:"100px 0"}}><W>
      <SL ch="Trust"/>
      <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,40px)",fontWeight:800,color:"var(--txt)",marginBottom:48}}>Voices of our <span style={{color:"var(--blue)"}}>clients.</span></h2>
      <div className="test-card" style={{border:"1px solid var(--brd)",borderRadius:16,padding:"40px 36px",background:"#fff"}}>
        <QSvg/>
        <p style={{fontFamily:"var(--jk)",fontSize:"clamp(16px,2vw,22px)",fontWeight:500,lineHeight:1.65,color:"var(--txt)",fontStyle:"italic",marginBottom:28,maxWidth:640}}>{tests[at].q}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)"}}>{tests[at].n}</p>
            <p style={{fontSize:13,color:"var(--txt3)",marginTop:2}}>{tests[at].r} @ {tests[at].co}</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            {tests.map((_,i)=><button key={i} onClick={()=>setAt(i)} style={{width:10,height:10,borderRadius:"50%",border:"none",cursor:"pointer",background:at===i?"var(--blue)":"var(--brd)",transition:"all .3s"}}/>)}
          </div>
        </div>
      </div>
    </W></section>
    {/* CONTACT — standard footer-style */}
    <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
      <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:48,marginBottom:48}}>
        {/* Col 1: Brand */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
            <svg width="22" height="22" viewBox="0 0 120 120" fill="none"><circle cx="72" cy="16" r="10" fill="#004C73"/><path d="M20 28L20 100C20 106 24 110 30 110L68 110C74 110 78 106 78 100L78 28" stroke="#004C73" strokeWidth="12" strokeLinecap="round" fill="none"/><path d="M36 18L72 56L36 56Z" fill="#8FAFC0" opacity=".7"/><rect x="52" y="8" width="28" height="28" rx="3" fill="#004C73" opacity=".5" transform="rotate(-5 66 22)"/></svg>
            <span style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)"}}>lumo</span>
          </div>
          <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7,maxWidth:260}}>We advise, guide, and deliver. Technology consultancy for startups and enterprises.</p>
        </div>
        {/* Col 2: Contact */}
        <div>
          <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Contact</p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{l:"Email",v:"jurica@lumo.com"},{l:"Phone",v:"+385 98 901 4448"},{l:"Location",v:"Zabok, Croatia"},{l:"Web",v:"www.lumo.com"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:10}}>
              <span style={{fontSize:10,color:"var(--txt4)",fontWeight:700,width:52,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"var(--jk)"}}>{c.l}</span>
              <span style={{fontSize:13,fontWeight:500,color:"var(--txt2)"}}>{c.v}</span>
            </div>)}
          </div>
        </div>
        {/* Col 3: Navigation */}
        <div>
          <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Navigate</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Case Studies",p:"cases"},{l:"Blog",p:"blog"},{l:"Careers",p:"careers"}].map(({l,p})=><button key={l} onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,fontWeight:500,color:"var(--txt3)",padding:0,textAlign:"left",transition:"color .2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color="var(--blue)"} onMouseLeave={e=>(e.target as HTMLElement).style.color="var(--txt3)"}>{l}</button>)}
          </div>
        </div>
      </div>

      {/* Founder mini card */}
      <div className="founder-bar" style={{borderTop:"1px solid var(--brd)",paddingTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          {/* Photo placeholder — replace with <img> in production */}
          <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#3A6D8C,#004C73)",flexShrink:0,overflow:"hidden",border:"2px solid var(--bg2)"}}>
            <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--jk)",fontSize:16,fontWeight:800,color:"rgba(255,255,255,.8)"}}>JM</div>
          </div>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)"}}>Jurica Mlinaric</p>
            <p style={{fontSize:12,color:"var(--txt3)"}}>CEO & Founder @ Lumo</p>
          </div>
        </div>
        <button className="cta-m" style={{padding:"10px 24px",fontSize:13}}>Start a conversation <Arr s={13} c="#fff"/></button>
      </div>
    </W></section>
  </div>;
}

/* ── ABOUT ── */
function About({go:_go}:{go:(p:string)=>void}){return <div style={{paddingTop:76}}>
  <section style={{padding:"48px 0 64px"}}><W><SL ch="About Us"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,lineHeight:1,color:"var(--txt)",marginBottom:16,maxWidth:600}}>We advise, guide, and deliver — technology should serve <span style={{color:"var(--blue)"}}>strategy.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:480}}>A technology consultancy based in Croatia, advising startups and enterprises worldwide.</p>
  </W></section>
  <section style={{borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",padding:"36px 0",background:"var(--bg2)"}}><W style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
    {[{n:8,s:"+",l:"Years"},{n:15,s:"+",l:"Clients"},{n:6,s:"",l:"Verticals"}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"var(--jk)",fontSize:36,fontWeight:800,color:"var(--blue)"}}><AnimNum end={s.n} suffix={s.s}/></div><p style={{fontSize:10,color:"var(--txt4)",marginTop:6,fontWeight:600,textTransform:"uppercase",letterSpacing:2,fontFamily:"var(--jk)"}}>{s.l}</p></div>)}
  </W></section>
  <section style={{padding:"80px 0"}}><W><SL ch="Our story"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,marginBottom:56}}>
      <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.5vw,32px)",fontWeight:800,color:"var(--txt)"}}>From a one-person studio to a global <span style={{color:"var(--blue)"}}>technology consultancy.</span></h2>
      <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.8}}>Lumo started in 2017 with a simple belief: the best outcomes happen when you understand the challenge first. Today we advise and deliver for organizations worldwide.</p>
    </div>
    {tl.map((t,i)=><div key={i} style={{display:"flex",gap:24,padding:"24px 0",borderBottom:i<tl.length-1?"1px solid var(--brd)":"none"}}>
      <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",opacity:.5,minWidth:48}}>{t.y}</span>
      <div><h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",marginBottom:4}}>{t.t}</h3><p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7}}>{t.d}</p></div>
    </div>)}
  </W></section>
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W><SL ch="Our values"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{vals.map((v,i)=><div key={i} className="card"><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{v.n}</span><h3 style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,margin:"10px 0 6px",color:"var(--txt)"}}>{v.t}</h3><p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6}}>{v.d}</p></div>)}</div>
  </W></section>
  {/* FOUNDER / LEADERSHIP */}
  <section style={{padding:"80px 0"}}><W>
    <SL ch="Leadership"/>
    <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:48,alignItems:"start"}}>
      {/* Photo + info */}
      <div>
        {/* Photo placeholder — in production replace with <img src="/images/jurica.jpg" style={{width:"100%",borderRadius:16,objectFit:"cover"}} /> */}
        <div style={{width:"100%",aspectRatio:"3/4",borderRadius:16,background:"linear-gradient(155deg,#3A6D8C,#004C73)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
          <span style={{fontFamily:"var(--jk)",fontSize:56,fontWeight:800,color:"rgba(255,255,255,.15)",position:"relative"}}>JM</span>
        </div>
        <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)"}}>Jurica Mlinaric</h3>
        <p style={{fontFamily:"var(--jk)",fontSize:14,color:"var(--blue)",fontWeight:600,marginTop:4,marginBottom:16}}>CEO & Founder</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <a href="mailto:jurica@lumo.com" className="ul" style={{fontSize:13,fontWeight:500}}>jurica@lumo.com</a>
          <a href="tel:+385989014448" className="ul" style={{fontSize:13,fontWeight:500}}>+385 98 901 4448</a>
        </div>
      </div>
      {/* Bio + quote */}
      <div style={{paddingTop:8}}>
        <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.85,marginBottom:24}}>
          With over 10 years of experience in technology strategy and delivery, Jurica founded Lumo with a simple conviction: the best technology outcomes happen when you truly understand the business challenge first.
        </p>
        <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.85,marginBottom:32}}>
          He has led engagements across healthcare IoT, agricultural AI, fintech platforms, and enterprise SaaS — always focused on bridging the gap between business vision and technical execution. Under his leadership, Lumo has grown from a one-person studio to an international technology consultancy trusted by startups and enterprises alike.
        </p>
        <div style={{border:"1px solid var(--brd)",borderRadius:14,padding:"28px 24px",background:"var(--bg2)"}}>
          <QSvg/>
          <p style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:500,lineHeight:1.65,color:"var(--txt)",fontStyle:"italic",marginBottom:0}}>
            When we truly understand your goals, we can recommend and deliver the right approach — one that moves your business forward. That's what Lumo is about.
          </p>
        </div>
      </div>
    </div>
  </W></section>
</div>;}

/* ── SERVICES ── */
function Services({go:_go}:{go:(p:string)=>void}){const[ex,setEx]=useState(0);return <div style={{paddingTop:76}}>
  <section style={{padding:"48px 0 48px"}}><W><SL ch="For Clients"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,lineHeight:1,color:"var(--txt)",textAlign:"center",marginBottom:16}}>The right technology partner <span style={{color:"var(--blue)"}}>changes everything.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:480,textAlign:"center",margin:"0 auto 28px"}}>We advise, guide, and deliver.</p>
    <div style={{textAlign:"center"}}><button className="cta-m">Start a conversation <Arr s={14} c="#fff"/></button></div>
  </W></section>
  <section style={{padding:"48px 0 80px"}}><W><SL ch="Services in depth"/>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {svcs.map((s,i)=><div key={i} className="sd" onClick={()=>setEx(ex===i?-1:i)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{s.n}</span><h2 style={{fontFamily:"var(--jk)",fontSize:20,fontWeight:800,color:"var(--txt)"}}>{s.t}</h2></div><p style={{fontSize:14,color:"var(--txt2)",fontWeight:500}}>{s.hl}</p></div>
          <div style={{width:32,height:32,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:16,transition:"all .3s",transform:ex===i?"rotate(45deg)":"none"}}><span style={{fontSize:16,color:ex===i?"var(--blue)":"var(--txt4)"}}>+</span></div>
        </div>
        <div style={{maxHeight:ex===i?400:0,overflow:"hidden",transition:"max-height .4s",marginTop:ex===i?20:0}}>
          <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.75,marginBottom:20,maxWidth:540}}>{s.d}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
            <div><p style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:10,opacity:.4}}>Deliverables</p>{s.del.map((d,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--blue)",opacity:.3}}/><span style={{fontSize:12,color:"var(--txt2)"}}>{d}</span></div>)}</div>
            <div><p style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:10,opacity:.4}}>Technologies</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.tech.map(t=><span key={t} className="ft">{t}</span>)}</div></div>
          </div>
        </div>
      </div>)}
    </div>
  </W></section>
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
    <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:64}}>
      <div style={{position:"sticky",top:80,alignSelf:"start"}}><SL ch="Engagement models"/><h2 style={{fontFamily:"var(--jk)",fontSize:28,fontWeight:800,color:"var(--txt)"}}>Flexible ways to <span style={{color:"var(--blue)"}}>work together.</span></h2></div>
      <div>{engs.map((e,i)=><div key={i} className="er"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"baseline",gap:12}}><span style={{fontSize:11,color:"var(--blue)",fontWeight:600,fontFamily:"monospace",opacity:.3}}>{String(i+1).padStart(2,"0")}</span><h4 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:600,color:"var(--txt)",margin:0}}>{e.t}</h4></div><span className="ea">→</span></div><p style={{fontSize:13,color:"var(--txt3)",marginTop:4,paddingLeft:32,lineHeight:1.6}}>{e.d}</p></div>)}</div>
    </div>
  </W></section>
</div>;}

/* ── CASES ── */
function Cases({go:_go}:{go:(p:string)=>void}){const[filt,setFilt]=useState("All");const[sel,setSel]=useState<string|null>(null);const fil=filt==="All"?cases:cases.filter(c=>c.cat===filt);const ac=sel?cases.find(c=>c.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <Back go={()=>setSel(null)} to="" label="All case studies"/>
    <span style={{fontSize:11,color:"var(--blue)",fontWeight:600,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2,opacity:.5}}>{ac.cat}</span>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,color:"var(--txt)",marginTop:6,marginBottom:12}}>{ac.name}</h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:500,marginBottom:20}}>{ac.brief}</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:48}}>{ac.tags.map(t=><span key={t} className="ft">{t}</span>)}</div>
    {[{l:"The Challenge",t:ac.ch},{l:"Our Approach",t:ac.ap},{l:"The Outcome",t:ac.re}].map((s,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:32,padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
      <div><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{String(i+1).padStart(2,"0")}</span><h3 style={{fontFamily:"var(--jk)",fontSize:18,fontWeight:800,marginTop:4,color:"var(--txt)"}}>{s.l}</h3></div>
      <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.8}}>{s.t}</p>
    </div>)}
    {ac.q&&<div style={{marginTop:32,border:"1px solid var(--brd)",borderRadius:16,padding:36,background:"var(--bg2)"}}><QSvg/><p style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:500,lineHeight:1.6,color:"var(--txt)",fontStyle:"italic",marginBottom:20}}>{ac.q}</p><p style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)"}}>{ac.qn}</p><p style={{fontSize:12,color:"var(--txt3)",marginTop:2}}>{ac.qr}</p></div>}
  </W></section></div>;
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <SL ch="Case Studies"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Real challenges. <span style={{color:"var(--blue)"}}>Real outcomes.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:460,marginBottom:36}}>We've advised clients across healthcare, agriculture, fintech, and beyond.</p>
    <div style={{display:"flex",gap:6,marginBottom:40,flexWrap:"wrap"}}>{catList.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {fil.map((c,i)=><div key={c.id} className="cf" onClick={()=>{setSel(c.id);window.scrollTo({top:0});}} style={{display:"grid",gridTemplateColumns:"1fr auto",border:"1px solid var(--brd)",borderRadius:16,overflow:"hidden",cursor:"pointer",background:"#fff",transition:"all .3s"}}>
        <div style={{padding:"28px 24px"}}><div style={{display:"flex",gap:10,marginBottom:10}}><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{String(i+1).padStart(2,"0")}</span><span style={{fontSize:11,color:"var(--txt4)",fontWeight:600,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:1.5}}>{c.cat}</span></div>
          <h2 style={{fontFamily:"var(--jk)",fontSize:20,fontWeight:800,color:"var(--txt)",marginBottom:8}}>{c.name}</h2>
          <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.65,marginBottom:12}}>{c.brief}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{c.tags.map(t=><span key={t} className="ft">{t}</span>)}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",padding:"0 24px",borderLeft:"1px solid var(--brd)"}}><span style={{fontSize:12,color:"var(--txt4)",fontWeight:600,fontFamily:"var(--jk)"}}>View →</span></div>
      </div>)}
    </div>
  </W></section></div>;
}

/* ── BLOG ── */
function Blog({go:_go}:{go:(p:string)=>void}){const[filt,setFilt]=useState("All");const[sel,setSel]=useState<string|null>(null);const fil=filt==="All"?blogs:blogs.filter(p=>p.cat===filt);const ac=sel?blogs.find(p=>p.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <Back go={()=>setSel(null)} to="" label="All articles"/>
    <div style={{maxWidth:600}}>
      <div style={{display:"flex",gap:8,marginBottom:16}}><span className="ft">{ac.cat}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.date}</span></div>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>{ac.title}</h1>
      <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.7,fontStyle:"italic",marginBottom:32}}>{ac.excerpt}</p>
      <div style={{height:1,background:"var(--brd)",marginBottom:32}}/>
      {ac.body.split("\n\n").map((p,i)=><p key={i} style={{fontSize:15,color:"var(--txt2)",lineHeight:1.85,marginBottom:16}}>{p}</p>)}
    </div>
  </W></section></div>;
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <SL ch="Blog"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Insights on technology <span style={{color:"var(--blue)"}}>strategy.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:440,marginBottom:36}}>Perspectives from our practice.</p>
    <div style={{display:"flex",gap:6,marginBottom:40}}>{blogCats.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {fil.map(p=><div key={p.id} className="card" onClick={()=>{setSel(p.id);window.scrollTo({top:0});}} style={{cursor:"pointer"}}>
        <div style={{display:"flex",gap:8,marginBottom:12}}><span className="ft">{p.cat}</span><span style={{fontSize:11,color:"var(--txt4)"}}>{p.date}</span><span style={{fontSize:11,color:"var(--txt4)",marginLeft:"auto"}}>{p.read}</span></div>
        <h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",marginBottom:8,lineHeight:1.25}}>{p.title}</h3>
        <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.65}}>{p.excerpt}</p>
      </div>)}
    </div>
  </W></section></div>;
}

/* ── CAREERS ── */
function Careers({go:_go}:{go:(p:string)=>void}){const[sel,setSel]=useState<string|null>(null);const ac=sel?roles.find(r=>r.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <Back go={()=>setSel(null)} to="" label="All positions"/>
    <div style={{display:"flex",gap:8,marginBottom:12}}><span className="ft">{ac.team}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.type}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.loc}</span></div>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>{ac.title}</h1>
    <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.7,maxWidth:500,marginBottom:36}}>{ac.desc}</p>
    <div style={{marginBottom:36}}><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:14,opacity:.4}}>What we're looking for</p>{ac.reqs.map((r,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--blue)",opacity:.3,marginTop:7,flexShrink:0}}/><p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.7}}>{r}</p></div>)}</div>
    <div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:14,opacity:.4}}>What we offer</p>{ac.offer.map((o,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--teal)",opacity:.5,marginTop:7,flexShrink:0}}/><p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.7}}>{o}</p></div>)}</div>
    <a href="mailto:careers@lumo.com" className="cta-m" style={{marginTop:32,display:"inline-flex"}}>Apply via email <Arr s={14} c="#fff"/></a>
  </W></section></div>;
  return <div style={{paddingTop:76}}>
    <section style={{padding:"48px 0 48px"}}><W><SL ch="Careers"/>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Join a team where <span style={{color:"var(--blue)"}}>great work happens.</span></h1>
      <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:460}}>Small, senior team. Meaningful challenges. No bureaucracy.</p>
    </W></section>
    <section style={{borderTop:"1px solid var(--brd)",padding:"56px 0",background:"var(--bg2)"}}><W>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{perks.map((p,i)=><div key={i} className="card" style={{padding:"20px 18px"}}><div style={{fontSize:22,marginBottom:8}}>{p.i}</div><h3 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",marginBottom:4}}>{p.t}</h3><p style={{fontSize:12,color:"var(--txt3)",lineHeight:1.6}}>{p.d}</p></div>)}</div>
    </W></section>
    <section style={{padding:"64px 0"}}><W><SL ch="Open positions"/>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {roles.map(r=><div key={r.id} onClick={()=>{setSel(r.id);window.scrollTo({top:0});}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",border:"1px solid var(--brd)",borderRadius:12,cursor:"pointer",background:"#fff",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,76,115,.1)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.transform="none";}}>
          <div><span style={{fontSize:10,fontWeight:700,color:"var(--blue)",fontFamily:"var(--jk)",letterSpacing:2,opacity:.4}}>{r.team}</span><h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",marginTop:2}}>{r.title}</h3></div>
          <span style={{fontSize:12,color:"var(--txt4)",fontFamily:"var(--jk)"}}>{r.loc}</span>
        </div>)}
      </div>
      <div style={{marginTop:32,border:"1px solid var(--brd)",borderRadius:14,padding:"28px 24px",background:"var(--bl)"}}>
        <h3 style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:800,color:"var(--txt)",marginBottom:4}}>Don't see your role?</h3>
        <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,marginBottom:16}}>We're always looking for great people.</p>
        <a href="mailto:careers@lumo.com" className="cta-m" style={{display:"inline-flex"}}>Send your CV <Arr s={14} c="#fff"/></a>
      </div>
    </W></section>
  </div>;
}

/* ── APP ── */
export default function App(){
  const[page,setPage]=useState("home");
  const go=(p:string)=>{setPage(p);window.scrollTo({top:0,behavior:"auto"});};
  return <div className="lumo" style={{fontFamily:"var(--in)",color:"var(--txt)",background:"var(--bg)",lineHeight:1.6,overflowX:"hidden",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <style>{css}</style>
    <Nav page={page} go={go}/>
    <div style={{flex:1}}>
    {page==="home"&&<Home go={go}/>}
    {page==="about"&&<About go={go}/>}
    {page==="services"&&<Services go={go}/>}
    {page==="cases"&&<Cases go={go}/>}
    {page==="blog"&&<Blog go={go}/>}
    {page==="careers"&&<Careers go={go}/>}
    </div>
    {/* SHARED CONTACT FOOTER — every page */}
    <section style={{padding:"64px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}>
      <W>
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:48}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <svg width="22" height="22" viewBox="0 0 120 120" fill="none"><circle cx="72" cy="16" r="10" fill="#004C73"/><path d="M20 28L20 100C20 106 24 110 30 110L68 110C74 110 78 106 78 100L78 28" stroke="#004C73" strokeWidth="12" strokeLinecap="round" fill="none"/><path d="M36 18L72 56L36 56Z" fill="#8FAFC0" opacity=".7"/><rect x="52" y="8" width="28" height="28" rx="3" fill="#004C73" opacity=".5" transform="rotate(-5 66 22)"/></svg>
              <span style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)"}}>lumo</span>
            </div>
            <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7,maxWidth:240,marginBottom:20}}>We advise, guide, and deliver. Technology consultancy for startups and enterprises.</p>
            <button onClick={()=>go("home")} className="cta-m" style={{padding:"10px 22px",fontSize:12}}>Start a conversation <Arr s={12} c="#fff"/></button>
          </div>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Contact</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{l:"Email",v:"jurica@lumo.com"},{l:"Phone",v:"+385 98 901 4448"},{l:"Location",v:"Zabok, Croatia"},{l:"Web",v:"www.lumo.com"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:10}}><span style={{fontSize:10,color:"var(--txt4)",fontWeight:700,width:52,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"var(--jk)"}}>{c.l}</span><span style={{fontSize:13,fontWeight:500,color:"var(--txt2)"}}>{c.v}</span></div>)}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Navigate</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Case Studies",p:"cases"},{l:"Blog",p:"blog"},{l:"Careers",p:"careers"}].map(({l,p})=><button key={l} onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,fontWeight:500,color:"var(--txt3)",padding:0,textAlign:"left"}}>{l}</button>)}
            </div>
          </div>
        </div>
      </W>
    </section>
    <footer style={{padding:"28px clamp(16px,4vw,48px)",maxWidth:1200,margin:"0 auto",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--brd)"}}>
      <span style={{fontSize:10,color:"var(--blue)",letterSpacing:1.5,textTransform:"uppercase",fontFamily:"var(--jk)",fontWeight:600}}>Lumo</span>
      <span style={{fontSize:10,color:"var(--blue)",letterSpacing:1,fontWeight:500}}>We advise, guide, and deliver.</span>
    </footer>
  </div>;
}
