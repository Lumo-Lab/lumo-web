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
@keyframes gridPulse{0%,100%{opacity:0}40%,60%{opacity:.45}}
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-3%,-5%)}20%{transform:translate(3%,3%)}30%{transform:translate(-5%,1%)}40%{transform:translate(2%,-4%)}50%{transform:translate(-1%,5%)}60%{transform:translate(4%,-2%)}70%{transform:translate(-4%,3%)}80%{transform:translate(1%,-3%)}90%{transform:translate(-2%,4%)}}
.hero-grain{position:absolute;inset:-50%;width:200%;height:200%;opacity:.055;animation:grain .35s steps(1) infinite;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:2}
.grid-bg{background-image:linear-gradient(rgba(0,30,50,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,30,50,.03) 1px,transparent 1px);background-size:56px 56px}
@keyframes pageIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fadeUp .8s cubic-bezier(.22,1,.36,1) both}
.page-enter{animation:pageIn .55s cubic-bezier(.16,1,.3,1) both}
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
.case-hero{transition:box-shadow .35s}.case-hero:hover{box-shadow:0 20px 60px rgba(0,30,50,.18)}.case-hero .ci{transition:transform .6s cubic-bezier(.22,1,.36,1)}.case-hero:hover .ci{transform:scale(1.04)}
.case-card{border-radius:6px;overflow:hidden;position:relative;cursor:pointer;transition:box-shadow .35s,transform .35s}.case-card:hover{box-shadow:0 16px 48px rgba(0,30,50,.15);transform:translateY(-3px)}.case-card .ci{transition:transform .6s cubic-bezier(.22,1,.36,1)}.case-card:hover .ci{transform:scale(1.06)}
.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}.reveal.in{opacity:1;transform:translateY(0)}
.reveal-img{opacity:0;transform:scale(.97);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}.reveal-img.in{opacity:1;transform:scale(1)}
.reveal.d1{transition-delay:.08s}.reveal.d2{transition-delay:.22s}.reveal.d3{transition-delay:.36s}.reveal.d4{transition-delay:.5s}.reveal-img.d1{transition-delay:0s}
.tilt-card{transform-style:preserve-3d;transition:transform .12s ease,box-shadow .35s}.tilt-card:hover{box-shadow:0 24px 56px rgba(0,30,50,.22)}
@media(max-width:900px){
  .lumo div[style*="display: grid"],.lumo div[style*="display:grid"]{display:flex!important;flex-direction:column!important;gap:24px!important}
  .lumo div[style*="grid-column"]{grid-column:auto!important}
  .lumo div[style*="position: sticky"],.lumo div[style*="position:sticky"]{position:static!important}
  .lumo h1{font-size:clamp(40px,9vw,64px)!important;line-height:.95!important}
  .lumo h2{font-size:clamp(24px,5vw,36px)!important;line-height:1.1!important}
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
  .lumo h1{font-size:clamp(38px,11vw,56px)!important;line-height:.92!important}
  .hero-stats{flex-direction:row!important;gap:0!important;flex-wrap:nowrap!important}
  .hero-stats>div{border-right:1px solid rgba(255,255,255,.06)!important;padding:8px 12px!important}
  .hero-stats>div:last-child{border-right:none!important}
  .hero-stats>div>div:first-child{font-size:30px!important}
  .cta-m,.cta-g{width:100%!important;justify-content:center!important}
  /* Blog/work horizontal rows → stack on mobile */
  .lumo .er{flex-direction:column!important;gap:16px!important}
  .lumo .er>div:first-child{width:100%!important;height:200px!important}
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
function useReveal(threshold=0.15){const r=useRef<HTMLDivElement>(null);useEffect(()=>{const el=r.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.querySelectorAll('.reveal,.reveal-img').forEach(n=>n.classList.add('in'));obs.disconnect();}},{threshold});obs.observe(el);return()=>obs.disconnect();},[threshold]);return r;}

