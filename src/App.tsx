import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import emailjs from "@emailjs/browser";

const css = `
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(0,76,115,.15);color:#004C73}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
:root{--jk:'Plus Jakarta Sans',sans-serif;--in:'Inter',sans-serif;--blue:#004C73;--teal:#4ECDC4;--bg:#fff;--bg2:#F6F8FA;--txt:#0F1C24;--txt2:#3A4F5C;--txt3:#6B8394;--txt4:#9BB0BD;--brd:rgba(0,30,50,.08);--bl:rgba(0,76,115,.06);--nav-bg:rgba(255,255,255,.88);--nav-border:rgba(0,30,50,.04);--accent:#7DB9E8;--on-dark:#fff;--on-dark-muted:rgba(255,255,255,.8);--hero-overlay:rgba(0,30,50,.55);--space-2:8px;--space-3:12px;--space-4:16px;--space-6:24px;--space-8:32px;--space-10:40px;--space-12:48px;--text-eyebrow:12px;--text-hero:clamp(46px,8vw,120px);--text-proof:clamp(13px,1.1vw,15px);--text-cta:15.5px;--on-teal:#06303a}
.dark{--bg:#0D1117;--bg2:#161B22;--txt:#E6EDF3;--txt2:#B1BAC4;--txt3:#8B949E;--txt4:#6E7681;--brd:rgba(255,255,255,.10);--bl:rgba(125,185,232,.10);--nav-bg:rgba(13,17,23,.88);--nav-border:rgba(255,255,255,.06)}
.dark [style*="color: var(--blue)"],.dark [style*="color:var(--blue)"]{color:#7DB9E8!important}
.dark .card{background:var(--bg2)}
.dark .sd{background:var(--bg2)}
.dark .fb{background:var(--bg2);color:var(--txt3)}
.dark .fb.active{background:var(--blue);color:#fff}
.dark input,.dark textarea,.dark select{background:var(--bg2)!important;color:var(--txt)!important;border-color:var(--brd)!important}
.dark .ham-overlay-inner{background:var(--bg)!important}
.dark .footer-brand-drop{background:var(--bg)!important}
.dark .quote-txt{color:#fff!important}
.logo-svg{color:#004C73;transition:color .2s}
.logo-txt{transition:color .2s}
.dark .logo-svg{color:#fff!important}
.dark .logo-txt{color:#fff!important}
/* Testimonial carousel */
.dark .test-card{background:var(--bg2)!important}
.dark .test-nav-btn{background:var(--bg2)!important;border-color:var(--brd)!important}
/* Job listing rows */
.dark .role-row{background:var(--bg2)!important}
/* Social icon buttons */
.dark .social-icon-btn{background:var(--bg2)!important}
/* File upload zone */
.dark .upload-zone{background:var(--bg2)!important;border-color:var(--brd)!important}
/* Section backgrounds with hardcoded #fff - Privacy, About, Services, Contact */
.dark .prose-section{background:var(--bg)!important}
/* Inline #fff backgrounds on content cards */
.dark .content-card-white{background:var(--bg2)!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes wordIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.word{display:inline-block;opacity:0;animation:wordIn .6s cubic-bezier(.16,1,.3,1) forwards}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}
@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
@keyframes caseProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes caseSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes gridPulse{0%,100%{opacity:0}40%,60%{opacity:.45}}
@keyframes orbDrift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.06)}66%{transform:translate(-40px,30px) scale(.96)}}
@keyframes orbDrift2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-50px,40px) scale(.94)}66%{transform:translate(40px,-30px) scale(1.05)}}
@keyframes orbDrift3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,50px) scale(1.04)}66%{transform:translate(-40px,-20px) scale(.97)}}
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-3%,-5%)}20%{transform:translate(3%,3%)}30%{transform:translate(-5%,1%)}40%{transform:translate(2%,-4%)}50%{transform:translate(-1%,5%)}60%{transform:translate(4%,-2%)}70%{transform:translate(-4%,3%)}80%{transform:translate(1%,-3%)}90%{transform:translate(-2%,4%)}}
.hero-grain{position:absolute;inset:-50%;width:200%;height:200%;opacity:.055;animation:grain .35s steps(1) infinite;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:2}
.grid-bg{background-color:var(--bg)}
@keyframes pageIn{from{opacity:0}to{opacity:1}}
.fi{animation:fadeUp .8s cubic-bezier(.22,1,.36,1) both}
.page-enter{animation:pageIn .4s ease both}
.d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.55s}.d5{animation-delay:.7s}
.mq-t{display:flex;gap:56px;animation:marquee 40s linear infinite;width:max-content}
.cta-m{display:inline-flex;align-items:center;gap:10px;background:var(--blue);color:#fff;padding:14px 28px;border-radius:50px;font-family:var(--jk);font-size:14px;font-weight:700;text-decoration:none;border:none;cursor:pointer;transition:all .3s}
.cta-m:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,76,115,.2)}
.cta-g{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--txt2);padding:14px 28px;border-radius:50px;font-family:var(--jk);font-size:14px;font-weight:600;text-decoration:none;border:1px solid var(--brd);cursor:pointer;transition:all .3s}
.cta-g:hover{border-color:var(--blue);color:var(--blue)}
.card{border:1px solid var(--brd);border-radius:16px;padding:28px 24px;background:#fff;transition:all .35s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--blue);opacity:0;transition:opacity .3s}
.card:hover{border-color:rgba(0,76,115,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,30,50,.05)}
.card:hover::before{opacity:1}
.er{padding:22px 0;border-bottom:1px solid rgba(0,30,50,.05);transition:padding-left .3s}
.er:hover{padding-left:12px}
.er:hover h4{color:var(--blue)}
.er:hover .ea{opacity:1;transform:translateX(4px)}
.eng-row{transition:padding-left .3s}
.eng-row:hover{padding-left:12px}
.eng-row:hover h4{color:var(--blue)}
.eng-row:hover .ea{opacity:1;transform:translateX(4px)}
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
/* Case detail polish */
.why-card{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s}
.why-card:hover{transform:translateY(-3px);box-shadow:0 4px 8px rgba(0,30,50,.05),0 18px 40px rgba(0,30,50,.10);border-color:rgba(0,76,115,.18)}
.why-card:hover h4 span:first-child{transform:translateX(2px)}
.why-card h4 span:first-child{transition:transform .3s}
.case-section{position:relative}
.case-cover::after{content:"";position:absolute;inset:0;pointer-events:none;background:rgba(255,255,255,.04);z-index:1}
@keyframes heroSweep{0%{--sweep-x:20%}100%{--sweep-x:80%}}
@property --sweep-x{syntax:'<percentage>';initial-value:30%;inherits:false}
.metric-cell{opacity:0;transform:translateY(8px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
.metric-cell.in{opacity:1;transform:translateY(0)}
.case-toc{position:fixed;right:24px;top:50%;transform:translateY(-50%);z-index:50;display:flex;flex-direction:column;gap:6px;padding:14px 4px 14px 14px;border-left:1px solid var(--brd);max-width:200px}
.case-toc a{display:block;font-family:var(--jk);font-size:11px;font-weight:600;color:var(--txt4);text-decoration:none;letter-spacing:.5px;padding:4px 0;transition:color .2s,padding-left .2s,border-color .2s;border-left:2px solid transparent;padding-left:10px;margin-left:-12px}
.case-toc a:hover{color:var(--txt2)}
.case-toc a.active{color:var(--blue);border-color:var(--blue);padding-left:12px}
.next-case{position:relative;display:block;text-decoration:none;color:#fff;overflow:hidden;cursor:pointer}
.next-case-bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.04);transition:transform .8s cubic-bezier(.22,1,.36,1),filter .8s}
.next-case:hover .next-case-bg{transform:scale(1.08);filter:brightness(.85)}
.next-case-inner{position:relative;z-index:2;padding:88px clamp(20px,5vw,72px);min-height:340px;display:flex;flex-direction:column;justify-content:center;background:rgba(0,30,50,.55)}
.next-case:hover .next-case-arrow{transform:translateX(8px)}
.next-case-arrow{display:inline-block;transition:transform .3s}
.lb-overlay{position:fixed;inset:0;background:rgba(8,18,30,.88);backdrop-filter:blur(8px);z-index:400;display:flex;align-items:center;justify-content:center;padding:clamp(16px,4vw,40px);animation:lbFade .25s ease}
@keyframes lbFade{from{opacity:0}to{opacity:1}}
.lb-stage{max-width:1280px;width:100%;display:flex;flex-direction:column;gap:14px;align-items:center}
.lb-img{max-width:100%;max-height:80vh;object-fit:contain;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,.5);background:#0a141e}
.lb-cap{font-size:14px;color:rgba(255,255,255,.85);text-align:center;max-width:760px;line-height:1.55;font-weight:500}
.lb-close{position:absolute;top:18px;right:22px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,transform .2s}
.lb-close:hover{background:rgba(255,255,255,.2);transform:scale(1.05)}
.case-frame{cursor:zoom-in}
.read-progress{position:fixed;top:0;left:0;height:2px;background:var(--blue);z-index:300;transition:width .12s linear;pointer-events:none}
@media(max-width:1240px){.case-toc{display:none!important}}
.reveal.d1{transition-delay:.08s}.reveal.d2{transition-delay:.22s}.reveal.d3{transition-delay:.36s}.reveal.d4{transition-delay:.5s}.reveal-img.d1{transition-delay:0s}
.tilt-card{transform-style:preserve-3d;transition:transform .12s ease,box-shadow .35s}.tilt-card:hover{box-shadow:0 24px 56px rgba(0,30,50,.22)}
.ham-btn{display:none}.ham-overlay{display:none}
.footer-cta-mobile{display:none}
.footer-grid{display:flex;justify-content:space-between;align-items:flex-start;gap:48px}
.footer-cols{display:flex;gap:64px}
.footer-links-group{display:flex;gap:64px}
@media(max-width:900px){
  .lumo div[style*="display: grid"],.lumo div[style*="display:grid"]{display:flex!important;flex-direction:column!important;gap:24px!important}
  .lumo div[style*="grid-column"]{grid-column:auto!important}
  .lumo div[style*="position: sticky"],.lumo div[style*="position:sticky"]{position:static!important}
  .lumo h1{font-size:clamp(40px,9vw,64px)!important;line-height:.95!important}
  .lumo h2{font-size:clamp(24px,5vw,36px)!important;line-height:1.1!important}
  .lumo section{padding-top:56px!important;padding-bottom:56px!important}
  .lumo .hero-s{min-height:100vh!important;min-height:100dvh!important;padding-top:100px!important;padding-bottom:48px!important;justify-content:center!important}
  /* Hero asymmetric split — stack on mobile, showcase below content */
  .lumo .hero-split{display:flex!important;flex-direction:column!important;gap:36px!important}
  .lumo .hero-showcase{order:2;align-items:stretch!important}
  .lumo .nav-links{display:none!important}
  .ham-btn{display:flex!important}
  .ham-overlay{display:flex!important}
  .lumo footer{flex-direction:column!important;gap:6px!important;align-items:flex-start!important}
  .cf>div:last-child{display:none!important}
  /* Footer brand row on mobile */
  .footer-brand{flex-direction:row!important;align-items:center!important;gap:16px!important}
  .footer-brand>div:first-child{margin-top:0!important;margin-left:0!important}
  .footer-brand p{margin-bottom:0!important;max-width:none!important;font-size:12px!important}
  /* Footer mobile */
  .footer-grid{flex-direction:column!important;gap:28px!important}
  .footer-cols{flex-direction:row!important;justify-content:space-between!important;align-items:flex-start!important;gap:20px!important}
  .footer-contact-info{flex:1!important;flex-direction:column!important;gap:0!important}
  .footer-links-group{flex-direction:column!important;gap:0!important}
  .footer-links-group>div:first-child{display:none!important}
  .footer-cta-desktop{display:none!important}
  .footer-cta-mobile{display:flex!important}
  .lumo .footer-section{padding-top:40px!important;padding-bottom:40px!important}
  /* Founder bar fix */
  .lumo .founder-bar{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
  .lumo .founder-bar .cta-m{width:100%!important;justify-content:center!important}
  /* Testimonial card */
  .lumo .test-card{padding:28px 20px!important}
  /* Hide prev/next arrow buttons on mobile so the card takes full width; the dots below still navigate */
  .lumo .test-nav-btn{display:none!important}
  /* Process timeline hide middle column */
  .lumo .proc-grid{display:flex!important;flex-direction:column!important;gap:24px!important}
  .lumo .proc-grid>div:nth-child(2){display:none!important}
  .lumo .proc-grid>div:first-child{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:8px!important}
  .lumo .proc-grid>div:first-child>div{padding:8px 0!important;border-bottom:none!important}
  /* For Clients: Week One day rows — collapse 3-col grid to a clean stacked card */
  .lumo .week-row{display:flex!important;flex-direction:column!important;gap:6px!important;padding:18px 0 18px 16px!important;border-left:2px solid var(--bl)!important}
  .lumo .week-row .week-dot{display:none!important}
  .lumo .week-row>span{padding-top:0!important;font-size:11px!important;letter-spacing:1.5px!important}
  /* For Clients: pricing CTA banner — stack heading and button */
  .lumo .pricing-banner{flex-direction:column!important;align-items:flex-start!important;gap:14px!important;padding:20px 22px!important}
  .lumo .pricing-banner .cta-m{width:100%!important;justify-content:center!important}
  /* About: keep stats row horizontal on mobile, just tighten spacing */
  .lumo div.about-stats{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:8px!important}
  .lumo div.about-stats>div>div{font-size:26px!important}
  .lumo div.about-stats>div>p{font-size:9px!important;letter-spacing:1.4px!important}
  /* About: team grid — 3 columns on mobile so the photos are smaller */
  .lumo div.team-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:10px!important}
  .lumo div.team-grid h3{font-size:13px!important}
  .lumo div.team-grid p{font-size:10px!important}
  .lumo div.team-grid>div>div:last-child{padding:14px 14px 16px!important}
  /* Work index: drop the giant hero on mobile, show every case stacked one per row */
  .lumo .work-hero-wrap{display:none!important}
  .lumo div.work-grid-m{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}
  /* Case detail cover: wide-banner images shrink to a thin strip on phones — give the cover a fixed mobile height and let the image fill via object-fit:cover so the title stays readable */
  .lumo .case-cover{min-height:340px!important;height:340px!important;max-height:340px!important}
  .lumo .case-cover-img{height:100%!important;width:100%!important;max-height:none!important;object-fit:cover!important;object-position:center!important;position:absolute!important;inset:0!important}
  .lumo .case-cover-title{padding-bottom:32px!important}
  .lumo .case-cover-h1{font-size:clamp(28px,7vw,40px)!important;line-height:1.05!important;margin-top:6px!important}
  /* Case detail metrics strip — clean 2x2 grid on mobile with proper inter-cell borders */
  .lumo .case-metrics{flex-wrap:wrap!important}
  .lumo .case-metrics>div{flex:1 1 50%!important;min-width:0!important;max-width:50%!important;border-right:none!important;border-bottom:1px solid var(--brd)!important;padding:14px 12px!important;min-height:96px!important}
  .lumo .case-metrics>div:nth-child(2n+1){border-right:1px solid var(--brd)!important}
  .lumo .case-metrics>div:nth-last-child(-n+2){border-bottom:none!important}
  .lumo .case-metrics>div>div:first-child{font-size:18px!important;min-height:auto!important}
  .lumo .case-metrics>div>div:last-child{font-size:10.5px!important;min-height:auto!important}
  /* Hero — centered layout on phones: chips, headline, subtitle, CTAs all line up centrally */
  .lumo .hero-s .hero-content{text-align:center!important}
  .lumo .hero-s .hero-content h1{text-align:center!important;max-width:100%!important}
  .lumo .hero-s .hero-content p{text-align:center!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important}
  /* Hero credibility row — tighten on phones, allow wrap, smaller chips, center the chips on the row */
  .lumo .hero-s .hero-creds{margin-bottom:24px!important;gap:8px!important;justify-content:center!important;flex-wrap:wrap!important}
  .lumo .hero-s .hero-creds>a,.lumo .hero-s .hero-creds>button{height:30px!important;padding:0 12px!important;font-size:11px!important}
  /* Hero CTAs — primary becomes full-width, secondary becomes a centered link below */
  .lumo .hero-s .fi.d4{flex-direction:column!important;align-items:center!important;gap:14px!important;justify-content:center!important}
  .lumo .hero-s .fi.d4>button:first-child{width:100%!important;justify-content:center!important;padding:15px 24px!important}
  .lumo .hero-s .fi.d4>button:last-child{align-self:center!important;padding:0!important}
  /* Trust strip — stack the award (top) above the marquee (bottom) so neither overflows; override global section padding so the strip stays compact */
  .lumo section.trust-strip{padding-top:0!important;padding-bottom:0!important}
  .lumo .trust-strip-row{flex-direction:column!important;padding:0!important}
  .lumo .trust-award{border-right:none!important;border-bottom:1px solid var(--brd)!important;padding:10px clamp(16px,4vw,20px)!important;gap:10px!important;justify-content:flex-start!important;width:100%!important;box-sizing:border-box!important}
  .lumo .trust-award>span:first-child{width:28px!important;height:28px!important;border-radius:8px!important}
  .lumo .trust-award>span:first-child>svg{width:13px!important;height:13px!important}
  .lumo .trust-award>div span:first-child{font-size:9px!important;letter-spacing:1.6px!important}
  .lumo .trust-award>div span:last-child{font-size:12px!important;line-height:1.15!important}
  .lumo .trust-marquee{width:100%!important;min-height:36px!important}
  .lumo .trust-marquee>div:first-child{padding-left:clamp(16px,4vw,20px)!important;padding-right:12px!important}
  .lumo .trust-marquee>div:first-child span:first-child{font-size:9px!important;letter-spacing:1.6px!important}
  .lumo .trust-marquee>div:last-child{padding-right:clamp(16px,4vw,20px)!important}
  /* Cases slider — magazine split stacks vertically on phones: text first, image stage below */
  .lumo .cases-slider .case-slide-row{grid-template-columns:1fr!important;gap:24px!important;align-content:start!important;height:auto!important}
  .lumo .cases-slider .case-slide-stage{height:auto!important;aspect-ratio:4/3!important}
  .lumo .cases-slider h2{font-size:clamp(28px,7vw,44px)!important;line-height:1!important}
  /* Voices — featured testimonial photo shrinks on phones; editorial-row avatars stay tight circles */
  .lumo .voices-section h2{font-size:clamp(28px,7vw,40px)!important}
  /* Voices header — when grid collapses to flex column, force left alignment so the support copy sits flush with the H2 instead of being pushed to the right edge by align-items:end */
  .lumo .voices-head{align-items:flex-start!important}
  .lumo .voices-head>div{width:100%!important}
  .lumo .voices-head>div:last-child{padding-bottom:0!important}
  .lumo .voices-section article:not(.voice-row) img{max-width:120px!important;height:120px!important}
  /* Voices editorial rows — re-template so quote gets full row width, photo+name+arrow share top row */
  .lumo .voices-section article.voice-row{display:grid!important;grid-template-columns:68px 1fr 40px!important;grid-template-areas:"photo name arrow" "quote quote quote"!important;column-gap:14px!important;row-gap:12px!important;align-items:center!important}
  .lumo .voices-section article.voice-row>img{grid-area:photo!important;width:68px!important;height:68px!important;max-width:68px!important;min-width:68px!important}
  .lumo .voices-section article.voice-row>div{grid-area:name!important;min-width:0!important}
  .lumo .voices-section article.voice-row>p{grid-area:quote!important;font-size:14px!important}
  .lumo .voices-section article.voice-row>.voice-arrow{grid-area:arrow!important;width:36px!important;height:36px!important}
  /* Closing CTA — buttons stack and stretch on phones */
  .lumo .closing-cta-row{flex-direction:column!important;gap:10px!important}
  .lumo .closing-cta-row>a,.lumo .closing-cta-row>button{width:100%!important;justify-content:center!important}
  /* Get started — header collapses to single column, cards stack vertically */
  .lumo .get-started-head{align-items:flex-start!important}
  .lumo .get-started-head>div{width:100%!important}
  .lumo .get-started-head>p{padding-bottom:0!important}
  .lumo .get-started-grid{grid-template-columns:1fr!important;gap:12px!important}
  .lumo .get-started-card{min-height:0!important;padding:24px 22px!important}
}
@media(max-width:420px){
  /* About: tighter stats numbers on the smallest phones */
  .lumo div.about-stats>div>div{font-size:22px!important}
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
  /* Hero CTA buttons — only the primary/secondary CTA row, NOT the credibility chips above the H1 */
  .lumo .hero-s .fi.d4>button{width:100%!important;justify-content:center!important}
  /* Home hero fits the visible screen on phones: real viewport height (svh, not vh) + tighter rhythm */
  .hero-s{min-height:100svh!important}
  .hero-w{min-height:100svh!important;padding-top:104px!important;padding-bottom:48px!important;justify-content:flex-start!important}
  .hero-creds{margin-bottom:16px!important}
  .speakable-hero{margin-bottom:14px!important}
  .speakable-tagline{margin-bottom:22px!important;font-size:16px!important;line-height:1.5!important}
  .hero-s .fi.d4{gap:12px!important}
  /* For Clients hero: clear the nav, tighten rhythm so the whole block fits the screen */
  .lumo .fc-hero{min-height:100svh!important;padding-top:104px!important;padding-bottom:48px!important}
  .fc-hero h1{font-size:32px!important;line-height:1.06!important;margin-bottom:16px!important}
  .fc-hero p{font-size:15.5px!important;line-height:1.55!important;margin-bottom:20px!important}
  .fc-hero .fc-chips{margin-bottom:22px!important;gap:8px!important}
  /* Services bento → single column on phones */
  .svc-grid{grid-template-columns:1fr!important}
  .svc-grid>div{grid-column:span 1!important;min-height:0!important}
  /* For Clients hero proof chips + CTA stack */
  .fc-hero-cta{flex-direction:column!important;align-items:stretch!important}
  .fc-hero-cta>a,.fc-hero-cta>button{width:100%!important;justify-content:center!important}
  /* Services-in-depth row → stack icon/title and meta */
  .sd-row{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
  .sd-row .sd-meta{width:100%!important;justify-content:space-between!important}
  /* Expanded service body → single column, drop the divider */
  .sd .svc-2col{display:flex!important;flex-direction:column!important;gap:22px!important}
  .sd-stack-col{border-left:none!important;padding-left:0!important;border-top:1px solid var(--brd)!important;padding-top:20px!important}
  .sd-body.open{max-height:1200px!important}
}
@media(min-width:601px) and (max-width:900px){
  .svc-grid{grid-template-columns:1fr 1fr!important}
  .svc-grid>div{grid-column:span 1!important}
}
@media(max-width:860px){
  /* No room for header tech tags on narrower screens — they reappear inside the expanded panel */
  .sd-tags-collapse{display:none!important}
}
.svc-card .svc-go{opacity:0;transform:translateX(-6px) scale(.92);transition:opacity .3s cubic-bezier(.22,1,.36,1),transform .3s cubic-bezier(.22,1,.36,1)}
.svc-card:hover .svc-go{opacity:1;transform:none}
.sd-tag-row{display:flex;flex-wrap:wrap;gap:5px}
.sd .sd-plus{transition:transform .3s ease,background .25s ease,border-color .25s ease}
.sd:hover .sd-plus{border-color:rgba(0,76,115,.3);background:var(--bl)}
.bento-tile{transition:transform .25s cubic-bezier(.22,1,.36,1), border-color .25s ease, background .25s ease}
@media(hover:hover){.bento-tile:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.3)}}
@media(max-width:980px){
  .bento{grid-template-columns:repeat(2,1fr)!important}
  .bento>*{grid-column:auto!important;grid-row:auto!important}
  .bento .bento-head,.bento .bento-img{grid-column:1 / -1!important}
  .bento .bento-img{min-height:220px!important}
  .hero-s{min-height:auto!important}
  .hero-w{min-height:auto!important;padding-top:100px!important;padding-bottom:48px!important}
}
@media(max-width:600px){.bento{grid-template-columns:1fr!important}}
/* Hero CTAs — tokenized, reusable, state-driven (no inline JS) */
.hero-cta{display:inline-flex;align-items:center;gap:var(--space-3);background:var(--on-dark);color:var(--blue);padding:var(--space-4) var(--space-8);border-radius:50px;font-family:var(--jk);font-size:var(--text-cta);font-weight:700;text-decoration:none;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18);transition:transform .2s ease, box-shadow .25s ease}
.hero-cta:hover{transform:translateY(-1px);box-shadow:0 12px 30px rgba(0,0,0,.3)}
.hero-cta:active{transform:scale(.98)}
/* headline line reveal */
.hl-line{display:block;overflow:hidden;padding-bottom:.1em}
.hl-line>span{display:inline-block;transform:translateY(118%);animation:lineUp .75s cubic-bezier(.16,1,.3,1) forwards}
.hl-line.l1>span{animation-delay:.12s}
.hl-line.l2>span{animation-delay:.26s}
@keyframes lineUp{to{transform:translateY(0)}}
@media(prefers-reduced-motion:reduce){.hl-line>span{transform:none;animation:none}}
.hero-shot{transition:transform .25s cubic-bezier(.23,1,.32,1), box-shadow .25s ease}
@media(hover:hover){.hero-shot:hover{transform:translateY(-4px);box-shadow:0 44px 110px rgba(0,16,28,.6)}}
.hero-shot:active{transform:scale(.99)}
.hero-dot{transition:width .35s cubic-bezier(.23,1,.32,1), background .25s ease, transform .2s ease}
@media(hover:hover){.hero-dot:hover{transform:scale(1.3)}}
@media(max-width:900px){.hero-2col{grid-template-columns:1fr!important;gap:32px!important}.hero-proof-row{margin-top:28px!important}}
@media(max-width:640px){.hero-proof-row{flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px!important}.hero-proof-chips{justify-content:center}.hero-proof-trust{justify-content:center}.hero-proof-divider{display:none}.hero-visual{display:none!important}}
.hero-live-dot{animation:livePulse 2s ease-in-out infinite}
@keyframes livePulse{0%,100%{opacity:1}50%{opacity:.35}}
@media(prefers-reduced-motion:reduce){.hero-live-dot{animation:none}.hero-shot{transition:none}.hero-shot:hover{transform:none}}
.hd-line{stroke-dasharray:1200;stroke-dashoffset:1200;animation:hdDraw 2.1s cubic-bezier(.22,1,.36,1) .25s forwards}
.hd-line2{animation-delay:.5s;animation-duration:2.3s}
.hd-area{opacity:0;animation:hdFade 1.3s ease 1s forwards}
.hd-end{opacity:0;animation:hdFade .5s ease 2.1s forwards}
@keyframes hdDraw{to{stroke-dashoffset:0}}
@keyframes hdFade{to{opacity:1}}
@media(prefers-reduced-motion:reduce){.hd-line,.hd-line2{stroke-dashoffset:0;animation:none}.hd-area,.hd-end{opacity:1;animation:none}}
.hero-slide{opacity:0;transform:scale(.985);filter:blur(6px);transition:opacity .5s cubic-bezier(.23,1,.32,1), transform .5s cubic-bezier(.23,1,.32,1), filter .5s cubic-bezier(.23,1,.32,1);pointer-events:none}
.hero-slide.on{opacity:1;transform:none;filter:blur(0);pointer-events:auto}
@media(prefers-reduced-motion:reduce){.hero-slide{transition:opacity .4s ease;transform:none;filter:none}.hero-slide.on{transform:none;filter:none}}
.hero-slide .hero-spark-line{stroke-dasharray:1400;stroke-dashoffset:1400}
.hero-slide .hero-spark-area{opacity:0}
.hero-slide.on .hero-spark-line{animation:sparkDraw 1s cubic-bezier(.23,1,.32,1) .12s forwards}
.hero-slide.on .hero-spark-area{animation:sparkFade .8s ease .5s forwards}
.cta-pop-x:hover{background:var(--blue)!important;color:#fff!important}
.blog-body-grid{display:grid;grid-template-columns:230px 1fr;gap:clamp(44px,6vw,88px);align-items:start;margin-top:14px}
.blog-toc{position:sticky;top:96px;max-height:calc(100vh - 116px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--art, var(--accent)) transparent;padding-right:6px;margin-right:-6px}
.blog-toc::-webkit-scrollbar{width:5px}
.blog-toc::-webkit-scrollbar-thumb{background:var(--art, var(--accent));border-radius:50px}
.blog-toc:hover::-webkit-scrollbar-thumb{background:var(--art, var(--blue))}
.toc-link:hover{color:var(--art, var(--blue))!important}
.blog-list li::marker{color:var(--art, var(--teal))}
.blog-list strong{color:var(--art, var(--blue))}
.dark .blog-list strong{color:var(--art, #7DB9E8)}
.blog-share-ico{transition:background .25s,border-color .25s,color .25s,transform .2s cubic-bezier(.23,1,.32,1)}
.blog-share-ico:active{transform:scale(.94)}
@media(hover:hover){.blog-share-ico:hover{background:var(--blue);border-color:var(--blue);color:#fff;transform:translateY(-2px)}}
.blog-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.blog-rel-card{transition:transform .25s cubic-bezier(.23,1,.32,1), box-shadow .25s ease}
.blog-rel-card:active{transform:scale(.99)}
@media(hover:hover){.blog-rel-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(0,30,50,.1)}}
.blog-cta-btn{transition:transform .2s cubic-bezier(.23,1,.32,1),box-shadow .2s ease}
.blog-cta-btn:active{transform:scale(.97)}
@media(hover:hover){.blog-cta-btn:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,.18)}}
@media(max-width:820px){.blog-body-grid{grid-template-columns:1fr;gap:24px}.blog-toc{position:static;max-height:none;overflow:visible;margin-right:0;padding-right:0}.toc-contents{display:none}.blog-related-grid{grid-template-columns:1fr}}
.cc-grid{display:grid;grid-template-columns:1fr 340px;gap:clamp(32px,5vw,56px);align-items:start}
.cc-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(hover:hover){.cc-opt:hover{border-color:var(--blue)!important}.cc-chip:hover{border-color:var(--blue)!important}}
.cc-send{transition:transform .18s cubic-bezier(.23,1,.32,1)}
.cc-send:active{transform:scale(.98)}
.cc-select{appearance:none;-webkit-appearance:none;-moz-appearance:none;padding-right:36px!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;background-size:12px}
.cc-select option{color:#1E293B}
.cc-input::placeholder{color:rgba(255,255,255,.55)}
.cc-chip[data-tip]{position:relative}
.cc-chip[data-tip]:hover::after,.cc-chip[data-tip]:focus-visible::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 9px);left:50%;transform:translateX(-50%);background:var(--txt);color:var(--bg);padding:9px 11px;border-radius:9px;font-family:var(--in);font-size:12px;font-weight:500;line-height:1.45;width:max-content;max-width:230px;white-space:normal;text-align:left;z-index:60;box-shadow:0 10px 30px rgba(0,0,0,.22);pointer-events:none}
.cc-chip[data-tip]:hover::before,.cc-chip[data-tip]:focus-visible::before{content:"";position:absolute;bottom:calc(100% + 3px);left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:var(--txt);z-index:60;pointer-events:none}
.cc-mobilebar{display:none;transition:transform .3s cubic-bezier(.23,1,.32,1)}
.cc-mobilebar.cc-hide{transform:translateY(130%)}
@media(max-width:820px){.cc-grid{grid-template-columns:1fr}.cc-cards{grid-template-columns:1fr}.cc-result>div{position:static!important}.cc-mobilebar{display:flex}.cc-page{padding-bottom:76px}}
@media(prefers-reduced-motion:reduce){.cta-pop-back,.cta-pop-card{transition:opacity .2s ease!important;transform:none!important}}
@keyframes sparkDraw{to{stroke-dashoffset:0}}
@keyframes sparkFade{from{opacity:0}to{opacity:.1}}
@media(prefers-reduced-motion:reduce){.hero-slide .hero-spark-line,.hero-slide.on .hero-spark-line{stroke-dashoffset:0;animation:none}.hero-slide .hero-spark-area,.hero-slide.on .hero-spark-area{opacity:.1;animation:none}}
.hero-ghost{display:inline-flex;align-items:center;gap:var(--space-2);background:none;border:none;cursor:pointer;padding:0;font-family:var(--jk);font-size:15px;font-weight:600;color:var(--on-dark-muted);transition:color .2s ease, gap .2s ease}
.hero-ghost:hover{color:var(--on-dark);gap:14px}
@media(prefers-reduced-motion:reduce){.hero-cta,.hero-ghost{transition:none}.hero-cta:hover,.hero-cta:active{transform:none}.hero-ghost:hover{gap:var(--space-2)}}
`;

const W=({children,style={},className}:{children:ReactNode,style?:CSSProperties,className?:string})=><div className={className} style={{maxWidth:1200,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)",...style}}>{children}</div>;
const SL=({ch,light}:{ch:string,light?:boolean})=><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36}}><div style={{width:28,height:2,background:light?"rgba(255,255,255,.3)":"var(--blue)"}}/><span style={{fontSize:11,color:light?"rgba(255,255,255,.4)":"var(--txt4)",fontWeight:700,textTransform:"uppercase",letterSpacing:3,fontFamily:"var(--jk)"}}>{ch}</span></div>;
const Arr=({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const QSvg=()=><svg width="32" height="24" viewBox="0 0 48 36" fill="none" style={{marginBottom:16,opacity:.1}}><path d="M0 36V20C0 8.95 8.95 0 20 0h2v8h-2c-6.63 0-12 5.37-12 12v2h12v14H0zm28 0V20c0-11.05 8.95-20 20-20v8c-6.63 0-12 5.37-12 12v2h12v14H28z" fill="#004C73"/></svg>;

function AnimNum({end,suffix="",delay=0}:{end:number,suffix?:string,delay?:number}){const[v,setV]=useState(0);useEffect(()=>{const tm=setTimeout(()=>{const s=performance.now();const t=(n:number)=>{const p=Math.min((n-s)/2000,1);setV(Math.round((1-Math.pow(1-p,4))*end));if(p<1)requestAnimationFrame(t);};requestAnimationFrame(t);},delay);return()=>clearTimeout(tm);},[end,delay]);return <span>{v}{suffix}</span>;}
function useReveal(threshold=0.15){const r=useRef<HTMLDivElement>(null);useEffect(()=>{const el=r.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.querySelectorAll('.reveal,.reveal-img').forEach(n=>n.classList.add('in'));obs.disconnect();}},{threshold});obs.observe(el);return()=>obs.disconnect();},[threshold]);return r;}

/* Reading progress bar at the top of long pages */
function ReadingProgress(){
  const[p,setP]=useState(0);
  useEffect(()=>{
    const onScroll=()=>{const h=document.documentElement;const total=h.scrollHeight-h.clientHeight;setP(total?Math.min(100,Math.max(0,h.scrollTop/total*100)):0);};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);};
  },[]);
  return <div className="read-progress" style={{width:`${p}%`}}/>;
}
function ArticleProgress(){
  const[p,setP]=useState(0);
  useEffect(()=>{const on=()=>{const h=document.documentElement;const t=h.scrollHeight-h.clientHeight;setP(t?Math.min(100,Math.max(0,h.scrollTop/t*100)):0);};on();window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);return()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};},[]);
  return <div style={{height:4,borderRadius:50,background:"var(--brd)",overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:"var(--blue)",borderRadius:50,transition:"width .12s linear"}}/></div>;
}

/* Animated metric value: parses "<1s", "72.7%", "3-8+" etc and counts up the first numeric portion */
function MetricVal({v,delay=0}:{v:string,delay?:number}){
  const m=v.match(/^(\D*?)(-?\d+(?:[.,]\d+)?)([\s\S]*)$/);
  const[shown,setShown]=useState(m?m[1]+'0'+m[3]:v);
  const ref=useRef<HTMLSpanElement>(null);
  const started=useRef(false);
  useEffect(()=>{
    if(!m){setShown(v);return;}
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting&&!started.current){
        started.current=true;
        const target=parseFloat(m[2].replace(',','.'));
        const decimals=(m[2].split('.')[1]||m[2].split(',')[1]||'').length;
        const start=performance.now();
        const tick=(now:number)=>{
          const t=Math.min((now-start-delay)/1100,1);
          if(t<0){requestAnimationFrame(tick);return;}
          const eased=1-Math.pow(1-t,3);
          const cur=target*eased;
          const formatted=decimals>0?cur.toFixed(decimals):Math.round(cur).toString();
          setShown(m[1]+formatted+m[3]);
          if(t<1)requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    },{threshold:0.4});
    obs.observe(el);
    return()=>obs.disconnect();
  },[v,delay,m]);
  return <span ref={ref}>{shown}</span>;
}

/* Lightbox modal for gallery images */
function Lightbox({img,onClose}:{img:{src:string,alt:string,caption?:string}|null,onClose:()=>void}){
  useEffect(()=>{
    if(!img)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=prev;};
  },[img,onClose]);
  if(!img)return null;
  return <div className="lb-overlay" role="dialog" aria-modal="true" onClick={onClose}>
    <button className="lb-close" aria-label="Close" onClick={onClose}>×</button>
    <div className="lb-stage" onClick={e=>e.stopPropagation()}>
      <img className="lb-img" src={img.src} alt={img.alt}/>
      {img.caption&&<p className="lb-cap">{img.caption}</p>}
    </div>
  </div>;
}

/* Render rich text with inline [text](url) links and **bold** markdown */
function renderRichText(s:string):ReactNode{
  // Tokenise the string into [text|link|bold] segments using a single regex
  const re=/(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)/g;
  const parts:ReactNode[]=[];
  let lastIdx=0;let m:RegExpExecArray|null;let key=0;
  while((m=re.exec(s))!==null){
    if(m.index>lastIdx)parts.push(s.slice(lastIdx,m.index));
    if(m[1]){
      const link=/\[([^\]]+)\]\(([^)]+)\)/.exec(m[1])!;
      const isExternal=/^https?:\/\//i.test(link[2]);
      parts.push(<a key={key++} href={link[2]} {...(isExternal?{target:"_blank",rel:"noopener noreferrer"}:{})} style={{color:"var(--blue)",textDecoration:"underline",textUnderlineOffset:2}}>{link[1]}</a>);
    }else if(m[2]){
      parts.push(<strong key={key++} style={{fontWeight:700,color:"var(--txt)"}}>{m[2].slice(2,-2)}</strong>);
    }
    lastIdx=re.lastIndex;
  }
  if(lastIdx<s.length)parts.push(s.slice(lastIdx));
  return parts.length?parts:s;
}

/* Active section tracker for the in-page TOC */
function useActiveSection(ids:string[]){
  const[active,setActive]=useState(ids[0]||'');
  useEffect(()=>{
    if(!ids.length)return;
    const els=ids.map(id=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if(!els.length)return;
    const obs=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>(a.target as HTMLElement).offsetTop-(b.target as HTMLElement).offsetTop);
      if(visible[0])setActive((visible[0].target as HTMLElement).id);
    },{rootMargin:"-20% 0px -60% 0px",threshold:0});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[ids.join(',')]);
  return active;
}

/* ── DATA ── */
const cl=["Nomo Smart Care","Farmwave","mobilityONE","Drift App","Noctrix Health","ONCE","beUnity","jumpIN","Ziik","Spika","Greyp Bikes","Zipato","Crossiety","Elektrobit","GlobalLogic","Trust Token","Google","Gamestar+","Aspire Academy", "DeepAR", ];
const cl3=[...cl,...cl,...cl];
const svcs=[
  {n:"01",t:"Technology Strategy & Advisory",hl:"We diagnose before we prescribe.",d:"We immerse in your business context and user needs to build a strategic roadmap that reduces risk and maximizes ROI.",del:["Technology assessment","Strategic roadmap","Architecture advisory","Risk analysis"],tech:["Workshops","Market Analysis","System Design","Roadmapping"],span:true},
  {n:"02",t:"Product & Experience Design",hl:"Interfaces informed by insight.",d:"Research-driven design aligning user needs with business outcomes.",del:["User research","Wireframes & prototypes","Design system strategy","Usability validation"],tech:["Figma","User Testing","Design Systems","Accessibility"]},
  {n:"03",t:"Solution Engineering",hl:"Strategy-led delivery.",d:"Native iOS, Android, cross-platform, and web solutions, architected for scale.",del:["Native iOS & Android","Cross-platform","Web applications","CI/CD & DevOps"],tech:["React","Swift","Kotlin","Node.js","TypeScript","AWS"]},
  {n:"04",t:"IoT & Connected Systems",hl:"From sensor to insight.",d:"End-to-end IoT ecosystems: architecture, data pipelines, edge computing.",del:["Architecture advisory","Cloud infrastructure","Data pipelines","Edge computing"],tech:["BLE","MQTT","AWS IoT","Edge AI","C++"]},
  {n:"05",t:"AI & Data Strategy",hl:"Turn data into a strategic asset.",d:"AI/ML solutions that automate decisions, surface insights, and create intelligent capabilities.",del:["AI/ML strategy","Data pipelines","Analytics infrastructure","Automation"],tech:["Python","TensorFlow","Data Engineering","ML Ops"]},
];
const engs=[{t:"Technology Strategy & Advisory",d:"We assess your landscape and recommend a clear path forward."},{t:"Embedded Consulting Teams",d:"Our team integrates with yours and delivers alongside you."},{t:"Defined Engagements",d:"Scoped initiative, dedicated team, predictable outcome."},{t:"Knowledge Transfer & Workshops",d:"Sessions that level up your in-house capabilities."},{t:"Startup Partnership",d:"We co-invest our expertise. Risk, vision, and equity shared."}];
const proc=[{ph:"Assess",n:"01",d:"Deep-dive into your business and technology landscape."},{ph:"Advise",n:"02",d:"Every recommendation backed by research and aligned with objectives."},{ph:"Deliver",n:"03",d:"Clean, scalable solutions in iterative sprints."},{ph:"Evolve",n:"04",d:"Ongoing advisory. We guide your technology evolution."}];
const tests=[
  {q:"Our partnership with Lumo Lab has been instrumental in shaping our long-term vision. They've consistently delivered innovative solutions that align with our strategic goals. The team's deep understanding of our business, coupled with their technical expertise, has been invaluable. We're excited to continue our journey with Lumo Lab as we embark on new challenges and opportunities.",n:"Kevin Ray",r:"Co-Founder & CTO",co:"Nomo International Inc",linkedin:"https://www.linkedin.com/in/kevinjray/",website:"https://nomosmartcare.com",img:process.env.PUBLIC_URL+"/images/kev.png",caseId:"nomo"},
  {q:"It's been great working with Lumo Lab. Jurica and his team have consistently delivered results with clear communication and a regular cadence of updates and insights into progress. Lumo has done more for us in 7 months than internal teams did in 18 months. We look forward to a long term strategy with Lumo Lab.",n:"Craig Ganssle",r:"CEO",co:"Farmwave Inc",linkedin:"https://www.linkedin.com/in/craigganssle/",website:"https://farmwave.io",img:process.env.PUBLIC_URL+"/images/craig.jpeg",caseId:"farmwave"},
  {q:"Lumo Lab has been a key partner in our mobile app development and deployment efforts. Their strong communication, timely delivery, and user-centric approach have significantly contributed to the success of our app. We're grateful for their partnership and look forward to future collaborations.",n:"Jen McCarthy",r:"Business Development",co:"Drift App Inc",linkedin:"https://www.linkedin.com/in/jen-mccarthy/",website:"",img:process.env.PUBLIC_URL+"/images/jen.jpg",caseId:"drift"},
  {q:"Working with Lumo Lab was a true pleasure. Their team was incredibly collaborative, always open to feedback, and committed to building a strong partnership. Their clear and timely communication kept us informed throughout the entire development process, ensuring a smooth and successful project.",n:"Dalibor Cvek",r:"CEO",co:"Once Sport",linkedin:"https://www.linkedin.com/in/daliborCvek/",website:"",img:process.env.PUBLIC_URL+"/images/dalibor.jpeg",caseId:null as string|null},
];
const cases=[
  {id:"nomo",name:"NOMO Smart Care",cat:"Health",tags:["IoT","AI/ML","Mobile"],client:"Nomo International, Ltd",website:"nomosmartcare.com",period:"March 2021 to Present",brief:"A whole-home safety platform for families caring for aging parents. A small hub, a few outlet sensors, an app that learns the routine and speaks up when something's off. No cameras, no wearables.",ch:"Millions of older adults live alone, and their adult children live with a low-grade worry about them. A fall, a stroke, a slow drift in daily routine: these things often go unnoticed until they turn serious. The existing options all carry the same compromise. Cameras feel like surveillance, pendants get taken off, wearables sit forgotten on the bedside table. Families were stuck choosing between a parent's safety and a parent's dignity. Nomo set out to build something different: a quiet mesh of sensors that listens for the moments that actually matter instead of watching everything. They needed a full technology partner to deliver it across hardware, mobile, cloud, and on-device AI, at roughly a dollar a day.",ap:"We built the whole stack. A small hub lives in a central room and pairs with low-power satellite sensors that plug into outlets around the home, plus tags for doors, the fridge, and the medicine cabinet. Native iOS (Swift) and Android (Kotlin) apps give every member of the Care Circle instant alerts, two-way voice to the hub, and a shared timeline of the day. A TypeScript back end on AWS, with Firebase for push delivery and MQTT for resilient messaging, keeps devices and caregivers in sync even when cellular networks wobble. The most important piece sits on the hub itself: custom TensorFlow Lite models classify sounds (a fall, a smoke alarm, a cry for help) and motion patterns (prolonged inactivity, a sliding fall, a missed wake-up) locally, and learn each home's normal routine over time so a 4 AM bathroom trip doesn't turn into a 4 AM alert. When something real happens, RapidSOS opens a direct line to 911 in under a second.",re:"Nomo is live on iOS and Android across all 50 US states, with thousands of hubs in real homes. The product runs on a monthly subscription at roughly a dollar a day, with a 60-day risk-free trial. Alert-to-notification latency sits under a second. Routine learning means false alarms stay rare, so caregivers trust the alerts they do get. Families end up with what they actually wanted: peace of mind, without turning a parent's home into a surveillance system.",q:"Our partnership with Lumo has been instrumental in shaping our long-term vision.",qn:"Kevin Ray",qr:"Co-Founder & CTO @ Nomo International",metrics:[{v:"<1s",l:"alert to caregiver"},{v:"AI",l:"learns each home's routine"},{v:"24/7",l:"911 via RapidSOS"},{v:"50 states",l:"US-wide availability"}],features:[{t:"Fall Detection",d:"Catches both impact falls and prolonged inactivity, including the slow / sliding falls that wearables miss."},{t:"Routine Learning",d:"AI learns each household's normal day so unusual events stand out and false alarms stay rare."},{t:"RapidSOS Ready",d:"Direct 911 dispatch in under a second for genuine emergencies."},{t:"Sleep & Activity Insights",d:"Tracks bedroom movement, frequent wake-ups, and bathroom trips, surfacing changes early."},{t:"Two-Way Voice",d:"Caregivers can talk through the hub without an extra device on the parent's side."},{t:"Unlimited Care Circle",d:"Invite every family member who wants to help, at no extra cost per seat."}],stack:[{g:"Mobile",i:["Swift","Kotlin"]},{g:"Backend & infra",i:["TypeScript","Node.js","AWS","Firebase","MQTT"]},{g:"On-device AI",i:["TensorFlow Lite","Audio + motion classifiers"]},{g:"Hardware",i:["Hub","Satellite sensors","Door / fridge tags"]},{g:"Web",i:["React.js","Next.js"]},{g:"Emergency",i:["RapidSOS"]}],why:[{t:"Why on-device AI?",d:"Audio and motion are the most sensitive data in someone's home. Running the classifier on the hub means the data is analysed and discarded locally. Nothing streams to a cloud, nothing is ever recorded. That's a privacy decision first and a latency decision second."},{t:"Why a sensor mesh instead of a wearable or a camera?",d:"Wearables get taken off. Cameras feel like surveillance. A small hub plus a handful of outlet satellites and tags covers the whole home invisibly, runs 24/7, and asks nothing of the parent."},{t:"Why native iOS + Android, not cross-platform?",d:"An alert that lands half a second late is an alert that didn't land. Native gives us the background-process control, push-delivery reliability, and two-way-voice performance that a wrapped framework can't match."},{t:"Why MQTT + Firebase together?",d:"Firebase for push notifications, MQTT for the live duplex channel between hub and app. Cellular drops happen; using both means the next alert still gets through."}],services:["Web development","Mobile development","DevOps","IoT solutions","AI solutions","Quality assurance"],cover:"#004C73",headerImg:(process.env.PUBLIC_URL+"/images/nomo_header_1.png"),coverImg:(process.env.PUBLIC_URL+"/images/nomo_cover.png"),coverImgMobile:(process.env.PUBLIC_URL+"/images/nomo_header_1.png"),cardImgMobile:(process.env.PUBLIC_URL+"/images/nomo_header_1.png")},
  {id:"farmwave",name:"Farmwave",cat:"AgTech",tags:["AgTech","Edge AI","DevOps"],client:"Farmwave, Inc",website:"farmwave.io",period:"May 2024 to Present",brief:"Award-winning vision AI that retrofits onto any combine harvester, watching for lost grain in real time, offline, from inside the cab.",ch:"Every harvest, a surprising share of the crop spills out of the combine before it ever reaches the grain tank. The losses are invisible: a few kernels here, a few there, spread across hundreds of acres. Over a season they add up to thousands of dollars per field. Manual checks (getting out of the cab, pacing, counting kernels on the ground) don't scale when the combine is running. The factory telemetry on most machines tells the operator everything is fine when grain is actually leaking. Farmwave needed an AI that could do this job continuously, from the cab, on any combine new or old, and crucially without internet, because the fields where this matters most have no signal at all.",ap:"We built an end-to-end platform. In the cab, a Flutter app on a rugged tablet gives the operator a consistent interface across different machinery. Up on the combine, three to ten cameras (held in place by industrial magnets) capture an image every three seconds and feed an on-device vision model that pinpoints where grain is escaping: the header, a section of the combine body, or further down the machine. The operator sees losses live and adjusts settings on the fly, no stopping. A Node.js back end on Google Cloud Platform handles the seasonal spikes without paying for idle capacity off-season; a React dashboard lets agronomists and farm managers review sessions and compare fields on the web. The whole system retrofits onto any combine make or model in a few hours.",re:"Farmers recover 3 to 8+ bushels per acre per season by catching losses as they happen, with more than 140 measurements per acre going into each session. The platform runs on more than a dozen crops, from corn and soybeans to peanuts, cotton, and edible beans. Farmwave won AI Harvest Vision Solution of the Year 2025 for the work, and rolled into Brazil the same year through a partnership with VRO. The product proved out in the field, not just in a deck.",q:"Lumo has done more for us in 7 months than internal teams did in 18 months.",qn:"Craig Gannsle",qr:"CEO @ Farmwave Inc",metrics:[{v:"3-8+",l:"bu/acre recovered"},{v:"Every 3s",l:"image capture per camera"},{v:"Any combine",l:"retrofit in hours"},{v:"Award 2025",l:"AI Harvest Vision"}],features:[{t:"Harvest Vision System",d:"Real-time camera sensors on the combine capture and analyse grain loss autonomously."},{t:"Edge AI",d:"The vision model runs directly on the rugged tablet in the cab. No internet required in the field."},{t:"Multi-Camera Setup",d:"3 to 10 cameras mount with industrial magnets, configurable per machine, all the way up to peanut harvesters."},{t:"Loss Source Pinpoint",d:"Identifies whether grain is escaping from the header, the combine body, or a specific section so the operator knows exactly what to adjust."},{t:"Crop Variety",d:"Works across corn, soybeans, wheat, peanuts, cotton, edible beans, canola, barley, oats, lentils, and peas."},{t:"Live Recommendations",d:"The 2025 software update suggests real-time adjustments based on detected losses, especially valuable for less experienced operators."}],stack:[{g:"In-cab tablet",i:["Flutter","Edge AI","Computer Vision"]},{g:"Hardware",i:["3-10 cameras","Industrial magnet mounts","Rugged tablet"]},{g:"Backend & infra",i:["Node.js","Google Cloud Platform"]},{g:"Web dashboard",i:["React.js","SSR"]}],why:[{t:"Why Edge AI on the tablet?",d:"The fields Farmwave serves often have no cellular signal. Cloud inference would mean no inference. The AI has to run on the device, full stop. Everything else in the architecture follows from that one constraint."},{t:"Why a retrofit instead of an OEM integration?",d:"Farmers don't replace combines. They use the one in the shed, often for 15+ years. A retrofit that goes onto any make or model in a few hours reaches the operators who need this most, without waiting on a manufacturer roadmap."},{t:"Why Flutter in the cab?",d:"Farmwave runs across different tablet makers and machinery brands. Flutter lets us ship one codebase that feels consistent on every rig, instead of maintaining separate native forks for each OEM."},{t:"Why Google Cloud, not AWS?",d:"Usage is violently seasonal: a six-week harvest window, then quiet. GCP's scaling and per-second billing suit that shape better than reserved-capacity thinking."}],services:["Discovery","Web development","DevOps","AI solutions","Quality assurance"],press:[{l:"AI Harvest Vision Solution of the Year 2025",u:"https://www.agribusinessrevieweurope.com/farmwave"}],cover:"#004C73", headerImg:(process.env.PUBLIC_URL+"/images/farmwave_tablet.jpeg"),coverImg:(process.env.PUBLIC_URL+"/images/farmwave_cover.png")},
  {id:"muvr",name:"Muvr",cat:"Health",tags:["iOS","Swift","Wearables"],client:"Muvr Labs, Inc",website:"muvrlabs.com",period:"May 2020 to April 2022",brief:"An iOS platform that gave orthopedic surgeons continuous insight into how their joint-replacement patients were actually recovering at home. Acquired by Exactech in December 2020 to anchor their Active Intelligence orthopedic platform.",ch:"After a hip or knee replacement, the real work happens at home over weeks of rehab. Surgeons couldn't see any of it, only what the patient said at the 6-week check-up. Step counts from pedometer-style tools didn't help: what matters in orthopedic recovery is the actual range of motion of the joint, not how many times the patient walked to the kitchen. When patients fell behind on exercises or their joint wasn't moving correctly, nobody knew until it was late. Muvr wanted to close that gap: give surgeons the same kind of continuous data they'd have if the patient were still in the clinic, and a way to nudge patients between visits without flooding the practice's phone lines.",ap:"We built a native iOS app in Swift paired to wireless sensors that the patient wears during recovery. The sensors continuously measure joint range of motion, exercise completion, and activity, and stream the data back to the surgeon's team as clean, clinical signal, not step counts. Surgeons see a web dashboard that flags at-risk patients and lets them connect remotely for follow-up. A customisable patient chatbot handles the routine touchpoints (reminders, common questions, between-visit check-ins) without consuming nursing time. SnapKit handled UI constraints and RxSwift handled the live sensor stream. The app had to feel solid enough for orthopedic practices to actually deploy, and fast enough not to stutter under the data rate.",re:"Muvr became a dependable clinical tool for orthopedic practices: surgeons monitored recovery remotely, patients got proactive reminders and guidance, and unnecessary follow-up visits fell. In December 2020, Exactech acquired Muvr to bring the platform into their Active Intelligence orthopedic suite, with plans to extend the technology to shoulder and ankle replacement surgery next.",q:"",qn:"",qr:"",metrics:[{v:"Acquired Dec 2020",l:"by Exactech"},{v:"Hip & knee",l:"recovery monitoring"},{v:"Wearable + chatbot",l:"continuous engagement"},{v:"Active Intelligence",l:"part of Exactech's platform"}],features:[{t:"Wearable Integration",d:"Continuous, real-time range-of-motion data from wireless sensors during recovery."},{t:"Surgeon Dashboard",d:"Web view that flags at-risk patients and supports remote follow-up."},{t:"Patient Chatbot",d:"Customisable text conversations for reminders and common questions, between visits."},{t:"Remote Monitoring",d:"Track exercise compliance and joint progress without requiring in-person visits."},{t:"Big-Data Insights",d:"Aggregated outcomes across the patient cohort to refine clinical pathways."},{t:"Clinical-Grade iOS",d:"Built and tested to the standards required for orthopedic practice deployment."}],stack:[{g:"Mobile",i:["Swift","iOS"]},{g:"UI",i:["SnapKit"]},{g:"Reactive",i:["RxSwift"]},{g:"Wearables",i:["Wireless motion sensors"]},{g:"Engagement",i:["Patient chatbot"]}],why:[{t:"Why native Swift?",d:"Sensor data arrives continuously and the UI has to stay smooth while it's rendered. Native iOS under Swift gives us the tightest control over the main thread, which is where responsive charts happen, or don't happen."},{t:"Why RxSwift?",d:"Live sensor streams map very cleanly onto reactive programming. Compose the signal, filter it, aggregate it, subscribe views to it. Doing this with plain callbacks would have turned the codebase into a pile of state-management tangles."},{t:"Why SnapKit, not Storyboards?",d:"Clinical apps get used on every iPhone screen size in clinics. SnapKit-in-code constraints were faster to iterate on than Storyboards and easier to unit-test."},{t:"Why a chatbot alongside the wearable?",d:"Sensor data tells surgeons what's happening with the joint. The chatbot solves the other half of recovery: keeping the patient on track between visits without burning nursing time on routine reminders. The two together cover the gap that one alone can't."}],services:["Mobile development","Quality assurance"],press:[{l:"2019 App Innovation Award",u:"https://investors.progress.com/news-releases/news-release-details/progress-announces-winners-2019-app-innovation-awards"}],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/muvr_home.jpg"),coverImg:(process.env.PUBLIC_URL+"/images/muvr_cover.jpeg"),coverImgMobile:(process.env.PUBLIC_URL+"/images/muvr_home.jpg")},
  {id:"noctrix",name:"Noctrix Health",cat:"Health",tags:["Health","iOS","Bluetooth"],client:"Noctrix Health",website:"noctrixhealth.com",period:"",brief:"The iOS clinician app for the NTX100 TOMAC system: the first FDA-authorised, drug-free therapy for moderate-to-severe Restless Legs Syndrome.",ch:"Restless Legs Syndrome keeps millions of people awake at night with an involuntary urge to move their legs. For patients who've tried every medication and still can't sleep, options run out. Noctrix developed the NTX100 TOMAC (Tonic Motor Activation): two small therapy units paired with electrode patches worn below the knees that gently stimulate the peroneal nerves bilaterally to produce a continuous, sleep-compatible muscle activation. They earned FDA De Novo marketing authorisation in April 2023, the first authorised non-drug therapy for RLS. For the device to actually reach patients, a clinician needed a reliable, medical-grade way to programme each therapy unit, calibrate stimulation output per patient, and capture clinical data. Reliability wasn't a nice-to-have: this is a regulated medical device, and a connection that drops mid-session is a safety issue.",ap:"We designed and built the iOS Clinician App in Swift with deep CoreBluetooth integration for the NTX100 hardware. The app ships pre-installed on Noctrix-provided iOS devices given to each clinic, so the deployment surface is fully controlled, no consumer app store, no version drift across devices. The architecture handles the real-time BLE handshake to two paired therapy units, the per-patient calibration of stimulation output, and clinical data capture, all within the constraints of a regulated medical device environment: documented, testable, and predictable. The clinician workflow was kept intentionally narrow: a small number of well-trodden paths, because a medical device isn't the place for clever UX experiments.",re:"A dependable clinical tool that practitioners use to programme and manage NTX100 therapy for their patients. It's part of every clinical deployment of the device, a non-drug option for patients who had effectively run out of them. Noctrix's pivotal RCT met all 7 efficacy endpoints and reported a 72.7% responder rate at week 24. In 2026, ResMed signed a merger agreement to acquire Noctrix Health for $340 million, folding the NTX100 TOMAC platform into ResMed's sleep and respiratory care portfolio.",q:"",qn:"",qr:"",metrics:[{v:"$340M",l:"acquired by ResMed (2026)"},{v:"FDA De Novo",l:"authorisation (Apr 2023)"},{v:"72.7%",l:"responder rate at 24 wks"},{v:"First-in-class",l:"non-drug RLS therapy"}],features:[{t:"Bluetooth Integration",d:"Reliable real-time BLE link to both NTX100 therapy units worn by the patient."},{t:"Per-Patient Calibration",d:"Clinician programmes custom stimulation output specific to each patient's tolerance and response."},{t:"Therapy Management",d:"Programme, adjust, and review therapy sessions during clinic visits."},{t:"Clinical Data Capture",d:"Session data recorded for clinical review and regulatory compliance."},{t:"Pre-installed iOS App",d:"Ships on Noctrix-provided iOS devices for a fully controlled deployment surface."},{t:"Medical-Grade Reliability",d:"Built to the standards required for a prescription-authorised medical device."}],stack:[{g:"Mobile",i:["Swift","iOS"]},{g:"Connectivity",i:["CoreBluetooth","BLE"]},{g:"Deployment",i:["Pre-installed Noctrix iOS device"]}],why:[{t:"Why native Swift + CoreBluetooth?",d:"A regulated medical device can't afford a dropped Bluetooth session mid-therapy. Apple's first-party BLE stack, written against in Swift, gives us the most tested path to connection reliability, with documented behaviour that satisfies regulators, not a third-party abstraction."},{t:"Why a controlled hardware deployment?",d:"Every clinic gets a Noctrix-provided iOS device with the app pre-installed. There's no consumer app store, no version mismatch, no clinician downloading the wrong build. For a regulated device, that's the simplest path to a defensible deployment posture."},{t:"Why a narrow, almost boring UI?",d:"This app lives inside a medical device workflow. Every surprise is a risk. We intentionally kept the surface small and the paths well-trodden. Clinicians learn it once, and it behaves the same way every time."}],services:["Mobile development","Architecture advisory","Quality assurance"],press:[{l:"ResMed enters merger agreement to acquire Noctrix Health for $340M",u:"https://www.massdevice.com/resmed-enters-merger-agreement-to-acquire-noctrix-health-for-340-million/"}],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/noctrix_showcase.png"),coverImg:(process.env.PUBLIC_URL+"/images/noctrix_cover.jpeg")},
  {id:"beunity",name:"beUnity",cat:"Social",tags:["Mobile","PWA","Hybrid"],client:"beUnity AG",website:"beunity.io",period:"November 2022 to Present",brief:"A central member platform for clubs, churches, associations and parish groups, replacing the scatter of email chains, WhatsApp groups, and noticeboards with one app every member actually opens.",ch:"Member organisations (associations, clubs, parish groups, cooperatives, settlements, churches) had the same problem wherever we looked. Announcements went out by email, event reminders on WhatsApp, polls on Facebook, the marketplace on a noticeboard. Nothing lived in one place. New members couldn't find anything. Long-standing members missed half of what was happening. Organisations needed a single, trusted space where all of this would live, and they needed it to be instantly accessible, without every member having to hunt down an app in the App Store first.",ap:"We built beUnity as a Progressive Web App: users open it in their phone browser, tap 'Add to Home Screen', and from that moment on it looks and feels like any other app. No App Store review, no long install. We wrapped it with Turbo Native so it can still do the native-only bits (push notifications, badges, alerts) without losing the biggest advantage of a PWA: we can ship updates instantly, without every member having to update anything. All data is hosted exclusively on European servers and the platform is fully GDPR-compliant, non-negotiable for the Swiss organisations that founded the product.",re:"Founded in 2020 as a spin-off of Crossiety AG, beUnity now powers 500+ member organisations: clubs, churches, settlements, parish groups, associations. Updates go out the same day we ship them. Members get one app that actually replaces the pile of tools they used to juggle, with forums, events, surveys, file sharing, and groups all in one place.",q:"",qn:"",qr:"",metrics:[{v:"500+",l:"member organisations"},{v:"Instant",l:"install via PWA"},{v:"Same-day",l:"updates ship"},{v:"GDPR",l:"EU-only data residency"}],features:[{t:"Centralised Communication",d:"Forums, posts, comments, and chat in one place. No more fragmented tools."},{t:"Event Management",d:"Built-in calendar with personal-calendar sync and attendance tracking."},{t:"Surveys & Polls",d:"Quick decisions and member input without leaving the platform."},{t:"File Sharing",d:"Files attached to posts and chats are auto-stored in one searchable place."},{t:"Groups & Forums",d:"Topic-specific spaces so members only see content relevant to them."},{t:"Web, iOS & Android",d:"One platform across browser, smartphone, and tablet. No separate logins."}],stack:[{g:"Frontend",i:["PWA","JavaScript"]},{g:"Native wrapper",i:["Turbo Native","iOS","Android"]},{g:"Hosting",i:["EU-only servers","GDPR-compliant"]},{g:"Messaging",i:["Push Notifications"]}],why:[{t:"Why a PWA, not a native app?",d:"Onboarding a new member is the highest-friction moment in a community product. A PWA skips the App Store entirely. Someone shares a link, the recipient opens it, and they're in. That's a 10-second path instead of a 10-minute one."},{t:"Why Turbo Native on top?",d:"A pure PWA can't do push notifications on iOS with full reliability, and doesn't get a real home-screen icon on every OS. Wrapping it with Turbo Native gives us the native features where they matter and keeps the deploy-instantly advantage of the PWA everywhere else."},{t:"Why EU-only data residency?",d:"Many of the organisations on beUnity are based in Switzerland and the broader EU, where members trust the platform with personal data on the assumption it doesn't cross a border it shouldn't. Storing exclusively on European servers makes that promise architectural, not aspirational."}],services:["Mobile development","Quality assurance"],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/beunity_showcase.png"),coverImg:(process.env.PUBLIC_URL+"/images/beunity_cover.jpeg"),coverImgMobile:(process.env.PUBLIC_URL+"/images/beunity_header_2.png")},
  {id:"drift",name:"Drift App",cat:"AgTech",tags:["AgTech","iOS","Geospatial"],client:"Drift App Inc",website:"ditchdrift.com",period:"",brief:"A native iOS tool that tells US farmers when conditions are safe to spray, automatically maps adjacent fields, shares crop traits with neighbours, and produces a paper trail for every spray decision.",ch:"Spraying herbicide is one of the riskiest moves a farmer makes in a season. If the wind lifts the spray off your field onto a neighbour's, you've just damaged their crop, and invited a lawsuit, an insurance claim, and a very expensive conversation. Farmers needed two things: a tool that told them, from the cab, whether conditions were genuinely safe on this specific field right now, and an automated way to know what's growing across the fence so they could pick the right product in the first place. A generic weather app isn't enough; phone calls to neighbours don't scale.",ap:"We defined a native iOS architecture around three things a farmer actually cares about: maps, live weather, and a paper trail. MapKit handles field-level geospatial planning (your fields, your neighbours' fields, their crop types and herbicide traits) and the system automatically detects adjacent fields once a farmer draws their boundaries. A live-weather integration pulls wind, direction, and temperature for the specific field the farmer is about to spray, and combines it with their sprayer setup (custom tank mixes, nozzle size, pump pressure) to produce a clear Sprayability Index and a 4-day Spray Planner forecast. Visual drift-pattern overlays show how spray would carry under current conditions. Every spray event is logged automatically for compliance, with an exportable report covering weather, drift pattern, and surrounding crop traits at the time.",re:"The Drift App became the industry's first crop-type and seed-trait sharing tool. Farmers use it daily to plan sprays, share crop traits with adjacent operators automatically (no more phone calls), and keep regulators, neighbours, and insurance companies happy. They make more confident decisions, and when a claim does come up, the records are already there.",q:"Their communication and user-centric approach have significantly contributed to our app's success.",qn:"Jen McCarthy",qr:"Business Development @ Drift App Inc",metrics:[{v:"Sprayability Index",l:"go/no-go score"},{v:"4-day",l:"spray forecast"},{v:"Auto",l:"crop trait sharing with neighbours"},{v:"Industry-first",l:"crop & trait sharing tool"}],features:[{t:"Sprayability Index",d:"A clear go/no-go score combining live wind, temperature, nozzle size, pump pressure, and tank mix."},{t:"4-day Spray Planner",d:"Forecast that lists your fields by sprayability or proximity, so you plan the week, not the moment."},{t:"Adjacent Field Detection",d:"Draw your boundaries once, the app automatically finds neighbouring fields and prompts to invite them."},{t:"Visual Drift Patterns",d:"Overlay shows how spray would carry under current weather conditions."},{t:"Custom Sprayer Setup",d:"Build your herbicide list, custom tank mixes, and enter nozzle and pressure for accurate scoring."},{t:"Compliance Reports",d:"Print or export a record of weather, drift pattern, and surrounding traits at the moment of spraying."}],stack:[{g:"Mobile",i:["Swift","iOS 13+"]},{g:"Geospatial",i:["MapKit","CoreLocation"]},{g:"Integrations",i:["Weather APIs","Sprayer telemetry"]}],why:[{t:"Why native iOS, not cross-platform?",d:"Maps, location permissions, background fetch and offline persistence are all areas where first-party iOS APIs are simply better. Going cross-platform here would have added wrappers and bugs for zero user-visible benefit."},{t:"Why field-level weather, not regional?",d:"The wind on the edge of your own field matters more than a reading at the nearest airport 20 km away. We integrate weather data at the granularity of the actual spray decision, which is the only granularity that matters."},{t:"Why build trait sharing into the same app?",d:"The single most expensive mistake in spraying is spraying the wrong product on a field next to one with sensitive traits. Putting trait sharing inside the planner means the relevant information is right there at the decision moment, not three apps and two phone calls away."},{t:"Why build compliance logs into the flow?",d:"A farmer won't remember to log every spray by hand, and that's exactly when insurance claims fail. Logging is a byproduct of using the app, not a separate step."}],services:["Mobile development","Strategy advisory","Quality assurance"],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/drift_showcase.png"),coverImg:(process.env.PUBLIC_URL+"/images/drift_cover.jpeg")},
  {id:"mobility",name:"MobilityOne",cat:"Mobility",tags:["SaaS","Frontend"],client:"MobilityOne",website:"mobilityone.io",period:"",brief:"A SaaS fleet platform built for corporates and leasing companies. Pulls mileage, fuel, maintenance, assignments, and CO₂ into one source of truth, then hands it straight to ERP.",ch:"Fleet data at most corporates and leasing companies lives in five different places. Mileage sits in spreadsheets, fuel and motorway receipts in email, maintenance in a separate tool, driver assignments on a whiteboard, CO₂ reporting in whatever someone last built in Excel. Nobody has a single view of the fleet, so cost decisions are guesses, audit season is painful, and ESG reports are a scramble. MobilityOne needed a consolidated platform that fleet managers would actually use every day, that finance and sustainability teams could trust, and that handled every vehicle type, not just cars.",ap:"We architected a SaaS web platform that covers the full operational loop: mileage tracking, fuel and motorway expense management, maintenance scheduling, vehicle assignments, and CO₂ reporting per vehicle, organisation unit, vehicle type, and geographic location. The system handles every vehicle type the platform needs to support (cars, vans, trucks, buses, trains, forklifts, heavy machinery) across multiple fuel types. The dashboard is built for daily use, not quarterly reports. It's clean, fast, and keyboard-friendly. Datasets export straight into ERP and finance systems for automated cost allocation and booking, so there's no double-entry at month end. Each function (HR, Procurement, Logistics, Finance, Accounting) gets its own dashboard tailored to what they actually need to see.",re:"Companies using MobilityOne get a single source of truth for their fleet. Operating costs drop because decisions are now based on real numbers; compliance and CO₂ reporting stop being quarterly fire drills. The platform was founded in 2019 in Zagreb by Make IT Easy d.o.o. and now serves corporate and leasing-company deployments across the EU.",q:"",qn:"",qr:"",metrics:[{v:"All vehicle types",l:"cars to heavy machinery"},{v:"Multi-fuel",l:"any powertrain"},{v:"ERP-ready",l:"export datasets"},{v:"CO₂",l:"per car, unit, region"}],features:[{t:"Mileage Tracking",d:"Per-vehicle mileage with import, review, analysis, and export pipelines."},{t:"Fuel & Motorway",d:"Capture all fuel and toll expenses for accurate per-vehicle cost."},{t:"Maintenance Scheduling",d:"Proactive interval reminders to reduce downtime."},{t:"Assignment Management",d:"Track which driver, department, and project a vehicle belongs to."},{t:"CO₂ Reporting",d:"Footprint by vehicle, organisation unit, vehicle type, and geography."},{t:"ERP Export",d:"Datasets ready for direct import into finance and ERP systems for cost allocation and booking."}],stack:[{g:"Frontend",i:["React","TypeScript"]},{g:"Backend",i:["Node.js"]},{g:"Data",i:["PostgreSQL"]},{g:"Infra",i:["AWS"]}],why:[{t:"Why React + TypeScript?",d:"Fleet managers live in this dashboard all day. SPA responsiveness and good keyboard flow matter far more than SEO or first-paint speed. TypeScript earns its keep the moment you start handling money, vehicles, and assignments in the same state."},{t:"Why PostgreSQL, not NoSQL?",d:"Vehicles belong to business units, drivers are assigned to vehicles, events reference drivers and vehicles, invoices reference events. This is relational data, top to bottom. Reaching for NoSQL would have created problems we don't need."},{t:"Why one platform for every vehicle type?",d:"Most fleet tools assume cars. Real corporate fleets are messier — service vans, delivery trucks, factory forklifts, sometimes whole transport divisions. Building once for the full range avoids the per-vehicle-type SaaS sprawl that finance teams end up reconciling at quarter-end."},{t:"Why build export-to-ERP in from day one?",d:"If fleet numbers don't get into finance cleanly, they get re-typed, and re-typed numbers are wrong numbers. We made exporting a first-class feature so month-end closes without drama."}],services:["Web development","SaaS architecture","Quality assurance"],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/mo_showcase.png"),coverImg:(process.env.PUBLIC_URL+"/images/mo_cover.jpeg")},
  {id:"crossiety",name:"Crossiety",cat:"Social",tags:["Mobile","PWA","Community"],client:"Crossiety AG",website:"crossiety.ch",period:"November 2022 to Present",brief:"A trusted digital village square for towns, villages, and city neighbourhoods. Real neighbours, real names, GIS-based local radius, GDPR by design.",ch:"Local life (the lost cat, the bake sale, the new shop opening, the council meeting) was drifting onto Facebook and WhatsApp, where it either got buried by algorithms or trapped in chat groups half the neighbourhood wasn't in. Nobody wanted a second Facebook for their town. What residents actually wanted was a trusted space tied to the place they lived: real names only, no anonymous drama, and a feed that belongs to the community rather than a global platform optimising for outrage.",ap:"We built Crossiety as a Progressive Web App so residents can open it on any phone browser and use it immediately. No App Store install stands between them and their neighbourhood. Turbo Native gives it the native feel where it counts: push notifications for new local posts, badges, alerts. SMS verification with real first and last names is the quiet backbone, the cheapest, most privacy-respecting way to make sure the person across the feed is actually a neighbour, not a bot or a troll. A GIS-based radius lets each resident pick the towns and neighbourhoods they care about, so the feed feels truly local instead of platform-wide.",re:"Founded in 2015 in Zurich, Crossiety is now used by communities across Switzerland and Germany as their digital village square. Local news, events, classifieds, groups, and chat all live in one place, tied to a verified residency. Updates ship instantly, and the feed feels like the place it actually represents, not the algorithmic noise of a global platform.",q:"",qn:"",qr:"",metrics:[{v:"SMS-verified",l:"real neighbours, real names"},{v:"GIS radius",l:"truly local feed"},{v:"CH & DE",l:"deployed across"},{v:"GDPR",l:"data-minimal by design"}],features:[{t:"Trusted Identity",d:"Real first + last name with SMS verification. Bots and trolls don't make it through."},{t:"Local Radius (GIS)",d:"Residents choose which towns and neighbourhoods they want in their feed."},{t:"Multiple Post Types",d:"News, events, share, survey, organize. One platform replaces five."},{t:"Real-time Comments & Chat",d:"Two-way conversation directly with neighbours, secure and private."},{t:"Event & Resource Sharing",d:"Sync with Google Calendar and Apple Calendar; share across communities."},{t:"Push Notifications",d:"Opt-in alerts keep residents informed about local news, events, and emergencies."}],stack:[{g:"Frontend",i:["PWA","JavaScript"]},{g:"Native wrapper",i:["Turbo Native","iOS","Android"]},{g:"Trust layer",i:["SMS verification","Real-name identity"]},{g:"Geo",i:["GIS","Radius selection"]},{g:"Messaging",i:["Push Notifications"]}],why:[{t:"Why a PWA here too?",d:"Crossiety competes with a three-second Facebook Group. Any friction in getting the first post in front of a resident loses the user. A PWA removes the install. Open the link, you're in the community feed."},{t:"Why SMS verification?",d:"A Swiss mobile number is the cheapest identity check that doesn't demand more personal data than we actually need. It's enough friction to keep bots and trolls out, and no more than that."},{t:"Why a GIS-based radius instead of fixed cities?",d:"A neighbour at the edge of one town reads the same local feed as someone in the next village over. Fixed administrative boundaries don't match how residents actually live. A radius around home does."}],services:["Mobile development","Quality assurance"],cover:"#004C73",  headerImg:(process.env.PUBLIC_URL+"/images/crossiety_showcase.png"),coverImg:(process.env.PUBLIC_URL+"/images/crossiety_cover.jpeg"),coverImgMobile:(process.env.PUBLIC_URL+"/images/crossiety_home.png")},
];
const caseShowcase:{[k:string]:{src:string,alt:string,caption?:string,fit?:"cover"|"contain"}[]}={
  nomo:[
    {src:process.env.PUBLIC_URL+"/images/nomo_1.png",alt:"Nomo Smart Care app — caregiver dashboard",caption:"One app for the whole Care Circle: live status, alerts, and a shared timeline of the day.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/nomo_2.jpg",alt:"Nomo Hub and satellite sensors installed in the home",caption:"A small hub, outlet satellites, and a few tags cover the whole home invisibly.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/nomo_3.jpg",alt:"Nomo Smart Care fall detection alert",caption:"Both impact falls and slow / sliding falls are caught and routed to caregivers in under a second.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/nomo_4.webp",alt:"Nomo Smart Care routine and sleep insights",caption:"The system learns each home's routine, so unusual events stand out and false alarms stay rare.",fit:"cover"},
  ],
  farmwave:[
    {src:process.env.PUBLIC_URL+"/images/farmwave_award.png",alt:"AI Harvest Vision Solution of the Year 2025, awarded to Farmwave",caption:"AI Harvest Vision Solution of the Year 2025."},
    {src:process.env.PUBLIC_URL+"/images/farmwave_1.png",alt:"Farmwave camera mounted on a combine harvester",caption:"Cameras mount with industrial magnets, configurable from three to ten per machine."},
    {src:process.env.PUBLIC_URL+"/images/farmwave_2.jpg",alt:"Farmwave Harvest Vision in the field during harvest",caption:"In-field harvest with the system running live in the cab, every three seconds, on every camera."},
  ],
  beunity:[
    {src:process.env.PUBLIC_URL+"/images/beunity_1.png",alt:"beUnity app, central member platform",caption:"Forums, events, surveys, file sharing, and groups all in one place. The app every member actually opens."},
    {src:process.env.PUBLIC_URL+"/images/beunity_showcase.png",alt:"beUnity in use across phone and web",caption:"One platform across browser, smartphone, and tablet. No separate logins, no install friction."},
  ],
  crossiety:[
    {src:process.env.PUBLIC_URL+"/images/crossiety_header.png",alt:"Crossiety in use across phones and web",caption:"A digital village square for towns, cities, and regions, available on any phone, tablet, or browser.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/crossiety_1.png",alt:"Crossiety community feed with local news and events",caption:"Residents see local news, events, classifieds, and discussions all in one place, tied to a verified residency."},
  ],
  drift:[
    {src:process.env.PUBLIC_URL+"/images/drift_1.jpg",alt:"Drift App on iPhone showing the Sprayability Index",caption:"The Sprayability Index combines wind, temperature, nozzle, and tank mix into a clear go/no-go score.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/drift_2.jpg",alt:"Drift App field map with adjacent fields and crop traits",caption:"Field-level mapping with automatic adjacent-field detection.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/drift_3.jpg",alt:"Drift App visual drift pattern overlay",caption:"Visual drift-pattern overlay shows how spray would carry under current weather conditions.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/drift_4.jpeg",alt:"Drift App 4-day spray planner forecast",caption:"4-day Spray Planner ranks fields by sprayability so you plan the week, not the moment.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/drift_5.jpeg",alt:"Drift App custom sprayer setup",caption:"Custom sprayer setup: herbicide list, tank mixes, nozzle size, and pump pressure.",fit:"cover"},
    {src:process.env.PUBLIC_URL+"/images/drift_6.jpg",alt:"Drift App compliance report",caption:"Exportable record of weather, drift pattern, and surrounding traits at the moment of spraying.",fit:"cover"},
  ],
  noctrix:[
    {src:process.env.PUBLIC_URL+"/images/noctrix_header.jpg",alt:"Noctrix Health NTX100 clinician iOS app",caption:"Clinicians programme and manage neurostimulation therapy remotely via Bluetooth.",fit:"cover"},
  ],
  muvr:[
    {src:process.env.PUBLIC_URL+"/images/muvr_header.png",alt:"Muvr iOS app for orthopedic post-operative care",caption:"Wearable-driven recovery tracking for orthopedic practices.",fit:"cover"},
  ],
};
const vals=[{n:"01",t:"Understand First",d:"Every engagement starts with listening."},{n:"02",t:"Strategic Clarity",d:"We turn complexity into clear direction."},{n:"03",t:"Long-term Advisory",d:"Partnerships, not one-off projects."},{n:"04",t:"One Team",d:"We embed alongside your people."},{n:"05",t:"Outcome-driven",d:"Every recommendation tied to results."},{n:"06",t:"Delivery Excellence",d:"Strategy backed by engineering."}];
const tl=[{y:"2017",t:"Went independent",d:"Traded the agency paycheck for full autonomy. Started building apps under MCODE for clients across health, AgTech, and enterprise. Whatever the problem needed, regardless of platform or stack."},{y:"2021",t:"Long-term partnerships",d:"Early clients like Nomo evolved into multi-year relationships. The work became less about shipping features and more about being a genuine technical partner: embedded, strategic, ongoing."},{y:"2022",t:"Lumo Lab",d:"Solo freelancing had grown into a team with a shared way of working. Formalised it as Lumo Lab, built around one principle: understand the problem properly before writing a single line of code."},{y:"2025",t:"Award-winning work",d:"Farmwave's Harvest Vision was named AI Harvest Vision Solution of the Year. A signal that the approach (honest advice, real delivery) was producing results that stood out."},{y:"2026",t:"The formula works",d:"Multi-year partnerships, award-winning products, clients who keep coming back. It turns out that doing the unglamorous things well (listening, planning, delivering) compounds over time."}];
type BlogBlock=
  |{type:"text",content:string}
  |{type:"img",src:string,caption?:string}
  |{type:"heading",content:string}
  |{type:"code",lang?:string,content:string}
  |{type:"quote",content:string}
  |{type:"list",items:string[]};
const blogs=[
  {id:"nomo-smart-care-case-study",title:"Nomo Smart Care: Case Study",cat:"Case Study",date:"April 8, 2025",read:"9 min",author:"Jurica Mlinaric",authorImg:(process.env.PUBLIC_URL + "/images/jurica.png"),cover:"#004C73",headerImg:(process.env.PUBLIC_URL + "/images/nomo_header.png"),excerpt:"How we built a full-stack AI-powered elder care platform, from edge audio models to native mobile apps.",accent:"#C2740C",body:[
    {type:"heading",content:"Project overview"},
    {type:"list",items:[
      "**Client**: [Nomo International, Inc](https://nomosmartcare.com/)",
      "**Platform**: iOS, Android, backend, web, machine learning",
      "**Industry**: Healthtech / elder care",
      "**Services**: Native mobile app development, backend architecture, audio AI and machine learning, IoT integration",
      "**Engagement**: March 2021 to Present (multi-year partnership)"
    ]},
    {type:"text",content:"Nomo Smart Care uses motion-sensing and AI-powered audio technology to discreetly monitor daily routines at home and detect potential emergencies, without intrusive cameras or wearables that get forgotten on the bedside table. Built-in fall detection, intelligent sound recognition, and direct integration with 911 Emergency Services keep caregivers connected and responsive at all times. Whether it's a fall, a smoke alarm, or a cry for help, Nomo makes sure the right people are notified, fast, privately, and reliably."},
    {type:"img",src:process.env.PUBLIC_URL+"/images/nomo_1.png",caption:"Nomo Smart Care iOS app: live status, alerts, and a shared timeline of the day for the whole Care Circle."},
    {type:"heading",content:"Why this problem matters"},
    {type:"text",content:"Roughly one in three adults aged 65 or older falls every year, and falls remain the leading cause of injury and injury-related death in that age group. Most fall-detection products on the market expect the wearer to be physically capable of pressing a button, recovering consciousness fast enough to react, or simply remembering to put the device on each morning. None of those assumptions hold up reliably. The category needs a different posture: a system that is always on, that doesn't require a button press, and that respects the privacy of the person being cared for."},
    {type:"text",content:"Nomo came to us with a clear product vision and the conviction that this could be done without cameras and without wearables that the user has to remember. They needed a partner that could deliver across the full stack at once: hardware integration, backend, mobile, AI, and emergency-services connectivity, all production-grade from day one."},
    {type:"heading",content:"The challenge"},
    {type:"text",content:"Many elder care solutions rely on wearables or cameras, devices that are either forgotten, intrusive, or rejected altogether. Nomo wanted to build a system that was:"},
    {type:"list",items:[
      "Completely non-intrusive: no cameras in the home, no recording of audio leaving the home",
      "Capable of understanding behaviour and audio patterns, not just one-shot triggers",
      "Instantly responsive to genuine emergencies (sub-second alert latency)",
      "Resilient enough to keep working when cellular networks wobble or Wi-Fi drops",
      "Easy to install, use, and trust, even for an 80-year-old user living alone"
    ]},
    {type:"text",content:"On top of that they needed the system to be affordable enough for ordinary families: roughly a dollar a day, all in. That budget constraint shaped every architectural decision that followed."},
    {type:"heading",content:"Our approach"},
    {type:"text",content:"We partnered with Nomo as a full-cycle development team, delivering a connected experience across hardware, mobile, backend, and AI systems. Our work focused on five pillars:"},
    {type:"heading",content:"1. Native mobile apps for the Care Circle"},
    {type:"text",content:"Built with Swift on iOS and Kotlin on Android, the apps give every member of the Care Circle (children, neighbours, professional caregivers, anyone the family invites) instant alerts, two-way voice to the Nomo Hub in the home, and a shared timeline of the day. The Care Circle model means that when an alert fires, every authorised caregiver gets it at the same time. There is no single lifeline who has to be reachable; if one person doesn't respond, another can step in. Care Circles can include unlimited members at no extra cost."},
    {type:"text",content:"Native iOS and Android were non-negotiable for this product. An alert that lands half a second late is an alert that didn't land, and the background-process control, push-delivery reliability, and two-way-voice performance we needed simply aren't matched by a wrapped or cross-platform framework."},
    {type:"heading",content:"2. Scalable backend infrastructure"},
    {type:"text",content:"A TypeScript back end on AWS keeps devices and caregivers in sync. We used Firebase Cloud Messaging for push notification delivery and MQTT as the live duplex channel between hub and app, so the next alert still gets through even if cellular drops momentarily. AWS Cognito handles caregiver identity, REST APIs handle user-facing data flows, and the stack scales horizontally as the install base grows."},
    {type:"heading",content:"3. On-device audio AI"},
    {type:"text",content:"This was the most distinctive piece of the architecture. Custom TensorFlow Lite models run directly on the Nomo Hub itself, classifying sounds locally: a fall, a smoke alarm, a cry for help. No audio ever streams to a cloud, and no recordings are stored. Audio is analysed and discarded on-device. Privacy is the first reason we chose this design; latency is the second. By the time a cloud round-trip would have completed, Nomo has already alerted the Care Circle."},
    {type:"text",content:"To minimise false alarms, the system uses AI to learn the household's normal pattern over time. A 4 AM bathroom trip in a home where that happens nightly is unremarkable; the same trip in a home where it doesn't is worth a quiet check-in. Caregivers trust the alerts they get because the system has earned that trust by not crying wolf."},
    {type:"img",src:process.env.PUBLIC_URL+"/images/nomo_2.jpg",caption:"The kit: a hub for two-way voice, satellite sensors that plug into outlets, and tags for door, fridge, and medicine cabinet."},
    {type:"heading",content:"4. Hardware ecosystem"},
    {type:"text",content:"The system is a small mesh: a central hub, a pair of plug-in satellite sensors that cover high-traffic areas, and tags that combine motion detection with an emergency button and wearable fall detection. Tags are calibrated to the sudden downward motion of a fall, so even if the wearer is disoriented or unable to press the button themselves, the alert still goes out. Everything pairs over BLE to the hub, which handles the rest."},
    {type:"heading",content:"5. Emergency response with RapidSOS"},
    {type:"text",content:"When a real emergency is detected, the hub opens a direct line to 911 through RapidSOS in under a second. RapidSOS securely transmits incident context, including fall type, location, and any health information the family has supplied, directly to the responding 911 dispatcher. That cuts the typical confusion of an emergency call and gets responders to the right place with the right information faster."},
    {type:"heading",content:"The result"},
    {type:"text",content:"Nomo Smart Care is now actively helping thousands of families monitor and protect their loved ones, privately and respectfully."},
    {type:"list",items:[
      "Full production rollout across iOS and Android, available across all 50 US states",
      "Thousands of hubs deployed and monitored in real time",
      "Sub-1-second alert latency from event to caregiver notification",
      "Emergency response capabilities integrated natively through RapidSOS",
      "Affordable monthly subscription (around a dollar a day) with a 60-day risk-free trial",
      "Caregivers reporting higher confidence and peace of mind, and noticeably fewer false alarms"
    ]},
    {type:"heading",content:"What the client said"},
    {type:"quote",content:"Our partnership with Lumo has been instrumental in shaping our long-term vision. They've consistently delivered innovative solutions that align with our strategic goals. The team's deep understanding of our business, coupled with their technical expertise, has been invaluable. We're excited to continue our journey with Lumo Lab as we embark on new challenges and opportunities."},
    {type:"text",content:"— **Kevin Ray**, Co-Founder & CTO, Nomo International"},
    {type:"heading",content:"Tech stack"},
    {type:"list",items:[
      "**Mobile**: Swift, Kotlin",
      "**Backend**: Node.js, TypeScript, REST APIs, MQTT",
      "**Cloud**: AWS, Firebase, Google APIs, AWS Cognito",
      "**AI / ML**: Python, TensorFlow Lite (on-device)",
      "**Frontend**: React.js, Next.js",
      "**Hardware**: Hub, satellite sensors, wearable tags, ESP32",
      "**Emergency**: RapidSOS",
      "**Other**: Lottie animations, BLE, Wi-Fi"
    ]},
    {type:"heading",content:"What we took away"},
    {type:"text",content:"Three lessons stand out from the work, and they generalise beyond elder care."},
    {type:"list",items:[
      "**On-device AI is a privacy decision first, a latency decision second.** Once you commit to processing on the hardware in someone's home, the rest of the architecture follows. It is much harder to retrofit privacy than to design for it from day one.",
      "**Routine learning is the difference between a useful product and a noisy one.** Every alert that turns out to be nothing trains the caregiver to mistrust the next one. The system has to earn trust by understanding context, not by being more sensitive.",
      "**Ship hardware, mobile, AI, and an emergency stack as one product.** Nomo couldn't outsource any one of these layers to a separate team without losing the integrated experience. A full-stack partner who can hold all of it in their head is what made the timeline real."
    ]},
    {type:"text",content:"Looking to build something ambitious, human-centered, and technically rock-solid? [Let's make it happen.](https://lumo-lab.com/contact)"},
  ] as BlogBlock[]},
  {id:"deep-learning-audio-classification",title:"Deep Learning for Audio Classification",cat:"Engineering",date:"March 11, 2025",read:"8 min",author:"Matija Sever",cover:"#004C73",headerImg:(process.env.PUBLIC_URL + "/images/nomo_3.jpg"),excerpt:"How convolutional neural networks learn to hear, and why spectrograms are the secret ingredient.",body:[
    {type:"heading",content:"Introduction"},
    {type:"text",content:"Audio classification, the process of assigning sound clips to predefined categories, is quietly reshaping a lot of modern technology. From smart security systems that detect alarm sounds in real time to automotive safety interfaces and healthcare diagnostics, robust audio-classification systems give real competitive advantage. By converting raw audio into visual representations (spectrograms and mel spectrograms) and applying deep learning, you can automatically extract intricate, hierarchical features from audio signals. This post walks through the foundational ideas, CNN architectures, audio-processing methods, and data-augmentation techniques that power modern audio-classification systems."},
    {type:"heading",content:"Foundations of deep learning in audio"},
    {type:"text",content:"Deep learning uses multilayer neural networks to learn abstract representations directly from data. In audio processing, raw waveforms are usually converted into a visual representation such as a spectrogram or mel spectrogram. A typical model has three layer types:"},
    {type:"list",items:[
      "**Input layer**: processes raw or preprocessed data (for example, spectrogram images).",
      "**Hidden layers**: weighted linear combinations followed by nonlinear activations (such as ReLU) extract progressively abstract features.",
      "**Output layer**: a softmax activation for multiclass classification, producing a probability distribution over target categories."
    ]},
    {type:"heading",content:"Audio processing techniques"},
    {type:"text",content:"Before analysis, raw audio signals have to be transformed into formats a network can learn from:"},
    {type:"list",items:[
      "**Spectrograms**: generated using the Short Time Fourier Transform (STFT), spectrograms visually map frequency intensity over time.",
      "**Mel spectrograms**: by mapping the frequency axis to the Mel scale (which aligns with human auditory perception), these representations emphasise the features that matter most to perception."
    ]},
    {type:"img",src:process.env.PUBLIC_URL+"/images/nomo_2.jpg",caption:"In Nomo, the classifier runs on the Hub itself, so audio is analysed and discarded locally. Nothing streams to a cloud, nothing is ever recorded."},
    {type:"heading",content:"Convolutional neural networks (CNNs)"},
    {type:"text",content:"Convolutional neural networks are a deep-learning architecture specialised for grid-like data such as images or spectrograms. Originally developed for image classification, they have proven exceptionally effective at automatically learning both low-level and high-level features from data."},
    {type:"heading",content:"Advantages of CNNs"},
    {type:"list",items:[
      "**Automatic feature extraction**: CNNs learn local time-frequency patterns directly, eliminating the need for manual feature engineering.",
      "**Parameter efficiency**: weight sharing means CNNs need far fewer parameters than fully-connected networks.",
      "**Hierarchical learning**: early layers capture simple features (edges, local frequency patterns), while deeper layers learn increasingly complex abstractions."
    ]},
    {type:"heading",content:"CNN architecture"},
    {type:"text",content:"A robust audio-classification CNN typically includes:"},
    {type:"list",items:[
      "**Convolutional layers**: learnable filters (3×3, 5×5) slide over the input (e.g., a spectrogram) to produce feature maps via dot products with local receptive fields.",
      "**Activation functions**: nonlinearities, commonly ReLU, applied to the convolution output.",
      "**Batch normalization**: normalises activations to stabilise and accelerate training.",
      "**Pooling layers**: reduce spatial dimensions (max pooling, for example) while keeping prominent features.",
      "**Regularisation**: dropout randomly deactivates a fraction of neurons during training; L2 regularisation (weight decay) penalises large weights so the network learns simpler, more generalisable patterns.",
      "**Fully connected layers**: after flattening the feature maps, these layers integrate features and output class probabilities through softmax."
    ]},
    {type:"heading",content:"Applying CNNs to audio classification"},
    {type:"text",content:"To apply CNNs to audio, raw signals are first converted into two-dimensional representations:"},
    {type:"list",items:[
      "**Transformation**: an STFT generates a spectrogram from raw audio. The spectrogram can be passed through a mel filter bank to create a mel spectrogram. Mel spectrograms are usually preferred because they more closely match human auditory perception, emphasising frequency bands that matter most to how we hear.",
      "**Input preparation**: these visual representations are fed to the CNN, which then automatically extracts meaningful features from the audio."
    ]},
    {type:"text",content:"A typical CNN-based audio classification pipeline looks like this:"},
    {type:"list",items:[
      "**Preprocessing**: convert raw audio into spectrogram or mel-spectrogram images.",
      "**Feature extraction**: pass the spectrogram through several convolutional layers that distil the most relevant features.",
      "**Flattening**: collapse the final feature maps into a one-dimensional vector.",
      "**Classification**: fully connected layers and a softmax output produce a probability distribution over each audio class."
    ]},
    {type:"heading",content:"Data augmentation and training strategies"},
    {type:"text",content:"For robust audio classification in real-world conditions, it pays to think about three things:"},
    {type:"list",items:[
      "**Data augmentation**: time stretching adjusts the speed of the audio while keeping its pitch; pitch shifting changes the pitch to simulate variations in speaker tone or instrument timbre; adding noise introduces background sound to mimic real recording environments.",
      "**Architecture evaluation**: experiment with different CNN architectures to find the right balance of efficiency and accuracy.",
      "**Training**: cross-entropy loss for multiclass classification; optimisers such as Adam or stochastic gradient descent; metrics like accuracy, precision, recall, and F1 score to guide improvements."
    ]},
    {type:"heading",content:"Final thoughts"},
    {type:"text",content:"Combining deep learning with audio processing lets CNNs learn complex patterns directly from spectrogram images. The approach has produced state-of-the-art performance on audio classification, and as research keeps moving, these systems will continue to advance the field of audio analysis."},
  ] as BlogBlock[]},
  {id:"ai-on-microcontrollers",title:"AI on Microcontrollers",cat:"Engineering",date:"November 20, 2024",read:"7 min",author:"Rudolf Lovrencic, PhD",cover:"#004C73",headerImg:(process.env.PUBLIC_URL + "/images/blog_1.jpg"),excerpt:"Running deep learning models on ESP32 microcontrollers: why it's harder than it sounds, and how we made it work.",body:[
    {type:"text",content:"Running deep learning models on microcontrollers is not exactly a run-of-the-mill task due to the resource limitations of these devices. Microcontrollers are typically designed for low-power, low-cost embedded systems with minimal processing power and memory. Machine-learning algorithms, especially deep-learning models, often require significant computational resources and memory."},
    {type:"text",content:"One of our clients is [Nomo Smart Care](https://nomosmartcare.com/):"},
    {type:"quote",content:"The Nomo system is for caregivers who want to make sure a loved one is OK. The Nomo system uses sensors, not cameras, to monitor in-home motion. Data from sensors is sent to the Nomo mobile app and allows you, or a circle of trusted caregivers, to check in on your loved one from anywhere, any time."},
    {type:"text",content:"Besides various other sensors, Nomo can use microphones to paint a picture of what is going on in the home of a care recipient. For example, if a fire alarm is going off, this is something a caregiver should know about. Since Nomo cares deeply about privacy, no audio recordings are allowed to leave a user's home, so audio classification has to be performed on edge devices. The target system is based on the [ESP32-PICO](https://www.espressif.com/sites/default/files/documentation/esp32-pico_series_datasheet_en.pdf), which means we are working within these constraints:"},
    {type:"list",items:[
      "240MHz 32-bit CPU",
      "2MB [PSRAM](https://en.wikipedia.org/wiki/Static_random-access_memory) available to Nomo"
    ]},
    {type:"text",content:"Luckily, [LiteRT for Microcontrollers](https://ai.google.dev/edge/litert/microcontrollers/overview) (formerly known as TensorFlow Lite for Microcontrollers) has been ported to the ESP32 architecture, which lets us run basic machine-learning models on low-resource devices."},
    {type:"img",src:process.env.PUBLIC_URL+"/images/nomo_header_1.png",caption:"In a real home: the Nomo Hub plus a few outlet satellites, all running on-device audio AI for whole-home coverage."},
    {type:"text",content:"The article below illustrates a typical workflow for getting AI models running on microcontrollers. We demonstrate it by training and deploying a trivial model that recognises handwritten digits from the [MNIST dataset](https://en.wikipedia.org/wiki/MNIST_database). The process is identical for the [CNN](https://en.wikipedia.org/wiki/Convolutional_neural_network) models we use for audio classification."},
    {type:"heading",content:"Model training"},
    {type:"text",content:"We use [Keras](https://keras.io/) to train our [TensorFlow](https://www.tensorflow.org/) models. MNIST images are grayscale, 28 pixels wide and 28 pixels tall, so the input layer shape is (28, 28, 1). There are 10 digits, so the network has 10 outputs. We use a simple CNN in this example:"},
    {type:"code",lang:"python",content:`import numpy as np
import tensorflow as tf

def get_model():
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input(shape=(28, 28, 1), name="input"),
        tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(128, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.Conv2D(128, kernel_size=(3, 3), activation="relu"),
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(10, activation="softmax", name="output"),
    ])
    model.compile(optimizer="adam",
                  loss="sparse_categorical_crossentropy",
                  metrics=["sparse_categorical_accuracy"])
    return model`},
    {type:"text",content:"This model has roughly 260K parameters. After training we will reduce its size further using [post-training quantization](https://ai.google.dev/edge/litert/models/post_training_quantization). The following code prepares the MNIST dataset and trains the model:"},
    {type:"code",lang:"python",content:`(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# Convert pixel color values from integer [0, 255] to float [0.0, 1.0].
x_train = x_train.astype(np.float32) / 255.0
x_test  = x_test.astype(np.float32)  / 255.0

# Keras dataset has inputs of shape (28, 28) so a grayscale dimension is
# added resulting in shape (28, 28, 1).
x_train = np.expand_dims(x_train, axis=-1)
x_test  = np.expand_dims(x_test, axis=-1)

model = get_model()
model.fit(x_train, y_train, validation_split=0.2, epochs=10)`},
    {type:"text",content:"Finally, to make the model suitable for running on low-power edge devices, the model needs to be quantized and [converted to LiteRT format](https://ai.google.dev/edge/litert/models/convert). This example uses [full-integer quantization](https://ai.google.dev/edge/litert/models/post_training_integer_quant), which converts 32-bit floating-point numbers to the nearest unsigned 8-bit integers."},
    {type:"code",lang:"python",content:`def convert_to_tflite_and_quantize(model, representative_dataset_generator):
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations          = [tf.lite.Optimize.DEFAULT]
    converter.representative_dataset = representative_dataset_generator
    converter.inference_input_type   = tf.int8
    converter.inference_output_type  = tf.int8
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
    return converter.convert()

def create_representative_dataset_generator(x_train):
    def representative_dataset_generator():
        for x in x_train:
            yield {'input': np.expand_dims(x, axis=0) }
    return representative_dataset_generator

representative_dataset_generator = create_representative_dataset_generator(x_train)
tflite_model = convert_to_tflite_and_quantize(model, representative_dataset_generator)
with open('model.tflite', "wb") as f:
    f.write(tflite_model)`},
    {type:"text",content:"Running these three Python listings produces a model.tflite file that can be loaded by C++ code and used to recognise digits. The quantized model is roughly 260KB."},
    {type:"heading",content:"Performing inference in C++"},
    {type:"text",content:"[This tutorial](https://ai.google.dev/edge/litert/microcontrollers/get_started#run_inference) describes performing inference in C++ in great detail. In the tutorial, the model is converted to an unsigned char array by running:"},
    {type:"code",lang:"bash",content:`xxd -i model.tflite > model_data.c`},
    {type:"text",content:"This produces a C file with the unsigned char array that is compiled with the rest of the project sources, embedding the model data into the binary. Alternatively, the model.tflite file can be loaded as a binary file at runtime. The full code is similar to the [tflite-micro hello world example](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/examples/hello_world/hello_world_test.cc), so there is no need to repeat all of it. The important difference for our MNIST model is that the tflite::MicroMutableOpResolver object needs the following operations:"},
    {type:"code",lang:"cpp",content:`using MnistExampleOperationResolver = tflite::MicroMutableOpResolver<6>;

TfLiteStatus register_operations(MnistExampleOperationResolver& resolver) {
    TF_LITE_ENSURE_STATUS(resolver.AddFullyConnected());
    TF_LITE_ENSURE_STATUS(resolver.AddConv2D());
    TF_LITE_ENSURE_STATUS(resolver.AddMaxPool2D());
    TF_LITE_ENSURE_STATUS(resolver.AddSoftmax());
    TF_LITE_ENSURE_STATUS(resolver.AddMean());
    TF_LITE_ENSURE_STATUS(resolver.AddQuantize());
    return kTfLiteOk;
}`},
    {type:"text",content:"The tensor arena should also be larger, so we set it to 100KB. Finally, the quantization parameters need to be extracted from the model so that input images can be quantized before going into the model and the model output can be de-quantized."},
    {type:"code",lang:"cpp",content:`struct QuantizationData final { float scale; int zero_point; };

QuantizationData get_quantization_data(const TfLiteQuantization& quant) {
    if (quant.type != kTfLiteAffineQuantization) {
        throw std::runtime_error{"no quantization"};
    }
    const auto* const quantization =
        static_cast<const TfLiteAffineQuantization*>(quant.params);
    const auto* const scales      = quantization->scale;
    const auto* const zero_points = quantization->zero_point;
    if (quantization->quantized_dimension != 0 ||
        scales->size != 1                      ||
        zero_points->size != 1) {
        throw std::runtime_error{"unexpected quantization parameters"};
    }
    return QuantizationData{scales->data[0], zero_points->data[0]};
}`},
    {type:"text",content:"This function throws if no quantization is present, so only quantized models are supported. It also assumes quantization on the first dimension with a single zero point and a single scale value, which is the case for all TensorFlow models quantized and converted using the Python code above."},
    {type:"text",content:"The last thing to do is to load an image, quantize it, run inference, and de-quantize the output. We use [Boost GIL](https://www.boost.org/doc/libs/1_86_0/libs/gil/doc/html/index.html) to load an image and feed a constant view over its data into the input tensor."},
    {type:"code",lang:"cpp",content:`std::array<float, 10> predict(boost::gil::gray8c_view_t image,
                              tflite::MicroInterpreter& interpreter) {
    auto* const input = interpreter.typed_input_tensor<std::int8_t>(0);
    const auto* const output =
        interpreter.typed_output_tensor<std::int8_t>(0);
    const auto input_quantization_data =
        get_quantization_data(interpreter.input(0)->quantization);
    const auto output_quantization_data =
        get_quantization_data(interpreter.output(0)->quantization);

    std::transform(image.begin(), image.end(), input,
        [input_quantization_data](boost::gil::gray8_pixel_t pixel) -> std::int8_t {
            const auto pixel_as_float      = pixel / 255.0f;
            const auto [scale, zero_point] = input_quantization_data;
            return static_cast<std::int8_t>(
               static_cast<int>(std::round(pixel_as_float / scale))
               + zero_point
            );
        });

    if (interpreter.Invoke() != kTfLiteOk) {
        throw std::runtime_error{"interpreter invoke failed"};
    }

    std::array<float, 10> result;
    std::transform(output, output + 10, result.begin(),
        [output_quantization_data](std::int8_t value) -> float {
            const auto [scale, zero_point] = output_quantization_data;
            return scale * static_cast<float>(value - zero_point);
        });
    return result;
}`},
    {type:"text",content:"The first std::transform iterates over image pixels, converts each value from [0, 255] to [0.0, 1.0], quantizes it, and feeds it into the model. After invoking the interpreter, the second std::transform reads the model outputs, de-quantizes them, and stores them in the result array. The result array contains the probabilities for each digit, so the recognised digit can be retrieved with std::max_element:"},
    {type:"code",lang:"cpp",content:`const auto result = predict(image, interpreter);
std::cout << "Digit: "
          << std::distance(result.cbegin(),
                           std::max_element(result.cbegin(),
                                            result.cend()));`},
    {type:"heading",content:"Conclusion"},
    {type:"text",content:"While still a bit unorthodox, doing AI on microcontrollers is feasible. Standard [C++17](https://en.cppreference.com/w/cpp/17) runs on many embedded platforms, which makes LiteRT for Microcontrollers highly portable. With support for many common neural-network operations, a wide variety of AI tasks can be solved on edge devices, reducing communication and processing costs and enhancing user privacy."},
  ] as BlogBlock[]},
].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime());
const blogCats=["All","Case Study","Engineering"];
const roles=[
  {id:"open",title:"Open application",type:"Rolling",loc:"Hybrid",team:"General",desc:"We're not actively hiring right now, but we always want to hear from great people. Send us your CV and a short note about the work you'd like to do. When a role opens that fits, we'll already know you.",reqs:["Senior experience in engineering, design, or product","A track record of shipping real products","A clear reason you want to work with us"],offer:["Genuine consideration when a role opens","A conversation, even if there's no current fit","Honest feedback on your application"]},
];
type PerkIconKey="globe"|"chart"|"target"|"handshake"|"book"|"palm";
const perks:{i:PerkIconKey,t:string,d:string}[]=[
  {i:"chart",t:"Growth equity",d:"Senior roles include equity."},
  {i:"target",t:"Meaningful work",d:"Healthcare, agriculture, AI."},
  {i:"handshake",t:"Client-facing",d:"Direct client access."},
  {i:"book",t:"Learning budget",d:"Conferences, courses, tools."},
  {i:"palm",t:"Flexible PTO",d:"Generous time off."},
];
function PerkIcon({k}:{k:PerkIconKey}){
  const common={width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  switch(k){
    case "globe":return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 3.8 6 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-6-3.8-9s1.3-6.2 3.8-9z"/></svg>;
    case "chart":return <svg {...common}><path d="M3 20h18"/><path d="M7 16V10M12 16V6M17 16v-3"/></svg>;
    case "target":return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>;
    case "handshake":return <svg {...common}><path d="M11 17l-1.5 1.5a2 2 0 01-2.8-2.8L11 12"/><path d="M13 17l2 2a2 2 0 002.8-2.8L13 12"/><path d="M3 12l4-4 4 2 3-3 4 2 3-3"/><path d="M7 13l2-2"/></svg>;
    case "book":return <svg {...common}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 01-2-2z"/><path d="M4 17a2 2 0 012-2h13"/><path d="M8 7h7M8 11h7"/></svg>;
    case "palm":return <svg {...common}><circle cx="12" cy="18" r="1.3" fill="currentColor"/><path d="M12 17V8"/><path d="M12 8c-3-1.5-5-1-6 1M12 8c3-1.5 5-1 6 1M12 8c-1-3 1-5 4-5M12 8c1-3-1-5-4-5"/></svg>;
  }
}
const catList=["All",...Array.from(new Set(cases.map(c=>c.cat)))];

/* ── NAV ── */
function Nav({page,go,dark,toggleDark}:{page:string,go:(p:string)=>void,dark:boolean,toggleDark:()=>void}){
  const[open,setOpen]=useState(false);
  const nav=(p:string)=>{go(p);setOpen(false);};
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
  return <>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:open?"var(--bg)":"var(--nav-bg)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--nav-border)",height:60,transition:"background .2s"}}>
      <W style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%"}}>
        <button onClick={()=>nav("home")} style={{display:"flex",alignItems:"center",gap:9,background:"none",border:"none",cursor:"pointer",padding:0,zIndex:1}}>
          <svg height="26" viewBox="90 95 135 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
            <path fill="currentColor" d="m123.83,138.8h-23.8v31.7c0,16.71,12.37,28.13,29.73,28.13h30.1v-23.8h-36.03v-36.03Z"/>
            <ellipse fill="currentColor" cx="112.92" cy="112.91" rx="12.92" ry="12.91"/>
            <path fill="currentColor" fillOpacity=".5" d="m125.83,112.91c0,7.13-5.78,12.91-12.92,12.91-2.22,0-4.32-.56-6.15-1.55l91.86,50.55v-74.81h-85.71c7.13,0,12.92,5.78,12.92,12.91Z"/>
          </svg>
          <span className="logo-txt" style={{fontFamily:"var(--jk)",fontSize:18,fontWeight:600,color:"var(--blue)",letterSpacing:-.3}}>lumo lab</span>
        </button>
        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:2}}>
          {[{l:"Home",p:"home"},{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Work",p:"cases"}].map(({l,p})=>
            <button key={l} onClick={()=>nav(p)} style={{color:page===p?"var(--blue)":"var(--txt3)",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:page===p?600:500,fontFamily:"var(--in)",padding:"6px 12px",borderRadius:6}}>{l}</button>
          )}
          <button onClick={()=>nav("contact")} className="cta-m" style={{padding:"8px 20px",fontSize:12,marginLeft:8}}>Let's talk</button>
          <button onClick={toggleDark} aria-label="Toggle dark mode" style={{background:"none",border:"1px solid var(--brd)",borderRadius:20,cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--txt3)",marginLeft:6,transition:"all .2s",flexShrink:0}}>
            {dark?<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3v1M12 20v1M4.22 4.22l.71.71M18.36 18.36l.71.71M3 12h1M20 12h1M4.93 19.07l.71-.71M18.36 5.64l.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>:<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        </div>
        <button className="ham-btn" onClick={()=>setOpen(o=>!o)} aria-label={open?"Close menu":"Open menu"} style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:6,flexDirection:"column",justifyContent:"center",alignItems:"center",gap:5,width:40,height:40,zIndex:1}}>
          <span style={{display:"block",width:22,height:2,background:"var(--blue)",borderRadius:2,transition:"transform .3s cubic-bezier(.16,1,.3,1), opacity .2s",transform:open?"rotate(45deg) translateY(7px)":"none"}}/>
          <span style={{display:"block",width:22,height:2,background:"var(--blue)",borderRadius:2,transition:"opacity .2s",opacity:open?0:1}}/>
          <span style={{display:"block",width:22,height:2,background:"var(--blue)",borderRadius:2,transition:"transform .3s cubic-bezier(.16,1,.3,1)",transform:open?"rotate(-45deg) translateY(-7px)":"none"}}/>
        </button>
      </W>
    </nav>
    {/* Full-screen mobile menu */}
    <div style={{position:"fixed",inset:0,zIndex:199,background:"var(--bg)",display:"flex",flexDirection:"column",transform:open?"translateY(0)":"translateY(-100%)",transition:"transform .4s cubic-bezier(.16,1,.3,1)",pointerEvents:open?"auto":"none"}} className="ham-overlay">
      <div style={{flex:1,display:"flex",flexDirection:"column",paddingTop:80,paddingBottom:0,overflow:"hidden"}}>
        {/* Nav links */}
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",paddingBottom:24,padding:"0 clamp(24px,6vw,64px)"}}>
          <div style={{display:"flex",flexDirection:"column"}}>
            {[{l:"Home",p:"home"},{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Work",p:"cases"},{l:"Careers",p:"careers"}].map(({l,p},i)=>(
              <button key={l} onClick={()=>nav(p)} style={{background:"none",border:"none",borderBottom:"1px solid rgba(0,30,50,.06)",cursor:"pointer",fontFamily:"var(--jk)",fontSize:32,fontWeight:700,color:page===p?"var(--blue)":"var(--txt)",padding:"18px 0",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"color .2s",opacity:open?1:0,transform:open?"translateY(0)":"translateY(20px)",transitionDelay:`${.05+i*.05}s`}}>
                {l}
                {page===p?<span style={{width:8,height:8,borderRadius:"50%",background:"var(--blue)",flexShrink:0}}/>:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="var(--txt4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            ))}
          </div>
          <button onClick={()=>nav("contact")} className="cta-m" style={{marginTop:28,justifyContent:"center",fontSize:14,opacity:open?1:0,transform:open?"translateY(0)":"translateY(20px)",transition:"opacity .3s, transform .3s",transitionDelay:".4s"}}>Let's talk</button>
        </div>
      </div>
      {/* Footer strip */}
      <div style={{borderTop:"1px solid rgba(0,30,50,.07)",padding:"20px clamp(24px,6vw,64px)",background:"var(--bg2)",opacity:open?1:0,transition:"opacity .3s",transitionDelay:".3s"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <span style={{fontSize:12,color:"var(--txt3)",fontFamily:"var(--in)"}}>hello@lumo-lab.com</span>
            <span style={{fontSize:12,color:"var(--txt3)",fontFamily:"var(--in)"}}>+385 98 901 4448</span>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={toggleDark} aria-label="Toggle dark mode" style={{background:"none",border:"1px solid var(--brd)",borderRadius:20,cursor:"pointer",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--txt3)"}}>
              {dark?<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3v1M12 20v1M4.22 4.22l.71.71M18.36 18.36l.71.71M3 12h1M20 12h1M4.93 19.07l.71-.71M18.36 5.64l.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>:<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
            {[
              {href:"https://www.linkedin.com/company/lumo-lab",label:"LinkedIn",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
              {href:"https://www.instagram.com/lumo_lab_/",label:"Instagram",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},
            ].map(({href,label,icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--txt3)",textDecoration:"none",background:"#fff"}}
              >{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>;
}
function Back({go,to,label}:{go:(to:string)=>void,to:string,label:string}){return <button onClick={()=>go(to)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--txt3)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:32,fontFamily:"var(--jk)",padding:0}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{label}</button>;}

/* ── CASES SLIDER — shared between Home and About. Magazine split, auto-advance, brand-blue stage. ── */
function CasesSlider({go}:{go:(p:string,id?:string)=>void}){
  const SLIDE_MS=6500;
  const[cIdx,setCIdx]=useState(0);
  const[cPaused,setCPaused]=useState(false);
  // Simple slide advancement: every SLIDE_MS, advance to the next slide. No
  // progress-fill animation (was too easy to desync with React renders / CSS /
  // hydration). The dot indicators below are pure state — past/current = filled,
  // future = dim — so there's nothing visual that can stutter or get stuck.
  useEffect(()=>{
    if(cPaused)return;
    const t=setTimeout(()=>setCIdx(p=>(p+1)%6),SLIDE_MS);
    return()=>clearTimeout(t);
  },[cIdx,cPaused]);
  const goToSlide=(i:number)=>setCIdx(i);
  const outcomes:Record<string,string>={
    nomo:"Live in all 50 US states · sub-1s emergency alerts",
    farmwave:"2025 AI Harvest Vision Award · 3–8 bushels per acre recovered",
    muvr:"Acquired by Exactech, December 2020",
    noctrix:"Acquired by ResMed for $340M · First FDA-authorised non-drug therapy for RLS",
    beunity:"500+ member organisations across the EU",
    mobility:"Corporate & leasing-company fleets across the EU",
    drift:"Industry-first crop-type and seed-trait sharing tool",
    crossiety:"Digital village square deployed across Switzerland & Germany",
  };
  const heroSrcFor=(c:typeof cases[0])=>{
    if(c.id==="nomo")return process.env.PUBLIC_URL+"/images/nomo_4.png";
    if(c.id==="farmwave")return process.env.PUBLIC_URL+"/images/farmwave_home_ai.png";
    if(c.id==="crossiety")return process.env.PUBLIC_URL+"/images/crossiety_home.png";
    if(c.id==="muvr")return process.env.PUBLIC_URL+"/images/muvr_ios.png";
    if(c.id==="noctrix")return process.env.PUBLIC_URL+"/images/nidra_image.jpg";
    // Prefer the product showcase shot (better aspect ratio for the slider) over the wide banner cover.
    return (c as any).headerImg||(c as any).coverImg;
  };
  const featured=cases.slice(0,6);
  return <section className="cases-slider" onMouseEnter={()=>setCPaused(true)} onMouseLeave={()=>setCPaused(false)} style={{position:"relative",minHeight:640,background:"var(--blue)",overflow:"hidden",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)"}}>
    <W style={{position:"relative",zIndex:2,paddingTop:"clamp(40px,7vh,72px)",paddingBottom:"clamp(64px,9vh,104px)",color:"#fff",display:"flex",flexDirection:"column",gap:"clamp(28px,4vh,44px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:24}}>
        <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",letterSpacing:2.4,textTransform:"uppercase"}}>
          <span style={{width:24,height:1,background:"rgba(255,255,255,.4)"}}/>
          <span>Selected work</span>
          <span style={{width:4,height:4,borderRadius:"50%",background:"rgba(255,255,255,.45)"}}/>
          <span style={{fontFeatureSettings:'"tnum"'}}>{`0${cIdx+1}`} / {`0${featured.length}`}</span>
        </div>
        <button onClick={()=>go("cases")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:13,fontWeight:600,color:"rgba(255,255,255,.85)",letterSpacing:.1,transition:"color .2s, gap .2s"}} onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.gap="12px";}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.85)";e.currentTarget.style.gap="8px";}}>View more <Arr s={13} c="currentColor"/></button>
      </div>
      {(()=>{const c=featured[cIdx];return <div key={`slide-${c.id}`} className="case-slide-row" style={{display:"grid",gridTemplateColumns:"1fr 1.15fr",gap:"clamp(28px,5vw,72px)",alignItems:"stretch",height:"clamp(460px,52vh,560px)",animation:"caseSlideIn .55s cubic-bezier(.22,1,.36,1) both"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:0,overflow:"hidden"}}>
          <span style={{alignSelf:"flex-start",fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:2.4,textTransform:"uppercase",padding:"5px 12px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.22)",borderRadius:50,marginBottom:22}}>{c.cat}</span>
          <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(36px,5.2vw,68px)",fontWeight:800,letterSpacing:"-.035em",lineHeight:.98,color:"#fff",margin:0,marginBottom:14}}>{c.name}</h2>
          <p style={{fontFamily:"var(--jk)",fontSize:"clamp(15px,1.4vw,19px)",color:"#fff",lineHeight:1.5,margin:0,marginBottom:14,maxWidth:520,fontWeight:600}}>{outcomes[c.id]||c.brief}</p>
          <p style={{fontFamily:"var(--in)",fontSize:"clamp(13px,1.05vw,15px)",color:"rgba(255,255,255,.7)",lineHeight:1.65,margin:0,marginBottom:22,maxWidth:480,fontWeight:400}}>{c.brief}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:28}}>
            {c.tags.map(t=><span key={t} style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.78)",letterSpacing:.2,padding:"4px 10px",border:"1px solid rgba(255,255,255,.18)",borderRadius:6,background:"rgba(255,255,255,.04)"}}>{t}</span>)}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
            <button onClick={()=>go("cases",c.id)} style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"var(--blue)",padding:"14px 26px",borderRadius:50,fontFamily:"var(--jk)",fontSize:14,fontWeight:700,border:"none",cursor:"pointer",transition:"transform .2s, box-shadow .25s",boxShadow:"0 2px 8px rgba(0,0,0,.22)"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,.34)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.22)";}}>Read more <Arr s={13} c="var(--blue)"/></button>
            {(c as any).client&&<div style={{display:"flex",flexDirection:"column",gap:2,fontFamily:"var(--jk)"}}>
              <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.55)",letterSpacing:1.6,textTransform:"uppercase"}}>Client</span>
              <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{(c as any).client}</span>
            </div>}
          </div>
        </div>
        <div className="case-slide-stage" style={{position:"relative",borderRadius:18,background:"#F4F8FB",overflow:"hidden",height:"100%",boxShadow:"0 18px 48px rgba(0,0,0,.28), 0 2px 6px rgba(0,0,0,.18)"}}>
          <img src={heroSrcFor(c)} alt={`${c.name}, ${c.cat} case study`} loading="eager" decoding="async" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
        </div>
      </div>;})()}
      <div aria-hidden="true" style={{position:"absolute",width:0,height:0,overflow:"hidden",opacity:0,pointerEvents:"none"}}>
        {featured.map(c=><img key={c.id} src={heroSrcFor(c)} alt="" loading="eager" decoding="async"/>)}
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        {featured.map((c,i)=>{
          const isPast=cIdx>i;
          const isActive=cIdx===i;
          // Current slide gets a wider pill so it's visually distinct from past/future
          // dots. Past+current are filled white, future are dim. All transitions are
          // CSS — no JS-driven values that can stutter.
          return <button key={c.id} onClick={()=>goToSlide(i)} aria-label={`Show ${c.name}`} style={{
            width:isActive?28:8,
            height:8,
            borderRadius:4,
            border:"none",
            padding:0,
            background:(isPast||isActive)?"#fff":"rgba(255,255,255,.24)",
            cursor:"pointer",
            transition:"width .4s cubic-bezier(.22,1,.36,1), background .3s ease",
          }}/>;
        })}
      </div>
    </W>
  </section>;
}

/* ── HOME ── */
// ---- Coded product dashboards (no images) for the hero slideshow ----
function DashSpark({color,d,d2,label}:{color:string,d:string,d2?:string,label:string}){
  return (<>
    <span style={{position:"absolute",top:0,left:0,fontFamily:"var(--in)",fontSize:11,color:"rgba(255,255,255,.5)"}}>{label}</span>
    <svg viewBox="0 0 600 230" preserveAspectRatio="none" style={{position:"absolute",left:0,bottom:0,width:"100%",height:"86%"}} aria-hidden="true">
      {[60,115,170].map(y=>(<line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,.06)" strokeWidth="1" vectorEffect="non-scaling-stroke"/>))}
      <path className="hero-spark-area" d={`${d} L600,230 L0,230 Z`} fill={color}/>
      {d2&&<path className="hero-spark-line" d={d2} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>}
      <path className="hero-spark-line" d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
    </svg>
  </>);
}
const Ck=({c}:{c:string})=>(<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>);
// live event feed (no chart)
function DashFeed({rows}:{rows:{txt:string,time:string,c:string,done?:boolean}[]}){
  return (<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",gap:8,justifyContent:"center"}}>
    {rows.map((r,k)=>(
      <div key={k} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 12px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10}}>
        <span style={{width:26,height:26,flexShrink:0,borderRadius:8,background:`${r.c}1f`,border:`1px solid ${r.c}55`,display:"flex",alignItems:"center",justifyContent:"center"}}>{r.done?<Ck c={r.c}/>:<span style={{width:7,height:7,borderRadius:"50%",background:r.c}}/>}</span>
        <span style={{flex:1,minWidth:0,fontFamily:"var(--in)",fontSize:12.5,color:"rgba(255,255,255,.84)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.txt}</span>
        <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:600,color:"rgba(255,255,255,.42)",flexShrink:0}}>{r.time}</span>
      </div>
    ))}
  </div>);
}
// Noctrix NTX100 neurostimulation therapy session (no chart)
function DashNoctrix({color}:{color:string}){
  return (<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",gap:13,justifyContent:"center"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <span style={{fontFamily:"var(--in)",fontSize:12,color:"rgba(255,255,255,.6)"}}>Evening therapy session</span>
      <span style={{display:"inline-flex",alignItems:"center",gap:7,height:22,padding:"0 10px",background:`${color}1f`,border:`1px solid ${color}4d`,borderRadius:50}}>
        <span className="hero-live-dot" aria-hidden="true" style={{width:6,height:6,borderRadius:"50%",background:color}}/>
        <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,letterSpacing:.5,color:"#fff",opacity:.85}}>Stimulating</span>
      </span>
    </div>
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}><span style={{fontFamily:"var(--in)",fontSize:11,color:"rgba(255,255,255,.55)"}}>Stimulation intensity</span><span style={{fontFamily:"var(--jk)",fontSize:12.5,fontWeight:700,color}}>Level 6 / 10</span></div>
      <div style={{display:"flex",gap:5}}>{Array.from({length:10}).map((_,k)=>(<span key={k} style={{flex:1,height:10,borderRadius:3,background:k<6?color:"rgba(255,255,255,.12)"}}/>))}</div>
    </div>
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}><span style={{fontFamily:"var(--in)",fontSize:11,color:"rgba(255,255,255,.55)"}}>Session progress</span><span style={{fontFamily:"var(--jk)",fontSize:11.5,fontWeight:600,color:"rgba(255,255,255,.7)"}}>18 min left</span></div>
      <div style={{height:6,borderRadius:50,background:"rgba(255,255,255,.1)",overflow:"hidden"}}><div style={{height:"100%",width:"55%",borderRadius:50,background:color}}/></div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:11,padding:"11px 13px",background:`${color}14`,border:`1px solid ${color}3d`,borderRadius:11}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0}}><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3"/><path d="M7 5H4v2a3 3 0 003 3"/></svg>
      <div style={{display:"flex",flexDirection:"column"}}>
        <span style={{fontFamily:"var(--jk)",fontSize:13.5,fontWeight:800,color:"#fff",lineHeight:1.25}}>Acquired by ResMed · $340M</span>
        <span style={{fontFamily:"var(--in)",fontSize:11.5,color:"rgba(255,255,255,.62)"}}>First FDA-authorised non-drug RLS therapy</span>
      </div>
    </div>
  </div>);
}
// progress bar + checklist (no chart)
function DashChecklist({color,pct,items}:{color:string,pct:number,items:{label:string,done:boolean}[]}){
  return (<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",gap:11,justifyContent:"center"}}>
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{fontFamily:"var(--in)",fontSize:11.5,color:"rgba(255,255,255,.6)"}}>Today's plan</span><span style={{fontFamily:"var(--jk)",fontSize:11.5,fontWeight:700,color}}>{Math.round(pct*100)}%</span></div>
      <div style={{height:6,borderRadius:50,background:"rgba(255,255,255,.1)",overflow:"hidden"}}><div style={{height:"100%",width:`${pct*100}%`,borderRadius:50,background:color}}/></div>
    </div>
    {items.map((it,k)=>(
      <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{width:20,height:20,flexShrink:0,borderRadius:6,background:it.done?`${color}22`:"transparent",border:`1px solid ${it.done?color+"88":"rgba(255,255,255,.22)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{it.done&&<Ck c={color}/>}</span>
        <span style={{fontFamily:"var(--in)",fontSize:13,color:it.done?"rgba(255,255,255,.85)":"rgba(255,255,255,.5)"}}>{it.label}</span>
      </div>
    ))}
  </div>);
}
// go / no-go verdict + condition rows (no chart)
function DashVerdict({color,verdict,sub,conditions}:{color:string,verdict:string,sub:string,conditions:{label:string,val:string}[]}){
  return (<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",gap:12,justifyContent:"center"}}>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:62,height:48,padding:"0 16px",borderRadius:12,background:`${color}1f`,border:`1px solid ${color}66`,fontFamily:"var(--jk)",fontSize:26,fontWeight:800,color}}>{verdict}</span>
      <span style={{fontFamily:"var(--in)",fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.4}}>{sub}</span>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {conditions.map((c,k)=>(
        <div key={k} style={{display:"flex",alignItems:"center",gap:9,fontFamily:"var(--in)",fontSize:12.5}}>
          <Ck c={color}/>
          <span style={{flex:1,color:"rgba(255,255,255,.6)"}}>{c.label}</span>
          <span style={{fontFamily:"var(--jk)",fontWeight:700,color:"#fff"}}>{c.val}</span>
        </div>
      ))}
    </div>
  </div>);
}
// community groups list with avatar initials (no chart)
function DashList({rows}:{rows:{title:string,meta:string,initial:string,c:string}[]}){
  return (<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",gap:8,justifyContent:"center"}}>
    {rows.map((r,k)=>(
      <div key={k} style={{display:"flex",alignItems:"center",gap:11,padding:"8px 12px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10}}>
        <span style={{width:28,height:28,flexShrink:0,borderRadius:"50%",background:`${r.c}26`,border:`1px solid ${r.c}66`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--jk)",fontSize:12,fontWeight:800,color:r.c}}>{r.initial}</span>
        <span style={{flex:1,minWidth:0,fontFamily:"var(--in)",fontSize:12.5,fontWeight:500,color:"rgba(255,255,255,.85)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.title}</span>
        <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:`${r.c}`,flexShrink:0}}>{r.meta}</span>
      </div>
    ))}
  </div>);
}
// 2x2 big stat grid (no chart)
function DashStatGrid({items}:{items:{l:string,v:string,c:string}[]}){
  return (<div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:10}}>
    {items.map((t,k)=>(
      <div key={k} style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 14px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:11}}>
        <span style={{fontFamily:"var(--jk)",fontSize:26,fontWeight:800,color:t.c,lineHeight:1}}>{t.v}</span>
        <span style={{fontFamily:"var(--in)",fontSize:11.5,color:"rgba(255,255,255,.6)",marginTop:5}}>{t.l}</span>
      </div>
    ))}
  </div>);
}
function DashPanel({accent,title,tiles,children}:{accent:string,title:string,tiles?:{l:string,v:string,c?:string}[],children:React.ReactNode}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14,height:"100%",padding:"16px 16px 15px",textAlign:"left",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:9,minWidth:0}}>
          <span aria-hidden="true" style={{width:22,height:22,flexShrink:0,borderRadius:7,background:accent}}/>
          <span style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:800,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{title}</span>
        </span>
        <span style={{display:"inline-flex",alignItems:"center",gap:7,height:24,flexShrink:0,padding:"0 11px",background:`${accent}1f`,border:`1px solid ${accent}4d`,borderRadius:50}}>
          <span className="hero-live-dot" aria-hidden="true" style={{width:6,height:6,borderRadius:"50%",background:accent}}/>
          <span style={{fontFamily:"var(--jk)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"#fff",opacity:.85}}>Live</span>
        </span>
      </div>
      <div style={{position:"relative",flex:1,minHeight:0}}>{children}</div>
      {tiles&&<div style={{display:"grid",gridTemplateColumns:`repeat(${tiles.length},1fr)`,gap:9}}>
        {tiles.map(t=>(
          <div key={t.l} style={{padding:"9px 11px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
              <span aria-hidden="true" style={{width:6,height:6,flexShrink:0,borderRadius:"50%",background:t.c||accent}}/>
              <span style={{fontFamily:"var(--in)",fontSize:10.5,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.l}</span>
            </div>
            <span style={{display:"block",fontFamily:"var(--jk)",fontSize:t.v.length>5?17:22,fontWeight:800,color:t.c||"#fff",lineHeight:1}}>{t.v}</span>
          </div>
        ))}
      </div>}
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroDashboards({go}:{go:(p:string,id?:string)=>void}){
  const slides=[
    {id:"nomo",label:"Nomo Smart Care",node:<DashPanel accent="#F5A623" title="Nomo Smart Care"><DashFeed rows={[{txt:"Morning routine on track",time:"8:42",c:"#F5A623",done:true},{txt:"Kitchen activity detected",time:"9:15",c:"#F5A623"},{txt:"Medication taken",time:"9:30",c:"#F5A623",done:true},{txt:"Fall check — all clear",time:"now",c:"#F5A623",done:true}]}/></DashPanel>},
    {id:"farmwave",label:"Farmwave",node:<DashPanel accent="#1E88D8" title="Farmwave AI Harvest Vision" tiles={[{l:"Left header",v:"5",c:"#1E88D8"},{l:"Right header",v:"16",c:"#1E88D8"},{l:"Rear combine",v:"12",c:"#1E88D8"}]}><DashSpark color="#1E88D8" label="Grain loss · bu/acre — last 60 min" d="M0,150 C60,128 100,160 150,118 C200,84 250,128 300,96 C360,62 420,100 480,64 C540,38 580,58 600,46" d2="M0,175 C70,165 110,182 160,150 C215,118 265,150 320,138 C380,124 430,150 490,118 C545,92 580,108 600,100"/></DashPanel>},
    {id:"noctrix",label:"Noctrix Health",node:<DashPanel accent="#8A7DD0" title="Noctrix NTX100"><DashNoctrix color="#8A7DD0"/></DashPanel>},
    {id:"muvr",label:"Muvr",node:<DashPanel accent="#22B3B6" title="Muvr Recovery"><DashChecklist color="#22B3B6" pct={.75} items={[{label:"Morning mobility",done:true},{label:"Knee flexion · 110°",done:true},{label:"Strength set · 3×12",done:true},{label:"Evening stretch",done:false}]}/></DashPanel>},
    {id:"drift",label:"Drift App",node:<DashPanel accent="#33A6D7" title="Drift Sprayability"><DashVerdict color="#33A6D7" verdict="GO" sub="Safe to spray — clear window for the next 4 hours." conditions={[{label:"Wind",val:"6 mph"},{label:"Temperature",val:"72°F"},{label:"Humidity",val:"54%"},{label:"Inversion risk",val:"Low"}]}/></DashPanel>},
    {id:"mobility",label:"mobilityONE",node:<DashPanel accent="#8BBA33" title="mobilityONE Fleet"><DashStatGrid items={[{l:"Vehicles managed",v:"1,240",c:"#8BBA33"},{l:"Utilization",v:"78%",c:"#8BBA33"},{l:"Active now",v:"312",c:"#8BBA33"},{l:"Fleet uptime",v:"99.9%",c:"#8BBA33"}]}/></DashPanel>},
    {id:"beunity",label:"beUnity",node:<DashPanel accent="#7C4DC9" title="beUnity Community" tiles={[{l:"Organisations",v:"500+",c:"#7C4DC9"},{l:"Reach",v:"Across EU"},{l:"In",v:"One app"}]}><DashList rows={[{initial:"P",title:"Photography Club",meta:"128 members",c:"#7C4DC9"},{initial:"G",title:"Annual Gala 2026",meta:"64 going",c:"#7C4DC9"},{initial:"B",title:"Board announcements",meta:"3 new",c:"#7C4DC9"}]}/></DashPanel>},
  ];
  const[i,setI]=useState(0);const[paused,setPaused]=useState(false);
  useEffect(()=>{if(paused)return;const t=setInterval(()=>setI(p=>(p+1)%slides.length),4800);return()=>clearInterval(t);},[paused,slides.length]);
  return (
    <div className="hero-visual fi d3" style={{position:"relative",width:"100%"}} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <button onClick={()=>go("cases",slides[i].id)} aria-label={`See the ${slides[i].label} case study`} className="hero-shot" style={{position:"relative",zIndex:1,display:"block",width:"100%",padding:"10px",border:"1px solid rgba(255,255,255,.16)",borderRadius:22,cursor:"pointer",background:"#013a52",boxShadow:"0 30px 70px rgba(0,14,26,.45)"}}>
        <div style={{position:"relative",aspectRatio:"3 / 2",borderRadius:13,overflow:"hidden",border:"1px solid rgba(0,0,0,.35)",background:"#00263a"}}>
          {slides.map((s,idx)=>(<div key={s.id} className={"hero-slide"+(idx===i?" on":"")} style={{position:"absolute",inset:0}}>{s.node}</div>))}
        </div>
      </button>
      <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"center",alignItems:"center",gap:7,marginTop:16}}>
        {slides.map((s,idx)=>(<button key={s.id} className="hero-dot" onClick={()=>setI(idx)} aria-label={`Show ${s.label}`} style={{width:idx===i?20:7,height:7,borderRadius:50,border:"none",padding:0,cursor:"pointer",background:idx===i?(s.node.props as {accent:string}).accent:"rgba(255,255,255,.28)"}}/>))}
      </div>
    </div>
  );
}
function Home({go}:{go:(p:string,id?:string)=>void}){
  const[at,setAt]=useState(0);const[ap,setAp]=useState(0);const tlR=useRef<HTMLElement>(null);
  // Hero rotating product showcase — cycles through best cases with image + outcome stat
  const heroShowcase=[
    {id:"nomo",src:process.env.PUBLIC_URL+"/images/nomo_header_1.png",name:"NOMO Smart Care",cat:"Health",outcome:"Live in all 50 US states · sub-1s emergency alerts"},
    {id:"farmwave",src:process.env.PUBLIC_URL+"/images/farmwave_tablet.jpeg",name:"Farmwave",cat:"AgTech",outcome:"2025 Award winner · 3–8 bu/acre recovered every harvest"},
    {id:"muvr",src:process.env.PUBLIC_URL+"/images/muvr_home.jpg",name:"Muvr",cat:"Health",outcome:"Acquired by Exactech in December 2020"},
    {id:"noctrix",src:process.env.PUBLIC_URL+"/images/noctrix_showcase.png",name:"Noctrix Health",cat:"Health",outcome:"Acquired by ResMed for $340M · First FDA-authorised non-drug RLS therapy"},
  ];
  const[hsIdx,setHsIdx]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setHsIdx(p=>(p+1)%heroShowcase.length),4200);return()=>clearInterval(i);},[heroShowcase.length]);
  useEffect(()=>{const i=setInterval(()=>setAt(p=>(p+1)%tests.length),5000);return()=>clearInterval(i);},[]);
  useEffect(()=>{const h=()=>{if(!tlR.current)return;const r=tlR.current.getBoundingClientRect();const p=Math.max(0,Math.min(1,(-r.top+200)/(r.height-300)));setAp(Math.min(3,Math.floor(p*4)));};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);

  return <div>
    {/* HERO — proof-led split: message (left) · real product visual (right) · proof row in the fold */}
    <section className="hero-s" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:"var(--blue)"}}>
      <video autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0,opacity:.18}}>
        <source src={process.env.PUBLIC_URL + "/videos/hero.mp4"} type="video/mp4"/>
        <source src={process.env.PUBLIC_URL + "/videos/hero.mov"} type="video/quicktime"/>
      </video>
      <div aria-hidden="true" style={{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(900px 620px at 12% 24%, rgba(0,76,115,.55), transparent 55%), radial-gradient(1100px 760px at 92% -10%, rgba(125,185,232,.22), transparent 55%), linear-gradient(180deg, rgba(0,28,46,.5), rgba(0,28,46,.66))"}}/>
      <div className="hero-grain"/>
      <W className="hero-w" style={{position:"relative",zIndex:3,paddingTop:128,paddingBottom:96,color:"var(--on-dark)",minHeight:"calc(100vh - 60px)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div className="hero-2col" style={{display:"grid",gridTemplateColumns:"1fr",gap:"clamp(36px,5vw,72px)",alignItems:"center",width:"100%"}}>
          {/* LEFT — message */}
          <div className="hero-content">
            <span className="fi d1" style={{display:"inline-flex",alignItems:"center",gap:"var(--space-3)",fontFamily:"var(--jk)",fontSize:13,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"var(--accent)",marginBottom:"var(--space-6)"}}><span aria-hidden="true" style={{width:32,height:2,background:"var(--accent)"}}/>Product · AI · IoT engineering</span>
            <h1 className="speakable-hero fi d2" style={{fontFamily:"var(--jk)",fontSize:"clamp(40px,6vw,80px)",fontWeight:800,lineHeight:1.04,letterSpacing:"-0.035em",margin:0,marginBottom:"var(--space-8)",maxWidth:860}}>You've got the idea. <span style={{color:"var(--accent)"}}>We bring the tech.</span></h1>
            <p className="fi d3 speakable-tagline" style={{fontSize:"clamp(17px,1.7vw,22px)",color:"var(--on-dark-muted)",lineHeight:1.6,margin:0,marginBottom:"var(--space-10)",maxWidth:620}}>From AI and IoT to high-fidelity product design, we architect, build, and ship the hard parts. Trusted by teams whose products got acquired.</p>
            <div className="fi d4" style={{display:"flex",alignItems:"center",gap:"var(--space-4)",flexWrap:"wrap"}}>
              <a href="https://calendly.com/jurica-lumo-lab/30min" target="_blank" rel="noopener noreferrer" className="hero-cta">Book a tech assessment <Arr s={14} c="var(--blue)"/></a>
              <button onClick={()=>go("cases")} className="hero-ghost">See our work <Arr s={14} c="currentColor"/></button>
            </div>
            <p className="fi d4" style={{fontFamily:"var(--in)",fontSize:13,color:"rgba(255,255,255,.55)",margin:0,marginTop:"var(--space-4)"}}>30 minutes · no pitch decks · a senior engineer, not a salesperson.</p>
          </div>
          {/* Product dashboards hidden for a simpler hero — re-enable with <HeroDashboards go={go}/> */}
        </div>
        {/* PROOF ROW — in the fold */}
        <div className="fi d4 hero-proof-row" style={{display:"flex",alignItems:"center",gap:"12px 18px",flexWrap:"wrap",marginTop:"clamp(28px,4vh,52px)"}}>
          <div className="hero-proof-chips" style={{display:"flex",alignItems:"center",gap:"10px 12px",flexWrap:"wrap"}}>
            <a href="https://clutch.co/profile/lumo-lab" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,height:32,padding:"0 14px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,textDecoration:"none",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"}}><span aria-hidden="true" style={{color:"#E8A33D",fontSize:11,letterSpacing:-1}}>★★★★★</span><span style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"#fff"}}>5.0 on Clutch</span></a>
            <span style={{display:"inline-flex",alignItems:"center",gap:7,height:32,padding:"0 14px",background:"rgba(125,185,232,.12)",border:"1px solid rgba(125,185,232,.3)",borderRadius:50,fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"#cfe4f6"}}>🏆 2025 AI Harvest Vision — Solution of the Year</span>
          </div>
          <div className="hero-proof-trust" style={{display:"flex",alignItems:"center",gap:"8px 12px",flexWrap:"wrap"}}>
            <span aria-hidden="true" className="hero-proof-divider" style={{width:1,height:20,background:"rgba(255,255,255,.18)"}}/>
            <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.4)"}}>Trusted by</span>
            <span style={{display:"inline-flex",alignItems:"center",gap:14}}>
              {["Farmwave","Nomo","Noctrix"].map((n,i)=>(
                <span key={n} style={{display:"inline-flex",alignItems:"center",gap:14}}>
                  {i>0&&<span aria-hidden="true" style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.28)"}}/>}
                  <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"rgba(255,255,255,.62)"}}>{n}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </W>
    </section>
    {/* TRUST STRIP — combined: award (clickable, left) + scrolling brand marquee (right). One credibility row. */}
    <section className="trust-strip" style={{borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",background:"var(--bg2)",overflow:"hidden"}}>
      <W className="trust-strip-row" style={{display:"flex",alignItems:"stretch",gap:0,padding:0,maxWidth:1240}}>
        {/* Award — clickable, prominent, on the left */}
        <div className="trust-award" onClick={()=>go("cases","farmwave")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"){go("cases","farmwave");}}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px clamp(20px,3vw,32px) 16px 0",cursor:"pointer",borderRight:"1px solid var(--brd)",flexShrink:0,transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10,background:"var(--blue)",color:"#fff",flexShrink:0,boxShadow:"0 4px 12px rgba(0,76,115,.22)"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3"/><path d="M7 5H4v2a3 3 0 003 3"/></svg>
          </span>
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>2025 Award winner</span>
            <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)",lineHeight:1.2}}>AI Harvest Vision Solution <span style={{color:"var(--txt3)",fontWeight:500}}>· Farmwave case →</span></span>
          </div>
        </div>
        {/* Brand marquee — anchored by a "20+ PARTNERS" label in flow (solid bg, real layout), then scrolling brand names beside it */}
        <div className="trust-marquee" style={{flex:1,minWidth:0,display:"flex",alignItems:"center"}}>
          {/* Anchor in flow — solid block, won't have z-index conflicts with the moving marquee */}
          <div style={{flexShrink:0,paddingLeft:"clamp(20px,3vw,32px)",paddingRight:18,display:"flex",alignItems:"center",gap:10,background:"var(--bg2)",alignSelf:"stretch"}}>
            <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--txt4)",letterSpacing:2,textTransform:"uppercase",whiteSpace:"nowrap"}}>20+ partners since 2017</span>
            <span style={{width:14,height:1,background:"var(--brd)",flexShrink:0}}/>
          </div>
          {/* Scrolling brand names — flex:1, overflow:hidden, hard-clipped at the edges */}
          <div style={{flex:1,minWidth:0,overflow:"hidden",position:"relative",alignSelf:"stretch",display:"flex",alignItems:"center",paddingRight:"clamp(20px,3vw,32px)"}}>
            <div className="mq-t">{cl3.map((c,i)=><span key={i} style={{fontFamily:"var(--jk)",fontSize:13,color:"var(--txt2)",fontWeight:600,whiteSpace:"nowrap",letterSpacing:".005em",display:"flex",alignItems:"center",gap:12}}>{c}<span style={{width:3,height:3,borderRadius:"50%",background:"var(--blue)",opacity:.25}}/></span>)}</div>
          </div>
        </div>
      </W>
    </section>
    {/* SERVICES */}
    <section className="grid-bg" style={{padding:"100px 0"}}><W>
      <SL ch="Services"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginBottom:48}}>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,40px)",fontWeight:800,lineHeight:1.05,color:"var(--txt)"}}>How we help you <span style={{color:"var(--blue)"}}>move forward.</span></h2>
        <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.75,paddingTop:4}}>From initial assessment to long-term advisory, always focused on clarity, quality, and measurable outcomes.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}} className="svc-grid">
        {svcs.map((s,i)=><div key={i} className="card svc-card" style={{gridColumn:s.span?"span 2":"span 1",cursor:"pointer",display:"flex",flexDirection:"column",minHeight:s.span?200:220,padding:"30px 28px"}} onClick={()=>go("services")}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
            <span style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--blue)",letterSpacing:1,fontFeatureSettings:'"tnum"'}}>{s.n}</span>
            <span style={{flex:1,height:1,background:"var(--brd)"}}/>
          </div>
          <h3 style={{fontFamily:"var(--jk)",fontSize:s.span?22:18,fontWeight:800,margin:0,marginBottom:8,color:"var(--txt)",letterSpacing:"-.01em",lineHeight:1.15}}>{s.t}</h3>
          <p style={{fontSize:s.span?15:13.5,fontWeight:600,color:"var(--txt2)",lineHeight:1.5,margin:0,marginBottom:8}}>{s.hl}</p>
          <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,margin:0,marginBottom:18,flex:1}}>{s.d}</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginTop:"auto"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.tech.slice(0,s.span?5:3).map(t=><span key={t} className="ft">{t}</span>)}</div>
            <span className="svc-go" style={{flexShrink:0,display:"inline-flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:"50%",background:"var(--blue)",color:"#fff"}}><Arr s={14} c="#fff"/></span>
          </div>
        </div>)}
      </div>
      <div style={{marginTop:18,display:"flex",justifyContent:"flex-end"}}>
        <button onClick={()=>go("services")} style={{display:"inline-flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",letterSpacing:.2,padding:0,transition:"gap .2s"}} onMouseEnter={e=>e.currentTarget.style.gap="12px"} onMouseLeave={e=>e.currentTarget.style.gap="8px"}>See all services in depth <Arr s={13} c="currentColor"/></button>
      </div>
    </W></section>
    <CasesSlider go={go}/>
    {/* PROCESS — compact horizontal 4-step row, ~120px tall instead of 800px. Sticky timeline + sparse layout retired. */}
    <section style={{padding:"clamp(56px,8vh,80px) 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)"}}>
      <W>
        {/* Section header — left-aligned label, single tight headline */}
        <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",gap:24,marginBottom:32,flexWrap:"wrap"}}>
          <div>
            <SL ch="Process"/>
            <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,color:"var(--txt)",lineHeight:1.1,margin:0,letterSpacing:"-.02em"}}>From assessment to <span style={{color:"var(--blue)"}}>impact.</span></h2>
          </div>
          <p style={{fontFamily:"var(--in)",fontSize:14,color:"var(--txt3)",lineHeight:1.55,margin:0,maxWidth:380}}>A four-stage rhythm we apply to every engagement.</p>
        </div>
        {/* Horizontal 4-step row with connector line */}
        <div style={{position:"relative",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"clamp(16px,2.4vw,32px)"}} className="proc-row">
          {/* The connecting hairline behind the dots */}
          <div aria-hidden="true" style={{position:"absolute",top:14,left:"calc(12.5% - 8px)",right:"calc(12.5% - 8px)",height:1,background:"var(--brd)"}}/>
          {proc.map((p,i)=>(
            <div key={i} style={{position:"relative",paddingTop:0}}>
              {/* Dot anchor at the top */}
              <div style={{width:28,height:28,borderRadius:"50%",border:`2px solid ${i===0?"var(--blue)":"var(--brd-strong,rgba(15,23,42,.14))"}`,background:i===0?"var(--blue)":"#fff",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2,marginBottom:18,boxShadow:i===0?"0 0 0 5px rgba(0,76,115,.10)":"0 1px 2px rgba(0,30,50,.08)"}}>
                <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:800,color:i===0?"#fff":"var(--txt3)",fontFeatureSettings:'"tnum"',letterSpacing:0}}>{p.n}</span>
              </div>
              {/* Phase content */}
              <h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(16px,1.4vw,19px)",fontWeight:800,margin:0,marginBottom:6,color:"var(--txt)",letterSpacing:"-.01em"}}>{p.ph}</h3>
              <p style={{fontFamily:"var(--in)",fontSize:13.5,color:"var(--txt3)",lineHeight:1.5,margin:0}}>{p.d}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
    {/* VOICES — editorial spread. One featured pull-quote testimonial + an editorial list of the other three. No carousel. All proof visible. */}
    {(()=>{
      // Featured: the Farmwave testimonial — punchiest line, tied to the 2025 award case
      const featured=tests.find(t=>t.co.includes("Farmwave"))||tests[0];
      // The killer line that becomes the pull-quote treatment
      const pullQuote="Lumo has done more for us in 7 months than internal teams did in 18 months.";
      // The rest of Craig's quote (everything except the pull-quote sentence), softened as supporting body
      const featuredRest=featured.q.replace(pullQuote,"").replace(/\s+/g," ").trim();
      const others=tests.filter(t=>t!==featured);
      const onLink=(t:typeof tests[0])=>{const isBlog=t.caseId==="nomo";return isBlog?()=>go("blog","b1"):()=>go("cases",t.caseId!);};
      return <section className="voices-section" style={{padding:"clamp(80px,12vh,140px) 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)",position:"relative"}}>
        <W>
          {/* Section masthead — anchor + display H2 + meta */}
          <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:48,alignItems:"end",marginBottom:"clamp(48px,7vh,72px)"}} className="voices-head">
            <div>
              <SL ch="Voices"/>
              <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(36px,5vw,72px)",fontWeight:800,lineHeight:.98,letterSpacing:"-.035em",color:"var(--txt)",margin:0}}>Different partners. <span style={{color:"var(--blue)"}}>One way of working.</span></h2>
            </div>
            <div style={{paddingBottom:6}}>
              <p style={{fontFamily:"var(--in)",fontSize:16,color:"var(--txt3)",lineHeight:1.65,margin:0,maxWidth:380}}>Honest signal from the founders and operators we've built with.</p>
            </div>
          </div>
          {/* FEATURED — Craig / Farmwave. Pull-quote treatment + supporting body + attribution row. No card chrome. */}
          <article onClick={onLink(featured)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"){onLink(featured)();}}} style={{position:"relative",cursor:"pointer",paddingTop:36,paddingBottom:48,borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)"}} className="voice-featured">
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"clamp(28px,5vw,56px)",alignItems:"start"}}>
              {/* Left: portrait + index label */}
              <div style={{display:"flex",flexDirection:"column",gap:18,minWidth:160}}>
                <img src={(featured as any).img||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={featured.n} loading="lazy" decoding="async" width={160} height={160} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:160,height:160,borderRadius:12,objectFit:"cover",objectPosition:"top",border:"3px solid #fff",boxShadow:"0 12px 32px rgba(0,30,50,.12)"}}/>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--blue)"}}/>
                  <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Featured voice · 01</span>
                </div>
              </div>
              {/* Right: massive pull quote + supporting body + attribution */}
              <div style={{minWidth:0}}>
                {/* Pull quote — magazine treatment, big leading quote glyph */}
                <div style={{position:"relative"}}>
                  <span aria-hidden="true" style={{position:"absolute",left:-8,top:-32,fontFamily:"Georgia,serif",fontSize:120,lineHeight:1,color:"var(--blue)",opacity:.1,fontWeight:700,pointerEvents:"none"}}>“</span>
                  <p style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,3.4vw,46px)",fontWeight:700,lineHeight:1.18,letterSpacing:"-.02em",color:"var(--txt)",margin:0,marginBottom:24,maxWidth:880,position:"relative",zIndex:1}}>{pullQuote}</p>
                </div>
                {/* Supporting body — softer, the rest of the quote */}
                {featuredRest&&<p style={{fontFamily:"var(--in)",fontSize:"clamp(15px,1.3vw,17px)",color:"var(--txt2)",lineHeight:1.7,margin:0,marginBottom:32,maxWidth:760,fontStyle:"italic"}}>{featuredRest}</p>}
                {/* Attribution row — name + role + company + case link */}
                <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
                  <div>
                    {featured.linkedin
                      ? <a href={featured.linkedin} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",textDecoration:"none",transition:"color .2s",display:"block"}} onMouseEnter={e=>e.currentTarget.style.color="var(--blue)"} onMouseLeave={e=>e.currentTarget.style.color="var(--txt)"}>{featured.n}</a>
                      : <span style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",display:"block"}}>{featured.n}</span>
                    }
                    <span style={{fontFamily:"var(--in)",fontSize:13,color:"var(--txt3)",display:"block",marginTop:2}}>{featured.r} · {featured.website
                      ? <a href={featured.website} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{color:"var(--blue)",fontWeight:600,textDecoration:"none"}}>{featured.co}</a>
                      : <span style={{color:"var(--blue)",fontWeight:600}}>{featured.co}</span>}</span>
                  </div>
                  <span style={{width:1,height:24,background:"var(--brd)"}}/>
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Read more <Arr s={11} c="var(--blue)"/></span>
                </div>
              </div>
            </div>
          </article>
          {/* OTHER VOICES — editorial list, 3 rows. Each: index + name + role + quote, with photo on hover-ready hint. */}
          <div style={{marginTop:8}}>
            {others.map((t,i)=><article key={t.n} onClick={onLink(t)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"){onLink(t)();}}} className="voice-row" style={{display:"grid",gridTemplateColumns:"68px 200px 1fr auto",gap:"clamp(20px,3vw,40px)",alignItems:"center",padding:"28px 0",borderBottom:i<others.length-1?"1px solid var(--brd)":"none",cursor:"pointer",transition:"padding-left .35s cubic-bezier(.22,1,.36,1), background .25s"}} onMouseEnter={e=>{e.currentTarget.style.paddingLeft="16px";e.currentTarget.style.background="rgba(0,76,115,.025)";}} onMouseLeave={e=>{e.currentTarget.style.paddingLeft="";e.currentTarget.style.background="";}}>
              {/* Photo — small, rounded */}
              <img src={(t as any).img||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={t.n} loading="lazy" decoding="async" width={68} height={68} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:68,height:68,borderRadius:10,objectFit:"cover",objectPosition:"top",border:"2px solid #fff",boxShadow:"0 2px 8px rgba(0,30,50,.08)"}}/>
              {/* Name + role/company */}
              <div style={{minWidth:0}}>
                <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--txt4)",letterSpacing:1.8,textTransform:"uppercase",display:"block",marginBottom:2,fontFeatureSettings:'"tnum"'}}>{`0${i+2}`} · Voice</span>
                {t.linkedin
                  ? <a href={t.linkedin} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--txt)",textDecoration:"none",display:"block",lineHeight:1.2,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--blue)"} onMouseLeave={e=>e.currentTarget.style.color="var(--txt)"}>{t.n}</a>
                  : <span style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--txt)",display:"block",lineHeight:1.2}}>{t.n}</span>
                }
                <span style={{fontFamily:"var(--in)",fontSize:12.5,color:"var(--txt3)",display:"block",marginTop:2,lineHeight:1.3}}>{t.r} · <span style={{color:"var(--blue)",fontWeight:600}}>{t.co}</span></span>
              </div>
              {/* Quote — italic, full text. We have the room, let the voice breathe. */}
              <p style={{fontFamily:"var(--jk)",fontSize:"clamp(15px,1.3vw,17px)",fontWeight:500,fontStyle:"italic",color:"var(--txt2)",lineHeight:1.55,margin:0}}>“{t.q}”</p>
              {/* Arrow — quiet affordance */}
              <span className="voice-arrow" style={{flexShrink:0,display:"inline-flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:"50%",border:"1px solid var(--brd)",color:"var(--txt3)",transition:"transform .25s, color .25s, border-color .25s, background .25s"}}><Arr s={14} c="currentColor"/></span>
            </article>)}
          </div>
        </W>
      </section>;
    })()}
    {/* ── TECH PARTNER ── qualifying message for the buyer who has vision + budget but needs engineering ── */}
    <section className="get-started" style={{padding:"clamp(72px,10vh,120px) 0",background:"var(--bg)",borderTop:"1px solid var(--brd)"}}><W>
      <div style={{display:"grid",gridTemplateColumns:"1.15fr 1fr",gap:48,alignItems:"end",marginBottom:"clamp(40px,5vh,56px)"}} className="get-started-head">
        <div>
          <SL ch="Your tech partner"/>
          <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(32px,4.5vw,56px)",fontWeight:800,lineHeight:1.02,letterSpacing:"-.03em",color:"var(--txt)",margin:0}}>You've got the idea. <span style={{color:"var(--blue)"}}>We bring the tech.</span></h2>
        </div>
        <p style={{fontFamily:"var(--in)",fontSize:16,color:"var(--txt3)",lineHeight:1.65,margin:0,maxWidth:440,paddingBottom:6}}>The hard part isn't knowing what to build — it's knowing how. Start with a free consultation: we'll talk through your idea and where the engineering work actually sits.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}} className="get-started-grid">
        {/* Option 1 — Book a consultation via Calendly */}
        <a href="https://calendly.com/jurica-lumo-lab/30min" target="_blank" rel="noopener noreferrer" className="get-started-card" style={{textDecoration:"none",padding:"36px 32px",background:"var(--bg)",border:"1px solid var(--brd)",borderRadius:16,transition:"transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s",display:"flex",flexDirection:"column",gap:14,minHeight:220,position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 36px rgba(0,30,50,.10)";e.currentTarget.style.borderColor="rgba(0,76,115,.18)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="var(--brd)";}}>
          <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4,textTransform:"uppercase"}}>01</span>
          <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)",margin:0,letterSpacing:"-.015em",lineHeight:1.15}}>Free discovery call</h3>
          <p style={{fontFamily:"var(--in)",fontSize:14.5,color:"var(--txt3)",lineHeight:1.7,margin:0,flex:1}}>Bring the idea. We'll talk scope, stack, and what shipping it actually looks like — for as long as it takes. No deck, no sales pitch, just an honest read.</p>
          <span style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",letterSpacing:.2,marginTop:4}}>Book on Calendly <Arr s={13} c="var(--blue)"/></span>
        </a>
        {/* Option 2 — Send your brief */}
        <a href="mailto:jurica@lumo-lab.com?subject=Lumo%20Lab%20—%20Project%20brief" className="get-started-card" style={{textDecoration:"none",padding:"36px 32px",background:"var(--bg)",border:"1px solid var(--brd)",borderRadius:16,transition:"transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s",display:"flex",flexDirection:"column",gap:14,minHeight:220,position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 36px rgba(0,30,50,.10)";e.currentTarget.style.borderColor="rgba(0,76,115,.18)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="var(--brd)";}}>
          <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4,textTransform:"uppercase"}}>02</span>
          <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)",margin:0,letterSpacing:"-.015em",lineHeight:1.15}}>Send your brief</h3>
          <p style={{fontFamily:"var(--in)",fontSize:14.5,color:"var(--txt3)",lineHeight:1.7,margin:0,flex:1}}>Got specs, a deck, or a rough doc already? Email it over. You'll get a written response with where we'd start.</p>
          <span style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",letterSpacing:.2,marginTop:4}}>jurica@lumo-lab.com <Arr s={13} c="var(--blue)"/></span>
        </a>
        {/* Option 3 — See similar work */}
        <div onClick={()=>go("cases")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"){go("cases");}}} className="get-started-card" style={{cursor:"pointer",padding:"36px 32px",background:"var(--bg)",border:"1px solid var(--brd)",borderRadius:16,transition:"transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s",display:"flex",flexDirection:"column",gap:14,minHeight:220,position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 36px rgba(0,30,50,.10)";e.currentTarget.style.borderColor="rgba(0,76,115,.18)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="var(--brd)";}}>
          <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4,textTransform:"uppercase"}}>03</span>
          <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)",margin:0,letterSpacing:"-.015em",lineHeight:1.15}}>See similar work</h3>
          <p style={{fontFamily:"var(--in)",fontSize:14.5,color:"var(--txt3)",lineHeight:1.7,margin:0,flex:1}}>Read what we've shipped — across health, agriculture, mobility, and SaaS. Get a feel for the kind of partner we are.</p>
          <span style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",letterSpacing:.2,marginTop:4}}>Browse our work<Arr s={13} c="var(--blue)"/></span>
        </div>
      </div>
    </W></section>
  </div>;
}

/* ── ABOUT ── */
function About({go}:{go:(p:string,id?:string)=>void}){return <div style={{paddingTop:76}}>
  <section style={{padding:"48px 0 64px"}}><W><SL ch="About Us"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,lineHeight:1,color:"var(--txt)",marginBottom:16,maxWidth:600}}>We advise, guide, and deliver. We handle the tech so you can focus on the <span style={{color:"var(--blue)"}}>big picture.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:480}}>A technology consultancy based in Croatia, advising startups and enterprises worldwide.</p>
  </W></section>
  {/* TRUST STRIP — same as on the home page. Award (clickable, left) + 20+ partners marquee (right). */}
  <section className="trust-strip" style={{borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",background:"var(--bg2)",overflow:"hidden"}}>
    <W className="trust-strip-row" style={{display:"flex",alignItems:"stretch",gap:0,padding:0,maxWidth:1240}}>
      <div className="trust-award" onClick={()=>go("cases","farmwave")} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"){go("cases","farmwave");}}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px clamp(20px,3vw,32px) 16px 0",cursor:"pointer",borderRight:"1px solid var(--brd)",flexShrink:0,transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
        <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10,background:"var(--blue)",color:"#fff",flexShrink:0,boxShadow:"0 4px 12px rgba(0,76,115,.22)"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3"/><path d="M7 5H4v2a3 3 0 003 3"/></svg>
        </span>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>2025 Award winner</span>
          <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)",lineHeight:1.2}}>AI Harvest Vision Solution <span style={{color:"var(--txt3)",fontWeight:500}}>· Farmwave case →</span></span>
        </div>
      </div>
      <div className="trust-marquee" style={{flex:1,minWidth:0,display:"flex",alignItems:"center"}}>
        <div style={{flexShrink:0,paddingLeft:"clamp(20px,3vw,32px)",paddingRight:18,display:"flex",alignItems:"center",gap:10,background:"var(--bg2)",alignSelf:"stretch"}}>
          <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--txt4)",letterSpacing:2,textTransform:"uppercase",whiteSpace:"nowrap"}}>20+ partners since 2017</span>
          <span style={{width:14,height:1,background:"var(--brd)",flexShrink:0}}/>
        </div>
        <div style={{flex:1,minWidth:0,overflow:"hidden",position:"relative",alignSelf:"stretch",display:"flex",alignItems:"center",paddingRight:"clamp(20px,3vw,32px)"}}>
          <div className="mq-t">{cl3.map((c,i)=><span key={i} style={{fontFamily:"var(--jk)",fontSize:13,color:"var(--txt2)",fontWeight:600,whiteSpace:"nowrap",letterSpacing:".005em",display:"flex",alignItems:"center",gap:12}}>{c}<span style={{width:3,height:3,borderRadius:"50%",background:"var(--blue)",opacity:.25}}/></span>)}</div>
        </div>
      </div>
    </W>
  </section>
  <section style={{padding:"80px 0"}}><W><SL ch="Our story"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,marginBottom:56}}>
      <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.5vw,32px)",fontWeight:800,color:"var(--txt)"}}>From a one-person studio to a global <span style={{color:"var(--blue)"}}>technology consultancy.</span></h2>
      <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.8}}>Jurica spent nearly ten years building mobile products across health, agriculture, IoT, and enterprise before starting Lumo in 2022. The company was built on what that decade proved: the right outcome starts with understanding the problem, not picking the technology.</p>
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
        <img alt="Jurica Mlinaric" src={process.env.PUBLIC_URL + "/images/jurica.png"} decoding="async" width={720} height={900} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block"}}/>
        {/* Bottom-only dark band so the name + role read clearly without darkening the rest of the photo */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:160,background:"rgba(0,20,40,.6)"}}/>
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
      <div style={{padding:"48px 44px",background:"var(--bg)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.9,marginBottom:20}}>
          Jurica has been building mobile products since 2015: iOS, Android, IoT, wearables, edge AI. After nearly a decade freelancing for clients across Croatia, the US, and Switzerland, he founded Lumo Lab in 2022 to formalise what the work had already become: a team with a clear way of doing things.
        </p>
        <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.9,marginBottom:40}}>
          He's led projects across healthcare IoT, agricultural AI, mobility, and enterprise SaaS, from early-stage startups to companies scaling globally. The constant across all of it: understand the problem properly before recommending anything.
        </p>
        <div style={{borderLeft:"3px solid var(--blue)",paddingLeft:24}}>
          <p className="quote-txt" style={{fontFamily:"var(--jk)",fontSize:19,fontWeight:700,color:"var(--txt)",lineHeight:1.5,fontStyle:"italic",marginBottom:0}}>
            "Everyone wants to move fast. The ones who slow down to think first always get there sooner."
          </p>
        </div>
      </div>
    </div>
  </W></section>
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
    <SL ch="Core team"/>
    <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:800,color:"var(--txt)",marginBottom:48}}>The people who <span style={{color:"var(--blue)"}}>build it.</span></h2>
    <div className="team-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:24,maxWidth:980}}>
      {[
        // `img` is the headshot file; `imgScale` zooms the image inside the circular
        // crop when the source has padding around the subject (Domagoj's photo is a
        // pre-cropped circle on a white background — we scale it up so the white ring
        // gets clipped by the avatar's border-radius).
        {n:"Domagoj Kolaric",r:"Lead Mobile Engineer",img:"domagoj.jpeg",imgScale:1.75,imgPos:"center 40%"},
        {n:"Rudolf Lovrencic, PhD",r:"Software Architect",img:"rudi.jpeg",imgScale:1.05,imgPos:"center 28%"},
        {n:"Mato Poslon",r:"Full Stack Engineer"},
        {n:"Matija Sever",r:"Data Scientist",img:"matija.jpeg",imgScale:1.15,imgPos:"center 22%"},
        {n:"Stefan Petrovic",r:"iOS Engineer",img:"stefan.jpeg",imgScale:1.1,imgPos:"center 28%"},
      ].map((m:any,i)=>{
        const clean=m.n.replace(/,.*$/,"").trim();
        const parts=clean.split(/\s+/);
        const initials=(parts.length>=2?parts[0][0]+parts[parts.length-1][0]:parts[0].slice(0,2)).toUpperCase();
        return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
          <div role={m.img?"img":undefined} aria-label={m.img?m.n:undefined} style={{
            width:"100%",
            maxWidth:140,
            aspectRatio:"1/1",
            borderRadius:"50%",
            // Photo headshots are rendered as background-image — using an <img> tag
            // with absolute positioning inside a border-radius parent hit a Chrome
            // paint bug where the image fails to render on initial layout.
            backgroundColor:"var(--blue)",
            backgroundImage:m.img?`url("${process.env.PUBLIC_URL}/images/${m.img}")`:"radial-gradient(circle at 30% 25%, #1A6B96 0%, var(--blue) 55%, #003655 100%)",
            backgroundSize:m.img?`${(m.imgScale||1)*100}%`:"auto",
            backgroundPosition:m.img?(m.imgPos||"center"):"center",
            backgroundRepeat:"no-repeat",
            display:"flex",alignItems:"center",justifyContent:"center",
            marginBottom:18,
            boxShadow:"0 8px 28px rgba(0,76,115,.22), inset 0 1px 0 rgba(255,255,255,.12)",
          }}>
            {!m.img&&<span aria-hidden="true" style={{fontFamily:"var(--jk)",fontSize:"clamp(26px,3.2vw,38px)",fontWeight:700,color:"#fff",letterSpacing:".5px",lineHeight:1}}>{initials}</span>}
          </div>
          <h3 style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--txt)",marginBottom:4,lineHeight:1.25}}>{m.n}</h3>
          <p style={{fontSize:12,color:"var(--txt3)",fontWeight:500,lineHeight:1.45}}>{m.r}</p>
        </div>;
      })}
    </div>
  </W></section>
  <section style={{padding:"80px 0",background:"var(--blue)"}}><W style={{textAlign:"center"}}>
    <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,3vw,36px)",fontWeight:800,color:"#fff",marginBottom:12,lineHeight:1.1}}>Ready to work together?</h2>
    <p style={{fontSize:15,color:"rgba(255,255,255,.65)",marginBottom:32,maxWidth:420,margin:"0 auto 32px"}}>Tell us about your challenge. We'll tell you if and how we can help.</p>
    <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <button onClick={()=>go("services")} className="cta-m" style={{background:"#fff",color:"var(--blue)"}}>See how we work <Arr s={14} c="var(--blue)"/></button>
      <button onClick={()=>go("cases")} className="cta-g" style={{color:"rgba(255,255,255,.75)",borderColor:"rgba(255,255,255,.2)"}}>View our work</button>
    </div>
  </W></section>
</div>;}

/* ── SERVICES ── */
const pricing=[
  {n:"01",t:"Advisory retainer",fit:"Embedded strategic guidance over time.",d:"Fractional CTO / architect hours for continuous advisory: roadmap reviews, architecture calls, hiring input, vendor evaluation.",meta:"Monthly, fixed hours",cta:"Best for founders and CTOs who need a thinking partner on tap."},
  {n:"02",t:"Defined engagement",fit:"Scoped initiative, clear outcome, fixed budget.",d:"A discrete project with agreed deliverables, timeline, and budget. Typical for assessments, MVPs, migrations, and new product builds.",meta:"2 to 16 weeks, fixed fee",cta:"Best when the problem is well-defined and success is measurable."},
  {n:"03",t:"Embedded team",fit:"Our engineers integrated with yours.",d:"A dedicated, cross-functional pod (engineers, designers, PM) working alongside your team at an agreed weekly capacity.",meta:"Monthly, rolling 3-month minimum",cta:"Best for long-running product work where velocity and continuity matter."},
  {n:"04",t:"Startup partnership",fit:"Shared risk, shared upside.",d:"For early-stage teams: a blended model where part of our fee converts to equity or milestones, co-investing our expertise in your outcome.",meta:"Custom terms",cta:"Best for founders at seed stage with conviction and runway constraints."},
];
const faqs=[
  {q:"What's the minimum engagement?",a:"For the advisory retainer, one month. For a defined engagement, our assessment week alone is a natural starting point. After that, a typical scoped engagement runs 4 to 16 weeks. We don't chase 1-off hours or sub-week gigs; the work we do best needs a bit of room to breathe."},
  {q:"Do you ever do fixed-bid?",a:"Yes, for scoped engagements where the outcome is well-defined: an assessment, an MVP with agreed scope, a migration to a known target. We refuse fixed-bid for exploratory or research-heavy work because it incentivises the wrong things; in those cases we'll propose a time-boxed discovery instead."},
  {q:"How quickly can you start?",a:"Typically 1 to 2 weeks from a signed agreement. If the situation is urgent (an outage, a funding deadline, a critical hire) we can usually mobilise a small senior pair within 3 to 5 business days for triage while we scope the broader engagement."},
  {q:"Do you take equity?",a:"Sometimes, but only inside our startup partnership model, and only when it's genuinely a fit. We look for founders with clear conviction, a real market signal, and a runway challenge we can help solve. Equity never fully replaces cash; it offsets a portion of the fee so both sides share risk and upside."},
  {q:"What happens if we're not the right fit?",a:"We say so. As early as we can see it, and with specifics. The assessment week is built around this: by Friday, if we don't think we're the right partner (or you don't), you walk away with the written brief and no obligation. We'd rather turn down work than burn a reputation on the wrong engagement."},
  {q:"Are you remote, hybrid, or on-site?",a:"Hybrid. We're headquartered in Croatia with a distributed senior team across EU timezones. Most day-to-day work happens remotely through Slack, shared docs, and regular working sessions. For kickoffs, workshops, and key milestones we travel to clients, and we welcome visits to our office."},
];
const weekOne=[
  {d:"Day 1",t:"Kickoff & context",b:"Meet the team, set comms (Slack channel, shared docs, weekly cadence). We walk through your goals, pressures, and the history behind them. No deliverable yet, just listening."},
  {d:"Day 2",t:"Landscape review",b:"We read the code, docs, tickets, and metrics you share. We interview the people closest to the work: engineers, designers, support. We capture everything in a shared brief."},
  {d:"Day 3",t:"Discovery & constraints",b:"Technical audit of the systems in scope. We map architecture, data flows, integrations, and known risks. Business constraints (timeline, budget, team) are made explicit."},
  {d:"Day 4",t:"Synthesis",b:"We separate symptoms from root causes. We draft an initial hypothesis, surface the biggest risks and opportunities, and sketch options with trade-offs."},
  {d:"Day 5",t:"Alignment & roadmap",b:"A 60-minute working session: we present findings, align on priorities, and agree the shape of the engagement from week two forward. You leave with a written brief and a decision-ready plan."},
];

// Press coverage — keep this list as the single source of truth for both the /press page and the schema graph.
// Sorted by date descending (newest first) at module-evaluation time, so every consumer sees the same order.
type PressItem={pub:string,year:string,date:string,headline:string,url:string,caseId?:string,kind:"award"|"acquisition"|"feature"|"launch"|"clinical"};
const pressItems:PressItem[]=(([
  // Noctrix Health — ResMed acquisition + FDA authorisation
  {pub:"MassDevice",year:"2026",date:"2026-01-01",headline:"ResMed enters merger agreement to acquire Noctrix Health for $340M",url:"https://www.massdevice.com/resmed-enters-merger-agreement-to-acquire-noctrix-health-for-340-million/",caseId:"noctrix",kind:"acquisition"},
  {pub:"PRNewswire",year:"2023",date:"2023-04-19",headline:"Noctrix Health announces successful RCT outcomes and FDA marketing authorization for its breakthrough TOMAC therapy",url:"https://www.prnewswire.com/news-releases/noctrix-health-announces-successful-randomized-controlled-trial-rct-outcomes-and-fda-marketing-authorization-for-its-breakthrough-tonic-motor-activation-tomac--restless-legs-syndrome-rls-therapy-301802232.html",caseId:"noctrix",kind:"clinical"},
  // Farmwave — 2025 AI Harvest Vision award
  {pub:"Agribusiness Review Europe",year:"2025",date:"2025-01-01",headline:"AI Harvest Vision Solution of the Year — Farmwave",url:"https://www.agribusinessreview.com/farmwave",caseId:"farmwave",kind:"award"},
  {pub:"Western Producer",year:"2024",date:"2024-09-01",headline:"Cameras and artificial intelligence spot harvest losses",url:"https://www.producer.com/crops/cameras-and-artificial-intelligence-spot-harvest-losses/",caseId:"farmwave",kind:"feature"},
  // Nomo Smart Care — CES 2025 launch + RapidSOS partnership
  {pub:"PRNewswire",year:"2025",date:"2025-01-02",headline:"Nomo Smart Care revolutionizes in-home care with AI-powered safety technology (CES 2025)",url:"https://www.prnewswire.com/news-releases/nomo-smart-care-revolutionizes-in-home-care-with-ai-powered-safety-technology-302339442.html",caseId:"nomo",kind:"launch"},
  {pub:"PRNewswire",year:"2023",date:"2023-10-09",headline:"Nomo Smart Care launches the Essential Care Kit with RapidSOS as their emergency services partner",url:"https://www.prnewswire.com/news-releases/nomo-smart-care-launches-the-essential-care-kit-with-rapidsos-as-their-emergency-services-partner-301950156.html",caseId:"nomo",kind:"launch"},
  {pub:"RapidSOS",year:"2024",date:"2024-01-01",headline:"The real-time safety gap: How Nomo Smart Care protects aging adults",url:"https://rapidsos.com/blog/safety-gap-podcast-how-nomo-protects-aging-adults/",caseId:"nomo",kind:"feature"},
  // Muvr — Exactech acquisition + App Innovation Award
  {pub:"BusinessWire",year:"2020",date:"2020-12-02",headline:"Exactech acquires Muvr — innovative patient wearable and communication solutions for orthopaedic practices",url:"https://www.businesswire.com/news/home/20201202005809/en/Exactech-Acquires-Muvr-Innovative-Patient-Wearable-and-Communication-Solutions-for-Orthopaedic-Practices",caseId:"muvr",kind:"acquisition"},
  {pub:"Progress Software",year:"2019",date:"2019-10-01",headline:"Progress announces winners of 2019 App Innovation Awards — Muvr",url:"https://investors.progress.com/news-releases/news-release-details/progress-announces-winners-2019-app-innovation-awards",caseId:"muvr",kind:"award"},
  // Crossiety — Swiss startup coverage on Startupticker
  {pub:"Startupticker.ch",year:"2020",date:"2020-07-01",headline:"Crossiety spins off its community app — beUnity created to serve associations and clubs",url:"https://www.startupticker.ch/en/news/crossiety-lagert-community-app-aus",caseId:"crossiety",kind:"launch"},
  {pub:"Startupticker.ch",year:"2020",date:"2020-01-01",headline:"Crossiety expands to Germany — Swiss community-platform startup enters the DACH market",url:"https://www.startupticker.ch/en/news/crossiety-expandiert-nach-deutschland",caseId:"crossiety",kind:"feature"},
  {pub:"Startupticker.ch",year:"2018",date:"2018-11-01",headline:"Pascale Bruderer joins IT startup Crossiety as shareholder and board member",url:"https://www.startupticker.ch/en/news/november-2018/pascale-bruderer-steigt-bei-it-startup-ein",caseId:"crossiety",kind:"feature"},
  // beUnity — the third-party coverage of beUnity's creation is the same Startupticker piece (spin-off from Crossiety)
  {pub:"Startupticker.ch",year:"2020",date:"2020-07-01",headline:"beUnity launches as Crossiety's community-platform spin-off for associations and clubs",url:"https://www.startupticker.ch/en/news/crossiety-lagert-community-app-aus",caseId:"beunity",kind:"launch"},
  // Drift App — US ag-tech press
  {pub:"WCIA News",year:"2022",date:"2022-04-01",headline:"From the Farm: Ditch Drift app offers herbicide spraying solution",url:"https://www.wcia.com/the-morning-show/from-the-farm-ditch-drift-app-offers-herbicide-spraying-solution/",caseId:"drift",kind:"feature"},
  {pub:"ILSoyAdvisor",year:"2022",date:"2022-05-01",headline:"Mitigate spray drift damage with Drift App",url:"https://www.ilsoyadvisor.com/on-farm/ilsoyadvisor/mitigate-spray-drift-damage-drift-app",caseId:"drift",kind:"feature"},
]) as PressItem[]).sort((a,b)=>b.date.localeCompare(a.date));
function Services({go}:{go:(p:string)=>void}){const[ex,setEx]=useState(0);const[faqOpen,setFaqOpen]=useState<number|null>(0);return <div>
  <section className="fc-hero" style={{position:"relative",overflow:"hidden",paddingTop:"calc(60px + clamp(40px,6vh,72px))",paddingBottom:"clamp(44px,6vh,68px)",paddingLeft:0,paddingRight:0,background:"#004C73",color:"#fff"}}>
    <div className="hero-grain"/>
    <W style={{position:"relative",zIndex:3}}>
    <div style={{maxWidth:880,textAlign:"left"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <span style={{width:28,height:2,background:"rgba(255,255,255,.3)"}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:3,fontFamily:"var(--jk)"}}>For Clients</span>
      </div>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(34px,5.2vw,60px)",fontWeight:800,lineHeight:1.02,letterSpacing:"-.03em",color:"#fff",marginBottom:22}}>The right technology partner <span style={{color:"#7DB9E8"}}>changes everything.</span></h1>
      <p style={{fontSize:"clamp(16px,1.5vw,19px)",color:"rgba(255,255,255,.72)",lineHeight:1.65,maxWidth:620,margin:"0 0 28px"}}>From a first idea to a product in people's hands, we bring the <em style={{fontStyle:"normal",color:"#fff",fontWeight:600}}>strategy, design, and engineering</em> to make it real — with honest advice at every step.</p>
      <div className="fc-chips" style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:8,flexWrap:"wrap",marginBottom:32}}>
        {[
          {ic:<span style={{color:"#7DB9E8",fontSize:11,letterSpacing:-1}}>★★★★★</span>,t:"5.0 on Clutch"},
          {ic:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7DB9E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3"/><path d="M7 5H4v2a3 3 0 003 3"/></svg>,t:"AI Harvest Vision · 2025"},
          {ic:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7DB9E8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0112 0M16 6.5a3 3 0 010 5.5M21 19a6 6 0 00-4-5.6"/></svg>,t:"20+ partners since 2017"},
        ].map((c,i)=><span key={i} style={{display:"inline-flex",alignItems:"center",gap:7,height:32,padding:"0 14px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.22)",borderRadius:50,backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",fontFamily:"var(--jk)",fontSize:12.5,fontWeight:700,color:"#fff"}}>{c.ic}{c.t}</span>)}
      </div>
      <div className="fc-hero-cta" style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:14,flexWrap:"wrap"}}>
        <a href="https://calendly.com/jurica-lumo-lab/30min" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"var(--blue)",padding:"15px 30px",borderRadius:50,fontFamily:"var(--jk)",fontSize:15,fontWeight:700,textDecoration:"none",border:"none",boxShadow:"0 2px 8px rgba(0,0,0,.18)",transition:"transform .2s, box-shadow .25s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,.28)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.18)";}}>Free discovery call <Arr s={14} c="var(--blue)"/></a>
        <button onClick={()=>go("contact")} style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.08)",color:"#fff",padding:"14px 24px",borderRadius:50,fontFamily:"var(--jk)",fontSize:14,fontWeight:600,border:"1px solid rgba(255,255,255,.24)",cursor:"pointer",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",transition:"background .2s, border-color .2s, transform .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.16)";e.currentTarget.style.borderColor="rgba(255,255,255,.45)";e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.borderColor="rgba(255,255,255,.24)";e.currentTarget.style.transform="";}}>Send us your brief <Arr s={13} c="currentColor"/></button>
      </div>
    </div>
  </W></section>
  <section className="grid-bg" style={{padding:"clamp(48px,7vh,72px) 0 80px"}}><W>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"end",marginBottom:36}} className="svc-2col">
      <div><SL ch="Services in depth"/><h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,38px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.02em",color:"var(--txt)",margin:0}}>Five ways we <span style={{color:"var(--blue)"}}>move you forward.</span></h2></div>
      <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.75,margin:0,maxWidth:420}}>Open any one to see what we deliver and the stack behind it. Most engagements blend two or three.</p>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {svcs.map((s,i)=>{const open=ex===i;return <div key={i} className="sd" onClick={()=>setEx(open?-1:i)} role="button" tabIndex={0} aria-expanded={open} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setEx(open?-1:i);}}}>
        <div className="sd-row" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:24}}>
          <div style={{display:"flex",alignItems:"center",gap:18,minWidth:0}}>
            <span style={{width:3,height:42,borderRadius:3,background:open?"var(--blue)":"var(--brd)",flexShrink:0,transition:"background .3s"}}/>
            <div style={{minWidth:0}}>
              <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.45}}>{s.n}</span><h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(18px,2vw,21px)",fontWeight:800,color:"var(--txt)",margin:0,letterSpacing:"-.01em"}}>{s.t}</h3></div>
              <p style={{fontSize:14,color:"var(--txt2)",fontWeight:500,margin:0}}>{s.hl}</p>
            </div>
          </div>
          <div className="sd-meta" style={{display:"flex",alignItems:"center",gap:18,flexShrink:0}}>
            {!open&&<div className="sd-tag-row sd-tags-collapse" style={{justifyContent:"flex-end",maxWidth:300}}>{s.tech.slice(0,3).map(t=><span key={t} className="ft">{t}</span>)}</div>}
            <span className="sd-plus" style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transform:open?"rotate(45deg)":"none",background:open?"var(--bl)":"transparent"}}><svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2v12M2 8h12"/></svg></span>
          </div>
        </div>
        <div className={open?"sd-body open":"sd-body"} style={{maxHeight:open?520:0,overflow:"hidden",transition:"max-height .4s ease",marginTop:open?22:0}}>
          <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:36}} className="svc-2col">
            <div>
              <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.8,marginBottom:20}}>{s.d}</p>
              <p style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:12,opacity:.5}}>What you get</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 24px"}}>{s.del.map((d,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:9}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M13 4L6 11 3 8"/></svg><span style={{fontSize:13,color:"var(--txt2)"}}>{d}</span></div>)}</div>
            </div>
            <div style={{borderLeft:"1px solid var(--brd)",paddingLeft:36}} className="sd-stack-col">
              <p style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",marginBottom:12,opacity:.5}}>Stack & tools</p>
              <div className="sd-tag-row" style={{marginBottom:22}}>{s.tech.map(t=><span key={t} className="ft">{t}</span>)}</div>
              <button onClick={e=>{e.stopPropagation();go("contact");}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",padding:0,transition:"gap .2s"}} onMouseEnter={e=>e.currentTarget.style.gap="12px"} onMouseLeave={e=>e.currentTarget.style.gap="8px"}>Talk to us about this <Arr s={13} c="currentColor"/></button>
            </div>
          </div>
        </div>
      </div>;})}
    </div>
  </W></section>
  {/* ENGAGEMENT MODELS */}
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
    <div className="svc-2col" style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:64}}>
      <div style={{position:"sticky",top:80,alignSelf:"start"}}><SL ch="Engagement models"/><h2 style={{fontFamily:"var(--jk)",fontSize:28,fontWeight:800,color:"var(--txt)"}}>Flexible ways to <span style={{color:"var(--blue)"}}>work together.</span></h2><p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginTop:14,maxWidth:280}}>No one shape fits every problem. We pick the model that matches your stage, timeline, and risk profile.</p></div>
      <div>{engs.map((e,i)=><div key={i} className="eng-row" style={{padding:"18px 0",borderBottom:i<engs.length-1?"1px solid var(--brd)":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"baseline",gap:12}}><span style={{fontSize:11,color:"var(--blue)",fontWeight:600,fontFamily:"monospace",opacity:.3}}>{String(i+1).padStart(2,"0")}</span><h4 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:600,color:"var(--txt)",margin:0}}>{e.t}</h4></div><span className="ea">→</span></div><p style={{fontSize:13,color:"var(--txt3)",marginTop:4,paddingLeft:32,lineHeight:1.6}}>{e.d}</p></div>)}</div>
    </div>
  </W></section>
  {/* PRICING */}
  <section style={{padding:"80px 0",borderTop:"1px solid var(--brd)"}}><W>
    <div className="svc-2col" style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:64}}>
      <div style={{position:"sticky",top:80,alignSelf:"start"}}>
        <SL ch="Pricing"/>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,3vw,36px)",fontWeight:800,lineHeight:1.1,color:"var(--txt)"}}>Four ways <span style={{color:"var(--blue)"}}>we price.</span></h2>
        <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginTop:14,maxWidth:280}}>We don't sell hours, we sell outcomes. Pricing is transparent and shaped around the type of engagement, not a rate card.</p>
      </div>
      <div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}} className="pricing-grid">
          {pricing.map(p=><div key={p.n} className="card" style={{padding:"28px 28px",display:"flex",flexDirection:"column",gap:12,minHeight:260}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.4}}>{p.n}</span>
              <span style={{fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--txt3)",letterSpacing:1.5,textTransform:"uppercase",background:"var(--bg2)",padding:"4px 10px",borderRadius:20,border:"1px solid var(--brd)"}}>{p.meta}</span>
            </div>
            <h3 style={{fontFamily:"var(--jk)",fontSize:20,fontWeight:800,color:"var(--txt)",lineHeight:1.15}}>{p.t}</h3>
            <p style={{fontSize:13,fontWeight:600,color:"var(--blue)",lineHeight:1.5}}>{p.fit}</p>
            <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7,flex:1}}>{p.d}</p>
            <p style={{fontSize:12,color:"var(--txt4)",lineHeight:1.6,fontStyle:"italic",paddingTop:10,borderTop:"1px solid var(--brd)",marginTop:4}}>{p.cta}</p>
          </div>)}
        </div>
        <div className="pricing-banner" style={{marginTop:24,padding:"22px 26px",border:"1px solid var(--brd)",borderRadius:14,background:"var(--bl)",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div>
            <h3 style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:800,color:"var(--txt)",marginBottom:4}}>Not sure which model fits?</h3>
            <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,maxWidth:520}}>A 30-minute call is often enough for us to recommend the right shape. No pressure, no sales pitch.</p>
          </div>
          <a href="https://calendly.com/jurica-lumo-lab/30min" target="_blank" rel="noopener noreferrer" className="cta-m" style={{flexShrink:0,textDecoration:"none"}}>Free discovery call <Arr s={14} c="#fff"/></a>
        </div>
      </div>
    </div>
  </W></section>
  {/* ENGAGEMENT COMPARISON — table-snippet candidate; helps qualifying clients at a glance */}
  <section style={{padding:"56px 0 80px",borderTop:"1px solid var(--brd)",background:"var(--bg2)"}}><W>
    <SL ch="Compare engagements"/>
    <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,30px)",fontWeight:800,color:"var(--txt)",lineHeight:1.1,marginBottom:14}}>Which model fits your <span style={{color:"var(--blue)"}}>situation?</span></h2>
    <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,maxWidth:560,marginBottom:24}}>A side-by-side at the four ways we work, so you can self-identify before the call.</p>
    <div style={{overflowX:"auto",border:"1px solid var(--brd)",borderRadius:14,background:"var(--bg)"}}>
      <table style={{width:"100%",minWidth:640,borderCollapse:"collapse",fontFamily:"var(--in)",fontSize:13.5,color:"var(--txt2)"}}>
        <thead>
          <tr style={{background:"var(--bg2)",borderBottom:"1px solid var(--brd)"}}>
            <th scope="col" style={{textAlign:"left",padding:"14px 18px",fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Model</th>
            <th scope="col" style={{textAlign:"left",padding:"14px 18px",fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Duration</th>
            <th scope="col" style={{textAlign:"left",padding:"14px 18px",fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Pricing</th>
            <th scope="col" style={{textAlign:"left",padding:"14px 18px",fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase"}}>Best for</th>
          </tr>
        </thead>
        <tbody>
          {[
            {m:"Advisory retainer",d:"Monthly, ongoing",p:"Fixed monthly fee",b:"Founders / CTOs who need a thinking partner on tap"},
            {m:"Defined engagement",d:"2–16 weeks",p:"Fixed fee, scoped",b:"Well-defined problem, measurable outcome"},
            {m:"Embedded team",d:"3-month minimum, rolling",p:"Monthly capacity",b:"Long-running product work where velocity matters"},
            {m:"Startup partnership",d:"Custom",p:"Cash + equity / milestones",b:"Seed-stage founders with conviction and runway constraints"},
          ].map((r,i)=>(<tr key={r.m} style={{borderTop:i>0?"1px solid var(--brd)":"none"}}>
            <th scope="row" style={{textAlign:"left",padding:"16px 18px",fontFamily:"var(--jk)",fontWeight:700,color:"var(--txt)"}}>{r.m}</th>
            <td style={{padding:"16px 18px"}}>{r.d}</td>
            <td style={{padding:"16px 18px"}}>{r.p}</td>
            <td style={{padding:"16px 18px"}}>{r.b}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  </W></section>
  {/* FAQ */}
  <section style={{padding:"80px 0",borderTop:"1px solid var(--brd)"}}><W>
    <div className="svc-2col" style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:64}}>
      <div style={{position:"sticky",top:80,alignSelf:"start"}}>
        <SL ch="FAQ"/>
        <h2 style={{fontFamily:"var(--jk)",fontSize:28,fontWeight:800,color:"var(--txt)",lineHeight:1.1}}>Questions that <span style={{color:"var(--blue)"}}>usually come up.</span></h2>
        <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginTop:14,maxWidth:280}}>Straight answers to the things people ask before signing: pricing, equity, timelines, and what happens if we're not a fit.</p>
      </div>
      <div>
        {faqs.map((f,i)=>{const open=faqOpen===i;return <div key={i} style={{borderBottom:i<faqs.length-1?"1px solid var(--brd)":"none"}}>
          <button onClick={()=>setFaqOpen(open?null:i)} aria-expanded={open} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,padding:"22px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
            <h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",lineHeight:1.4,margin:0}}>{f.q}</h3>
            <span aria-hidden="true" style={{width:28,height:28,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"transform .25s ease, background .25s ease",transform:open?"rotate(45deg)":"none",background:open?"var(--bl)":"#fff"}}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round"><path d="M8 2v12M2 8h12"/></svg>
            </span>
          </button>
          <div style={{overflow:"hidden",maxHeight:open?440:0,opacity:open?1:0,transition:"max-height .3s ease, opacity .25s ease, padding .3s ease",paddingBottom:open?22:0}}>
            <p className="speakable-answer" style={{fontSize:14,color:"var(--txt2)",lineHeight:1.8,maxWidth:680,margin:0}}>{f.a}</p>
          </div>
        </div>;})}
      </div>
    </div>
  </W></section>
  {/* WEEK ONE */}
  <section style={{padding:"80px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
    <div className="svc-2col" style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:64}}>
      <div style={{position:"sticky",top:80,alignSelf:"start"}}>
        <SL ch="Week one"/>
        <h2 style={{fontFamily:"var(--jk)",fontSize:28,fontWeight:800,color:"var(--txt)",lineHeight:1.1}}>What the first <span style={{color:"var(--blue)"}}>five days</span> look like.</h2>
        <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginTop:14,maxWidth:280}}>Every engagement starts with a structured assessment week. By Friday, you have a written brief and a decision-ready plan, not a pitch deck.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
        {weekOne.map((w,i)=><div key={i} className="week-row" style={{display:"grid",gridTemplateColumns:"80px 40px 1fr",gap:20,padding:"24px 0",borderBottom:i<weekOne.length-1?"1px solid var(--brd)":"none",alignItems:"flex-start"}}>
          <span style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--blue)",letterSpacing:1,textTransform:"uppercase",opacity:.6,paddingTop:6}}>{w.d}</span>
          <div className="week-dot" style={{display:"flex",flexDirection:"column",alignItems:"center",alignSelf:"stretch"}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"var(--blue)",marginTop:8,flexShrink:0}}/>
            {i<weekOne.length-1&&<div style={{width:1,flex:1,background:"var(--brd)",marginTop:6}}/>}
          </div>
          <div>
            <h3 style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:700,color:"var(--txt)",marginBottom:6}}>{w.t}</h3>
            <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.75}}>{w.b}</p>
          </div>
        </div>)}
        <div style={{marginTop:24,padding:"20px 24px",border:"1px solid var(--brd)",borderRadius:12,background:"#fff",display:"flex",gap:14,alignItems:"flex-start"}} className="content-card-white">
          <div style={{width:36,height:36,borderRadius:"50%",background:"var(--bl)",color:"var(--blue)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          </div>
          <div>
            <h3 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:800,color:"var(--txt)",marginBottom:4}}>No-commitment assessment</h3>
            <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7}}>If, after week one, we don't think we're the right fit (or you don't), we say so. The brief is yours to keep either way.</p>
          </div>
        </div>
      </div>
    </div>
  </W></section>
  {/* BOTTOM CTA */}
  <section style={{padding:"64px 0",borderTop:"1px solid var(--brd)"}}><W>
    <div style={{textAlign:"center",maxWidth:560,margin:"0 auto"}}>
      <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,30px)",fontWeight:800,color:"var(--txt)",marginBottom:12,lineHeight:1.15}}>Ready to start with <span style={{color:"var(--blue)"}}>a clear plan?</span></h2>
      <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginBottom:22}}>Tell us about your situation. We'll respond within one business day with next steps.</p>
      <button onClick={()=>go("contact")} className="cta-m">Let's talk <Arr s={14} c="#fff"/></button>
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
      {(c as any).headerImg&&<img alt={`${c.name}, ${c.cat} case study`} loading="lazy" decoding="async" width={1280} height={720} src={c.id==="nomo"?(process.env.PUBLIC_URL+"/images/nomo_header_1.png"):c.id==="farmwave"?(process.env.PUBLIC_URL+"/images/farmwave_tablet.jpeg"):(c as any).headerImg} style={{width:"100%",height:"110%",objectFit:"cover",display:"block",transform:"translateY(5%)"}}/>}
    </div>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)"}}/>
    <div style={{position:"absolute",top:28,left:32}}>
      <span className="reveal d1" style={{fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2.5,background:"rgba(255,255,255,.12)",padding:"5px 12px",borderRadius:6,backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.15)",display:"inline-block"}}>{c.cat}</span>
    </div>
    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px"}}>
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
      {(c as any).headerImg&&<picture>
        {(c as any).cardImgMobile&&<source media="(max-width: 900px)" srcSet={(c as any).cardImgMobile}/>}
        <img alt={`${c.name}, ${c.cat} case study`} loading="lazy" decoding="async" width={640} height={400} src={(c as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
      </picture>}
    </div>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)"}}/>
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
  const acIdx=ac?cases.findIndex(c=>c.id===ac.id):-1;
  const[lbImg,setLbImg]=useState<{src:string,alt:string,caption?:string}|null>(null);
  const[parallaxY,setParallaxY]=useState(0);
  const metricsRef=useRef<HTMLDivElement>(null);
  // Hero parallax: cover image moves slower than scroll
  useEffect(()=>{
    if(!ac)return;
    const onScroll=()=>{const y=window.scrollY;if(y<800)setParallaxY(y*0.25);};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[ac]);
  // Stagger reveal for metric cells
  useEffect(()=>{
    if(!ac)return;
    const el=metricsRef.current;if(!el)return;
    const obs=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        Array.from(el.querySelectorAll('.metric-cell')).forEach((n,i)=>{(n as HTMLElement).style.transitionDelay=`${i*80}ms`;n.classList.add('in');});
        obs.disconnect();
      }
    },{threshold:0.2});
    obs.observe(el);
    return()=>obs.disconnect();
  },[ac]);
  if(ac)return <div style={{paddingTop:60,...({"--case-accent":(ac.cover.match(/#[0-9a-fA-F]{6}/g)?.slice(-1)[0]||"#4ECDC4")} as CSSProperties)}}>
    <ReadingProgress/>
    {/* Cover */}
    <div className="case-cover" style={{background:ac.cover,position:"relative",overflow:"hidden",minHeight:120,maxHeight:700,isolation:"isolate"}}>
      {(ac as any).headerImg
        ? <picture>
            {(ac as any).coverImgMobile&&<source media="(max-width: 900px)" srcSet={(ac as any).coverImgMobile}/>}
            <img className="case-cover-img" alt={`${ac.name}, ${ac.cat} case study`} fetchPriority="high" decoding="async" width={2400} height={1260} src={(ac as any).coverImg||(ac as any).headerImg} style={{width:"100%",height:"auto",maxHeight:700,objectFit:"cover",objectPosition:"center",display:"block",transform:`translate3d(0,${parallaxY}px,0)`,willChange:"transform"}}/>
          </picture>
        : <div style={{position:"absolute",inset:0,background:"var(--blue)"}}/>
      }
      <W className="case-cover-title" style={{position:"absolute",bottom:0,left:0,right:0,paddingBottom:52,zIndex:2,textShadow:"0 1px 2px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.55), 0 6px 24px rgba(0,0,0,.45)"}}>
        <span style={{display:"block",fontSize:11,color:"rgba(255,255,255,.55)",fontWeight:700,fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:2}}>{ac.cat} <span style={{opacity:.5,marginLeft:8}}>· Case {String(acIdx+1).padStart(2,"0")} / {String(cases.length).padStart(2,"0")}</span></span>
        <h1 className="case-cover-h1" style={{fontFamily:"var(--jk)",fontSize:"clamp(24px,4vw,44px)",fontWeight:800,color:"#fff",marginTop:8,lineHeight:1.05}}>{ac.name}</h1>
      </W>
    </div>
    <section style={{padding:"0 0 80px"}}><W>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <div id="brief" style={{transform:"translateY(-44px)",marginBottom:-16,background:"#fff",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 24px rgba(0,30,50,.06)",border:"1px solid var(--brd)"}}>
<p className="speakable-brief" style={{fontSize:15,color:"var(--txt3)",lineHeight:1.7,marginBottom:16}}>{ac.brief}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{ac.tags.map(t=><span key={t} className="ft">{t}</span>)}</div>
        </div>
        {/* Metrics strip */}
        {(ac as any).metrics?.length>0&&<div ref={metricsRef} className="case-metrics" style={{display:"flex",flexWrap:"wrap",gap:0,marginTop:-4,marginBottom:4,borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",background:"var(--bg2)",borderRadius:12,alignItems:"stretch"}}>
          {(ac as any).metrics.map((m:any,i:number,a:any[])=><div key={i} className="metric-cell" style={{flex:"1 1 140px",minWidth:120,padding:"18px 16px",borderRight:i<a.length-1?"1px solid var(--brd)":"none",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}>
            <div style={{fontFamily:"var(--jk)",fontSize:"clamp(16px,1.9vw,22px)",fontWeight:800,color:"var(--blue)",lineHeight:1.15,letterSpacing:-.2,minHeight:"2.3em",display:"flex",alignItems:"flex-end",justifyContent:"center"}}><MetricVal v={m.v} delay={i*80}/></div>
            <div style={{fontSize:11,color:"var(--txt3)",fontWeight:500,letterSpacing:.2,lineHeight:1.35,minHeight:"2.7em",display:"flex",alignItems:"flex-start",justifyContent:"center"}}>{m.l}</div>
          </div>)}
        </div>}
        {/* Client meta */}
        {(ac as any).client&&(()=>{const lblStyle:CSSProperties={fontFamily:"var(--jk)",fontSize:10,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:6,lineHeight:1.2,height:14};const valTextStyle:CSSProperties={fontSize:13,fontWeight:600,color:"var(--txt2)",lineHeight:1.4,margin:0};const valLinkStyle:CSSProperties={fontSize:13,fontWeight:600,color:"var(--blue)",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:5,lineHeight:1.4,transition:"gap .2s,opacity .2s"};return <div style={{display:"flex",flexWrap:"wrap",gap:24,padding:"8px 0 24px",alignItems:"flex-start"}}>
          {[{l:"Client",v:(ac as any).client},{l:"Website",v:(ac as any).website}].filter(r=>r.v).map((r,i)=><div key={i} style={{display:"flex",flexDirection:"column"}}><p style={lblStyle}>{r.l}</p>{r.l==="Website"?<a href={r.v.startsWith("http")?r.v:`https://${r.v}`} target="_blank" rel="noopener noreferrer" style={valLinkStyle} onMouseEnter={e=>{e.currentTarget.style.gap="8px";e.currentTarget.style.opacity=".75";}} onMouseLeave={e=>{e.currentTarget.style.gap="5px";e.currentTarget.style.opacity="1";}}>{r.v} <Arr s={10} c="var(--blue)"/></a>:<p style={valTextStyle}>{r.v}</p>}</div>)}
          {((ac as any).press||[]).map((p:{l:string,u:string},i:number)=><div key={`press-${i}`} style={{display:"flex",flexDirection:"column"}}><p style={lblStyle}>Recognition</p><a href={p.u} target="_blank" rel="noopener noreferrer" style={valLinkStyle} onMouseEnter={e=>{e.currentTarget.style.gap="8px";e.currentTarget.style.opacity=".75";}} onMouseLeave={e=>{e.currentTarget.style.gap="5px";e.currentTarget.style.opacity="1";}}>{p.l} <Arr s={10} c="var(--blue)"/></a></div>)}
        </div>;})()}
        {/* Challenge / Approach / Outcome */}
        {[{id:"challenge",l:"The Challenge",t:ac.ch},{id:"approach",l:"Our Approach",t:ac.ap},{id:"outcome",l:"The Outcome",t:ac.re}].map((s,i)=><div id={s.id} key={i} className="case-section" style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:32,padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          <div><span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,opacity:.55}}>{String(i+1).padStart(2,"0")} / {s.l.split(" ").pop()?.toUpperCase()}</span><h3 style={{fontFamily:"var(--jk)",fontSize:18,fontWeight:800,marginTop:6,color:"var(--txt)"}}>{s.l}</h3></div>
          <div className="case-section-body"><p style={{fontSize:15,color:"var(--txt2)",lineHeight:1.8}}>{s.t}</p></div>
        </div>)}
        {/* Key features */}
        {(ac as any).features?.length>0&&<div id="features" style={{padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:20}}>Key Features</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {(ac as any).features.map((f:any,i:number)=><div key={i} className="card" style={{padding:"18px 20px"}}>
              <h4 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",marginBottom:6}}>{f.t}</h4>
              <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6}}>{f.d}</p>
            </div>)}
          </div>
        </div>}
        {/* Why this stack */}
        {(ac as any).why?.length>0&&<div id="why" style={{padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:6}}>Why this stack</p>
          <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.6,marginBottom:22,fontStyle:"italic"}}>The thinking behind the technical decisions.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}} className="why-grid">
            {(ac as any).why.map((w:any,i:number)=><div key={i} className="card why-card" style={{padding:"20px 22px"}}>
              <h4 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",marginBottom:8,display:"flex",alignItems:"flex-start",gap:8,lineHeight:1.35}}>
                <span style={{color:"var(--blue)",fontWeight:800,flexShrink:0,display:"inline-block"}}>→</span><span>{w.t}</span>
              </h4>
              <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7}}>{w.d}</p>
            </div>)}
          </div>
        </div>}
        {/* Tech + Services */}
        <div id="tech" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,padding:"32px 0",borderTop:"1px solid var(--brd)"}}>
          {(()=>{const stack=(ac as any).stack as {g:string,i:string[]}[]|undefined;const flat=(ac as any).tech as string[]|undefined;if(stack?.length)return <div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:14}}>Technologies</p><div style={{display:"flex",flexDirection:"column",gap:13}}>{stack.map((s,i)=><div key={i}><p style={{fontSize:10,fontWeight:700,color:"var(--txt4)",textTransform:"uppercase",letterSpacing:1.4,marginBottom:5,opacity:.85}}>{s.g}</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{s.i.map(x=><span key={x} className="ft">{x}</span>)}</div></div>)}</div></div>;if(flat?.length)return <div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:12}}>Technologies</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{flat.map(t=><span key={t} className="ft">{t}</span>)}</div></div>;return null;})()}
          {(ac as any).services?.length>0&&<div><p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:12}}>Services</p>{(ac as any).services.map((s:string,i:number)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:4,height:4,borderRadius:"50%",background:"var(--blue)",opacity:.3}}/><span style={{fontSize:13,color:"var(--txt2)"}}>{s}</span></div>)}</div>}
        </div>
        {/* Pull quote */}
        {ac.q&&<div id="quote" style={{margin:"24px 0 8px",padding:"56px 24px",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",background:"var(--bg2)",position:"relative",textAlign:"center"}}>
          <span aria-hidden="true" style={{position:"absolute",top:14,left:"50%",transform:"translateX(-50%)",fontFamily:"Georgia,serif",fontSize:96,lineHeight:1,color:"var(--blue)",opacity:.12,fontWeight:700}}>“</span>
          <blockquote style={{fontFamily:"var(--jk)",fontSize:"clamp(20px,2.6vw,26px)",fontWeight:600,lineHeight:1.4,color:"var(--txt)",fontStyle:"italic",margin:"0 auto",maxWidth:680,position:"relative",zIndex:1}}>{ac.q}</blockquote>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginTop:24}}>
            <div style={{width:32,height:1,background:"var(--blue)",opacity:.3}}/>
            <p style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt)",margin:0}}>{ac.qn}</p>
            <span style={{fontSize:12,color:"var(--txt3)"}}>·</span>
            <p style={{fontSize:12,color:"var(--txt3)",margin:0}}>{ac.qr}</p>
          </div>
        </div>}
      </div>
      {/* In action: product imagery */}
      {(()=>{const imgs=caseShowcase[ac.id];if(!imgs||!imgs.length)return null;const cols=imgs.length===1?"1fr":(imgs.length===2||imgs.length===4)?"1fr 1fr":"1fr 1fr 1fr";const maxW=imgs.length===1?1100:imgs.length===2?760:1100;const aspect=imgs.length===1?"16/6":"3/2";return <div id="in-action" style={{marginTop:56,paddingTop:40,borderTop:"1px solid var(--brd)"}}>
        <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:2,textTransform:"uppercase",opacity:.4,marginBottom:8,textAlign:"center"}}>In action</p>
        <h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(20px,2.4vw,28px)",fontWeight:800,color:"var(--txt)",lineHeight:1.15,marginBottom:28,textAlign:"center"}}>What {ac.name} looks like.</h3>
        <div className="case-gallery" style={{display:"grid",gridTemplateColumns:cols,gap:18,maxWidth:maxW,margin:"0 auto"}}>
          {imgs.map((im,i)=><figure key={i} className="case-frame" tabIndex={0} role="button" aria-label={`Open ${im.alt}`} onClick={()=>setLbImg(im)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setLbImg(im);}}} style={{margin:0,borderRadius:16,overflow:"hidden",background:"#fff",border:"1px solid var(--brd)",boxShadow:"0 1px 2px rgba(0,30,50,.04), 0 12px 32px rgba(0,30,50,.06)",display:"flex",flexDirection:"column",transition:"transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 4px 8px rgba(0,30,50,.06), 0 22px 48px rgba(0,30,50,.13)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 2px rgba(0,30,50,.04), 0 12px 32px rgba(0,30,50,.06)";}}>
            <div style={{background:"#fff",borderBottom:im.caption?"1px solid var(--brd)":"none",overflow:"hidden",aspectRatio:aspect,position:"relative",padding:(im as any).fit==="cover"?0:14}}>
              <img src={im.src} alt={im.alt} loading="lazy" decoding="async" width={1200} height={800} style={{display:"block",width:"100%",height:"100%",objectFit:(im as any).fit==="cover"?"cover":"contain",objectPosition:"center"}}/>
            </div>
            {im.caption&&<figcaption style={{padding:"18px 22px 22px",fontSize:13,color:"var(--txt2)",lineHeight:1.6,background:"#fff",fontWeight:500,minHeight:96,display:"flex",alignItems:"flex-start"}}>{im.caption}</figcaption>}
          </figure>)}
        </div>
      </div>;})()}
    </W></section>
    <Lightbox img={lbImg} onClose={()=>setLbImg(null)}/>
    {/* Related projects */}
    {(()=>{const picks=cases.filter(c=>c.id!==ac.id&&c.cat===ac.cat).slice(0,2);if(!picks.length)return null;return <section style={{padding:"64px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
      <SL ch="More work"/>
      <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,30px)",fontWeight:800,color:"var(--txt)",lineHeight:1.1,marginBottom:32}}>Other projects from our practice.</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {picks.map(c=><CaseGridCard key={c.id} c={c} go={go}/>)}
      </div>
    </W></section>;})()}
    {/* Case CTA */}
    <section style={{padding:"72px 0",background:"var(--blue)",color:"#fff"}}><W>
      <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(26px,3vw,36px)",fontWeight:800,lineHeight:1.15,marginBottom:14,color:"#fff"}}>Have a similar challenge?</h2>
        <p style={{fontSize:16,lineHeight:1.7,opacity:.85,marginBottom:32}}>Tell us about it. We'll set up a short call, listen to the context, and send a written brief on where to start. No commitment.</p>
        <button onClick={()=>go("contact")} style={{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"var(--blue)",border:"none",padding:"14px 28px",borderRadius:8,fontFamily:"var(--jk)",fontSize:14,fontWeight:700,cursor:"pointer",transition:"transform .2s,box-shadow .2s",boxShadow:"0 2px 8px rgba(0,0,0,.15)"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,.22)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.15)";}}>Start a conversation <Arr s={14} c="var(--blue)"/></button>
      </div>
    </W></section>
  </div>;
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 80px"}}><W>
    <SL ch="Case Studies"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Real challenges. <span style={{color:"var(--blue)"}}>Real outcomes.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:460,marginBottom:36}}>We've advised clients across healthcare, agriculture, fintech, and beyond.</p>
    <div style={{display:"flex",gap:6,marginBottom:40,flexWrap:"wrap"}}>{catList.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    {fil.length>0&&<>
      {/* Desktop layout: featured hero + grid of the rest */}
      <div className="work-hero-wrap">
        <CaseHeroCard c={fil[0]} go={go}/>
        {fil.length>1&&<div className="work-grid-d" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {fil.slice(1).map(c=><CaseGridCard key={c.id} c={c} go={go}/>)}
        </div>}
      </div>
      {/* Mobile layout: every case as a grid card, no oversized hero */}
      <div className="work-grid-m" style={{display:"none"}}>
        {fil.map(c=><CaseGridCard key={`m-${c.id}`} c={c} go={go}/>)}
      </div>
    </>}
  </W></section></div>;
}

/* ── BLOG ── */
const blogSlug=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
function Blog({go,sel}:{go:(p:string,id?:string)=>void,sel:string|null}){const[filt,setFilt]=useState("All");const[copied,setCopied]=useState(false);const[activeId,setActiveId]=useState("");const fil=filt==="All"?blogs:blogs.filter(p=>p.cat===filt);const ac=sel?blogs.find(p=>p.id===sel):null;
  useEffect(()=>{
    if(!ac)return;
    const ids=ac.body.filter(b=>b.type==="heading").map(b=>blogSlug((b as {content:string}).content));
    const els=ids.map(id=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if(!els.length)return;
    const obs=new IntersectionObserver((entries)=>{
      const vis=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(vis.length)setActiveId((vis[0].target as HTMLElement).id);
    },{rootMargin:"-90px 0px -68% 0px"});
    els.forEach(e=>obs.observe(e));
    return()=>obs.disconnect();
  },[ac]);
  if(ac){
    const slugify=blogSlug;
    const headings=ac.body.filter(b=>b.type==="heading").map(b=>({text:(b as {content:string}).content,id:slugify((b as {content:string}).content)}));
    const related=[...blogs.filter(b=>b.id!==ac.id&&b.cat===ac.cat),...blogs.filter(b=>b.id!==ac.id&&b.cat!==ac.cat)].slice(0,3);
    const copyLink=()=>{try{navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{}};
    const shareUrl=typeof window!=="undefined"?window.location.href:"";
    const firstText=ac.body.findIndex(b=>b.type==="text");
    const art=(ac as any).accent;
    return <div style={{paddingTop:76,...(art?{["--art" as any]:art}:{})}}>
    <ReadingProgress/>
    <section style={{padding:"40px 0 80px"}}><W>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        {/* Back */}
        <div style={{marginBottom:24}}>
          <Back go={()=>go("blog")} to="" label="All articles"/>
        </div>
        {/* Body grid: sticky ToC + article */}
        <div className="blog-body-grid">
          <aside className="blog-toc">
            {/* Meta */}
            <div style={{marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
                <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:600,color:"var(--txt2)",whiteSpace:"nowrap"}}>{ac.date}</span>
                <span aria-hidden="true" style={{width:1,height:14,background:"var(--art, var(--teal))",flexShrink:0}}/>
                <span style={{fontFamily:"var(--jk)",fontSize:11.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--art, var(--blue))",whiteSpace:"nowrap"}}>{ac.cat}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:600,color:"var(--txt2)"}}>{ac.author}</span>
                <span aria-hidden="true" style={{width:1,height:14,background:"var(--art, var(--teal))"}}/>
                <span style={{fontFamily:"var(--in)",fontSize:13,color:"var(--txt3)"}}>{ac.read} read</span>
              </div>
            </div>
            <ArticleProgress/>
            {/* Share */}
            <div style={{display:"flex",alignItems:"center",gap:10,margin:"24px 0 44px"}}>
              <a href={"https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="blog-share-ico" style={{width:36,height:36,minWidth:36,flexShrink:0,borderRadius:"50%",border:"1px solid var(--brd)",background:"var(--bg2)",color:"var(--txt3)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="blog-share-ico" style={{width:36,height:36,minWidth:36,flexShrink:0,borderRadius:"50%",border:"1px solid var(--brd)",background:"var(--bg2)",color:"var(--txt3)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <button onClick={copyLink} aria-label="Copy link" className="blog-share-ico" style={{width:36,height:36,minWidth:36,flexShrink:0,borderRadius:"50%",border:"1px solid var(--brd)",background:"var(--bg2)",cursor:"pointer",color:copied?"var(--blue)":"var(--txt3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {copied
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
              </button>
            </div>
            {/* Contents */}
            {headings.length>0&&<div className="toc-contents">
              <p style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:800,color:"var(--txt)",marginBottom:22}}>Contents</p>
              <nav style={{display:"flex",flexDirection:"column",gap:19}}>
                {headings.map(h=>{const on=activeId===h.id;return <button key={h.id} onClick={()=>{const el=document.getElementById(h.id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}} className="toc-link" style={{textAlign:"left",background:"none",border:"none",padding:0,fontFamily:"var(--in)",fontSize:14,color:on?"var(--art, var(--blue))":"var(--txt2)",fontWeight:on?600:400,cursor:"pointer",lineHeight:1.4,transition:"color .2s"}}>{h.text}</button>;})}
              </nav>
            </div>}
          </aside>
          <article style={{minWidth:0,maxWidth:740}}>
            <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,3.6vw,42px)",fontWeight:800,color:"var(--txt)",marginTop:-6,marginBottom:24,lineHeight:1.1,letterSpacing:"-0.025em"}}>{ac.title}</h1>
            <p style={{fontSize:"clamp(18px,2vw,20px)",color:"var(--txt2)",lineHeight:1.7,fontWeight:500,marginBottom:40,paddingBottom:36,borderBottom:"1px solid var(--brd)"}}>{ac.excerpt}</p>
            {ac.body.map((block:BlogBlock,i:number)=>{
              if(block.type==="img")return <figure key={i} style={{margin:"26px 0"}}>
                <img src={block.src} alt={block.caption||""} loading="lazy" decoding="async" style={{width:"100%",borderRadius:12,display:"block"}}/>
                {block.caption&&<figcaption style={{fontSize:12,color:"var(--txt4)",textAlign:"center",marginTop:8}}>{block.caption}</figcaption>}
              </figure>;
              if(block.type==="heading")return <div key={i} id={slugify(block.content)} style={{scrollMarginTop:100,marginTop:56,marginBottom:18}}>
                <span aria-hidden="true" style={{display:"block",width:40,height:3,borderRadius:2,background:"linear-gradient(90deg, var(--art, var(--blue)), var(--art, var(--accent)))",marginBottom:16}}/>
                <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(21px,2.5vw,27px)",fontWeight:800,color:"var(--txt)",lineHeight:1.2,letterSpacing:"-0.01em",margin:0}}>{block.content}</h2>
              </div>;
              if(block.type==="code")return <pre key={i} style={{margin:"18px 0",padding:"18px 20px",background:"#0f1c24",color:"#e6edf3",borderRadius:10,fontSize:12.5,lineHeight:1.6,overflowX:"auto",fontFamily:"ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace",border:"1px solid rgba(255,255,255,.06)"}}><code>{block.content}</code></pre>;
              if(block.type==="quote")return <blockquote key={i} style={{margin:"36px 0",padding:"22px 26px",borderLeft:"3px solid var(--art, var(--blue))",background:"color-mix(in srgb, var(--art, var(--blue)) 8%, transparent)",borderRadius:"0 12px 12px 0",fontFamily:"var(--jk)",fontSize:"clamp(18px,2.3vw,23px)",fontWeight:600,color:"var(--txt)",lineHeight:1.5,letterSpacing:"-0.01em"}}>{renderRichText(block.content)}</blockquote>;
              if(block.type==="list")return <ul key={i} className="blog-list" style={{paddingLeft:24,marginBottom:24,fontSize:16.5,color:"var(--txt2)",lineHeight:1.9}}>{block.items.map((it,j)=><li key={j} style={{marginBottom:10}}>{renderRichText(it)}</li>)}</ul>;
              return <p key={i} style={{fontSize:16.5,color:"var(--txt2)",lineHeight:1.9,marginBottom:24}}>{renderRichText(block.content)}</p>;
            })}
            {/* Author bio */}
            <div style={{marginTop:48,paddingTop:30,borderTop:"1px solid var(--brd)",display:"flex",gap:16,alignItems:"center"}}>
              <img src={ac.authorImg||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={ac.author} loading="lazy" decoding="async" width={56} height={56} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",objectPosition:"top",flexShrink:0}}/>
              <div>
                <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"var(--txt4)",marginBottom:5}}>Written by</p>
                <p style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:800,color:"var(--txt)",lineHeight:1.1}}>{ac.author}</p>
                <p style={{fontFamily:"var(--in)",fontSize:13.5,color:"var(--txt3)",lineHeight:1.6,marginTop:5,maxWidth:460}}>Part of the team at Lumo Lab, a technology consultancy that advises, guides, and delivers across AI, IoT, and product engineering.</p>
              </div>
            </div>
          </article>
        </div>
        {/* End CTA */}
        <div style={{marginTop:72,background:"var(--blue)",borderRadius:20,padding:"clamp(28px,5vw,44px)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:20}}>
          <div>
            <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)",marginBottom:10}}>Have a similar challenge?</p>
            <h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,3vw,30px)",fontWeight:800,color:"#fff",lineHeight:1.15,letterSpacing:"-0.02em",margin:0}}>Let's build it together.</h3>
          </div>
          <button onClick={()=>go("contact")} className="blog-cta-btn" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"var(--blue)",border:"none",borderRadius:50,padding:"13px 24px",fontFamily:"var(--jk)",fontSize:14.5,fontWeight:700,cursor:"pointer",flexShrink:0}}>Book a discovery call<Arr s={15} c="var(--blue)"/></button>
        </div>
        {/* Keep reading */}
        {related.length>0&&<div style={{marginTop:72,borderTop:"1px solid var(--brd)",paddingTop:52}}>
          <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(20px,2.6vw,26px)",fontWeight:800,color:"var(--txt)",marginBottom:6}}>Keep reading</h2>
          <p style={{fontSize:14,color:"var(--txt3)",marginBottom:28}}>Similar articles for further insights.</p>
          <div className="blog-related-grid">
            {related.map(p=><div key={p.id} onClick={()=>go("blog",p.id)} className="blog-rel-card" style={{cursor:"pointer",display:"flex",flexDirection:"column",borderRadius:12,overflow:"hidden",border:"1px solid var(--brd)",background:"var(--bg)"}}>
              <div style={{height:150,background:p.cover,overflow:"hidden"}}>{(p as any).headerImg?<img src={(p as any).headerImg} alt={p.title} loading="lazy" decoding="async" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>:null}</div>
              <div style={{padding:"16px 18px 20px",display:"flex",flexDirection:"column",flex:1}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}><span className="ft">{p.cat}</span><span style={{fontSize:11,color:"var(--txt4)"}}>{p.read} read</span></div>
                <p style={{fontFamily:"var(--jk)",fontSize:15,fontWeight:700,color:"var(--txt)",lineHeight:1.3,marginBottom:8}}>{p.title}</p>
                <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.excerpt}</p>
              </div>
            </div>)}
          </div>
        </div>}
      </div>
    </W></section>
  </div>;
  }
  return <div style={{paddingTop:76}}><section style={{padding:"48px 0 48px"}}><W>
    <SL ch="Blog"/>
    <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Insights on technology <span style={{color:"var(--blue)"}}>strategy.</span></h1>
    <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:440,marginBottom:36}}>Perspectives from our practice.</p>
    <div style={{display:"flex",gap:6,marginBottom:40}}>{blogCats.map(c=><button key={c} className={`fb${filt===c?" active":""}`} onClick={()=>setFilt(c)}>{c}</button>)}</div>
    <div style={{display:"flex",flexDirection:"column"}}>
      {fil.map(p=><div key={p.id} className="er" onClick={()=>go("blog",p.id)} style={{cursor:"pointer",display:"flex",gap:32,alignItems:"flex-start"}}>
        <div style={{width:320,flexShrink:0,height:210,borderRadius:12,overflow:"hidden",background:p.cover}}>
          {(p as any).headerImg
            ? <img alt={p.title} loading="lazy" decoding="async" width={640} height={400} src={(p as any).headerImg} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            : <div style={{width:"100%",height:"100%",background:"var(--blue)"}}/>
          }
        </div>
        <div style={{flex:1,minWidth:0,paddingTop:4}}>
          <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}><span className="ft">{p.cat}</span><span style={{fontSize:11,color:"var(--txt4)"}}>{p.date} · {p.read} read</span></div>
          <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:800,color:"var(--txt)",marginBottom:10,lineHeight:1.15}}>{p.title}</h3>
          <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,marginBottom:16}}>{p.excerpt}</p>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src={p.authorImg||(process.env.PUBLIC_URL + "/images/default_user.png")} alt={p.author} loading="lazy" decoding="async" width={26} height={26} onError={(e)=>{(e.target as HTMLImageElement).src=process.env.PUBLIC_URL + "/images/default_user.png";}} style={{width:26,height:26,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/>
            <span style={{fontSize:13,color:"var(--txt2)",fontWeight:700}}>{p.author}</span>
          </div>
        </div>
      </div>)}
    </div>
  </W></section>
  </div>;
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
    <button onClick={()=>go("contact","job")} className="cta-m" style={{marginTop:32}}>Apply <Arr s={14} c="#fff"/></button>
  </W></section></div>;
  return <div style={{paddingTop:76}}>
    <section style={{padding:"48px 0 48px"}}><W><SL ch="Careers"/>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"var(--txt)",marginBottom:16}}>Join a team where <span style={{color:"var(--blue)"}}>great work happens.</span></h1>
      <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:460}}>Small, senior team. Meaningful challenges. No bureaucracy.</p>
    </W></section>
    <section style={{borderTop:"1px solid var(--brd)",padding:"56px 0",background:"var(--bg2)"}}><W>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>{perks.map((p,i)=><div key={i} className="card" style={{padding:"20px 18px"}}><div style={{width:40,height:40,borderRadius:10,background:"var(--bl)",color:"var(--blue)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><PerkIcon k={p.i}/></div><h3 style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",marginBottom:4}}>{p.t}</h3><p style={{fontSize:12,color:"var(--txt3)",lineHeight:1.6}}>{p.d}</p></div>)}</div>
    </W></section>
    <section style={{padding:"64px 0"}}><W><SL ch="Open positions"/>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {roles.map(r=><div key={r.id} className="role-row" onClick={()=>go("careers",r.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",border:"1px solid var(--brd)",borderRadius:12,cursor:"pointer",background:"#fff",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,76,115,.1)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.transform="none";}}>
          <div><span style={{fontSize:10,fontWeight:700,color:"var(--blue)",fontFamily:"var(--jk)",letterSpacing:2,opacity:.4}}>{r.team}</span><h3 style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:700,color:"var(--txt)",marginTop:2}}>{r.title}</h3></div>
          <span style={{fontSize:12,color:"var(--txt4)",fontFamily:"var(--jk)"}}>{r.loc}</span>
        </div>)}
      </div>
      <div style={{marginTop:32,border:"1px solid var(--brd)",borderRadius:14,padding:"28px 24px",background:"var(--bl)"}}>
        <h3 style={{fontFamily:"var(--jk)",fontSize:17,fontWeight:800,color:"var(--txt)",marginBottom:4}}>Don't see your role?</h3>
        <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.6,marginBottom:16}}>We're always looking for great people.</p>
        <a href="mailto:hello@lumo-lab.com" className="cta-m" style={{display:"inline-flex"}}>Send your CV <Arr s={14} c="#fff"/></a>
      </div>
    </W></section>
  </div>;
}

/* ── PRESS ── */
function Press({go}:{go:(p:string,id?:string)=>void}){
  return <div style={{paddingTop:76}}>
    <section style={{padding:"48px 0 24px"}}><W>
      <SL ch="Press"/>
      <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,lineHeight:1,color:"var(--txt)",marginBottom:16,maxWidth:680}}>What people are <span style={{color:"var(--blue)"}}>writing about.</span></h1>
      <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.7,maxWidth:560}}>Third-party coverage of the work we've done and the companies we've built with. Updated when something new lands.</p>
    </W></section>
    <section style={{padding:"24px 0 80px"}}><W>
      <div style={{display:"flex",flexDirection:"column"}}>
        {pressItems.map((p,i)=>(
          <article key={p.url} style={{display:"grid",gridTemplateColumns:"120px 1fr auto",gap:32,alignItems:"center",padding:"28px 0",borderTop:"1px solid var(--brd)",borderBottom:i===pressItems.length-1?"1px solid var(--brd)":"none"}} className="press-row">
            <span style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--blue)",opacity:.5,fontFeatureSettings:'"tnum"'}}>{p.year}</span>
            <div style={{minWidth:0}}>
              <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--txt4)",letterSpacing:1.8,textTransform:"uppercase",marginBottom:6}}>
                {p.pub}
                <span style={{marginLeft:10,padding:"2px 8px",border:"1px solid var(--brd)",borderRadius:50,fontSize:9,color:"var(--blue)",background:"var(--bl)",textTransform:"capitalize"}}>{p.kind}</span>
              </p>
              <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(18px,1.8vw,22px)",fontWeight:800,color:"var(--txt)",lineHeight:1.25,margin:0,marginBottom:8,letterSpacing:"-.01em"}}>{p.headline}</h2>
              {p.caseId&&<button onClick={()=>go("cases",p.caseId)} style={{background:"none",border:"none",padding:0,cursor:"pointer",fontFamily:"var(--jk)",fontSize:12,fontWeight:600,color:"var(--blue)",letterSpacing:.2}}>Read the case study →</button>}
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{flexShrink:0,display:"inline-flex",alignItems:"center",gap:8,padding:"10px 18px",border:"1px solid var(--brd)",borderRadius:50,fontFamily:"var(--jk)",fontSize:12.5,fontWeight:600,color:"var(--txt2)",textDecoration:"none",transition:"all .2s",background:"var(--bg)"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.color="var(--blue)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt2)";}}>Read on {p.pub} <Arr s={13} c="currentColor"/></a>
          </article>
        ))}
      </div>
    </W></section>
    <section style={{padding:"56px 0 96px",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}><W>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:32,alignItems:"center",flexWrap:"wrap"}} className="press-cta">
        <div>
          <SL ch="For press"/>
          <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,30px)",fontWeight:800,color:"var(--txt)",lineHeight:1.1,margin:0,marginBottom:8}}>Writing about something we've built?</h2>
          <p style={{fontSize:14,color:"var(--txt3)",lineHeight:1.7,maxWidth:520,margin:0}}>Reach out and we'll happily share context, technical detail, or get you in front of the right client contact. Fastest route is email.</p>
        </div>
        <a href="mailto:hello@lumo-lab.com?subject=Press%20enquiry" className="cta-m" style={{textDecoration:"none",flexShrink:0}}>Email the team <Arr s={14} c="#fff"/></a>
      </div>
    </W></section>
  </div>;
}

/* ── PRIVACY POLICY ── */
/* ── 404 ── */
function NotFound({go}:{go:(p:string,id?:string)=>void}){
  return <div style={{paddingTop:76,minHeight:"calc(100vh - 160px)",display:"flex",alignItems:"center"}}>
    <W style={{maxWidth:720}}>
      <section style={{padding:"80px 0 120px",textAlign:"center"}}>
        <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--blue)",letterSpacing:3,textTransform:"uppercase",opacity:.5,marginBottom:16}}>Error 404</p>
        <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(64px,12vw,140px)",fontWeight:800,color:"var(--txt)",lineHeight:.95,letterSpacing:"-0.04em",marginBottom:20}}>
          Page <span style={{color:"var(--blue)"}}>not found.</span>
        </h1>
        <p style={{fontSize:16,color:"var(--txt3)",lineHeight:1.65,maxWidth:480,margin:"0 auto 36px"}}>The page you're looking for doesn't exist or has moved. From here you can head back home, browse our work, or get in touch.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>go("home")} style={{display:"inline-flex",alignItems:"center",gap:10,background:"var(--blue)",color:"#fff",padding:"14px 26px",borderRadius:50,fontFamily:"var(--jk)",fontSize:14,fontWeight:700,border:"none",cursor:"pointer"}}>Back to home <Arr s={14} c="#fff"/></button>
          <button onClick={()=>go("cases")} className="cta-g">See our work</button>
          <button onClick={()=>go("contact")} className="cta-g">Get in touch</button>
        </div>
      </section>
    </W>
  </div>;
}

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
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:8}}><strong>Information you voluntarily provide to us</strong>, including data you submit through contact forms or email correspondence.</p>
      <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.85,marginBottom:4}}><strong>Information we collect about you and your device</strong>: when you visit our site we automatically collect:</p>
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
      {li(['Google Analytics, used to understand website traffic and behaviour'])}
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

/* ── CONTACT ── */
function Contact({type="project"}:{type?:"project"|"job"}){
  const isJob=type==="job";
  const[sent,setSent]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState<string|null>(null);
  const[file,setFile]=useState<File|null>(null);
  const[dragOver,setDragOver]=useState(false);
  const[form,setForm]=useState({name:"",email:"",company:"",budget:"",message:"",role:"",portfolio:""});
  const set=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>setForm(f=>({...f,[k]:e.target.value}));
  // Visitor's local timezone — Calendly auto-shows slots in this zone; we surface it to kill the "what time is that for me?" doubt for US visitors.
  const tz=(()=>{try{return (Intl.DateTimeFormat().resolvedOptions().timeZone||"").replace(/_/g," ");}catch{return "";}})();
  useEffect(()=>{
    if(isJob)return;
    const id="calendly-widget-js";
    if(!document.getElementById(id)){
      const s=document.createElement("script");s.id=id;s.src="https://assets.calendly.com/assets/external/widget.js";s.async=true;document.body.appendChild(s);
    }
  },[isJob]);
  const inputStyle:CSSProperties={width:"100%",padding:"12px 16px",border:"1px solid var(--brd)",borderRadius:10,fontFamily:"var(--in)",fontSize:14,color:"var(--txt)",background:"#fff",outline:"none",transition:"border-color .2s"};
  const labelStyle:CSSProperties={display:"block",fontSize:12,fontWeight:600,color:"var(--txt2)",fontFamily:"var(--jk)",textTransform:"uppercase",letterSpacing:1.2,marginBottom:6};
  const field=(label:string,key:string,t="text",placeholder="")=>(
    <div><label style={labelStyle}>{label}</label><input type={t} value={(form as any)[key]} onChange={set(key)} placeholder={placeholder} style={inputStyle} onFocus={e=>{e.target.style.borderColor="var(--blue)"}} onBlur={e=>{e.target.style.borderColor="var(--brd)"}}/></div>
  );
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      const serviceId=process.env.REACT_APP_EMAILJS_SERVICE_ID!;
      const publicKey=process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;
      if(isJob){
        const tempForm=document.createElement("form");
        const addHidden=(name:string,value:string)=>{const i=document.createElement("input");i.type="hidden";i.name=name;i.value=value;tempForm.appendChild(i);};
        addHidden("from_name",form.name);
        addHidden("from_email",form.email);
        addHidden("role",form.role);
        addHidden("portfolio",form.portfolio);
        addHidden("message",form.message);
        if(file){
          const fi=document.createElement("input");fi.type="file";fi.name="cv_file";
          const dt=new DataTransfer();dt.items.add(file);fi.files=dt.files;
          tempForm.appendChild(fi);
        }
        await emailjs.sendForm(serviceId,process.env.REACT_APP_EMAILJS_JOB_TEMPLATE_ID!,tempForm,publicKey);
      }else{
        await emailjs.send(serviceId,process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID!,{
          from_name:form.name,
          from_email:form.email,
          company:form.company,
          message:form.message,
        },publicKey);
      }
      setSent(true);
    }catch(err){
      setError("Something went wrong. Please try again or email us directly.");
    }finally{
      setLoading(false);
    }
  };
  return <div style={{paddingTop:76}}>
    <section style={{padding:"72px 0 80px",background:"var(--bg)"}}>
      <W>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <SL ch={isJob?"Join us":"Contact"}/>
          <h1 style={{fontFamily:"var(--jk)",fontSize:"clamp(36px,5vw,56px)",fontWeight:800,lineHeight:1,color:"var(--txt)",marginBottom:16,letterSpacing:-1.5}}>
            {isJob?(<>Join the<br/><span style={{color:"var(--blue)"}}>team.</span></>):(<>Let's build something<br/><span style={{color:"var(--blue)"}}>together.</span></>)}
          </h1>
          <p style={{fontSize:16,color:"var(--txt2)",lineHeight:1.7,marginBottom:40}}>
            {isJob?"Tell us about yourself and what you're looking for. We read every application.":"Tell us about your project. We'll get back to you within 1 to 2 business days."}
          </p>
          {!isJob&&<>
            {/* US trust strip */}
            <div style={{display:"flex",alignItems:"center",gap:"10px 18px",flexWrap:"wrap",padding:"14px 0",marginBottom:32,borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)"}}>
              <span style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,color:"var(--txt4)",letterSpacing:1.5,textTransform:"uppercase"}}>Trusted by US companies</span>
              {["Nomo","Farmwave","Noctrix → ResMed"].map(n=><span key={n} style={{fontFamily:"var(--jk)",fontSize:13,fontWeight:700,color:"var(--txt2)"}}>{n}</span>)}
              <span style={{display:"inline-flex",alignItems:"center",gap:6,marginLeft:"auto"}}><span aria-hidden="true" style={{color:"#E8A33D",fontSize:11,letterSpacing:-1}}>★★★★★</span><span style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt2)"}}>5.0 · Clutch</span></span>
            </div>
            {/* Book a call — timezone aware */}
            <div style={{marginBottom:36}}>
              <h2 style={{fontFamily:"var(--jk)",fontSize:20,fontWeight:800,color:"var(--txt)",marginBottom:6}}>Grab a 30-minute slot</h2>
              <p style={{display:"flex",alignItems:"center",gap:8,fontSize:13.5,color:"var(--txt3)",lineHeight:1.55,marginBottom:16}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}} aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                <span>Times shown in your timezone{tz?` (${tz})`:""} — we keep hours that overlap with US business days.</span>
              </p>
              <div className="calendly-inline-widget" data-url="https://calendly.com/jurica-lumo-lab/30min?hide_gdpr_banner=1" style={{minWidth:320,height:680,border:"1px solid var(--brd)",borderRadius:14,overflow:"hidden"}}/>
            </div>
            {/* divider */}
            <div style={{display:"flex",alignItems:"center",gap:16,margin:"4px 0 30px"}}>
              <span style={{flex:1,height:1,background:"var(--brd)"}}/>
              <span style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt4)",letterSpacing:1,textTransform:"uppercase"}}>or send a message</span>
              <span style={{flex:1,height:1,background:"var(--brd)"}}/>
            </div>
          </>}
          {sent?<div style={{textAlign:"center",padding:"56px 0"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(0,76,115,.08)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <h3 style={{fontFamily:"var(--jk)",fontSize:22,fontWeight:700,color:"var(--txt)",marginBottom:8}}>Message sent!</h3>
            <p style={{fontSize:15,color:"var(--txt3)"}}>We'll get back to you within 1 to 2 business days.</p>
          </div>:
          <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {field("Full name","name","text","Jane Smith")}
              {field("Email","email","email","jane@company.com")}
            </div>
            {!isJob?<>
              {field("Company / Organisation","company","text","Acme Inc.")}

              <div><label style={labelStyle}>Tell us about your project</label><textarea value={form.message} onChange={set("message")} rows={5} placeholder="What are you building, what's the timeline, any constraints we should know about…" style={{...inputStyle,resize:"vertical"}} onFocus={e=>{e.target.style.borderColor="var(--blue)"}} onBlur={e=>{e.target.style.borderColor="var(--brd)"}}/></div>
            </>:<>
              {field("Role you're applying for","role","text","e.g. iOS Engineer")}
              {field("Portfolio / LinkedIn / GitHub","portfolio","url","https://")}
              <div><label style={labelStyle}>Cover note</label><textarea value={form.message} onChange={set("message")} rows={5} placeholder="Tell us why you want to join Lumo, what you've built, and what you're looking for…" style={{...inputStyle,resize:"vertical"}} onFocus={e=>{e.target.style.borderColor="var(--blue)"}} onBlur={e=>{e.target.style.borderColor="var(--brd)"}}/></div>
              <div>
                <label style={labelStyle}>CV / Resume</label>
                <div
                  onDragOver={e=>{e.preventDefault();setDragOver(true)}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)setFile(f);}}
                  onClick={()=>document.getElementById("cv-upload")?.click()}
                  className="upload-zone" style={{border:`2px dashed ${dragOver?"var(--blue)":"var(--brd)"}`,borderRadius:10,padding:"20px 16px",cursor:"pointer",textAlign:"center",background:dragOver?"rgba(0,76,115,.03)":"#fafbfc",transition:"all .2s"}}
                >
                  <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)setFile(f);}}/>
                  {file
                    ?<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{fontSize:13,fontWeight:600,color:"var(--blue)",fontFamily:"var(--in)"}}>{file.name}</span>
                        <button type="button" onClick={e=>{e.stopPropagation();setFile(null);}} style={{background:"none",border:"none",cursor:"pointer",color:"var(--txt4)",fontSize:16,lineHeight:1,padding:0}}>×</button>
                      </div>
                    :<div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{margin:"0 auto 8px",display:"block"}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="var(--txt4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <p style={{fontSize:13,color:"var(--txt3)",margin:0}}><span style={{fontWeight:600,color:"var(--blue)"}}>Click to upload</span> or drag and drop</p>
                        <p style={{fontSize:11,color:"var(--txt4)",marginTop:4}}>PDF, DOC, DOCX</p>
                      </div>
                  }
                </div>
              </div>
            </>}
            {error&&<p style={{fontSize:13,color:"#c0392b",background:"rgba(192,57,43,.07)",border:"1px solid rgba(192,57,43,.2)",borderRadius:8,padding:"10px 14px"}}>{error}</p>}
            <button type="submit" disabled={loading} className="cta-m" style={{alignSelf:"flex-start",marginTop:4,opacity:loading?0.7:1,cursor:loading?"not-allowed":"pointer"}}>{loading?"Sending…":"Send message"} {!loading&&<Arr s={14} c="#fff"/>}</button>
          </form>}
        </div>
      </W>
    </section>
  </div>;
}

/* ── ROUTING ── */
const toPath=(p:string,id?:string)=>{const base:{[k:string]:string}={home:"/",about:"/about",services:"/for-clients",cases:"/work",blog:"/blog",careers:"/careers",press:"/press",privacy:"/privacy-policy",contact:"/contact",calc:"/app-cost-calculator"};return id?`${base[p]||"/"}/${id}`:base[p]||"/";};
// Legacy blog ID → new slug. Maintain so old links from search results / external sites keep working.
const BLOG_REDIRECTS:{[k:string]:string}={
  b1:"nomo-smart-care-case-study",
  b2:"deep-learning-audio-classification",
  b3:"ai-on-microcontrollers",
};
function parseFromPath():{page:string,subId:string|null}{
  const parts=window.location.pathname.split("/").filter(Boolean);
  // Both `/for-clients` (canonical, matches the nav label) and `/services` (legacy alias) resolve to the Services page.
  const pageMap:{[k:string]:string}={about:"about","for-clients":"services",services:"services",work:"cases",blog:"blog",careers:"careers",press:"press","privacy-policy":"privacy",contact:"contact","app-cost-calculator":"calc"};
  if(!parts.length)return{page:"home",subId:null};
  const page=pageMap[parts[0]];
  if(!page)return{page:"notfound",subId:null};
  let subId=parts[1]||null;
  // Legacy blog slug redirect: /blog/b1 → /blog/nomo-smart-care-case-study, etc.
  if(page==="blog"&&subId&&BLOG_REDIRECTS[subId]){
    const newSlug=BLOG_REDIRECTS[subId];
    window.history.replaceState({page,id:newSlug},"",`/blog/${newSlug}`);
    subId=newSlug;
  }
  // Validate known sub-routes; unknown IDs land on 404 rather than silently rendering the index
  if(subId){
    if(page==="cases"&&!cases.find(c=>c.id===subId))return{page:"notfound",subId:null};
    if(page==="blog"&&!blogs.find(b=>b.id===subId))return{page:"notfound",subId:null};
    if(page==="careers"&&subId!=="job"&&!roles.find(r=>r.id===subId))return{page:"notfound",subId:null};
  }
  return{page,subId};
}

/* ── SEO ──
   Single source of truth for per-page titles, descriptions, canonical URLs,
   Open Graph / Twitter metadata, and schema.org JSON-LD structured data.
   Updates are applied imperatively on page/subId change so crawlers that
   execute JS (Googlebot, Bingbot) see the correct tags for every route.
   For static bots, server-side rendering or pre-rendering is recommended
   as a follow-up; this implementation is the client-side baseline. */
const SITE_URL="https://lumo-lab.com";
const SITE_NAME="Lumo Lab";
const DEFAULT_OG=`${SITE_URL}/og-image.jpg`;
const SEO_DEFAULTS:{[k:string]:{title:string,description:string,path:string,keywords?:string}}={
  home:{title:`AI, Mobile & Product Development Company | ${SITE_NAME}`,description:"Lumo Lab is a senior product-engineering studio building AI, IoT, and mobile apps for startups and enterprises — from MVP to acquisition. Book a free tech assessment.",path:"/",keywords:"AI development company, product development studio, mobile app development, software development company, MVP development, startup technology partner, enterprise software development"},
  about:{title:`About ${SITE_NAME} | Senior Product Engineering Team`,description:"Meet Lumo Lab: a senior product-engineering team that advises, designs, and ships AI, mobile, and software products — from first assessment to acquisition.",path:"/about",keywords:"about Lumo Lab, product engineering team, software development company, senior engineers"},
  services:{title:`Software, AI & Product Development Services | ${SITE_NAME}`,description:"AI development, mobile apps, MVPs, UX/UI design, and enterprise software. Senior architects who diagnose before they build. Book a free tech assessment.",path:"/for-clients",keywords:"software development services, AI development, mobile app development, product design, MVP development, enterprise software development"},
  cases:{title:`Case Studies: AI, Mobile, IoT & Product Work | ${SITE_NAME}`,description:"Real results: a $340M client exit (Noctrix), AI Harvest Vision Solution of the Year (Farmwave), Nomo live in all 50 US states. See how Lumo Lab ships.",path:"/work",keywords:"software development case studies, AI case study, mobile app portfolio, product engineering, health tech, AgTech, IoT"},
  calc:{title:`Development Cost Calculator (2026) | ${SITE_NAME}`,description:"How much does it cost to build an app? Estimate your project cost and timeline in under a minute — MVP, consumer, enterprise, or AI product. Free tool by Lumo Lab.",path:"/app-cost-calculator",keywords:"app development cost calculator, how much does it cost to build an app, app development cost, mobile app cost estimate, software development cost"},
  blog:{title:`Insights on Technology, AI & Product | ${SITE_NAME} Blog`,description:"Practical perspectives on technology strategy, AI, edge computing, and software engineering, written by the Lumo Lab team.",path:"/blog",keywords:"technology blog, AI insights, edge computing, software engineering"},
  careers:{title:`Careers at ${SITE_NAME} | Engineering, Design & Product`,description:"Join a small, senior team building meaningful products. We're not actively hiring right now, but we're always open to hearing from great people.",path:"/careers",keywords:"careers, software jobs, engineering, design, product, open application"},
  contact:{title:`Contact ${SITE_NAME} | Start Your Technology Partnership`,description:"Talk to Lumo Lab about your next technology initiative. Book an assessment, scope a project, or start a long-term partnership.",path:"/contact",keywords:"contact Lumo Lab, technology consulting inquiry, hire consultants"},
  press:{title:`Press & Media | ${SITE_NAME}`,description:"Third-party coverage of Lumo Lab's work: ResMed's $340M acquisition of Noctrix Health, Farmwave's 2025 AI Harvest Vision Award, Muvr's App Innovation Award.",path:"/press",keywords:"Lumo Lab press, technology consultancy press, software case study coverage"},
  privacy:{title:`Privacy Policy | ${SITE_NAME}`,description:"Lumo Lab privacy policy. How we collect, use, and safeguard your personal data.",path:"/privacy-policy"},
  notfound:{title:`Page Not Found (404) | ${SITE_NAME}`,description:"The page you're looking for doesn't exist. Browse our work, read our insights, or get in touch.",path:"/404"},
};
type SeoMeta={title:string,description:string,url:string,image:string,imageAlt?:string,type:"website"|"article",keywords?:string,publishedTime?:string,author?:string,section?:string};
function clip(s:string,max:number){if(s.length<=max)return s;return s.slice(0,max-1).replace(/\s+\S*$/,"")+"…";}
// Resolve a relative/public-url image path into an absolute URL suitable for og:image.
// Images live under /images/... on the canonical domain regardless of build-time PUBLIC_URL
// (which may be "/lumo-web" on GitHub Pages). We normalise by anchoring to the last "/images/" segment.
function toAbs(src:string|undefined):string|undefined{
  if(!src)return undefined;
  if(/^https?:\/\//i.test(src))return src;
  const idx=src.lastIndexOf("/images/");
  const rel=idx>=0?src.slice(idx+1):src.replace(/^\/+/,"");
  return `${SITE_URL}/${rel}`;
}
function getSeo(page:string,subId:string|null):SeoMeta{
  if(page==="cases"&&subId){
    const c=cases.find(x=>x.id===subId);
    if(c){
      const caseImg=toAbs((c as any).coverImg||(c as any).headerImg)||DEFAULT_OG;
      return{
        title:clip(`${c.name} Case Study | ${c.cat} | ${SITE_NAME}`,65),
        description:clip(c.brief,158),
        url:`${SITE_URL}/work/${c.id}`,
        image:caseImg,
        imageAlt:`${c.name}, ${c.cat} case study by Lumo Lab`,
        type:"article",
        keywords:[c.cat,...c.tags,"case study","Lumo Lab"].join(", "),
        section:c.cat,
      };
    }
  }
  if(page==="blog"&&subId){
    const b=blogs.find(x=>x.id===subId);
    if(b){
      const blogImg=toAbs((b as any).headerImg)||DEFAULT_OG;
      return{
        title:clip(`${b.title} | ${SITE_NAME} Blog`,65),
        description:clip(b.excerpt,158),
        url:`${SITE_URL}/blog/${b.id}`,
        image:blogImg,
        imageAlt:`${b.title} on ${SITE_NAME} Blog`,
        type:"article",
        keywords:[b.cat,"Lumo Lab blog","technology"].join(", "),
        publishedTime:new Date(b.date).toISOString(),
        author:b.author,
        section:b.cat,
      };
    }
  }
  const d=SEO_DEFAULTS[page]||SEO_DEFAULTS.home;
  const pageImg=page==="calc"?`${SITE_URL}/og-cost-calculator.jpg`:DEFAULT_OG;
  const pageImgAlt=page==="calc"?"Lumo Lab App Development Cost Calculator":"Lumo Lab. We advise, guide, and deliver.";
  return{title:d.title,description:d.description,url:`${SITE_URL}${d.path}`,image:pageImg,imageAlt:pageImgAlt,type:"website",keywords:d.keywords};
}
function setMeta(attr:"name"|"property",key:string,content:string){
  let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if(!el){el=document.createElement("meta");el.setAttribute(attr,key);document.head.appendChild(el);}
  el.setAttribute("content",content);
}
function removeMeta(attr:"name"|"property",key:string){
  const el=document.head.querySelector(`meta[${attr}="${key}"]`);
  if(el)el.remove();
}
function setLink(rel:string,href:string){
  let el=document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if(!el){el=document.createElement("link");el.setAttribute("rel",rel);document.head.appendChild(el);}
  el.setAttribute("href",href);
}
function setJsonLd(id:string,data:unknown){
  let el=document.getElementById(id) as HTMLScriptElement|null;
  if(!el){el=document.createElement("script");el.id=id;el.type="application/ld+json";document.head.appendChild(el);}
  el.textContent=JSON.stringify(data);
}
function buildJsonLd(page:string,subId:string|null,seo:SeoMeta){
  const organization={
    "@type":["Organization","ProfessionalService"],
    "@id":`${SITE_URL}/#organization`,
    name:SITE_NAME,
    alternateName:"Lumo Lab d.o.o.",
    url:SITE_URL,
    logo:{"@type":"ImageObject",url:`${SITE_URL}/android-chrome-512x512.png`,width:512,height:512},
    image:`${SITE_URL}/android-chrome-512x512.png`,
    sameAs:["https://www.linkedin.com/company/lumo-lab","https://www.instagram.com/lumo_lab_/","https://clutch.co/profile/lumo-lab"],
    contactPoint:{"@type":"ContactPoint",email:"hello@lumo-lab.com",telephone:"+385-98-901-4448",contactType:"customer support",areaServed:["EU","US","Global"],availableLanguage:["English"]},
    address:{"@type":"PostalAddress",streetAddress:"Zivtov trg 3",addressLocality:"Zabok",addressRegion:"Krapina-Zagorje",postalCode:"49210",addressCountry:"HR"},
    geo:{"@type":"GeoCoordinates",latitude:46.0306,longitude:15.9047},
    award:["AI Harvest Vision Solution of the Year 2025 — Agribusiness Review Europe (work: Farmwave)"],
    // Third-party press coverage — strengthens E-E-A-T and gives AI engines explicit external corroboration. Single source of truth is pressItems below.
    subjectOf:pressItems.map(p=>({"@type":"NewsArticle",headline:p.headline,url:p.url,publisher:{"@type":"Organization",name:p.pub},datePublished:p.date})),
    founder:{"@type":"Person","@id":`${SITE_URL}/#jurica`,name:"Jurica Mlinaric"},
    foundingDate:"2022",
    numberOfEmployees:{"@type":"QuantitativeValue",minValue:10,maxValue:25},
    slogan:"We advise, guide, and deliver.",
    description:"Technology consultancy for startups and enterprises. We advise, guide, and deliver across mobile, web, IoT, and AI.",
    knowsAbout:["Technology Consulting","Software Engineering","Mobile App Development","IoT","Edge AI","Machine Learning","Product Design","SaaS","iOS Development","Android Development","Cloud Architecture","DevOps"],
    areaServed:["EU","US","Global"],
    keywords:"technology consultancy, software consulting, AI consulting, IoT, mobile development, edge AI, startup technology partner, product engineering",
    knowsLanguage:["en"],
  };
  const website={
    "@type":"WebSite",
    "@id":`${SITE_URL}/#website`,
    url:SITE_URL,
    name:SITE_NAME,
    description:"We advise, guide, and deliver.",
    publisher:{"@id":`${SITE_URL}/#organization`},
    inLanguage:"en-US",
  };
  const graph:unknown[]=[organization,website];
  // Site-wide WebPage entity with speakable selectors — voice assistants will read aloud the hero + key value props
  if(page==="home"){
    graph.push({
      "@type":"WebPage",
      "@id":`${seo.url}#webpage`,
      url:seo.url,
      name:seo.title,
      description:seo.description,
      isPartOf:{"@id":`${SITE_URL}/#website`},
      about:{"@id":`${SITE_URL}/#organization`},
      speakable:{"@type":"SpeakableSpecification",cssSelector:[".speakable-hero",".speakable-tagline"]},
      inLanguage:"en-US",
    });
  }
  // Breadcrumbs for sub-pages
  if(page!=="home"){
    const labels:{[k:string]:string}={about:"About",services:"For Clients",cases:"Work",blog:"Blog",careers:"Careers",press:"Press",contact:"Contact",privacy:"Privacy Policy",calc:"App Cost Calculator"};
    const paths:{[k:string]:string}={about:"/about",services:"/for-clients",cases:"/work",blog:"/blog",careers:"/careers",press:"/press",contact:"/contact",privacy:"/privacy-policy",calc:"/app-cost-calculator"};
    const items:unknown[]=[
      {"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},
      {"@type":"ListItem",position:2,name:labels[page]||page,item:`${SITE_URL}${paths[page]||"/"}`},
    ];
    if(subId){
      let subName=subId;
      if(page==="cases"){const c=cases.find(x=>x.id===subId);if(c)subName=`${c.name} Case Study`;}
      if(page==="blog"){const b=blogs.find(x=>x.id===subId);if(b)subName=b.title;}
      items.push({"@type":"ListItem",position:3,name:subName,item:seo.url});
    }
    graph.push({"@type":"BreadcrumbList",itemListElement:items});
  }
  // Page-specific entities
  if(page==="calc"){
    graph.push({"@type":"WebApplication",name:"Development Cost Calculator",url:seo.url,applicationCategory:"BusinessApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},provider:{"@id":`${SITE_URL}/#organization`}});
    graph.push({"@type":"FAQPage",mainEntity:([
      ["How much does it cost to build an app?","It depends on scope. The biggest factors are regulatory compliance (HIPAA, FDA), custom AI/ML, third-party integrations, and the scale you're building for. Lumo Lab's app cost calculator turns your specific choices into a realistic ballpark range in seconds, and every project starts with a free Discovery that turns the ballpark into a precise, fixed number."],
      ["What drives app development cost the most?","Compliance and specialist capability. HIPAA or FDA (medical device) requirements touch the whole build; custom AI/ML, computer vision, and hardware/firmware integration are the heaviest line items; each additional native platform and higher scale add on top."],
      ["How long does it take to build an app?","A focused MVP usually ships in 6–12 weeks, a full consumer app 10–20 weeks, and enterprise or AI platforms 16–32 weeks."],
    ] as [string,string][]).map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))});
  }
  if(page==="services"){
    graph.push({
      "@type":"Service",
      serviceType:"Technology Consulting",
      provider:{"@id":`${SITE_URL}/#organization`},
      name:"Technology Consulting Services",
      description:seo.description,
      url:seo.url,
      areaServed:["EU","US","Global"],
      hasOfferCatalog:{"@type":"OfferCatalog",name:"Consulting Services",itemListElement:[
        {"@type":"Offer",itemOffered:{"@type":"Service",name:"Technology Strategy & Advisory",description:"Assessment, architecture advisory, and strategic roadmap."}},
        {"@type":"Offer",itemOffered:{"@type":"Service",name:"Product & Experience Design",description:"Research, wireframes, prototypes, design systems, and usability validation."}},
        {"@type":"Offer",itemOffered:{"@type":"Service",name:"Solution Engineering",description:"Native iOS, Android, cross-platform, and web solutions, architected for scale."}},
        {"@type":"Offer",itemOffered:{"@type":"Service",name:"IoT & Connected Systems",description:"End-to-end IoT ecosystems: architecture, data pipelines, edge computing."}},
        {"@type":"Offer",itemOffered:{"@type":"Service",name:"AI & Data Strategy",description:"AI/ML strategy, data pipelines, analytics, and automation."}},
      ]},
    });
    graph.push({
      "@type":"FAQPage",
      mainEntity:faqs.map(f=>({
        "@type":"Question",
        name:f.q,
        acceptedAnswer:{"@type":"Answer",text:f.a},
        speakable:{"@type":"SpeakableSpecification",xpath:["/html/head/title"]},
      })),
    });
    // HowTo schema for the Week One onboarding — five named steps, eligible for step-snippet boxes
    graph.push({
      "@type":"HowTo",
      name:"How Lumo Lab's Week One assessment works",
      description:"A five-day, no-commitment assessment that produces a written brief and a decision-ready plan by Friday.",
      totalTime:"P5D",
      estimatedCost:{"@type":"MonetaryAmount",currency:"EUR",value:"0"},
      supply:[],
      tool:[],
      step:weekOne.map((w,i)=>({
        "@type":"HowToStep",
        position:i+1,
        name:`${w.d}: ${w.t}`,
        text:w.b,
        url:`${seo.url}#week-one-day-${i+1}`,
      })),
    });
    // SpeakableSpecification for voice assistants — point at FAQ answer block
    graph.push({
      "@type":"WebPage",
      "@id":`${seo.url}#speakable`,
      url:seo.url,
      speakable:{"@type":"SpeakableSpecification",cssSelector:[".speakable-answer"]},
    });
  }
  if(page==="cases"&&!subId){
    graph.push({
      "@type":"CollectionPage",
      name:"Case Studies",
      description:seo.description,
      url:seo.url,
      mainEntity:{"@type":"ItemList",itemListElement:cases.map((c,i)=>({
        "@type":"ListItem",position:i+1,url:`${SITE_URL}/work/${c.id}`,name:c.name,
      }))},
    });
  }
  if(page==="cases"&&subId){
    const c=cases.find(x=>x.id===subId);
    if(c){
      // Derive datePublished from the case `period` field ("March 2021 to Present", "May 2024 to Present", etc.)
      // Falls back to founding year if period is empty.
      const m=((c as any).period||"").match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/);
      const months={January:1,February:2,March:3,April:4,May:5,June:6,July:7,August:8,September:9,October:10,November:11,December:12} as Record<string,number>;
      const datePublished=m?`${m[2]}-${String(months[m[1]]).padStart(2,"0")}-01`:"2022-01-01";
      // dateModified: if the engagement is still "Present", use a recent date; otherwise use end date if parseable.
      const isOngoing=/(Present|present)/.test((c as any).period||"");
      const dateModified=isOngoing?new Date().toISOString().slice(0,10):datePublished;
      graph.push({
        "@type":"Article",
        mainEntityOfPage:seo.url,
        headline:`${c.name} Case Study`,
        description:c.brief,
        url:seo.url,
        author:{"@id":`${SITE_URL}/#organization`},
        publisher:{"@id":`${SITE_URL}/#organization`},
        image:[seo.image],
        articleSection:c.cat,
        keywords:c.tags.join(", "),
        about:c.client||c.name,
        datePublished,
        dateModified,
        inLanguage:"en-US",
        speakable:{"@type":"SpeakableSpecification",cssSelector:[".speakable-brief"]},
      });
      // FAQPage from the case study's "Why" Q&A blocks — turns each case page into a snippet candidate
      const why=(c as any).why as {t:string,d:string}[]|undefined;
      if(why&&why.length){
        graph.push({
          "@type":"FAQPage",
          mainEntity:why.map(w=>({
            "@type":"Question",
            name:w.t,
            acceptedAnswer:{"@type":"Answer",text:w.d},
          })),
        });
      }
    }
  }
  if(page==="blog"&&!subId){
    graph.push({
      "@type":"Blog",
      name:`${SITE_NAME} Blog`,
      description:seo.description,
      url:seo.url,
      publisher:{"@id":`${SITE_URL}/#organization`},
      blogPost:blogs.map(b=>({
        "@type":"BlogPosting",
        headline:b.title,
        url:`${SITE_URL}/blog/${b.id}`,
        datePublished:new Date(b.date).toISOString(),
        author:{"@type":"Person",name:b.author},
      })),
    });
  }
  if(page==="blog"&&subId){
    const b=blogs.find(x=>x.id===subId);
    if(b){
      // Author Person entities — stable @id per author so AI engines can link across posts
      const authorSlug=String(b.author).toLowerCase().replace(/[^a-z]+/g,"-").replace(/^-|-$/g,"");
      const authorImg=(b as any).authorImg?toAbs((b as any).authorImg):undefined;
      const authorEntity:any={"@type":"Person","@id":`${SITE_URL}/#author-${authorSlug}`,name:b.author};
      if(authorImg)authorEntity.image=authorImg;
      authorEntity.worksFor={"@id":`${SITE_URL}/#organization`};
      // Per-author knowsAbout for additional context
      const authorKnowsAbout:{[k:string]:string[]}={
        "jurica-mlinaric":["Technology Consulting","iOS Development","Android Development","IoT","Edge AI","Product Engineering"],
        "matija-sever":["Machine Learning","Deep Learning","Audio Classification","Data Science","Neural Networks"],
        "rudolf-lovrencic-phd":["Embedded Systems","Microcontrollers","AI on the Edge","ESP32","TensorFlow Lite","Software Architecture"],
      };
      if(authorKnowsAbout[authorSlug])authorEntity.knowsAbout=authorKnowsAbout[authorSlug];
      // Add author Person as a top-level graph entity (de-duplicated by @id)
      graph.push(authorEntity);
      graph.push({
        "@type":"BlogPosting",
        mainEntityOfPage:seo.url,
        headline:b.title,
        description:b.excerpt,
        author:authorEntity,
        publisher:{"@id":`${SITE_URL}/#organization`},
        datePublished:new Date(b.date).toISOString(),
        // Honest dateModified: if the blog data carries a `modified` field (manually bumped on edit), use it; otherwise fall back to publish date.
        dateModified:new Date((b as any).modified||b.date).toISOString(),
        image:[seo.image],
        articleSection:b.cat,
        keywords:[b.cat,"Lumo Lab","technology"].join(", "),
        wordCount:((b as any).body||[]).filter((x:any)=>x.type==="text").reduce((n:number,x:any)=>n+String(x.content||"").split(/\s+/).length,0),
        url:seo.url,
        inLanguage:"en-US",
      });
    }
  }
  if(page==="careers"){
    graph.push({
      "@type":"CollectionPage",
      name:"Careers at Lumo Lab",
      description:seo.description,
      url:seo.url,
      mainEntity:{"@type":"ItemList",itemListElement:roles.map((r,i)=>({
        "@type":"ListItem",position:i+1,name:r.title,description:r.desc,
      }))},
    });
  }
  if(page==="press"){
    graph.push({
      "@type":"CollectionPage",
      name:"Press & Media",
      description:seo.description,
      url:seo.url,
      isPartOf:{"@id":`${SITE_URL}/#website`},
      about:{"@id":`${SITE_URL}/#organization`},
      mainEntity:{"@type":"ItemList",itemListElement:pressItems.map((p,i)=>({
        "@type":"ListItem",
        position:i+1,
        item:{
          "@type":"NewsArticle",
          headline:p.headline,
          url:p.url,
          publisher:{"@type":"Organization",name:p.pub},
          datePublished:p.date,
        },
      }))},
    });
  }
  if(page==="contact"){
    graph.push({
      "@type":"ContactPage",
      name:"Contact Lumo Lab",
      description:seo.description,
      url:seo.url,
      mainEntity:{"@id":`${SITE_URL}/#organization`},
    });
  }
  if(page==="about"){
    graph.push({
      "@type":"AboutPage",
      name:"About Lumo Lab",
      description:seo.description,
      url:seo.url,
      mainEntity:{"@id":`${SITE_URL}/#organization`},
      speakable:{"@type":"SpeakableSpecification",cssSelector:[".speakable-hero",".speakable-tagline"]},
    });
    // Founder Person entity — reinforces E-E-A-T for AI engines and Knowledge Graph
    graph.push({
      "@type":"Person",
      "@id":`${SITE_URL}/#jurica`,
      name:"Jurica Mlinaric",
      jobTitle:"CEO & Founder",
      worksFor:{"@id":`${SITE_URL}/#organization`},
      url:`${SITE_URL}/about`,
      image:`${SITE_URL}/images/jurica.png`,
      email:"jurica@lumo-lab.com",
      sameAs:["https://www.linkedin.com/in/juricamlinaric"],
      knowsAbout:["Technology Consulting","iOS Development","Android Development","IoT","Edge AI","Product Engineering"],
      description:"Founder of Lumo Lab. Has been building mobile products since 2015 — iOS, Android, IoT, wearables, edge AI — for clients across Croatia, the US, and Switzerland.",
    });
  }
  return {"@context":"https://schema.org","@graph":graph};
}
function applySeo(page:string,subId:string|null){
  const seo=getSeo(page,subId);
  document.title=seo.title;
  setMeta("name","description",seo.description);
  setLink("canonical",seo.url);
  // Open Graph
  setMeta("property","og:type",seo.type);
  setMeta("property","og:site_name",SITE_NAME);
  setMeta("property","og:title",seo.title);
  setMeta("property","og:description",seo.description);
  setMeta("property","og:url",seo.url);
  setMeta("property","og:image",seo.image);
  if(seo.imageAlt)setMeta("property","og:image:alt",seo.imageAlt);else removeMeta("property","og:image:alt");
  setMeta("property","og:image:width","1200");
  setMeta("property","og:image:height","630");
  setMeta("property","og:locale","en_US");
  if(seo.type==="article"){
    if(seo.publishedTime)setMeta("property","article:published_time",seo.publishedTime);else removeMeta("property","article:published_time");
    if(seo.author)setMeta("property","article:author",seo.author);else removeMeta("property","article:author");
    if(seo.section)setMeta("property","article:section",seo.section);else removeMeta("property","article:section");
  }else{
    removeMeta("property","article:published_time");
    removeMeta("property","article:author");
    removeMeta("property","article:section");
  }
  // Twitter
  setMeta("name","twitter:card","summary_large_image");
  setMeta("name","twitter:site","@lumo_lab_");
  setMeta("name","twitter:creator","@lumo_lab_");
  setMeta("name","twitter:title",seo.title);
  setMeta("name","twitter:description",seo.description);
  setMeta("name","twitter:image",seo.image);
  if(seo.imageAlt)setMeta("name","twitter:image:alt",seo.imageAlt);else removeMeta("name","twitter:image:alt");
  // Keywords (minor signal only, but harmless)
  if(seo.keywords)setMeta("name","keywords",seo.keywords);else removeMeta("name","keywords");
  // Robots: allow indexing everywhere by default; 404 pages should not be indexed
  if(page==="notfound"){
    setMeta("name","robots","noindex,nofollow");
  }else{
    setMeta("name","robots","index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  }
  // Structured data
  setJsonLd("ld-page",buildJsonLd(page,subId,seo));
}

/* ── APP ── */
/* ── APP COST CALCULATOR (lead magnet) ── */
// App cost calculator. Day rates (dev €500, design €400) stay internal — only € ranges shown.
// CC_NEEDS = the engagement (what the client wants); CC_MATURITY = the target product stage.
const CC_NEEDS:{k:string,label:string,sub:string}[]=[
  {k:"discovery",label:"Discovery & scoping",sub:"Not sure yet — help me plan it"},
  {k:"design",label:"Product design",sub:"UX/UI design — no build yet"},
  {k:"dev",label:"Development",sub:"I have designs — build it"},
  {k:"build",label:"Design + build",sub:"End-to-end, idea to launch"},
];
const CC_MATURITY:{[k:string]:{label:string,sub:string,l:number,h:number,polish:number,wk:[number,number]}}={
  demo:{label:"Demo / prototype",sub:"Clickable, investor-ready",l:8,h:16,polish:0.85,wk:[3,6]},
  mvp:{label:"MVP",sub:"Launch-ready core product",l:22,h:42,polish:1,wk:[6,11]},
  production:{label:"Production app",sub:"Hardened, scalable, monitored",l:45,h:85,polish:1.35,wk:[12,22]},
};
const CC_INDUSTRIES=["Digital Health / MedTech","Fintech / Banking","E-commerce / Retail","SaaS / B2B","Industrial / IoT","Logistics & Mobility","EdTech / Education","Media & Entertainment","Travel & Hospitality","Real Estate / PropTech","Other"];
const CC_PLATFORMS=[{k:"ios",label:"iOS (native)"},{k:"android",label:"Android (native)"},{k:"cross",label:"Cross-platform"},{k:"web",label:"Web app"},{k:"desktop",label:"Desktop app"}];
const CC_DESIGNS:{[k:string]:{label:string,l:number,h:number}}={
  standard:{label:"Functional UI",l:0,h:0},
  custom:{label:"Custom UI design",l:12,h:22},
  system:{label:"Premium / brand-led UI",l:25,h:45},
};
const CC_DESIGN=[
  {k:"uxr",label:"UX research",l:8,h:18},
  {k:"proto",label:"Interactive prototype",l:6,h:14},
  {k:"designsys",label:"Design system",l:15,h:30},
  {k:"brand",label:"Brand & visual identity",l:8,h:18},
  {k:"usability",label:"Usability testing",l:5,h:12},
  {k:"motion",label:"Motion / micro-interactions",l:5,h:12},
];
const CC_COMPLIANCE=[
  {k:"hipaa",label:"HIPAA (US health data)",m:0.42},
  {k:"fda",label:"FDA / medical device (SaMD)",m:0.65},
  {k:"gdpr",label:"GDPR / EU data residency",m:0.2},
  {k:"soc2",label:"SOC 2 readiness",m:0.18},
  {k:"pci",label:"PCI DSS (payments)",m:0.2},
];
const CC_FEATURES=[
  {k:"auth",label:"Accounts & roles",l:4,h:8},
  {k:"payments",label:"Payments / subscriptions",l:8,h:16},
  {k:"notifications",label:"Push notifications",l:3,h:6},
  {k:"chat",label:"Chat / messaging",l:8,h:18},
  {k:"search",label:"Search & filtering",l:4,h:10},
  {k:"media",label:"Media upload & storage",l:5,h:12},
  {k:"maps",label:"Maps & geolocation",l:5,h:12},
  {k:"social",label:"Social feed & profiles",l:6,h:14},
  {k:"booking",label:"Booking / scheduling",l:6,h:14},
  {k:"video",label:"Video / audio calls",l:12,h:28},
  {k:"files",label:"File & document management",l:5,h:12},
  {k:"realtime",label:"Real-time / live updates",l:6,h:14},
  {k:"reviews",label:"Ratings & reviews",l:3,h:7},
  {k:"localization",label:"Multi-language / localization",l:4,h:10},
  {k:"camera",label:"Camera / QR scanning",l:4,h:10},
  {k:"offline",label:"Offline mode / sync",l:8,h:16},
  {k:"admin",label:"Admin dashboard",l:10,h:20},
  {k:"analytics",label:"Analytics & reporting",l:5,h:10},
];
const CC_AI=[
  {k:"llm",label:"LLM / generative AI",l:15,h:35},
  {k:"rag",label:"RAG (chat with your data)",l:18,h:40},
  {k:"model",label:"Custom ML model",l:20,h:50},
  {k:"vision",label:"Computer vision",l:25,h:55},
  {k:"mlops",label:"MLOps pipeline",l:18,h:40},
  {k:"reco",label:"Predictive / recommendations",l:12,h:28},
];
const CC_INTEGRATIONS=[
  {k:"ehr",label:"EHR / FHIR (health)",l:15,h:35},
  {k:"erp",label:"ERP / CRM",l:10,h:24},
  {k:"api",label:"3rd-party APIs",l:5,h:14},
  {k:"sso",label:"SSO / enterprise auth",l:6,h:14},
];
const CC_SCALE:{[k:string]:{label:string,m:number}}={
  pilot:{label:"Pilot (<1k users)",m:0},
  growth:{label:"Growth (1k–100k)",m:0.1},
  enterprise:{label:"Enterprise (100k+ / mission-critical)",m:0.28},
};
const ccFmt=(n:number)=>"€"+Math.round(n/1000)+"k";
function CCOptCard({active,onClick,label,sub}:{active:boolean,onClick:()=>void,label:string,sub?:string}){
  return <button type="button" onClick={onClick} className="cc-opt" style={{textAlign:"left",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${active?"var(--blue)":"var(--brd)"}`,background:active?"var(--bl)":"var(--bg)",cursor:"pointer",transition:"border-color .2s, background .2s"}}>
    <span style={{display:"block",fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:active?"var(--blue)":"var(--txt)"}}>{label}</span>
    {sub&&<span style={{display:"block",fontFamily:"var(--in)",fontSize:12,color:"var(--txt3)",marginTop:3}}>{sub}</span>}
  </button>;
}
function CCChip({active,onClick,label,hint}:{active:boolean,onClick:()=>void,label:string,hint?:string}){
  return <button type="button" onClick={onClick} className="cc-chip" data-tip={hint||undefined} style={{padding:"8px 14px",borderRadius:50,border:`1.5px solid ${active?"var(--blue)":"var(--brd)"}`,background:active?"var(--blue)":"var(--bg)",color:active?"#fff":"var(--txt2)",fontFamily:"var(--jk)",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>{label}{hint&&<span aria-hidden="true" style={{marginLeft:6,opacity:.6,fontSize:11}}>ⓘ</span>}</button>;
}
const CC_HINTS:{[k:string]:string}={
  hipaa:"US law protecting health data — drives access controls, encryption, and audit logging.",
  fda:"Software as a Medical Device — regulated clinical software that needs formal validation.",
  gdpr:"EU data-protection rules — consent, data residency, and the right to erasure.",
  soc2:"A security & controls audit that enterprise buyers often require before signing.",
  pci:"The security standard for handling credit-card payments.",
  llm:"Large language models — generative text, chat, and summarisation features.",
  rag:"Retrieval-augmented generation — let users chat with your own documents/data.",
  model:"A bespoke machine-learning model trained on your data.",
  vision:"Computer vision — detecting, classifying, or reading images and video.",
  mlops:"The pipeline to train, deploy, version, and monitor models in production.",
  reco:"Predictive scoring or personalised recommendations.",
  ehr:"Electronic Health Record integration via the FHIR healthcare data standard.",
  sso:"Single sign-on / enterprise authentication (Okta, Azure AD, etc.).",
};
function CCGroup({label,children}:{label:string,children:React.ReactNode}){
  return <div style={{marginBottom:32}}>
    <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"var(--txt4)",marginBottom:14}}>{label}</p>
    {children}
  </div>;
}
function CostCalc({go}:{go:(p:string,id?:string)=>void}){
  // Config can be pre-loaded from a shareable URL (?need=…&stage=…&feat=…)
  const q0=typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams();
  const qs=(k:string,d:string)=>q0.get(k)||d;
  const qa=(k:string)=>{const v=q0.get(k);return v?v.split(","):[];};
  const[need,setNeed]=useState(()=>qs("need","build"));
  const[maturity,setMaturity]=useState(()=>qs("stage","mvp"));
  const[industry,setIndustry]=useState(()=>qs("ind",""));
  const[platforms,setPlatforms]=useState<string[]>(()=>qa("plat"));
  const[design,setDesign]=useState(()=>qs("design","standard"));
  const[dsn,setDsn]=useState<string[]>(()=>qa("dsn"));
  const[feats,setFeats]=useState<string[]>(()=>qa("feat"));
  const[customCap,setCustomCap]=useState(()=>qs("custom",""));
  const[ai,setAi]=useState<string[]>(()=>qa("ai"));
  const[hasHardware,setHasHardware]=useState(()=>q0.get("hw")==="1");
  const[integrations,setIntegrations]=useState<string[]>(()=>qa("intg"));
  const[compliance,setCompliance]=useState<string[]>(()=>qa("comp"));
  const[scale,setScale]=useState(()=>qs("scale","pilot"));
  const[rush,setRush]=useState(()=>q0.get("rush")==="1");
  const[copied,setCopied]=useState(false);
  const[email,setEmail]=useState("");const[company,setCompany]=useState("");const[timeline,setTimeline]=useState("");
  const[sent,setSent]=useState(false);const[sending,setSending]=useState(false);const[err,setErr]=useState(false);const[emailErr,setEmailErr]=useState(false);
  const[nearBottom,setNearBottom]=useState(false);
  useEffect(()=>{const on=()=>{const d=document.documentElement;setNearBottom(window.scrollY+window.innerHeight>=d.scrollHeight-180);};on();window.addEventListener("scroll",on,{passive:true});window.addEventListener("resize",on);return()=>{window.removeEventListener("scroll",on);window.removeEventListener("resize",on);};},[]);
  // Keep the URL in sync with the current config so it can be bookmarked / shared (only non-defaults are written, to keep it short)
  useEffect(()=>{
    const p=new URLSearchParams();
    if(need!=="build")p.set("need",need);
    if(maturity!=="mvp")p.set("stage",maturity);
    if(industry)p.set("ind",industry);
    if(platforms.length)p.set("plat",platforms.join(","));
    if(design!=="standard")p.set("design",design);
    if(dsn.length)p.set("dsn",dsn.join(","));
    if(feats.length)p.set("feat",feats.join(","));
    if(ai.length)p.set("ai",ai.join(","));
    if(integrations.length)p.set("intg",integrations.join(","));
    if(compliance.length)p.set("comp",compliance.join(","));
    if(scale!=="pilot")p.set("scale",scale);
    if(hasHardware)p.set("hw","1");
    if(rush)p.set("rush","1");
    if(customCap.trim())p.set("custom",customCap.trim());
    const str=p.toString();
    window.history.replaceState(null,"",window.location.pathname+(str?"?"+str:""));
  },[need,maturity,industry,platforms,design,dsn,feats,ai,integrations,compliance,scale,hasHardware,rush,customCap]);
  const copyLink=async()=>{
    try{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{}
  };
  const reset=()=>{setNeed("build");setMaturity("mvp");setIndustry("");setPlatforms([]);setDesign("standard");setDsn([]);setFeats([]);setCustomCap("");setAi([]);setHasHardware(false);setIntegrations([]);setCompliance([]);setScale("pilot");setRush(false);};
  const isDiscovery=need==="discovery";
  const includeDev=need==="dev"||need==="build";
  const includeDesign=need==="design"||need==="build";
  const showCompliance=includeDev; // industry is context only — it no longer gates compliance or affects the estimate
  const m=CC_MATURITY[maturity];
  const sel=(arr:string[],src:{k:string,label:string}[])=>arr.map(k=>src.find(x=>x.k===k)?.label).filter(Boolean) as string[];
  const platLabels=platforms.map(p=>CC_PLATFORMS.find(x=>x.k===p)?.label).filter(Boolean) as string[];
  const capItems=[...sel(feats,CC_FEATURES),...sel(ai,CC_AI),...sel(integrations,CC_INTEGRATIONS)];
  const designItems=includeDesign?[CC_DESIGNS[design].label,...sel(dsn,CC_DESIGN)]:[];
  // ── Ballpark estimate (internal rates only; never shown to visitor) ──
  const R_DEV=500, R_DES=400;
  const sumDays=(arr:string[],src:{k:string,l:number,h:number}[]):[number,number]=>arr.reduce<[number,number]>((a,k)=>{const x=src.find(y=>y.k===k);return x?[a[0]+x.l,a[1]+x.h]:a;},[0,0]);
  const platMult=1+0.3*Math.max(0,platforms.length-1);
  const lines:{label:string,l:number,h:number}[]=[];
  if(includeDev){
    lines.push({label:m.label+" foundation",l:m.l*R_DEV*platMult*m.polish,h:m.h*R_DEV*platMult*m.polish});
    [feats,ai,integrations].forEach((arr,i)=>{const src=[CC_FEATURES,CC_AI,CC_INTEGRATIONS][i];arr.forEach(k=>{const x=src.find(y=>y.k===k);if(x)lines.push({label:x.label,l:x.l*R_DEV*platMult*m.polish,h:x.h*R_DEV*platMult*m.polish});});});
  }
  if(includeDesign){
    const dExtra=sumDays(dsn,CC_DESIGN);
    const surf=3+feats.length+ai.length+Math.ceil(integrations.length/2);
    const desL=(CC_DESIGNS[design].l+dExtra[0]+surf*0.8)*R_DES*m.polish;
    const desH=(CC_DESIGNS[design].h+dExtra[1]+surf*1.6)*R_DES*m.polish;
    lines.push({label:"Design & UX",l:desL,h:desH});
  }
  const buildL=lines.reduce((a,x)=>a+x.l,0), buildH=lines.reduce((a,x)=>a+x.h,0);
  if(includeDev){
    compliance.forEach(k=>{const x=CC_COMPLIANCE.find(y=>y.k===k);if(x)lines.push({label:x.label,l:buildL*x.m,h:buildH*x.m});});
    const sc=CC_SCALE[scale]; if(sc.m>0)lines.push({label:"Scale: "+sc.label,l:buildL*sc.m,h:buildH*sc.m});
    if(hasHardware)lines.push({label:"Hardware / device integration",l:buildL*0.2,h:buildH*0.3});
  }
  const rushM=rush?1.15:1;
  const low=isDiscovery?0:lines.reduce((a,x)=>a+x.l,0)*rushM, high=isDiscovery?0:lines.reduce((a,x)=>a+x.h,0)*rushM;
  const extraH=includeDev?(sumDays(feats,CC_FEATURES)[1]+sumDays(ai,CC_AI)[1]+sumDays(integrations,CC_INTEGRATIONS)[1]):0;
  const wl=Math.max(2,Math.round(m.wk[0]*platMult*(rush?0.85:1)));
  const wh=Math.round(m.wk[1]*platMult+extraH/10);
  const ccInput:React.CSSProperties={width:"100%",boxSizing:"border-box",padding:"11px 13px",borderRadius:10,border:"1px solid rgba(255,255,255,.25)",backgroundColor:"rgba(255,255,255,.1)",color:"#fff",fontFamily:"var(--in)",fontSize:14,marginBottom:8};
  const toggle=(arr:string[],set:(v:string[])=>void,k:string)=>set(arr.includes(k)?arr.filter(x=>x!==k):[...arr,k]);
  // Native (iOS/Android) and cross-platform are mutually exclusive
  const togglePlatform=(k:string)=>{
    if(platforms.includes(k)){setPlatforms(platforms.filter(x=>x!==k));return;}
    let next=[...platforms,k];
    if(k==="cross")next=next.filter(x=>x!=="ios"&&x!=="android");
    else if(k==="ios"||k==="android")next=next.filter(x=>x!=="cross");
    setPlatforms(next);
  };
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();if(sending)return;
    if(!/^\S+@\S+\.\S+$/.test(email.trim())){setEmailErr(true);return;}
    setEmailErr(false);setSending(true);setErr(false);
    const needLabel=CC_NEEDS.find(n=>n.k===need)?.label||need;
    const div="────────────────────────────";
    const bullets=(items:string[])=>items.map(x=>"  •  "+x).join("\n");
    const contact=[
      "CONTACT",
      `Company:  ${company||"—"}`,
      `Email:    ${email}`,
      `Timeline: ${timeline||"—"}`,
    ];
    const summary=isDiscovery
      ? [
          "NEW LEAD — Cost Calculator (Discovery)",div,"",
          ...contact,"",
          "Wants a scoping call — no configuration provided.",
        ].join("\n")
      : [
          "NEW LEAD — Cost Calculator",div,"",
          ...contact,"",
          "REQUEST",
          `Needs:        ${needLabel}`,
          `Target stage: ${m.label}`,
          `Pace:         ${rush?"Fast-track (+15%)":"Standard"}`,"",
          "ESTIMATE (internal — not shown to visitor)",
          `Estimate: ${ccFmt(low)}–${ccFmt(high)}`,
          `Timeline: ${wl}–${wh} weeks`,"",
          "SCOPE",
          `Industry:   ${industry||"—"}`,
          `Platforms:  ${platLabels.join(", ")||"—"}`,
          `Compliance: ${includeDev?(sel(compliance,CC_COMPLIANCE).join(", ")||"None"):"n/a"}`,
          `Design:     ${includeDesign?designItems.join(", "):"n/a — client supplies designs"}`,
          `Scale:      ${includeDev?CC_SCALE[scale].label:"n/a"}`,
          `Hardware:   ${includeDev&&hasHardware?"Yes — wants to discuss":"No"}`,"",
          "CAPABILITIES",
          capItems.length?bullets(capItems):"Core scope only",
          ...(customCap.trim()?["","CUSTOM / NOT LISTED",customCap.trim()]:[]),
        ].join("\n");
    try{
      await emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID!,process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID!,{from_name:company||"Cost calculator lead",from_email:email,company:company||"Cost calculator lead",message:summary},process.env.REACT_APP_EMAILJS_PUBLIC_KEY!);
      setSent(true);
    }catch{setErr(true);}finally{setSending(false);}
  };
  return <div className="cc-page" style={{paddingTop:76}}>
    <section style={{padding:"48px 0 40px"}}><W>
      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--blue)",marginBottom:16}}><span style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)"}}/>Free tool</span>
        <h1 className="speakable-hero" style={{fontFamily:"var(--jk)",fontSize:"clamp(30px,4.6vw,46px)",fontWeight:800,color:"var(--txt)",lineHeight:1.08,letterSpacing:"-0.025em",margin:"0 0 18px"}}>Development Cost Calculator</h1>
        <p className="speakable-tagline" style={{fontSize:"clamp(16px,1.7vw,18px)",color:"var(--txt2)",lineHeight:1.65,margin:0}}>How much does it cost to build an app? Configure your project below and get an instant ballpark — tailored to your scope, platforms, compliance, and complexity. Then get a <strong>free Discovery</strong> to firm it up — no cost, no obligation.</p>
      </div>
    </W></section>
    <section style={{padding:"0 0 72px"}}><W>
      <div className="cc-grid" style={{maxWidth:1080,margin:"0 auto"}}>
        {/* Configurator */}
        <div className="cc-config">
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
            <button type="button" onClick={reset} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--txt3)",fontFamily:"var(--in)",fontSize:12.5,fontWeight:600,cursor:"pointer",padding:"4px 2px"}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>Start over</button>
          </div>
          <CCGroup label="What do you need?">
            <div className="cc-cards">{CC_NEEDS.map(n=><CCOptCard key={n.k} active={need===n.k} onClick={()=>setNeed(n.k)} label={n.label} sub={n.sub}/>)}</div>
          </CCGroup>
          {isDiscovery
            ? <div style={{padding:"18px 18px",borderRadius:12,border:"1px dashed var(--brd)",background:"var(--bg2)"}}>
                <p style={{fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)",margin:"0 0 6px"}}>Discovery is on us.</p>
                <p style={{fontFamily:"var(--in)",fontSize:13.5,color:"var(--txt3)",lineHeight:1.6,margin:0}}>No need to configure anything. Tell us where to reach you and a senior engineer will set up a free call to map your build, flag the risks, and outline the path — no cost, no obligation.</p>
              </div>
            : <>
          <CCGroup label="What are you building toward?">
            <div className="cc-cards">{Object.keys(CC_MATURITY).map(k=><CCOptCard key={k} active={maturity===k} onClick={()=>setMaturity(k)} label={CC_MATURITY[k].label} sub={CC_MATURITY[k].sub}/>)}</div>
          </CCGroup>
          <CCGroup label="Industry (for context)">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_INDUSTRIES.map(x=><CCChip key={x} active={industry===x} onClick={()=>setIndustry(x)} label={x}/>)}</div>
          </CCGroup>
          <CCGroup label="Platforms">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_PLATFORMS.map(p=><CCChip key={p.k} active={platforms.includes(p.k)} onClick={()=>togglePlatform(p.k)} label={p.label}/>)}</div>
          </CCGroup>
          {includeDesign&&<>
          <CCGroup label="Design fidelity">
            <div className="cc-cards">{Object.keys(CC_DESIGNS).map(k=><CCOptCard key={k} active={design===k} onClick={()=>setDesign(k)} label={CC_DESIGNS[k].label}/>)}</div>
          </CCGroup>
          <CCGroup label="Design & UX add-ons">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_DESIGN.map(f=><CCChip key={f.k} active={dsn.includes(f.k)} onClick={()=>toggle(dsn,setDsn,f.k)} label={f.label}/>)}</div>
          </CCGroup>
          </>}
          <CCGroup label="Core capabilities">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_FEATURES.map(f=><CCChip key={f.k} active={feats.includes(f.k)} onClick={()=>toggle(feats,setFeats,f.k)} label={f.label}/>)}</div>
          </CCGroup>
          <CCGroup label="Don't see what you need?">
            <p style={{fontFamily:"var(--in)",fontSize:13,color:"var(--txt3)",margin:"0 0 10px",lineHeight:1.55}}>Describe anything that's not on the list. We can't put a number on custom capabilities automatically — a senior engineer will review it and get back to you to scope it on your free Discovery.</p>
            <textarea value={customCap} onChange={e=>setCustomCap(e.target.value)} rows={4} placeholder="e.g. wearable/BLE device sync, custom hardware protocol, a specific 3rd-party platform…" style={{width:"100%",boxSizing:"border-box",padding:"13px 14px",borderRadius:10,border:`1px solid ${customCap.trim()?"var(--blue)":"var(--brd)"}`,background:"var(--bg)",color:"var(--txt)",fontFamily:"var(--in)",fontSize:14,lineHeight:1.55,outline:"none",resize:"vertical",minHeight:110}}/>
          </CCGroup>
          {includeDev&&<>
          <CCGroup label="AI / ML">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_AI.map(f=><CCChip key={f.k} active={ai.includes(f.k)} onClick={()=>toggle(ai,setAi,f.k)} label={f.label} hint={CC_HINTS[f.k]}/>)}</div>
          </CCGroup>
          <CCGroup label="Integrations">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_INTEGRATIONS.map(f=><CCChip key={f.k} active={integrations.includes(f.k)} onClick={()=>toggle(integrations,setIntegrations,f.k)} label={f.label} hint={CC_HINTS[f.k]}/>)}</div>
          </CCGroup>
          </>}
          {showCompliance&&<CCGroup label="Compliance & data">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{CC_COMPLIANCE.map(c=><CCChip key={c.k} active={compliance.includes(c.k)} onClick={()=>toggle(compliance,setCompliance,c.k)} label={c.label} hint={CC_HINTS[c.k]}/>)}</div>
          </CCGroup>}
          {includeDev&&<CCGroup label="Scale at launch">
            <div className="cc-cards">{Object.keys(CC_SCALE).map(k=><CCOptCard key={k} active={scale===k} onClick={()=>setScale(k)} label={CC_SCALE[k].label}/>)}</div>
          </CCGroup>}
          <CCGroup label="Timeline">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <CCChip active={!rush} onClick={()=>setRush(false)} label="Standard pace"/>
              <CCChip active={rush} onClick={()=>setRush(true)} label="Fast-track (rush)"/>
            </div>
          </CCGroup>
          {includeDev&&<CCGroup label="Anything else">
            <button type="button" onClick={()=>setHasHardware(!hasHardware)} style={{display:"flex",alignItems:"flex-start",gap:12,background:"none",border:"none",padding:0,cursor:"pointer",textAlign:"left",width:"100%"}}>
              <span style={{width:22,height:22,flexShrink:0,marginTop:1,borderRadius:6,border:`1.5px solid ${hasHardware?"var(--blue)":"var(--brd)"}`,background:hasHardware?"var(--blue)":"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s, border-color .2s"}}>{hasHardware&&<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}</span>
              <span>
                <span style={{display:"block",fontFamily:"var(--jk)",fontSize:14,fontWeight:700,color:"var(--txt)"}}>This project involves hardware or a connected device</span>
                <span style={{display:"block",fontFamily:"var(--in)",fontSize:12.5,color:"var(--txt3)",marginTop:4,lineHeight:1.55}}>Hardware, firmware, and connectivity are bespoke, so we don't price them here — tick this and we'll come prepared to scope it with you on the call.</span>
              </span>
            </button>
          </CCGroup>}
          </>}
        </div>
        {/* Estimate card */}
        <div className="cc-result" id="cc-estimate">
          <div style={{position:"sticky",top:96,background:"var(--blue)",borderRadius:18,padding:"28px 26px",color:"#fff",boxShadow:"0 24px 60px rgba(0,20,34,.25)"}}>
            {isDiscovery
              ? <>
                  <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--accent)",margin:"0 0 10px"}}>Discovery call</p>
                  <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontFamily:"var(--jk)",fontSize:"clamp(30px,4.4vw,40px)",fontWeight:800,lineHeight:1,letterSpacing:"-0.02em"}}>Free</span>
                  </div>
                  <p style={{fontFamily:"var(--in)",fontSize:13,color:"rgba(255,255,255,.72)",margin:"10px 0 0",lineHeight:1.5}}>A 30-minute session with a senior engineer to scope your build, flag technical risks, and outline the path — no cost, no obligation.</p>
                </>
              : <>
                  <p style={{fontFamily:"var(--jk)",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--accent)",margin:"0 0 10px"}}>Ballpark estimate</p>
                  <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontFamily:"var(--jk)",fontSize:"clamp(30px,4.4vw,40px)",fontWeight:800,lineHeight:1,letterSpacing:"-0.02em"}}>{ccFmt(low)}–{ccFmt(high)}</span>
                  </div>
                  <p style={{fontFamily:"var(--in)",fontSize:12.5,color:"rgba(255,255,255,.6)",margin:"7px 0 0"}}>Typical for this scope ≈ <strong style={{color:"rgba(255,255,255,.85)"}}>{ccFmt((low+high)/2)}</strong></p>
                  <p style={{fontFamily:"var(--in)",fontSize:13,color:"rgba(255,255,255,.72)",margin:"10px 0 0",lineHeight:1.5}}>Timeline <strong style={{color:"#fff"}}>{wl}–{wh} weeks</strong> · Discovery included free</p>
                  <div style={{margin:"20px 0 0",padding:"14px 0 2px",borderTop:"1px solid rgba(255,255,255,.16)"}}>
                    <p style={{fontFamily:"var(--jk)",fontSize:10.5,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",color:"rgba(255,255,255,.5)",margin:"0 0 10px"}}>What shapes this estimate</p>
                    {lines.map((x,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:14,padding:"5px 0"}}><span style={{fontFamily:"var(--in)",fontSize:12.5,color:"rgba(255,255,255,.72)",flexShrink:1}}>{x.label}</span><span style={{fontFamily:"var(--jk)",fontSize:12.5,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>{ccFmt((x.l+x.h)/2)}</span></div>)}
                  </div>
                </>}
            <div style={{height:1,background:"rgba(255,255,255,.16)",margin:"18px 0"}}/>
            {sent
              ? <div style={{textAlign:"center",padding:"8px 0"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,.14)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
                  <p style={{fontFamily:"var(--jk)",fontSize:16,fontWeight:800,margin:"0 0 6px"}}>Your Discovery is on its way</p>
                  <p style={{fontFamily:"var(--in)",fontSize:13,color:"rgba(255,255,255,.8)",margin:0}}>We'll review your project and follow up within one business day.</p>
                </div>
              : <form onSubmit={submit} noValidate>
                  <div style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:16,paddingBottom:16,borderBottom:"1px solid rgba(255,255,255,.14)"}}>
                    <div style={{display:"flex",gap:1.5,flexShrink:0,marginTop:1}}>{[0,1,2,3,4].map(i=><svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFC24B" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
                    <span style={{fontFamily:"var(--in)",fontSize:12,color:"rgba(255,255,255,.82)",lineHeight:1.5}}>“Strong communication, timely delivery, and a user-centric approach.” — Jen McCarthy, Drift App</span>
                  </div>
                  <p style={{fontFamily:"var(--jk)",fontSize:15.5,fontWeight:800,margin:"0 0 4px"}}>Get your free Discovery</p>
                  <p style={{fontFamily:"var(--in)",fontSize:12.5,color:"rgba(255,255,255,.72)",margin:"0 0 14px",lineHeight:1.5}}>Tell us where to send it. A senior engineer reviews every request personally.</p>
                  <input type="email" className="cc-input" value={email} onChange={e=>{setEmail(e.target.value);if(emailErr)setEmailErr(false);}} aria-invalid={emailErr} placeholder="Email" style={{...ccInput,marginBottom:emailErr?5:8,border:`1px solid ${emailErr?"#ff9d9d":"rgba(255,255,255,.25)"}`}}/>
                  {emailErr&&<p style={{fontFamily:"var(--in)",fontSize:12,color:"#ffd7d7",margin:"0 0 9px",display:"flex",alignItems:"center",gap:6}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>Please enter a valid email so we can send your Discovery.</p>}
                  <input type="text" className="cc-input" value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company" style={ccInput}/>
                  <select className="cc-select" value={timeline} onChange={e=>setTimeline(e.target.value)} style={ccInput}><option value="">Timeline</option>{["ASAP","1–3 months","3–6 months","Exploring"].map(o=><option key={o} value={o}>{o}</option>)}</select>
                  <button type="submit" disabled={sending} className="cc-send" style={{width:"100%",justifyContent:"center",display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"var(--blue)",border:"none",borderRadius:50,padding:"13px",marginTop:2,fontFamily:"var(--jk)",fontSize:14.5,fontWeight:700,cursor:sending?"default":"pointer",opacity:sending?.7:1}}>{sending?"Sending…":<>Send my free Discovery <Arr s={15} c="var(--blue)"/></>}</button>
                  <p style={{fontFamily:"var(--in)",fontSize:11,color:"rgba(255,255,255,.5)",margin:"9px 0 0"}}>No cost, no obligation.</p>
                  {err&&<p style={{fontFamily:"var(--in)",fontSize:12,color:"#ffd7d7",margin:"9px 0 0"}}>Something went wrong. Email hello@lumo-lab.com and we'll follow up.</p>}
                </form>}
            <button onClick={()=>go("contact")} style={{width:"100%",marginTop:10,background:"none",border:"1px solid rgba(255,255,255,.3)",color:"#fff",borderRadius:50,padding:"12px",fontFamily:"var(--jk)",fontSize:14,fontWeight:600,cursor:"pointer"}}>Prefer to talk? Book a call</button>
            <button onClick={copyLink} style={{width:"100%",marginTop:10,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,background:"none",border:"none",color:"rgba(255,255,255,.7)",padding:"6px",fontFamily:"var(--in)",fontSize:12.5,fontWeight:600,cursor:"pointer"}}>{copied
              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Link copied</>
              : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Copy shareable link</>}</button>
            <p style={{fontFamily:"var(--in)",fontSize:11.5,color:"rgba(255,255,255,.55)",margin:"14px 0 0",lineHeight:1.5}}>Ballpark only — a realistic range based on your selections, not a fixed quote. Discovery is always free, with no obligation, and a senior engineer reviews every request personally.</p>
          </div>
        </div>
      </div>
    </W></section>
    {/* SEO + AEO body */}
    <section style={{padding:"0 0 88px"}}><W>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,28px)",fontWeight:800,color:"var(--txt)",margin:"0 0 16px",letterSpacing:"-0.02em"}}>How much does it cost to build an app?</h2>
        <p style={{fontSize:16.5,color:"var(--txt2)",lineHeight:1.85,margin:"0 0 18px"}}>It depends on what you're building. The biggest factors are regulatory compliance (HIPAA, FDA), custom AI/ML, third-party integrations, and the scale you're building for. Rather than guess, the calculator above turns your specific choices into a realistic range in seconds — no sign-up needed.</p>
        <p style={{fontSize:16.5,color:"var(--txt2)",lineHeight:1.85,margin:"0 0 32px"}}>The estimate reflects the way we scope and ship at Lumo Lab — senior engineers, no hand-offs to juniors. For a precise, fixed number, every project starts with a <strong>free Discovery</strong>: we pressure-test your scope, then quote with confidence. No cost, no obligation.</p>
        <h2 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,2.6vw,28px)",fontWeight:800,color:"var(--txt)",margin:"0 0 20px",letterSpacing:"-0.02em"}}>Frequently asked questions</h2>
        {[
          {q:"What drives app development cost the most?",a:"Compliance and specialist capability. HIPAA or FDA (medical device) requirements touch the whole build; custom AI/ML, computer vision, and hardware/firmware integration are the heaviest individual line items. Each additional native platform and higher scale add on top."},
          {q:"How long does it take to build an app?",a:"A focused MVP usually ships in 6–12 weeks. A full consumer app runs 10–20 weeks, and enterprise or AI platforms 16–32 weeks. Fast-tracking is possible with a larger senior team."},
          {q:"Is this estimate accurate?",a:"It's a realistic ballpark to set expectations, not a fixed quote. The final number depends on scope detail, integrations, compliance needs, and design fidelity. We give a precise figure after a free Discovery."},
          {q:"What is Discovery and why is it free?",a:"Discovery is a short scoping exercise — scope, architecture, technical risks, and the recommended next step. We do it free because it's the best way for both sides to nail down what you're really building before committing to a fixed number."},
          {q:"Do you use AI in your development?",a:"Yes — AI-assisted engineering (LLM pair-programming, code generation, and automated testing) is standard in how we work, not a paid add-on. Senior engineers still own architecture, quality, and the hard calls; AI accelerates the work, it doesn't replace judgment."},
          {q:"Do you work fixed-bid or time & materials?",a:"Both. We offer fixed-bid for well-defined scope (an MVP, a migration) and retainers for ongoing product work. We avoid fixed-bid on exploratory work and propose a time-boxed discovery instead."},
          {q:"What's included in the price?",a:"Product strategy, UX/UI design, engineering, QA, and delivery. We're a senior team that scopes, designs, and ships end-to-end — not a body shop billing junior hours."},
        ].map((f,i)=>(
          <div key={i} style={{padding:"18px 0",borderTop:"1px solid var(--brd)"}}>
            <p style={{fontFamily:"var(--jk)",fontSize:16.5,fontWeight:700,color:"var(--txt)",margin:"0 0 8px"}}>{f.q}</p>
            <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.75,margin:0}}>{f.a}</p>
          </div>
        ))}
        <div style={{marginTop:40,background:"var(--bg2)",border:"1px solid var(--brd)",borderRadius:16,padding:"clamp(24px,4vw,36px)",textAlign:"center"}}>
          <h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(20px,2.6vw,26px)",fontWeight:800,color:"var(--txt)",margin:"0 0 10px",letterSpacing:"-0.02em"}}>Prefer to talk it through?</h3>
          <p style={{fontSize:15,color:"var(--txt3)",lineHeight:1.7,margin:"0 0 20px",maxWidth:460,marginInline:"auto"}}>Book a free 30-minute call. A senior engineer will pressure-test your scope and map out the fastest path to a working product — no pitch decks, no sales pressure.</p>
          <button onClick={()=>go("contact")} className="cta-m" style={{display:"inline-flex"}}>Book a call <Arr s={15} c="#fff"/></button>
        </div>
      </div>
    </W></section>
    {/* Mobile sticky estimate bar */}
    <div className={"cc-mobilebar"+(nearBottom?" cc-hide":"")} style={{position:"fixed",left:0,right:0,bottom:0,zIndex:120,background:"var(--blue)",color:"#fff",padding:"11px 16px calc(11px + env(safe-area-inset-bottom))",alignItems:"center",justifyContent:"space-between",gap:12,boxShadow:"0 -6px 24px rgba(0,20,34,.28)"}}>
      <div style={{minWidth:0}}>
        {isDiscovery
          ? <><span style={{fontFamily:"var(--jk)",fontSize:19,fontWeight:800,lineHeight:1}}>Free</span><span style={{fontFamily:"var(--in)",fontSize:12,color:"rgba(255,255,255,.75)",marginLeft:8}}>Discovery call</span></>
          : <><span style={{fontFamily:"var(--jk)",fontSize:19,fontWeight:800,lineHeight:1}}>{ccFmt(low)}–{ccFmt(high)}</span><span style={{fontFamily:"var(--in)",fontSize:12,color:"rgba(255,255,255,.75)",marginLeft:8}}>{wl}–{wh} wks · free Discovery</span></>}
      </div>
      <button onClick={()=>{const el=document.getElementById("cc-estimate");if(el)el.scrollIntoView({behavior:"smooth",block:"center"});}} style={{flexShrink:0,background:"#fff",color:"var(--blue)",border:"none",borderRadius:50,padding:"9px 16px",fontFamily:"var(--jk)",fontSize:13.5,fontWeight:700,cursor:"pointer"}}>{isDiscovery?"Book it":"Get estimate"}</button>
    </div>
  </div>;
}

// Once-per-session CTA popup — fires after a dwell delay or on exit-intent
function SessionPopup({go,page}:{go:(p:string,id?:string)=>void,page:string}){
  const[show,setShow]=useState(false);const[vis,setVis]=useState(false);
  useEffect(()=>{
    if(page==="contact")return;
    let done=false;
    try{if(sessionStorage.getItem("lumo_cta_seen"))return;}catch{}
    const open=()=>{
      if(done)return;done=true;
      try{sessionStorage.setItem("lumo_cta_seen","1");}catch{}
      setShow(true);setTimeout(()=>setVis(true),30);
    };
    const t=setTimeout(open,18000);
    const onLeave=(e:MouseEvent)=>{if(e.clientY<=0&&!e.relatedTarget)open();};
    document.addEventListener("mouseout",onLeave);
    return()=>{clearTimeout(t);document.removeEventListener("mouseout",onLeave);};
  },[page]);
  const close=()=>{setVis(false);setTimeout(()=>setShow(false),280);};
  useEffect(()=>{
    if(!show)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")close();};
    window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);
  },[show]);
  if(!show)return null;
  return (
    <div onClick={close} role="dialog" aria-modal="true" aria-label="Book a technical assessment" className="cta-pop-back" style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20,background:"rgba(0,20,34,.55)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",opacity:vis?1:0,transition:"opacity .28s ease"}}>
      <div onClick={e=>e.stopPropagation()} className="cta-pop-card" style={{position:"relative",width:"100%",maxWidth:440,background:"var(--bg)",borderRadius:20,border:"1px solid var(--brd)",boxShadow:"0 40px 100px rgba(0,16,28,.4)",padding:"clamp(28px,5vw,40px)",transform:vis?"none":"scale(.96) translateY(10px)",opacity:vis?1:0,transition:"transform .3s cubic-bezier(.23,1,.32,1), opacity .28s ease"}}>
        <button onClick={close} aria-label="Close" className="cta-pop-x" style={{position:"absolute",top:14,right:14,width:32,height:32,borderRadius:"50%",border:"none",background:"var(--bg2)",color:"var(--txt3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s, color .2s"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--jk)",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--teal)",marginBottom:14}}>
          <span aria-hidden="true" style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)"}}/>Free technical assessment
        </span>
        <h3 style={{fontFamily:"var(--jk)",fontSize:"clamp(22px,3.4vw,27px)",fontWeight:800,color:"var(--txt)",lineHeight:1.15,letterSpacing:"-0.02em",margin:"0 0 12px"}}>Talk to an engineer, not a salesperson.</h3>
        <p style={{fontFamily:"var(--in)",fontSize:14.5,color:"var(--txt3)",lineHeight:1.6,margin:"0 0 24px"}}>Bring your hardest technical problem: feasibility, architecture, a build you're unsure about. 30 focused minutes with a senior engineer who's shipped products like yours.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={()=>{close();go("contact");}} className="cta-m" style={{width:"100%",justifyContent:"center",padding:"13px 20px",fontSize:14.5}}>Book a discovery call<Arr s={15} c="#fff"/></button>
          <button onClick={close} style={{width:"100%",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,color:"var(--txt3)",padding:"6px"}}>Maybe later</button>
        </div>
      </div>
    </div>
  );
}
export default function App(){
  const init=parseFromPath();
  const[page,setPage]=useState(init.page);
  const[subId,setSubId]=useState<string|null>(init.subId);
  const[dark,setDark]=useState(()=>localStorage.getItem("theme")==="dark");
  const toggleDark=()=>setDark(d=>{const n=!d;localStorage.setItem("theme",n?"dark":"light");return n;});
  useEffect(()=>{
    const onPop=()=>{const{page:p,subId:s}=parseFromPath();setPage(p);setSubId(s);window.scrollTo({top:0,behavior:"auto"});};
    window.addEventListener("popstate",onPop);
    return()=>window.removeEventListener("popstate",onPop);
  },[]);
  // SEO: update title, meta tags, canonical, OG, Twitter, and JSON-LD on every route change
  useEffect(()=>{applySeo(page,subId);},[page,subId]);
  const go=(p:string,id?:string)=>{
    window.history.pushState({page:p,id:id||null},"",toPath(p,id));
    setPage(p);setSubId(id||null);
    window.scrollTo({top:0,behavior:"auto"});
  };
  const pageKey=subId?`${page}/${subId}`:page;
  return <div className={`lumo${dark?" dark":""}`} style={{fontFamily:"var(--in)",color:"var(--txt)",background:"var(--bg)",lineHeight:1.6,overflowX:"clip",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <style>{css}</style>
<Nav page={page} go={go} dark={dark} toggleDark={toggleDark}/>
    <SessionPopup go={go} page={page}/>
    <div style={{flex:1}}>
    <div key={pageKey} className="page-enter">
    {page==="home"&&<Home go={go}/>}
    {page==="about"&&<About go={go}/>}
    {page==="services"&&<Services go={go}/>}
    {page==="cases"&&<Cases go={go} sel={subId}/>}
    {page==="blog"&&<Blog go={go} sel={subId}/>}
    {page==="careers"&&<Careers go={go} sel={subId}/>}
    {page==="press"&&<Press go={go}/>}
    {page==="privacy"&&<Privacy/>}
    {page==="contact"&&<Contact type={subId==="job"?"job":"project"}/>}
    {page==="calc"&&<CostCalc go={go}/>}
    {page==="notfound"&&<NotFound go={go}/>}
    </div>
    </div>
    {/* SHARED CONTACT FOOTER on every page */}
    <section className="footer-section" style={{padding:"24px 0",background:"var(--bg2)",borderTop:"1px solid var(--brd)"}}>
      <W>
        <div className="footer-grid">
          <div style={{display:"flex",flexDirection:"column"}}>
            <div className="footer-brand" style={{display:"flex",flexDirection:"column"}}>
              <div style={{marginTop:-14,marginLeft:-26,display:"flex",alignItems:"flex-start",flexShrink:0}}>
                <svg height="100" viewBox="0 0 201.94 201.91" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
                  <path fill="currentColor" d="m111.52,126.47v23.8h-30.1c-17.36,0-29.73-11.42-29.73-28.13v-31.7h23.8v36.03h36.03Zm-48.62-49.11c8.45,1.07,15.56-6.04,14.49-14.48-.73-5.75-5.37-10.4-11.13-11.13-8.45-1.07-15.56,6.04-14.49,14.48.73,5.75,5.37,10.4,11.13,11.12Z"/>
                  <path fill="currentColor" fillOpacity=".5" d="m77.48,65.08c-.27,6.71-5.87,12.21-12.58,12.38-2.35.06-4.55-.51-6.47-1.55l91.86,50.55V51.64h-85.71c7.31,0,13.2,6.07,12.91,13.44Z"/>
                </svg>
              </div>
              <p style={{fontSize:13,color:"var(--txt3)",lineHeight:1.7,maxWidth:240,marginBottom:20}}>We advise, guide, and deliver. Technology consultancy for startups and enterprises.</p>
            </div>
            <button onClick={()=>go("contact")} className="cta-m footer-cta-desktop" style={{marginTop:"auto",alignSelf:"flex-start"}}>Let's talk<Arr s={14} c="#fff"/></button>
          </div>
          <div className="footer-cols">
            <div className="footer-contact-info">
              <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Contact</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[{l:"Email",v:"hello@lumo-lab.com"},{l:"Phone",v:"+385 98 901 4448"},{l:"Address",v:"Zivtov trg 3, Zabok, Croatia"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:24}}><span style={{fontSize:10,color:"var(--txt4)",fontWeight:700,width:52,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"var(--jk)"}}>{c.l}</span><span style={{fontSize:13,fontWeight:500,color:"var(--txt2)"}}>{c.v}</span></div>)}
              </div>
              <div style={{display:"flex",gap:10,marginTop:20,alignItems:"center"}}>
                {[
                  {href:"https://www.linkedin.com/company/lumo-lab",label:"LinkedIn",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                  {href:"https://www.instagram.com/lumo_lab_/",label:"Instagram",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>},
                ].map(({href,label,icon})=>(
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="social-icon-btn" style={{width:36,height:36,minWidth:36,minHeight:36,flexShrink:0,borderRadius:"50%",border:"1px solid var(--brd)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--txt3)",textDecoration:"none",transition:"all .25s",background:"#fff"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="var(--blue)";e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.color="#fff";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="var(--bg2)";e.currentTarget.style.borderColor="var(--brd)";e.currentTarget.style.color="var(--txt3)";e.currentTarget.style.transform="none";}}
                  >{icon}</a>
                ))}
              </div>
              <div style={{marginTop:16}}>
                <ClutchWidget/>
              </div>
            </div>
            <div className="footer-links-group">
              <div>
                <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Navigate</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[{l:"Home",p:"home"},{l:"About",p:"about"},{l:"For Clients",p:"services"},{l:"Work",p:"cases"},{l:"Blog",p:"blog"},{l:"Cost Calculator",p:"calc"}].map(({l,p})=><button key={l} onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,fontWeight:500,color:"var(--txt3)",padding:0,textAlign:"left"}}>{l}</button>)}
                </div>
              </div>
              <div>
                <p style={{fontFamily:"var(--jk)",fontSize:12,fontWeight:700,color:"var(--txt)",textTransform:"uppercase",letterSpacing:2,marginBottom:14}}>Company</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[{l:"Careers",p:"careers"},{l:"Press",p:"press"},{l:"Contact",p:"contact"},{l:"Privacy Policy",p:"privacy"}].map(({l,p})=><button key={l} onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--in)",fontSize:13,fontWeight:500,color:"var(--txt3)",padding:0,textAlign:"left"}}>{l}</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={()=>go("contact")} className="cta-m footer-cta-mobile" style={{marginTop:28,width:"100%",justifyContent:"center"}}>Let's talk<Arr s={14} c="#fff"/></button>
      </W>
    </section>
    <footer style={{padding:"28px clamp(16px,4vw,48px)",maxWidth:1200,margin:"0 auto",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--brd)"}}>
      <span style={{fontSize:10,color:"var(--blue)",letterSpacing:1.8,textTransform:"uppercase",fontFamily:"var(--jk)",fontWeight:800}}>©2026 by Lumo Lab. All rights reserved.</span>
      <span style={{fontSize:10,color:"var(--blue)",letterSpacing:1.8,textTransform:"uppercase",fontFamily:"var(--jk)",fontWeight:800}}>We advise, guide, and deliver.</span>
    </footer>
  </div>;
}