/* ── DATA ── */
const cl=["Nomo Smart Care","Farmwave","mobilityONE","Drift App","Noctrix Health","ONCE","beUnity","jumpIN","Ziik","Spika","Greyp Bikes","Zipato","Crossiety","Elektrobit","GlobalLogic","Trust Token","Google","Gamestar+","Aspire Academy", "DeepAR", ];
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
const tests=[
  {q:"Our partnership with Lumo Lab has been instrumental in shaping our long-term vision. They've consistently delivered innovative solutions that align with our strategic goals. The team's deep understanding of our business, coupled with their technical expertise, has been invaluable. We're excited to continue our journey with Lumo Lab as we embark on new challenges and opportunities.",n:"Kevin Ray",r:"Co-Founder & CEO",co:"Nomo International Inc",linkedin:"https://www.linkedin.com/in/kevinjray/",website:"https://nomosmartcare.com"},
  {q:"It's been great working with Lumo Lab. Jurica and his team have consistently delivered results with clear communication and a regular cadence of updates and insights into progress. Lumo has done more for us in 7 months than internal teams did in 18 months. We look forward to a long term strategy with Lumo Lab.",n:"Craig Ganssle",r:"CEO",co:"Farmwave Inc",linkedin:"https://www.linkedin.com/in/craigganssle/",website:"https://farmwave.io"},
  {q:"Lumo Lab has been a key partner in our mobile app development and deployment efforts. Their strong communication, timely delivery, and user-centric approach have significantly contributed to the success of our app. We're grateful for their partnership and look forward to future collaborations.",n:"Jen McCarthy",r:"Business Development",co:"Drift App Inc",linkedin:"https://www.linkedin.com/in/jen-mccarthy/",website:""},
  {q:"Working with Lumo Lab was a true pleasure. Their team was incredibly collaborative, always open to feedback, and committed to building a strong partnership. Their clear and timely communication kept us informed throughout the entire development process, ensuring a smooth and successful project.",n:"Dalibor Cvek",r:"CEO",co:"Once Sport",linkedin:"https://www.linkedin.com/in/daliborCvek/",website:""},
];
const cases=[
  {id:"nomo",name:"NOMO Smart Care",cat:"Health",tags:["IoT","AI/ML","Mobile"],client:"Nomo International, Ltd",website:"nomosmartcare.com",period:"March 2021 – Present",brief:"Full-stack smart care ecosystem with AI-powered elderly monitoring — without cameras.",ch:"Aging adults and their families needed a way to monitor safety at home without intrusive cameras or wearables that get forgotten or rejected. Nomo required a complete technology partner to deliver mobile apps, cloud infrastructure, and AI — all working together at roughly $1/day.",ap:"We structured delivery around three pillars: native iOS (Swift) and Android (Kotlin) apps for real-time alerts and emergency response; a scalable AWS backend using TypeScript, REST APIs, MQTT, and Firebase for secure device-to-user communication; and edge-based audio AI with custom TensorFlow Lite models that classify critical sounds — falls, alarms, distress — locally on the device, so no audio ever leaves the home.",re:"Full production deployment across iOS and Android serving caregivers across multiple countries. Sub-1-second alert latency, native 911 integration via RapidSOS, and real-time monitoring of thousands of devices. Caregivers gained genuine confidence — not because it was watching, but because it was listening intelligently.",q:"Our partnership with Lumo has been instrumental in shaping our long-term vision.",qn:"Kevin Ray",qr:"Co-Founder & CEO @ Nomo International",features:[{t:"Fall Detection",d:"Automatically detects falls and sends immediate alerts to the care circle."},{t:"RapidSOS Ready",d:"Direct 911 integration for life-threatening emergencies."},{t:"Real-Time Alerts",d:"Customisable notifications for activity patterns and events."},{t:"Two-Way Voice",d:"Clear communication through the Nomo Hub."},{t:"Unlimited Care Circle",d:"Invite as many caregivers as needed at no extra cost."},{t:"Group Calls",d:"Coordinated communication across the entire care team."}],tech:["Swift","Kotlin","TypeScript","Node.js","AWS","Firebase","TensorFlow Lite","MQTT","RapidSOS","React.js","Next.js"],services:["Web development","Mobile development","DevOps","IoT solutions","AI solutions","Quality assurance"],cover:"linear-gradient(135deg,#002840 0%,#004C73 50%,#0a7ea4 100%)",headerImg:(process.env.PUBLIC_URL + "/images/nomo_header.png")},
  {id:"farmwave",name:"Farmwave",cat:"AgTech",tags:["AgTech","Edge AI","DevOps"],client:"Farmwave, Inc",website:"farmwave.io",period:"May 2024 – Present",brief:"Award-winning vision AI that autonomously monitors harvest loss on farm machinery — even offline.",ch:"Harvest loss of 3–8+ bushels per acre was going undetected because manual checks were impractical during active harvesting. Farmwave needed an AI system that could run in real time on rugged tablets mounted to farm machinery, often in areas with no internet connectivity.",ap:"We delivered an end-to-end platform: a Node.js backend on Google Cloud Platform for scalability and dynamic data handling; a React.js web interface with server-side rendering for fast, responsive dashboards; and a Flutter tablet application providing a consistent cross-platform experience with native features. The Edge AI layer runs Farmwave's vision models directly on the tablet without cloud dependency, enabling real-time grain loss analysis during harvest.",re:"AI Harvest Vision Solution of the Year 2025. Farmers can now identify exactly where loss is coming from on the machine and adjust on-the-go, recovering 3–8+ bushels per acre per season.",q:"Lumo has done more for us in 7 months than internal teams did in 18 months.",qn:"Craig Gannsle",qr:"CEO @ Farmwave Inc",features:[{t:"Harvest Vision System",d:"Real-time camera sensors on machinery capture and analyse grain loss autonomously."},{t:"Edge AI",d:"AI runs directly on rugged tablets — no internet required in the field."},{t:"Multi-Application Support",d:"Integrates with sprayers and transplant machines for crop health and droplet analysis."},{t:"Data Reporting",d:"Detailed post-session field reports exportable in multiple formats."}],tech:["Node.js","GCP","React.js","Flutter","Edge AI","Computer Vision"],services:["Discovery","Web development","DevOps","AI solutions","Quality assurance"],cover:"linear-gradient(135deg,#1a3a1a 0%,#2d6a2d 50%,#4a9e4a 100%)", headerImg:(process.env.PUBLIC_URL + "/images/farmwave_header.jpg")},
  {id:"beunity",name:"beUnity",cat:"Social",tags:["Mobile","PWA","Hybrid"],client:"beUnity AG",website:"beunity.io",period:"November 2022 – Present",brief:"Interactive communication platform for community-oriented organisations and their members.",ch:"Organisations were managing member communication across fragmented tools — emails, social media, WhatsApp groups. beUnity needed a platform that could centralise communication, event management, and community engagement without requiring members to install a native app.",ap:"We built beUnity as a Progressive Web App (PWA), allowing users to access it directly from a mobile browser and save it to their home screen — no app store required. We wrapped the PWA with Turbo Native to deliver platform-specific features like push notifications, alerts, and badges, giving members a native-like experience while retaining the PWA's ease of updates and cross-platform compatibility.",re:"Organisations across Switzerland manage all member communication, events, and collaboration through a single channel. Updates deploy instantly without requiring manual app updates from users.",q:"",qn:"",qr:"",features:[{t:"Centralised Communication",d:"All channels in one place — no more fragmented tools."},{t:"Event Management",d:"Integrated calendar to organise and promote community events."},{t:"Marketplace",d:"Members post and respond to offers, requests, and resources."},{t:"Groups & Forums",d:"Topic-specific groups so members only see relevant content."},{t:"Member Profiles",d:"Skills and interests visible across the community."},{t:"Interactive Participation",d:"Polls, reactions, and formats that encourage engagement."}],tech:["PWA","Turbo Native","JavaScript","Push Notifications","iOS","Android"],services:["Mobile development","Quality assurance"],cover:"linear-gradient(135deg,#1a0a0a 0%,#5c1a1a 50%,#a83a2e 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/beunity_header.png")},
  {id:"crossiety",name:"Crossiety",cat:"Social",tags:["Mobile","PWA","Community"],client:"Crossiety AG",website:"crossiety.ch",period:"November 2022 – Present",brief:"The resident app for your community, city and region — a digital village square.",ch:"Communities lacked a dedicated digital space for local residents to stay informed and engaged. Crossiety needed a mobile-accessible platform that could connect residents within geographic areas, surface local news and events, and foster genuine community participation — without the friction of app store installation.",ap:"We built Crossiety as a Progressive Web App (PWA) accessible directly from a mobile browser, then wrapped it with Turbo Native to add native mobile capabilities — push notifications, alerts, and badges — while keeping the cross-platform flexibility and instant update cycle of a PWA.",re:"Communities across Switzerland use Crossiety as their digital village square, with residents actively engaging in local news, events, and discussions. Updates reach all users instantly without requiring manual app updates.",q:"",qn:"",qr:"",features:[{t:"Community Building",d:"Residents connect within geographic areas, accessing local news and events."},{t:"Real-Time Communication",d:"News, events, and surveys with comments, bookmarks, and integrated calendars."},{t:"Event & Resource Sharing",d:"Easy sharing across communities with Google Calendar and Apple Calendar integration."},{t:"Push Notifications",d:"Opt-in alerts keep residents informed about important local activities."}],tech:["PWA","Turbo Native","JavaScript","Push Notifications","iOS","Android"],services:["Mobile development","Quality assurance"],cover:"linear-gradient(135deg,#0a2e1a 0%,#1a5c3a 50%,#2ea86e 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/crossiety_header.png")},
  {id:"drift",name:"Drift App",cat:"AgTech",tags:["AgTech","iOS","Geospatial"],client:"Drift App Inc",website:"",period:"",brief:"Native iOS tool helping farmers control herbicide spray drift with real-time weather and geospatial data.",ch:"Herbicide spray drift causes crop damage, compliance violations, and wasted product. Farmers needed a mobile tool that combined real-time weather data, geospatial mapping, and compliance recordkeeping in one place.",ap:"We defined the native iOS architecture, integrating weather APIs for real-time wind and temperature data, geospatial mapping for field-level planning, and a compliance recordkeeping module. The result was a focused, fast, and reliable tool built specifically for field conditions.",re:"Adopted across the United States for spray planning and regulatory compliance. Farmers use it daily to make confident spray decisions and maintain accurate records.",q:"Their communication and user-centric approach have significantly contributed to our app's success.",qn:"Jen McCarthy",qr:"Business Development @ Drift App Inc",features:[{t:"Real-Time Weather",d:"Live wind speed, direction, and temperature data for safe spray windows."},{t:"Geospatial Mapping",d:"Field-level maps for precise spray zone planning."},{t:"Compliance Records",d:"Automatic logging of spray events for regulatory requirements."},{t:"iOS Native",d:"Built for performance and reliability in field conditions."}],tech:["Swift","iOS","Weather APIs","Geospatial","MapKit"],services:["Mobile development","Strategy advisory","Quality assurance"],cover:"linear-gradient(135deg,#0d2d3a 0%,#1a5c6e 50%,#2e8fa8 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/drift_header.jpg")},
  {id:"noctrix",name:"Noctrix Health",cat:"Health",tags:["Health","iOS","Bluetooth"],client:"Noctrix Health",website:"",period:"",brief:"iOS clinician app for the NTX100 — a prescription neurostimulation medical device.",ch:"Noctrix needed a digital interface for their NTX100 neurostimulation system — a prescription medical device for treating restless leg syndrome. The app had to meet clinical reliability standards while managing Bluetooth device communication and therapy programming.",ap:"We designed and built the iOS Clinician App with full Bluetooth integration for the NTX100 hardware. The architecture handled real-time device communication, therapy session management, and clinical data capture — all within the constraints of a regulated medical device environment.",re:"A reliable, certified clinical tool used by practitioners to programme and manage neurostimulation therapy remotely.",q:"",qn:"",qr:"",features:[{t:"Bluetooth Integration",d:"Reliable real-time communication with the NTX100 hardware device."},{t:"Therapy Management",d:"Clinicians can programme and adjust therapy sessions remotely."},{t:"Clinical Data Capture",d:"Session data recorded for review and compliance."},{t:"Medical-Grade Reliability",d:"Built to the standards required for a prescription medical device."}],tech:["Swift","iOS","CoreBluetooth","BLE"],services:["Mobile development","Architecture advisory","Quality assurance"],cover:"linear-gradient(135deg,#1f0a2e 0%,#4a1a6e 50%,#7b3fa8 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/noctrix_header.jpg")},
  {id:"mobility",name:"MobilityOne",cat:"Mobility",tags:["SaaS","Frontend"],client:"MobilityOne",website:"",period:"",brief:"SaaS fleet management platform centralising operational data for smarter fleet decisions.",ch:"Fleet operators were managing mileage, fuel, maintenance, and vehicle assignments across disconnected spreadsheets and tools. They needed a single web application that could consolidate all operational data and surface actionable insights.",ap:"We architected a SaaS web platform covering the full fleet operational lifecycle — mileage tracking, fuel management, maintenance scheduling, and vehicle assignment workflows — with a clean dashboard designed for daily use by fleet managers.",re:"Companies using MobilityOne reduced fleet operating costs through data-driven decisions, replacing manual processes with a single source of truth.",q:"",qn:"",qr:"",features:[{t:"Mileage Tracking",d:"Accurate per-vehicle mileage logging and reporting."},{t:"Fuel Management",d:"Monitor fuel consumption and identify inefficiencies."},{t:"Maintenance Scheduling",d:"Proactive maintenance reminders to reduce breakdowns."},{t:"Assignment Management",d:"Track vehicle assignments across drivers and departments."}],tech:["React","Node.js","TypeScript","PostgreSQL","AWS"],services:["Web development","SaaS architecture","Quality assurance"],cover:"linear-gradient(135deg,#0a1a2e 0%,#1a3a5c 50%,#2e6ea8 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/mobility_header.jpg")},
  {id:"muvr",name:"Muvr",cat:"Health",tags:["iOS","Swift","Wearables"],client:"Muvr Labs, Inc",website:"muvrlabs.com",period:"May 2020 – April 2022",brief:"Native iOS platform simplifying diagnostics and big data for orthopedic post-operative care.",ch:"Orthopedic surgeons had no effective way to monitor patient recovery remotely after surgery. Muvr needed a native iOS app that could integrate wearable sensor data, provide real-time analytics, and facilitate communication between patients and their medical teams.",ap:"We developed a native iOS application in Swift, using SnapKit for code-based UI constraints and responsive layout management, and RxSwift for reactive programming to handle asynchronous wearable data streams smoothly. The result was a robust, interactive tool tailored precisely for iOS — reliable enough for clinical use.",re:"A dependable clinical tool that streamlined post-operative care for orthopedic practices, empowering surgeons to monitor patient recovery remotely and reducing unnecessary in-person visits.",q:"",qn:"",qr:"",features:[{t:"Wearable Integration",d:"Real-time data tracking from wearables to monitor patient recovery."},{t:"Remote Monitoring",d:"Surgeons track progress without requiring in-person visits."},{t:"Patient Communication",d:"Streamlined messaging between patients and medical teams."},{t:"Big Data Insights",d:"Data-driven analytics to improve outcomes and reduce clinical burden."}],tech:["Swift","iOS","SnapKit","RxSwift"],services:["Mobile development","Quality assurance"],cover:"linear-gradient(135deg,#0a1a2e 0%,#0d3d5c 50%,#1a7a8a 100%)",  headerImg:(process.env.PUBLIC_URL + "/images/muvr_header.png")},
];
const vals=[{n:"01",t:"Understand First",d:"Every engagement starts with listening."},{n:"02",t:"Strategic Clarity",d:"We turn complexity into clear direction."},{n:"03",t:"Long-term Advisory",d:"Partnerships, not one-off projects."},{n:"04",t:"One Team",d:"We embed alongside your people."},{n:"05",t:"Outcome-driven",d:"Every recommendation tied to results."},{n:"06",t:"Delivery Excellence",d:"Strategy backed by engineering."}];
const tl=[{y:"2017",t:"Founded in Croatia",d:"Jurica starts Lumo: understand the challenge before recommending technology."},{y:"2018",t:"First international clients",d:"Strategic partnerships with NOMO and Farmwave."},{y:"2021",t:"Enterprise scale",d:"MobilityOne expands advisory into fleet management."},{y:"2025",t:"Technology consultancy",d:"Lumo formally positions as a consultancy."}];
type BlogBlock={type:"text",content:string}|{type:"img",src:string,caption?:string};
const blogs=[
  {id:"b1",title:"Nomo Smart Care: Case Study",cat:"Case Study",date:"April 8, 2025",read:"6 min",author:"Jurica Mlinaric",authorImg:(process.env.PUBLIC_URL + "/images/jurica.png"),cover:"linear-gradient(135deg,#002840 0%,#004C73 50%,#0a7ea4 100%)",headerImg:(process.env.PUBLIC_URL + "/images/nomo_header.png"),excerpt:"How we built a full-stack AI-powered elder care platform — from edge audio models to native mobile apps.",body:[
    {type:"text",content:"Nomo International set out to solve a deeply human problem: how do you keep elderly people safe at home without invading their privacy? Traditional elder care solutions relied on wearables or cameras — devices that were often forgotten, rejected, or simply too intrusive. Nomo needed something different."},
    {type:"text",content:"Nomo employs motion-sensing and AI-driven audio technology for discreet monitoring without intrusive cameras or wearables. The system detects emergencies through fall detection, sound recognition, and direct 911 integration."},
    {type:"img",src:"https://lumo-lab.com/wp-content/uploads/2024/09/Screenshot-2024-09-13-at-16.03.26.png",caption:"Nomo Smart Care — iOS app interface"},
    {type:"text",content:"The challenge was significant. The system had to be completely non-intrusive, capable of understanding behavioural patterns, instantly responsive to emergencies, and easy enough for elderly users and their families to trust. And it needed a full-stack technology partner who could deliver it end to end — mobile apps, cloud infrastructure, and AI, all working together."},
    {type:"text",content:"We structured our approach around three core pillars. First, native mobile apps built in Swift and Kotlin to ensure real-time updates and reliable emergency response on both iOS and Android. Second, a scalable cloud infrastructure using AWS, REST APIs, MQTT messaging, and Firebase for secure, real-time device-to-user communication. Third, edge-based audio AI — custom TensorFlow Lite models that process critical sounds locally on the device, preserving privacy and delivering sub-second response times."},
    {type:"text",content:"The AI component was particularly important. Rather than streaming audio to the cloud, we trained models to classify sounds — falls, alarms, distress — directly on the device. This meant no audio ever left the home, addressing one of the primary concerns families had about in-home monitoring technology."},
    {type:"text",content:"The results speak for themselves. We delivered full production deployment across iOS and Android, real-time monitoring across thousands of devices, sub-1-second alert latency, and native 911 integration for emergency response. The platform gave caregivers genuine confidence — not because it was watching, but because it was listening intelligently."},
    {type:"text",content:"The tech stack included Swift and Kotlin for mobile, Node.js and TypeScript for the backend, AWS and Firebase for cloud infrastructure, Python and TensorFlow Lite for the AI layer, and React.js and Next.js for the web frontend."},
  ] as BlogBlock[]},
  {id:"b2",title:"Deep Learning for Audio Classification",cat:"Engineering",date:"March 11, 2025",read:"8 min",author:"Matija Sever",cover:"linear-gradient(135deg,#1a0533 0%,#3b0764 50%,#6d28d9 100%)",headerImg:(process.env.PUBLIC_URL + "/images/blog_2.jpg"),excerpt:"How convolutional neural networks learn to hear — and why spectrograms are the secret ingredient.",body:[
    {type:"text",content:"Audio classification — assigning sound clips to predefined categories — is quietly transforming industries from security systems and automotive safety to healthcare diagnostics. At the core of modern audio classification systems are convolutional neural networks, originally designed for images but remarkably effective at understanding sound."},
    {type:"text",content:"The key insight is that raw audio needs to be transformed before a neural network can learn from it. We convert waveforms into spectrograms using the Short Time Fourier Transform, which visually maps frequency intensities across time. Even better are mel spectrograms, which map frequencies to the Mel scale aligned with human auditory perception. These representations emphasise the features that matter most to classification, and they give CNNs something they understand: an image."},
    {type:"text",content:"A standard CNN for audio classification processes these spectrogram images through convolutional layers with learnable filters that slide across the input and produce feature maps. Batch normalisation stabilises training, pooling layers reduce spatial dimensions while preserving prominent features, and dropout prevents overfitting. After flattening the final feature maps, fully connected layers integrate what was learned and softmax produces a probability distribution across classes."},
    {type:"text",content:"What makes CNNs particularly powerful here is hierarchical feature learning. Early layers capture simple patterns — edges, short-duration tones — while deeper layers learn complex abstractions like the characteristic signature of a smoke alarm or the acoustic profile of a fall event. No manual feature engineering required."},
    {type:"text",content:"Training requires attention to data augmentation. Time stretching, pitch shifting, and adding background noise all help models generalise to real-world recording conditions. We evaluate using cross entropy loss and track accuracy, precision, recall, and F1 score throughout training."},
    {type:"text",content:"The field continues to advance rapidly. As these systems mature, edge deployment — running classification directly on the device rather than in the cloud — is becoming increasingly viable, enabling privacy-preserving audio AI at scale."},
  ] as BlogBlock[]},
  {id:"b3",title:"AI on Microcontrollers",cat:"Engineering",date:"November 20, 2024",read:"7 min",author:"Rudolf Lovrencic",cover:"linear-gradient(135deg,#062a1a 0%,#065f46 50%,#059669 100%)",headerImg:(process.env.PUBLIC_URL + "/images/blog_1.jpg"),excerpt:"Running deep learning models on ESP32 microcontrollers — why it's harder than it sounds, and how we made it work.",body:[
    {type:"text",content:"Running deep learning models on microcontrollers feels like a contradiction. These devices are built for efficiency, not computation — minimal processing power, constrained memory, no operating system to speak of. And yet, for a growing class of privacy-first applications, edge AI is exactly what's needed."},
    {type:"text",content:"We encountered this challenge directly while building the audio classification system for Nomo Smart Care. The platform monitors in-home environments using sensors rather than cameras, prioritising user privacy above all else. Processing audio locally on the device — identifying fire alarms, falls, and other critical events without ever transmitting recordings externally — required running a trained neural network on an ESP32-PICO microcontroller with a 240MHz CPU and 2MB of PSRAM."},
    {type:"text",content:"The approach starts with model training. We used a convolutional neural network architecture with four convolutional layers, max pooling, and dense output layers. After training, the model undergoes full-integer quantisation — converting 32-bit floating-point weights to 8-bit unsigned integers. This single step reduces model size dramatically while preserving most of the accuracy, bringing a 260K parameter model down to roughly 260KB."},
    {type:"text",content:"Inference runs using LiteRT for Microcontrollers, formerly TensorFlow Lite. The quantised model is embedded as a C array, the necessary operations are registered (FullyConnected, Conv2D, MaxPool2D, Softmax, and Quantize), and a 100KB tensor arena handles runtime memory. The inference pipeline quantises input data before feeding it to the model and dequantises the outputs to retrieve probability distributions."},
    {type:"text",content:"The implementation uses standard C++17, which runs on many embedded platforms — making LiteRT for Microcontrollers highly portable. The framework supports a wide range of neural network operations, meaning the constraint isn't capability but rather careful model design and quantisation strategy."},
    {type:"text",content:"The lesson we took away: edge AI on microcontrollers is absolutely viable, but it requires thinking about the deployment environment from the very beginning of the model design process. Architecture choices, quantisation, and memory budgeting all need to be considered together, not as an afterthought."},
  ] as BlogBlock[]},
];
const blogCats=["All","Case Study","Engineering"];
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
      <button onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:9,background:"none",border:"none",cursor:"pointer",padding:0}}>
        <svg height="26" viewBox="90 95 135 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#004C73" d="m123.83,138.8h-23.8v31.7c0,16.71,12.37,28.13,29.73,28.13h30.1v-23.8h-36.03v-36.03Z"/>
          <ellipse fill="#004C73" cx="112.92" cy="112.91" rx="12.92" ry="12.91"/>
          <path fill="#004C73" fillOpacity=".5" d="m125.83,112.91c0,7.13-5.78,12.91-12.92,12.91-2.22,0-4.32-.56-6.15-1.55l91.86,50.55v-74.81h-85.71c7.13,0,12.92,5.78,12.92,12.91Z"/>
        </svg>
        <span style={{fontFamily:"var(--jk)",fontSize:18,fontWeight:600,color:"var(--blue)",letterSpacing:-.3}}>lumo lab</span>
      </button>
      <div className="nav-links" style={{display:"flex",alignItems:"center",gap:2}}>
        {[{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Work",p:"cases"},{l:"Blog",p:"blog"}].map(({l,p})=>
          <button key={l} onClick={()=>go(p)} style={{color:page===p?"var(--blue)":"var(--txt3)",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:page===p?600:500,fontFamily:"var(--in)",padding:"6px 12px",borderRadius:6}}>{l}</button>
        )}
        <button onClick={()=>go("home")} className="cta-m" style={{padding:"8px 20px",fontSize:12,marginLeft:8}}>Let's talk</button>
      </div>
    </W>
  </nav>;
}
function Back({go,to,label}:{go:(to:string)=>void,to:string,label:string}){return <button onClick={()=>go(to)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--txt3)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:32,fontFamily:"var(--jk)",padding:0}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{label}</button>;}

/* ── HOME ── */
function Home({go}:{go:(p:string,id?:string)=>void}){
  const[at,setAt]=useState(0);const[ap,setAp]=useState(0);const tlR=useRef<HTMLElement>(null);
  useEffect(()=>{const i=setInterval(()=>setAt(p=>(p+1)%tests.length),5000);return()=>clearInterval(i);},[]);
  useEffect(()=>{const h=()=>{if(!tlR.current)return;const r=tlR.current.getBoundingClientRect();const p=Math.max(0,Math.min(1,(-r.top+200)/(r.height-300)));setAp(Math.min(3,Math.floor(p*4)));};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);

  return <div>
    {/* HERO */}
    <section className="hero-s" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(155deg,#002840,#004C73 40%,#003B5C 70%,#004C73)"}}>
      {/* Video background */}
      <video autoPlay muted loop playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0,opacity:.35}}>
        <source src={process.env.PUBLIC_URL + "/videos/hero.webm"} type="video/webm"/>
        <source src={process.env.PUBLIC_URL + "/videos/hero.mp4"} type="video/mp4"/>
      </video>
      {/* Grid overlay — pulses in and out */}
      <div style={{position:"absolute",inset:0,zIndex:1,backgroundImage:"linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",backgroundSize:"72px 72px",animation:"gridPulse 8s ease-in-out infinite"}}/>
      {/* Gradient overlay for readability */}
      <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to bottom,rgba(0,30,50,.3) 0%,rgba(0,30,50,.6) 100%)"}}/>
      <div style={{position:"absolute",top:"-15%",left:"-10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(78,205,196,.1),transparent 70%)",zIndex:1}}/>
      <div className="hero-grain"/>
      <W style={{position:"relative",zIndex:3,paddingTop:100,paddingBottom:60,color:"#fff"}}>
        <h1 className="fi d2" style={{fontFamily:"var(--jk)",fontSize:"clamp(52px,8vw,108px)",fontWeight:800,lineHeight:.9,letterSpacing:"-0.04em",marginBottom:28,maxWidth:900}}>
          We advise,<br/>guide, and <span style={{background:"linear-gradient(135deg,#4ECDC4,#7DB9E8,#A8D0E6)",backgroundSize:"200% 200%",animation:"gradShift 6s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>deliver.</span>
        </h1>
        <p className="fi d3" style={{fontSize:17,color:"rgba(255,255,255,.5)",lineHeight:1.7,maxWidth:480,marginBottom:32}}>Lumo Lab takes the guesswork out of technology. We give you honest advice and the expert support you need to get the job done right. We’re with you from the very first step through to a long-term partnership.</p>
        <div className="fi d4" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button onClick={()=>go("cases")} style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"var(--blue)",padding:"14px 28px",borderRadius:50,fontFamily:"var(--jk)",fontSize:14,fontWeight:700,border:"none",cursor:"pointer"}}>See our work <Arr s={14} c="var(--blue)"/></button>
          <button onClick={()=>go("about")} className="cta-g" style={{color:"rgba(255,255,255,.7)",borderColor:"rgba(255,255,255,.15)"}}>Learn more</button>
        </div>
        <div className="fi d5 hero-stats" style={{display:"flex",marginTop:56,borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:24}}>
          {[{n:10,s:"+yr",l:"Track record"},{n:15,s:"+",l:"Global clients"},{n:4,s:"",l:"Verticals"}].map((s,i)=>(
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
    <section className="grid-bg" style={{padding:"100px 0"}}><W>
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
    {/* FEATURED WORK */}
    <section style={{padding:"80px 0",borderTop:"1px solid var(--brd)"}}><W>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:28,height:2,background:"var(--blue)"}}/>
          <span style={{fontSize:11,color:"var(--txt4)",fontWeight:700,textTransform:"uppercase",letterSpacing:3,fontFamily:"var(--jk)"}}>Proven deliverables</span>
        </div>
        <button onClick={()=>go("cases")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,color:"var(--txt3)",fontFamily:"var(--jk)",padding:0,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--blue)"} onMouseLeave={e=>e.currentTarget.style.color="var(--txt3)"}>View all <Arr s={13} c="currentColor"/></button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[cases[0],cases[1],cases[3],cases[7]].map(c=><div key={c.id} onClick={()=>go("cases",c.id)} style={{borderRadius:12,overflow:"hidden",cursor:"pointer",position:"relative",height:200,background:c.cover}} onMouseEnter={e=>{(e.currentTarget.querySelector("img") as HTMLImageElement|null)?.style&&((e.currentTarget.querySelector("img") as HTMLImageElement).style.transform="scale(1.05)");(e.currentTarget.querySelector(".proj-info") as HTMLElement|null)&&((e.currentTarget.querySelector(".proj-info") as HTMLElement).style.transform="translateY(0)");}} onMouseLeave={e=>{(e.currentTarget.querySelector("img") as HTMLImageElement|null)?.style&&((e.currentTarget.querySelector("img") as HTMLImageElement).style.transform="scale(1)");(e.currentTarget.querySelector(".proj-info") as HTMLElement|null)&&((e.currentTarget.querySelector(".proj-info") as HTMLElement).style.transform="translateY(4px)");}}>
          {(c as any).headerImg&&<img alt="" src={c.id==="farmwave"?"/images/farmwave_home.png":c.id==="crossiety"?"/images/crossiety_home.png":c.id==="muvr"?"/images/muvr_home.jpg":(c as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .5s",position:"absolute",inset:0}}/>}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 60%,transparent 100%)"}}/>
          <div className="proj-info" style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px",transform:"translateY(4px)",transition:"transform .3s"}}>
            <span style={{fontSize:10,color:"#fff",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2,display:"inline-block",marginBottom:6,background:"rgba(0,76,115,.7)",padding:"3px 10px",borderRadius:20}}>{c.cat}</span>
            <h3 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:800,color:"#fff",lineHeight:1.2,margin:0}}>{c.name}</h3>
          </div>
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
    <section style={{padding:"100px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",position:"relative",overflow:"hidden"}}>
      <div className="grid-bg" style={{position:"absolute",inset:0}}/>
      <W style={{position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <SL ch="Trust"/>
          <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,40px)",fontWeight:800,color:"var(--txt)",lineHeight:1.05}}>Voices of our <span style={{color:"var(--blue)"}}>partners.</span></h2>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:24}}>
          {/* Prev */}
          <button onClick={()=>setAt(p=>(p-1+tests.length)%tests.length)} style={{flexShrink:0,width:44,height:44,borderRadius:"50%",border:"1px solid var(--brd)",background:"#fff",color:"var(--txt3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:"0 2px 8px rgba(0,30,50,.06)"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.color="var(--blue)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt3)";}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Card */}
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{display:"flex",transform:`translateX(calc(-${at*100}% - ${at*0}px))`,transition:"transform .6s cubic-bezier(.16,1,.3,1)"}}>
              {tests.map((t,i)=><div key={i} style={{minWidth:"100%",padding:"0 8px"}}>
                <div style={{background:"#fff",borderRadius:16,padding:"36px 44px",border:"1px solid var(--brd)",boxShadow:"0 4px 24px rgba(0,30,50,.04)",textAlign:"center"}}>
                  <svg width="28" height="22" viewBox="0 0 48 36" fill="none" style={{marginBottom:16,opacity:.1}}><path d="M0 36V20C0 8.95 8.95 0 20 0h2v8h-2c-6.63 0-12 5.37-12 12v2h12v14H0zm28 0V20c0-11.05 8.95-20 20-20v8c-6.63 0-12 5.37-12 12v2h12v14H28z" fill="#004C73"/></svg>
                  <p style={{fontFamily:"var(--jk)",fontSize:"clamp(14px,1.4vw,17px)",fontWeight:500,lineHeight:1.75,color:"var(--txt)",fontStyle:"italic",maxWidth:600,margin:"0 auto 24px"}}>{t.q}</p>
                  <div style={{width:32,height:1,background:"var(--brd)",margin:"0 auto 18px"}}/>
                  <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"center"}}>
                    <img src={(t as any).img||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={t.n} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",objectPosition:"top",flexShrink:0,border:"2px solid var(--brd)"}}/>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:4}}>
                    {t.linkedin
                      ? <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--blue)"} onMouseLeave={e=>e.currentTarget.style.color="var(--txt)"}>{t.n}</a>
                      : <span style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)"}}>{t.n}</span>
                    }
                    <span style={{fontSize:13,color:"var(--txt4)"}}>{t.r} ·{" "}
                      {t.website
                        ? <a href={t.website} target="_blank" rel="noopener noreferrer" style={{color:"var(--blue)",fontWeight:600,textDecoration:"none",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{t.co}</a>
                        : <span style={{color:"var(--blue)",fontWeight:600}}>{t.co}</span>
                      }
                    </span>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
          {/* Next */}
          <button onClick={()=>setAt(p=>(p+1)%tests.length)} style={{flexShrink:0,width:44,height:44,borderRadius:"50%",border:"1px solid var(--brd)",background:"#fff",color:"var(--txt3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:"0 2px 8px rgba(0,30,50,.06)"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.color="var(--blue)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt3)";}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:28}}>
          {tests.map((_,i)=><button key={i} onClick={()=>setAt(i)} style={{width:at===i?28:8,height:8,borderRadius:4,border:"none",cursor:"pointer",background:at===i?"var(--blue)":"var(--brd)",transition:"all .4s"}}/>)}
        </div>
      </W>
    </section>
  </div>;
}

/* ── ABOUT ── */
function About({go}:{go:(p:string)=>void}){return <div style={{paddingTop:76}}>
  <section style={{padding:"48px 0 64px"}}><W><SL ch="About Us"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,lineHeight:1,color:"var(--txt)",marginBottom:16,maxWidth:600}}>We advise, guide, and deliver — we handle the tech so you can focus on the <span style={{color:"var(--blue)"}}>big picture.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:480}}>A technology consultancy based in Croatia, advising startups and enterprises worldwide.</p>
  </W></section>
  <section style={{borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",padding:"36px 0",background:"var(--bg2)"}}><W style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
    {[{n:10,s:"+",l:"Years"},{n:20,s:"+",l:"Clients"},{n:4,s:"",l:"Verticals"},{n:12,s:"+",l:"Countries"}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"var(--jk)",fontSize:36,fontWeight:800,color:"var(--blue)"}}><AnimNum end={s.n} suffix={s.s}/></div><p style={{fontSize:10,color:"var(--txt4)",marginTop:6,fontWeight:600,textTransform:"uppercase",letterSpacing:2,fontFamily:"var(--jk)"}}>{s.l}</p></div>)}
  </W></section>
  <div style={{borderBottom:"1px solid var(--brd)",padding:"14px 0",overflow:"hidden"}}><div className="mq-t">{cl3.map((c,i)=><span key={i} style={{fontSize:13,color:"var(--txt4)",fontWeight:600,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:12,opacity:.4}}>{c}<span style={{width:3,height:3,borderRadius:"50%",background:"var(--blue)",opacity:.2}}/></span>)}</div></div>
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
  <section className="grid-bg" style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W><SL ch="Our values"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{vals.map((v,i)=><div key={i} className="card"><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{v.n}</span><h3 style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,margin:"10px 0 6px",color:"var(--txt)"}}>{v.t}</h3><p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6}}>{v.d}</p></div>)}</div>
  </W></section>
  {/* FOUNDER / LEADERSHIP */}
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
    <SL ch="Leadership"/>
    <div style={{display:"grid",gridTemplateColumns:"360px 1fr",borderRadius:24,overflow:"hidden",border:"1px solid var(--brd)",boxShadow:"0 4px 40px rgba(0,30,50,.06)"}}>
      {/* Photo panel */}
      <div style={{position:"relative",minHeight:520,background:"var(--blue)"}}>
        <img alt="Jurica Mlinaric" src={process.env.PUBLIC_URL + "/images/jurica.png"} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block",opacity:.92}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,20,40,.85) 0%, rgba(0,20,40,.1) 55%, transparent 100%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 28px 32px"}}>
          <h3 style={{fontFamily:"var(--jk)",fontSize:24,fontWeight:800,color:"#fff",marginBottom:4,lineHeight:1}}>Jurica Mlinaric</h3>
          <p style={{fontFamily:"var(--jk)",fontSize:13,color:"rgba(255,255,255,.55)",fontWeight:600,marginBottom:16}}>CEO & Founder</p>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <a href="https://www.linkedin.com/in/juricamlinaric" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{width:32,height:32,borderRadius:"50%",border:"1px solid rgba(255,255,255,.2)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.6)",textDecoration:"none",transition:"all .25s",background:"rgba(255,255,255,.08)"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.2)";e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.color="rgba(255,255,255,.6)";}}
            ><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="mailto:jurica@lumo-lab.com" style={{fontSize:12,color:"rgba(255,255,255,.5)",textDecoration:"none",fontWeight:500,transition:"color .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.5)";}}>jurica@lumo-lab.com</a>
          </div>
        </div>
      </div>
      {/* Content panel */}
      <div style={{padding:"48px 44px",background:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.9,marginBottom:20}}>
          Jurica started Lumo in 2017 after a pattern kept repeating itself: teams investing in technology before they'd properly understood the problem. He built the company around the opposite approach — diagnosis first, technology second.
        </p>
        <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.9,marginBottom:40}}>
          Since then he's led projects across healthcare IoT, agricultural AI, mobility, and enterprise SaaS — working with startups finding their footing and enterprises scaling complex systems. The through-line is always the same: get the strategy right, then deliver it properly.
        </p>
        <div style={{borderLeft:"3px solid var(--blue)",paddingLeft:24}}>
          <p style={{fontFamily:"var(--jk)",fontSize:19,fontWeight:700,color:"var(--txt)",lineHeight:1.5,fontStyle:"italic",marginBottom:0}}>
            "Everyone wants to move fast. The ones who slow down to think first always get there sooner."
          </p>
        </div>
      </div>
    </div>
  </W></section>
  <section style={{padding:"80px 0",background:"var(--blue)"}}><W style={{textAlign:"center"}}>
    <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,3vw,36px)",fontWeight:800,color:"#fff",marginBottom:12,lineHeight:1.1}}>Ready to work together?</h2>
    <p style={{fontSize:15,color:"rgba(255,255,255,.65)",marginBottom:32,maxWidth:420,margin:"0 auto 32px"}}>Tell us about your challenge — we'll tell you if and how we can help.</p>
    <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <button onClick={()=>go("services")} className="cta-m" style={{background:"#fff",color:"var(--blue)"}}>See how we work <Arr s={14} c="var(--blue)"/></button>
      <button onClick={()=>go("cases")} className="cta-g" style={{color:"rgba(255,255,255,.75)",borderColor:"rgba(255,255,255,.2)"}}>View our work</button>
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
  <section className="grid-bg" style={{padding:"48px 0 80px"}}><W><SL ch="Services in depth"/>
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

/* ── CLUTCH WIDGET ── */
function ClutchWidget(){
  useEffect(()=>{
    const w=window as any;
    if(w.CLUTCHCO&&w.CLUTCHCO.init)w.CLUTCHCO.init();
  },[]);
  return (
    <div style={{height:36,display:"flex",alignItems:"center",overflow:"hidden"}}>
      <div style={{transform:"scale(0.65)",transformOrigin:"left center",marginRight:"calc((0.65 - 1) * 100%)"}}>
        <div className="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="14" data-height="50" data-nofollow="false" data-expandifr="true" data-primary-color="#17313B" data-header-color="#004c73" data-clutchcompany-id="2478801"/>
      </div>
    </div>
  );
}

/* ── CASES ── */
function CaseHeroCard({c,go}:{c:typeof cases[0],go:(p:string,id?:string)=>void}){
  const ref=useReveal(0.1);
  const imgRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const onScroll=()=>{
      const el=imgRef.current;if(!el)return;
      const r=el.closest('[data-hero]') as HTMLElement;if(!r)return;
      const {top,height}=r.getBoundingClientRect();
      const p=Math.max(0,Math.min(1,-top/(height+window.innerHeight)));
      el.style.transform=`translateY(${p*60}px)`;
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);
  return <div ref={ref} data-hero onClick={()=>go("cases",c.id)} className="case-hero" style={{cursor:"pointer",borderRadius:12,overflow:"hidden",position:"relative",height:520,marginBottom:10}}>
    <div ref={imgRef} className="reveal-img d1" style={{position:"absolute",inset:"-10% 0",background:c.cover}}>
      {(c as any).headerImg&&<img alt="" src={c.id==="nomo"?"/images/nomo_header_1.png":c.id==="farmwave"?"/images/farmwave_cover.jpeg":(c as any).headerImg} style={{width:"100%",height:"110%",objectFit:"cover",display:"block",transform:"translateY(5%)"}}/>}
    </div>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.05) 100%)"}}/>
    <div style={{position:"absolute",top:28,left:32}}>
      <span className="reveal d1" style={{fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2.5,background:"rgba(255,255,255,.12)",padding:"5px 12px",borderRadius:6,backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.15)",display:"inline-block"}}>{c.cat}</span>
    </div>
    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px"}}>
      {c.period&&<p className="reveal d1" style={{fontSize:12,color:"rgba(255,255,255,.4)",fontFamily:"var(--jk)",fontWeight:600,letterSpacing:.5,marginBottom:10}}>{c.period}</p>}
      <h2 className="reveal d2" style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"#fff",marginBottom:14,lineHeight:1.05,maxWidth:700}}>{c.name}</h2>
      <p className="reveal d3" style={{fontSize:15,color:"rgba(255,255,255,.65)",lineHeight:1.7,maxWidth:580,marginBottom:24}}>{c.brief}</p>
      <div className="reveal d4" style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"var(--blue)",padding:"10px 22px",borderRadius:50,fontSize:13,fontWeight:700,fontFamily:"var(--jk)"}}>View case study <Arr s={13} c="var(--blue)"/></span>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{c.tags.map(t=><span key={t} style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600,border:"1px solid rgba(255,255,255,.18)",padding:"4px 12px",borderRadius:20,fontFamily:"var(--jk)",background:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)"}}>{t}</span>)}</div>
      </div>
    </div>
  </div>;
}
function CaseGridCard({c,go}:{c:typeof cases[0],go:(p:string,id?:string)=>void}){
  const ref=useReveal(0.1);
  const cardRef=useRef<HTMLDivElement>(null);
  const onMove=(e:React.MouseEvent<HTMLDivElement>)=>{
    const el=cardRef.current;if(!el)return;
    const{left,top,width,height}=el.getBoundingClientRect();
    const x=((e.clientX-left)/width-.5)*14;
    const y=((e.clientY-top)/height-.5)*-14;
    el.style.transform=`perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };
  const onLeave=()=>{const el=cardRef.current;if(el)el.style.transform='';};
  return <div ref={ref}><div ref={cardRef} onClick={()=>go("cases",c.id)} onMouseMove={onMove} onMouseLeave={onLeave} className="case-card tilt-card" style={{height:300,borderRadius:12}}>
    <div className="ci reveal-img d1" style={{position:"absolute",inset:0,background:c.cover}}>
      {(c as any).headerImg&&<img alt="" src={c.id==="farmwave"?"/images/farmwaveapp_cover.jpeg":c.id==="beunity"?"/images/beunity_showcase.png":c.id==="crossiety"?"/images/crossiety_showcase.png":c.id==="drift"?"/images/drift_showcase.png":(c as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>}
    </div>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.25) 55%,transparent 100%)"}}/>
    <div style={{position:"absolute",top:18,left:18}}>
      <span className="reveal d1" style={{fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2,background:"rgba(0,0,0,.3)",padding:"4px 10px",borderRadius:4,backdropFilter:"blur(8px)",display:"inline-block"}}>{c.cat}</span>
    </div>
    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"22px 24px"}}>
      <h2 className="reveal d2" style={{fontFamily:"var(--jk)",fontSize:20,fontWeight:800,color:"#fff",marginBottom:8,lineHeight:1.15}}>{c.name}</h2>
      <p className="reveal d3" style={{fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.6,marginBottom:12}}>{c.brief}</p>
      <div className="reveal d3" style={{display:"flex",flexWrap:"wrap",gap:5}}>{c.tags.map(t=><span key={t} style={{fontSize:10,color:"rgba(255,255,255,.7)",fontWeight:600,border:"1px solid rgba(255,255,255,.18)",padding:"3px 9px",borderRadius:4,fontFamily:"var(--jk)",background:"rgba(255,255,255,.08)"}}>{t}</span>)}</div>
    </div>
  </div></div>;
}

function Cases({go,sel}:{go:(p:string,id?:string)=>void,sel:string|null}){const[filt,setFilt]=useState("All");const fil=filt==="All"?cases:cases.filter(c=>c.cat===filt);const ac=sel?cases.find(c=>c.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}>
    {/* Cover */}
    <div style={{height:380,background:ac.cover,position:"relative",overflow:"hidden"}}>
      {(ac as any).headerImg
        ? <img alt="" src={(ac as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        : <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",backgroundSize:"48px 48px",opacity:.4}}/>
      }
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:160,background:"linear-gradient(transparent,rgba(0,0,0,.45))"}}/>
      <W style={{position:"absolute",bottom:0,left:0,right:0,paddingBottom:32,zIndex:2}}>
        <span style={{fontSize:11,color:"rgba(255,255,255,.55)",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2}}>{ac.cat}</span>
        <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,4vw,44px)",fontWeight:800,color:"#fff",marginTop:6,lineHeight:1.05}}>{ac.name}</h1>
      </W>
    </div>
    <section style={{padding:"0 0 80px"}}><W>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <div style={{transform:"translateY(-28px)",background:"#fff",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 24px rgba(0,30,50,.06)",border:"1px solid var(--brd)"}}>
          <Back go={()=>go("cases")} to="" label="All case studies"/>
          <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.7,marginBottom:16}}>{ac.brief}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ac.tags.map(t=><span key={t} className="ft">{t}</span>)}</div>
        </div>
        {/* Client meta */}
        {(ac as any).client&&<div style={{display:"flex",flexWrap:"wrap",gap:24,padding:"24px 0",borderTop:"1px solid var(--brd)"}}>
          {[{l:"Client"   ,v:(ac as any).client},{l:"Website",v:(ac as any).website},{l:"Period",v:(ac as any).period}].filter(r=>r.v).map((r,i)=><div key={i}><p style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:4}}>{r.l}</p><p style={{fontSize:13,fontWeight:600,color:"var(--txt2)"}}>{r.v}</p></div>)}
        </div>}
        {/* Challenge / Approach / Outcome */}
        {[{l:"The Challenge",t:ac.ch},{l:"Our Approach",t:ac.ap},{l:"The Outcome",t:ac.re}].map((s,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:32,padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          <div><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{String(i+1).padStart(2,"0")}</span><h3 style={{fontFamily:"var(--jk)",fontSize:18,fontWeight:800,marginTop:4,color:"var(--txt)"}}>{s.l}</h3></div>
          <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.8}}>{s.t}</p>
        </div>)}
        {/* Key features */}
        {(ac as any).features?.length>0&&<div style={{padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:20}}>Key Features</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {(ac as any).features.map((f:any,i:number)=><div key={i} className="card" style={{padding:"18px 20px"}}>
              <h4 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",marginBottom:6}}>{f.t}</h4>
              <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6}}>{f.d}</p>
            </div>)}
          </div>
        </div>}
        {/* Tech + Services */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          {(ac as any).tech?.length>0&&<div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:12}}>Technologies</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(ac as any).tech.map((t:string)=><span key={t} className="ft">{t}</span>)}</div></div>}
          {(ac as any).services?.length>0&&<div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:12}}>Services</p>{(ac as any).services.map((s:string,i:number)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--blue)",opacity:.3}}/><span style={{fontSize:13,color:"var(--txt2)"}}>{s}</span></div>)}</div>}
        </div>
        {/* Quote */}
        {ac.q&&<div style={{marginTop:8,border:"1px solid var(--brd)",borderRadius:16,padding:36,background:"var(--bg2)"}}><QSvg/><p style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:500,lineHeight:1.6,color:"var(--txt)",fontStyle:"italic",marginBottom:20}}>{ac.q}</p><p style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)"}}>{ac.qn}</p><p style={{fontSize:12,color:"var(--txt3)",marginTop:2}}>{ac.qr}</p></div>}
      </div>
    </W></section>
  </div>;
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <SL ch="Case Studies"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Real challenges. <span style={{color:"var(--blue)"}}>Real outcomes.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:460,marginBottom:36}}>We've advised clients across healthcare, agriculture, fintech, and beyond.</p>
    <div style={{display:"flex",gap:6,marginBottom:40,flexWrap:"wrap"}}>{catList.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    {fil.length>0&&<>
      <CaseHeroCard c={fil[0]} go={go}/>
      {fil.length>1&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {fil.slice(1).map(c=><CaseGridCard key={c.id} c={c} go={go}/>)}
      </div>}
    </>}
  </W></section></div>;
}

/* ── BLOG ── */
function Blog({go,sel}:{go:(p:string,id?:string)=>void,sel:string|null}){const[filt,setFilt]=useState("All");const fil=filt==="All"?blogs:blogs.filter(p=>p.cat===filt);const ac=sel?blogs.find(p=>p.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}>
    {/* Cover */}
    <div style={{height:380,background:ac.cover,position:"relative",overflow:"hidden"}}>
      {(ac as any).headerImg
        ? <img alt="" src={(ac as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        : <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",backgroundSize:"48px 48px",opacity:.4}}/>
      }
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:120,background:"linear-gradient(transparent,rgba(0,0,0,.3))"}}/>
    </div>
    <section style={{padding:"0 0 80px"}}><W>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{transform:"translateY(-28px)",background:"#fff",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 24px rgba(0,30,50,.06)",border:"1px solid var(--brd)"}}>
          <Back go={()=>go("blog")} to="" label="All articles"/>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><span className="ft">{ac.cat}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.read} read</span></div>
          <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,3.5vw,34px)",fontWeight:800,color:"var(--txt)",marginBottom:16,lineHeight:1.1}}>{ac.title}</h1>
          <div style={{display:"flex",alignItems:"center",gap:12,paddingBottom:24,borderBottom:"1px solid var(--brd)",marginBottom:28}}>
            <img src={ac.authorImg||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={ac.author} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/>
            <div>
              <p style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)",lineHeight:1}}>{ac.author}</p>
              <p style={{fontSize:12,color:"var(--txt4)",marginTop:3}}>{ac.date}</p>
            </div>
          </div>
          <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.75,fontStyle:"italic",marginBottom:28}}>{ac.excerpt}</p>
          {ac.body.map((block:BlogBlock,i:number)=>block.type==="img"
            ? <figure key={i} style={{margin:"24px 0"}}>
                <img src={block.src} alt={block.caption||""} style={{width:"100%",borderRadius:12,display:"block"}}/>
                {block.caption&&<figcaption style={{fontSize:12,color:"var(--txt4)",textAlign:"center",marginTop:8}}>{block.caption}</figcaption>}
              </figure>
            : <p key={i} style={{fontSize:15,color:"var(--txt2)",lineHeight:1.9,marginBottom:18}}>{block.content}</p>
          )}
        </div>
      </div>
    </W></section>
  </div>;
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <SL ch="Blog"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Insights on technology <span style={{color:"var(--blue)"}}>strategy.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:440,marginBottom:36}}>Perspectives from our practice.</p>
    <div style={{display:"flex",gap:6,marginBottom:40}}>{blogCats.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    <div style={{display:"flex",flexDirection:"column"}}>
      {fil.map(p=><div key={p.id} className="er" onClick={()=>go("blog",p.id)} style={{cursor:"pointer",display:"flex",gap:32,alignItems:"flex-start"}}>
        <div style={{width:320,flexShrink:0,height:210,borderRadius:12,overflow:"hidden",background:p.cover}}>
          {(p as any).headerImg
            ? <img alt="" src={(p as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            : <div style={{width:"100%",height:"100%",backgroundImage:"linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"32px 32px",opacity:.5}}/>
          }
        </div>
        <div style={{flex:1,minWidth:0,paddingTop:4}}>
          <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}><span className="ft">{p.cat}</span><span style={{fontSize:11,color:"var(--txt4)"}}>{p.date} · {p.read} read</span></div>
          <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)",marginBottom:10,lineHeight:1.15}}>{p.title}</h3>
          <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginBottom:16}}>{p.excerpt}</p>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src={p.authorImg||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={p.author} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:26,height:26,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/>
            <span style={{fontSize:13,color:"var(--txt2)",fontWeight:700}}>{p.author}</span>
          </div>
        </div>
      </div>)}
    </div>
  </W></section></div>;
}

/* ── CAREERS ── */
function Careers({go,sel}:{go:(p:string,id?:string)=>void,sel:string|null}){const ac=sel?roles.find(r=>r.id===sel):null;
  if(ac)return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <Back go={()=>go("careers")} to="" label="All positions"/>
    <div style={{display:"flex",gap:8,marginBottom:12}}><span className="ft">{ac.team}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.type}</span><span style={{fontSize:12,color:"var(--txt4)"}}>{ac.loc}</span></div>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>{ac.title}</h1>
    <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.7,maxWidth:500,marginBottom:36}}>{ac.desc}</p>
    <div style={{marginBottom:36}}><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:14,opacity:.4}}>What we're looking for</p>{ac.reqs.map((r,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--blue)",opacity:.3,marginTop:7,flexShrink:0}}/><p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.7}}>{r}</p></div>)}</div>
    <div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:14,opacity:.4}}>What we offer</p>{ac.offer.map((o,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--teal)",opacity:.5,marginTop:7,flexShrink:0}}/><p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.7}}>{o}</p></div>)}</div>
    <a href="mailto:hello@lumo-com.com" className="cta-m" style={{marginTop:32,display:"inline-flex"}}>Apply via email <Arr s={14} c="#fff"/></a>
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
        {roles.map(r=><div key={r.id} onClick={()=>go("careers",r.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",border:"1px solid var(--brd)",borderRadius:12,cursor:"pointer",background:"#fff",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,76,115,.1)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.transform="none";}}>
          <div><span style={{fontSize:10,fontWeight:700,color:"var(--blue)",fontFamily:"var(--jk)",letterSpacing:2,opacity:.4}}>{r.team}</span><h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",marginTop:2}}>{r.title}</h3></div>
          <span style={{fontSize:12,color:"var(--txt4)",fontFamily:"var(--jk)"}}>{r.loc}</span>
        </div>)}
      </div>
      <div style={{marginTop:32,border:"1px solid var(--brd)",borderRadius:14,padding:"28px 24px",background:"var(--bl)"}}>
        <h3 style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:800,color:"var(--txt)",marginBottom:4}}>Don't see your role?</h3>
        <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,marginBottom:16}}>We're always looking for great people.</p>
        <a href="mailto:hello@lumo-com.com" className="cta-m" style={{display:"inline-flex"}}>Send your CV <Arr s={14} c="#fff"/></a>
      </div>
    </W></section>
  </div>;
}

/* ── PRIVACY POLICY ── */
function Privacy(){
  const s=(t:string)=><h3 style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:800,color:"var(--txt)",margin:"36px 0 10px"}}>{t}</h3>;
  const p=(t:string)=><p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:12}}>{t}</p>;
  const li=(items:string[])=><ul style={{paddingLeft:20,marginBottom:12}}>{items.map((i,k)=><li key={k} style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}>{i}</li>)}</ul>;
  return <div style={{paddingTop:76}}>
    <section style={{padding:"48px 0 80px"}}><W style={{maxWidth:760}}>
      <SL ch="Legal"/>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:"var(--txt)",marginBottom:32}}>Privacy Policy</h1>
      {p('By using our services, you agree to the processing of your personal data in accordance with our Privacy and Cookie Policies ("Policies"). If you do not agree, please stop using our services. You may withdraw consent at any time by contacting us at hello@lumo-lab.com.')}
      {p('Our goal is to provide you with a personalized experience on every device and anywhere.')}
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}>Our Policies explain:</p>
      {li(['which data we collect','how we use the collected data','if we share that data with others','types of cookies we use and how you can reject them','where we store your data','how we ensure your data security','your rights regarding your data'])}
      {p('At lumo lab, your privacy is our priority.')}

      {s('Information We May Collect About You')}
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:8}}><strong>Information you voluntarily provide to us</strong> — data you submit through contact forms or email correspondence.</p>
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}><strong>Information we collect about you and your device</strong> — when you visit our site we automatically collect:</p>
      {li(['IP address','Browser type and version','Number of visits','Device and operating system','Referral source','Time zone','User settings','Pages visited and interactions'])}

      {s('How We Handle Collected Data About You')}
      {p('We use the information we collect to:')}
      {li(['Provide and improve our services','Respond to your enquiries','Send updates you have opted into','Analyse usage to enhance the website','Comply with legal obligations'])}
      {p('Any future use beyond these purposes will require your explicit consent.')}

      {s('How We Use Aggregated And Anonymized Data')}
      {p('We may share anonymous or aggregated data that cannot identify you personally with third parties for research, analytics, or business purposes.')}
      {p('This data does not constitute personal data and is not subject to this Privacy Policy.')}

      {s('With Whom We Share Your Data')}
      {p('We do not sell your personal data. We may share it with trusted partners who assist us in operating our website and services, subject to confidentiality agreements.')}
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}><strong>Third Party Collaborations:</strong></p>
      {li(['Google Analytics — used to understand website traffic and behaviour'])}
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}>We may also disclose data:</p>
      {li(['If required by law or a court order','To protect the rights or safety of lumo lab or others','In connection with a merger, acquisition, or sale of assets'])}

      {s('How We Use Cookies, Pixels, And Local Storage')}
      {p('We use cookies and similar technologies to improve your experience, understand usage, and personalise content. You can control cookies through your browser settings.')}
      {p('If you disable cookies, some parts of the site may not function correctly.')}
      <div style={{overflowX:"auto",marginBottom:16}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:"2px solid var(--brd)"}}>
            {['Cookie Name','Expiry','Purpose','More Information'].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",fontFamily:"var(--jk)",fontWeight:700,color:"var(--txt)",fontSize:12,textTransform:"uppercase",letterSpacing:1}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[['_ga','2 years','Distinguish users','Google Analytics Cookie Usage'],['_gat','1 minute','Regulate request rate','Google Analytics Cookie Usage'],['_gid','24 hours','User identification','Google Analytics Cookie Usage']].map((r,i)=><tr key={i} style={{borderBottom:"1px solid var(--brd)"}}>
              {r.map((c,j)=><td key={j} style={{padding:"10px 12px",color:"var(--txt2)"}}>{c}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
      {p('Third-party services such as Google Analytics may also set their own cookies. We have no control over these cookies.')}

      {s('Data Security')}
      {p('Your data is stored securely with Hostinger Hosting. We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, or loss. However, no transmission over the internet is completely secure.')}

      {s('Your Rights')}
      {p('You can opt out of marketing communications at any time by contacting us at hello@lumo-lab.com.')}
      {p('You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us at hello@lumo-lab.com.')}
      {p('If you have concerns about how we handle your data, you have the right to lodge a complaint with your local data protection authority.')}
      {p('If you wish us to stop processing your data entirely, you should stop using the site and contact us to request deletion of any stored information.')}

      {s('Change Of Control')}
      {p('In the event of a merger, acquisition, or sale of lumo lab, your personal data may be transferred to the new owner. We will notify you before your data becomes subject to a different privacy policy.')}

      {s('Changes To Our Rules')}
      {p('We may update this Privacy Policy from time to time. When we do, we will notify you by updating the date at the bottom of this page and, where appropriate, by email.')}
      {p('We encourage you to review this policy periodically to stay informed about how we protect your information.')}

      <p style={{fontSize:13,color:"var(--txt4)",marginTop:40,fontStyle:"italic"}}>In Zabok on November 19, 2024</p>
    </W></section>
  </div>;
}

/* ── ROUTING ── */
const toPath=(p:string,id?:string)=>{const base:{[k:string]:string}={home:"/",about:"/about",services:"/services",cases:"/work",blog:"/blog",careers:"/careers",privacy:"/privacy-policy"};return id?`${base[p]||"/"}/${id}`:base[p]||"/";};
function parseFromPath():{page:string,subId:string|null}{
  const parts=window.location.pathname.split("/").filter(Boolean);
  const pageMap:{[k:string]:string}={about:"about",services:"services",work:"cases",blog:"blog",careers:"careers","privacy-policy":"privacy"};
  if(!parts.length)return{page:"home",subId:null};
  const page=pageMap[parts[0]]||"home";
  return{page,subId:parts[1]||null};
}


/* ── APP ── */
export default function App(){
  const init=parseFromPath();
  const[page,setPage]=useState(init.page);
  const[subId,setSubId]=useState<string|null>(init.subId);
  useEffect(()=>{
    const onPop=()=>{const{page:p,subId:s}=parseFromPath();setPage(p);setSubId(s);window.scrollTo({top:0,behavior:"auto"});};
    window.addEventListener("popstate",onPop);
    return()=>window.removeEventListener("popstate",onPop);
  },[]);
  const go=(p:string,id?:string)=>{
    window.history.pushState({page:p,id:id||null},"",toPath(p,id));
    setPage(p);setSubId(id||null);
    window.scrollTo({top:0,behavior:"auto"});
  };
  const pageKey=subId?`${page}/${subId}`:page;
  return <div className="lumo" style={{fontFamily:"var(--in)",color:"var(--txt)",background:"var(--bg)",lineHeight:1.6,overflowX:"hidden",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <style>{css}</style>
    <Nav page={page} go={go}/>
    <div style={{flex:1}}>
    <div key={pageKey} className="page-enter">
    {page==="home"&&<Home go={go}/>}
    {page==="about"&&<About go={go}/>}
    {page==="services"&&<Services go={go}/>}
    {page==="cases"&&<Cases go={go} sel={subId}/>}
    {page==="blog"&&<Blog go={go} sel={subId}/>}
    {page==="careers"&&<Careers go={go} sel={subId}/>}
    {page==="privacy"&&<Privacy/>}
    </div>
    </div>
    {/* SHARED CONTACT FOOTER — every page */}
    <section style={{padding:"64px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}>
      <W>
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:48}}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{marginTop:-14, marginLeft:-26,display:"flex",alignItems:"flex-start"}}>
              <svg height="100" viewBox="0 0 201.94 201.91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#004C73" d="m111.52,126.47v23.8h-30.1c-17.36,0-29.73-11.42-29.73-28.13v-31.7h23.8v36.03h36.03Zm-48.62-49.11c8.45,1.07,15.56-6.04,14.49-14.48-.73-5.75-5.37-10.4-11.13-11.13-8.45-1.07-15.56,6.04-14.49,14.48.73,5.75,5.37,10.4,11.13,11.12Z"/>
                <path fill="#004C73" fillOpacity=".5" d="m77.48,65.08c-.27,6.71-5.87,12.21-12.58,12.38-2.35.06-4.55-.51-6.47-1.55l91.86,50.55V51.64h-85.71c7.31,0,13.2,6.07,12.91,13.44Z"/>
              </svg>
            </div>
            <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7,maxWidth:240,marginBottom:20}}>We advise, guide, and deliver. Technology consultancy for startups and enterprises.</p>
            <button onClick={()=>go("home")} className="cta-m" style={{padding:"10px 22px",fontSize:12,marginTop:"auto",alignSelf:"flex-start"}}>Let's talk<Arr s={12} c="#fff"/></button>
          </div>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Contact</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{l:"Email",v:"hello@lumo-lab.com"},{l:"Phone",v:"+385 98 901 4448"},{l:"Address",v:"Zivtov trg 3, Zabok, Croatia"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:10}}><span style={{fontSize:10,color:"var(--txt4)",fontWeight:700,width:52,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"var(--jk)"}}>{c.l}</span><span style={{fontSize:13,fontWeight:500,color:"var(--txt2)"}}>{c.v}</span></div>)}
            </div>
            <div style={{display:"flex",gap:10,marginTop:20,alignItems:"center"}}>
              {[
                {href:"https://www.linkedin.com/company/lumo-lab",label:"LinkedIn",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                {href:"https://www.instagram.com/lumolab",label:"Instagram",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},
              ].map(({href,label,icon})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{width:36,height:36,minWidth:36,minHeight:36,flexShrink:0,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--txt3)",textDecoration:"none",transition:"all .25s",background:"#fff"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="var(--blue)";e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.color="#fff";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt3)";e.currentTarget.style.transform="none";}}
                >{icon}</a>
              ))}
            </div>
            <div style={{marginTop:"auto",paddingTop:16}}>
              <ClutchWidget/>
            </div>
          </div>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Navigate</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Case Studies",p:"cases"},{l:"Blog",p:"blog"},{l:"Careers",p:"careers"},{l:"Privacy Policy",p:"privacy"}].map(({l,p})=><button key={l} onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,fontWeight:500,color:"var(--txt3)",padding:0,textAlign:"left"}}>{l}</button>)}
            </div>
          </div>
        </div>
      </W>
    </section>
    <footer style={{padding:"28px clamp(16px,4vw,48px)",maxWidth:1200,margin:"0 auto",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--brd)"}}>
      <span style={{fontSize:12,color:"var(--blue)",letterSpacing:1.5,textTransform:"uppercase",fontFamily:"var(--jk)",fontWeight:600}}>©2026 by Lumo Lab. All rights reserved.</span>
      <span style={{fontSize:12,color:"var(--blue)",letterSpacing:1,fontWeight:500}}>We advise, guide, and deliver.</span>
    </footer>
  </div>;
}
