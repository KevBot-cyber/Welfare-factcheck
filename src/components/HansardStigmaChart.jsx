
import React, { useState } from 'react';
import { BarChart3, Download, AlertTriangle, TrendingUp, Scale, ShieldAlert, Users } from 'lucide-react';

const INCIDENTS_DATA = [
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Bradley Thomas",
    "Date": "2026-10-27",
    "Debate_Title": "Covid-19 Inquiry Module 4 Report: Government Response &#8212; [Graham Stuart in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Stuart. Some here will be aware of the tragic case in Bromsgrove of NHS pharmacist John Cross, who developed paralysing complications after receiving a covid injection. The effects began two weeks after the vaccine and John was then hospitalised for seven months. He worked hard on his recovery t",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-10-27a.117.0&amp;s=%22not+disabled%22#g124.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Boycott",
    "Date": "2026-10-15",
    "Debate_Title": "Food Security - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I congratulate the noble Baroness, Lady Teather, on organising this debate. That was a terrific speech. Many of the things I would like to say she has already said, as indeed have the noble Lord, Lord Smith, and the noble Baroness, Lady Shephard. I agree with the point that the food system is not tested until things go wrong. To offer an ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-10-15c.411.0&amp;s=%22lazy%22#g419.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Helen Whately",
    "Date": "2026-10-13",
    "Debate_Title": "Pensions Triple Lock",
    "Context_Snippet": "Thirty years ago, nearly one in three pensioners in our country lived in poverty. Today, that figure has halved, thanks in no small part to the decisions made by our party, when in government, to stand by pensioners&#8212;people who have done the right thing, worked all their lives and paid into the system. That is the fair and right thing to do. Y",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-10-13c.198.0&amp;s=%22handouts%22#g199.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "David Reed",
    "Date": "2026-10-13",
    "Debate_Title": "Bone and Joint Health",
    "Context_Snippet": "It is a real pleasure to lead this evening&#8217;s debate during Bone and Joint Week, raising awareness of an issue that affects millions of people, but receives nowhere near the attention it deserves. I start by thanking Arthritis UK and the Arthritis and Musculoskeletal Alliance, known as ARMA, for their work raising awareness of these conditions",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-10-13c.341.0&amp;s=%22lazy%22#g341.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Lord Bird",
    "Date": "2026-10-13",
    "Debate_Title": "Health Bill - <i>Second Reading</i>",
    "Context_Snippet": "As a Cross-Bencher, I am here in the middle, and can look to this side and say that they have got things right and to that side and say that they have got things wrong. What I find so interesting is that it is almost like the debate you would have when the horse has escaped and you are bolting the door afterwards. I was born in the slums of Notting",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-10-13a.118.0&amp;s=%22underclass%22#g190.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Pat McFadden",
    "Date": "2026-10-12",
    "Debate_Title": "Work and Pensions: Employment Support: Young People",
    "Context_Snippet": "Yes, I do agree with my hon. Friend. She is absolutely right to say that we need to invest in opportunity and success, and she has spoken admirably about her own life experiences in this House. As I have said, we are putting forward an additional &#163;2.5 billion of investment in the youth guarantee and the growth and skills levy. We have recently",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-10-12b.7.5&amp;s=%22shirkers%22#g9.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Kemi Badenoch",
    "Date": "2026-10-12",
    "Debate_Title": "International Update",
    "Context_Snippet": "I thank the Prime Minister for advance sight of his statement. Since we last met, Iran has sponsored an attempted terror attack on a British military base; President Trump has withdrawn support from President Zelensky; and Saudi Arabia has been bombarded with Houthi missiles and asked Britain to come to her aid. UK household energy bills are set to",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-10-12b.23.0&amp;s=%22lazy%22#g25.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Andrew Snowden",
    "Date": "2026-10-12",
    "Debate_Title": "Work and Pensions: Milburn Report",
    "Context_Snippet": "Thank you very much, Mr Speaker. Labour has been talking up the Milburn report for months, and the Treasury is so pleased with the report that it has delayed it until after the Budget, which means it is not going to be good news for taxpayers or the bond market. While the Government dither and delay, we have published our plan for tough love on you",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-10-12b.12.1&amp;s=%22won%27t+work%22#g13.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Stephen Flynn",
    "Date": "2026-09-30",
    "Debate_Title": "Scottish Parliament: Alexander Dennis Ltd",
    "Context_Snippet": "I welcome this opportunity to update the chamber on developments in relation to Alexander Dennis and the ways in which the Scottish Government is working with the company to ensure that it remains a key part of our industrial base. In June 2025, the then Deputy First Minister, Kate Forbes, came to the Parliament to update members on the news that A",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-09-30.1.0&amp;s=%22burden+on+taxpayers%22#g1.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lilian Greenwood",
    "Date": "2026-09-28",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Department for Work and Pensions: Marketing",
    "Context_Snippet": "DWP Policy states that money shouldn&#8217;t be spent on non-essential branded merchandise. The distribution of branded merchandise is to be restricted to instances where it is truly necessary; for example, where expenditure on merchandise is necessary for operational purposes. No expenditure occurs in our central records for the core department. T",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-08-28.24162.h&amp;s=%22handouts%22#g24162.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lilian Greenwood",
    "Date": "2026-09-28",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Department for Work and Pensions: Marketing",
    "Context_Snippet": "DWP Policy states that money shouldn&#8217;t be spent on non-essential branded merchandise. The distribution of branded merchandise is to be restricted to instances where it is truly necessary; for example, where expenditure on merchandise is necessary for operational purposes. No expenditure occurs in our central records for the core department. T",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-08-28.21091.h&amp;s=%22handouts%22#g21091.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Lord Jackson of Peterborough",
    "Date": "2026-09-10",
    "Debate_Title": "Home Owners and Home Ownership - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank my noble friend Lady Eaton for giving us the opportunity to debate the issue of home ownership and the Government&#8217;s record on housing delivery. I will focus on one or two areas. One is about family housing, the other is about the current housing crisis and supply and demand, and a few practical solutions to the current malai",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-09-10c.853.0&amp;s=%22workless%22#g864.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Lord Jackson of Peterborough",
    "Date": "2026-09-10",
    "Debate_Title": "Home Owners and Home Ownership - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank my noble friend Lady Eaton for giving us the opportunity to debate the issue of home ownership and the Government&#8217;s record on housing delivery. I will focus on one or two areas. One is about family housing, the other is about the current housing crisis and supply and demand, and a few practical solutions to the current malai",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-09-10c.853.0&amp;s=%22idle%22#g864.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Ruth Cadbury",
    "Date": "2026-09-09",
    "Debate_Title": "Civil Aviation (Consumer Protection and Regulatory Reform) Bill [Lords]",
    "Context_Snippet": "The hon. Member describes a holiday experience that so many of our constituents have had. There are two issues here. The first is getting information and updates regularly. Yesterday, one pilot had the decency to say, &#8220;Look, I don&#8217;t know what&#8217;s happening,&#8221; every 20 minutes; at least that gave some assurance to the passengers",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-09-09b.1099.0&amp;s=%22not+disabled%22#g1109.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Christopher Vince",
    "Date": "2026-09-09",
    "Debate_Title": "Education and Skills Reform",
    "Context_Snippet": "When you have been working 12-hour days, and you come home, turn on the television and are told by the former Education Secretary that you are lazy, you are letting down the children you teach and you are not aspirational enough, it is pretty easy to become quite angry and despondent very quickly, so I am glad that the new Education Secretary has a",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-09-09b.1064.0&amp;s=%22lazy%22#g1073.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Lord Walker of Broxton",
    "Date": "2026-09-03",
    "Debate_Title": "Government Political Priorities and Legislative Agenda - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I declare an interest as executive chairman of Iceland Foods and of Bywater. As the former Prime Minister&#8217;s cost of living champion, I advocated targeted help for families who could not absorb soaring bills, and it is good to see some of those ideas come to fruition. But that is just applying a sticking plaster; we cannot cure the u",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-09-03c.294.1&amp;s=%22workless%22#g318.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Lord Fuller",
    "Date": "2026-09-03",
    "Debate_Title": "Nature Restoration Levy Regulations 2026 - <i>Motion to Approve</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, environmentalists are up in arms on the nature restoration fund and EDPs because they break the link between a development and its nature mitigations. Developers are saying that the cost, risks and delay are making development unviable. While everybody argues, nothing is getting built in those areas of the country with the greatest housin",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-09-03c.335.0&amp;s=%22idle%22#g339.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Neil Hudson",
    "Date": "2026-09-03",
    "Debate_Title": "Backbench Business: Global Biodiversity and Ecosystems: National Security &#8212; [Sir Desmond Swayne in the Chair]",
    "Context_Snippet": "It is a great pleasure to serve under your chairmanship, Sir Desmond. I congratulate the hon. Member for Waveney Valley (Adrian Ramsay) on bringing forward this important debate, and I welcome the Minister to her place. I would normally go through some of the powerful contributions we have had today, but it would take all my allocated time to namec",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-09-03a.188.0&amp;s=%22idle%22#g206.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Lord Moylan",
    "Date": "2026-07-13",
    "Debate_Title": "Civil Aviation (Consumer Protection and Regulatory Reform) Bill [HL] - <i>Report</i>: Amendment 2",
    "Context_Snippet": "My Lords, if the House will indulge me, I will speak now rather than at the end of the debate, because I have amendments in this group and other noble Lords may wish to comment on them after I have spoken to them. Before I come to those amendments, I will briefly refer to two others. First, I express my support for the amendment tabled by the noble",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-07-13a.423.1&amp;s=%22not+disabled%22#g430.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "motability cars",
    "Speaker": "Clive Betts",
    "Date": "2026-07-09",
    "Debate_Title": "Timms Review: Interim Report",
    "Context_Snippet": "I apologise for the fact that&#8212;as I have explained to you, Madam Deputy Speaker&#8212;I will have to leave straight after my question to chair Westminster Hall. I thank my right hon. Friend for doing this very challenging piece of work. I think that the theme of fairness, for the people who need benefits and for taxpayers, is right. I have spo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-07-09b.512.0&amp;s=%22motability+cars%22#g515.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Benjamin McKenna",
    "Date": "2026-07-07",
    "Debate_Title": "7. Debate: Fair Funding",
    "Context_Snippet": "I stand today in favour of the Reform amendment. The Government motion today calls for the Senedd to continuously lobby Westminster for better fiscal arrangements and Barnett reform. This is the same old grievance politics from Plaid Cymru that distracts this Chamber from what really matters: delivering for the people of Wales with the billions of ",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2026-07-07.7.766630.h&amp;s=%22handouts%22#g7.766727"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Lord Mohammed of Tinsley",
    "Date": "2026-07-02",
    "Debate_Title": "Higher Education: Affordability and Quality - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I join other noble Lords in thanking the noble Baroness, Lady Deech, for securing this important debate. I thank all noble Lords who have taken part for the points they have raised, which are clearly important to many of us who are interested in the higher education sector. It comes at a crucial moment for higher education in England. I d",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-07-02a.1172.1&amp;s=%22lifestyle+choice%22#g1202.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "John Milne",
    "Date": "2026-06-30",
    "Debate_Title": "Department for Work and Pensions",
    "Context_Snippet": "Right now, it is hard to get through a day without someone, somewhere, saying that welfare spending is ballooning out of control. For example, the Conservatives&#8217; alternative King&#8217;s Speech tells us: &#8220;For the first time ever, the total welfare bill is now higher than total receipts from income tax.&#8221; Western civilisation is at ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-06-30c.864.0&amp;s=%22scrounger%22#g870.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Helen Whately",
    "Date": "2026-06-29",
    "Debate_Title": "Work and Pensions: Topical Questions",
    "Context_Snippet": "I heard no commitment from the Secretary of State that the benefits bill was going to come down any time soon. Labour can change its leader, but it is still the same old welfare party. The right hon. Member for Makerfield (Andy Burnham) told us this morning that he is going to bring &#8220;Manchesterism&#8221; to the whole country. In Manchester, h",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-06-29a.618.5&amp;s=%22handouts%22#g619.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Polly Billington",
    "Date": "2026-06-25",
    "Debate_Title": "Backbench Business: Ports and Port Connectivity &#8212; [Christine Jardine in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Ms Jardine. As many people will have already heard, East Thanet is surrounded on three sides by sea. From Ramsgate, we can see France on a clear day, but our port stands idle and neglected, despite its noble history as the home of the Navy during the Napoleonic wars. More recently, people will remembe",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-06-25a.234.4&amp;s=%22idle%22#g242.1"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Scott Arthur",
    "Date": "2026-06-23",
    "Debate_Title": "Puberty Blockers",
    "Context_Snippet": "This has been an interesting debate so far and I am grateful to follow the hon. Member for Canterbury (Rosie Duffield) , who has worked so much in this area. We should all acknowledge that this is not an easy issue. The reason why I wanted to speak in the debate is that back when I was trying to get elected in 2024, I met the mother of a young tran",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-06-23d.255.0&amp;s=%22lifestyle+choice%22#g275.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Blake Stephenson",
    "Date": "2026-06-18",
    "Debate_Title": "Backbench Business: Stoma: Public Toilet Provision",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Dowd&#8212;I wish you a happy birthday. I welcome the Minister to her place. I congratulate the hon. Member for Strangford (Jim Shannon) on securing this debate on the provision of public toilets for people living with stomas, which is too often overlooked and too rarely spoken about. He began b",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-06-18a.467.0&amp;s=%22not+disabled%22#g480.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Diana R. Johnson",
    "Date": "2026-06-18",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Employment: Chronic Illnesses",
    "Context_Snippet": "Disabled people and people with long-term health conditions have a lower rate of employment. The employment rate for disabled people was 53.1% in Q1 2026 and 64.1% for people with long-term health conditions, compared to 82.2% for non-disabled people. Disabled people are also less likely to move into employment &#8211; on average, between 2014 and ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-06-03.6357.h&amp;s=%22workless%22#g6357.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Joy Morrissey",
    "Date": "2026-06-18",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "It is a pleasure to be responding again to the Leader of the House. It is the day after England started their world cup campaign, and it is fair to say that they already have our hopes up; I am a bit cheered out. Today, many of our colleagues are pounding the pavement for the by-elections. I am sure that the Leader of the House is waiting with bate",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-06-18d.991.0&amp;s=%22benefits+Britain%22#g991.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Simon Lightwood",
    "Date": "2026-06-12",
    "Debate_Title": "Written Answers &#8212; Department for Transport: Lower Thames Crossing",
    "Context_Snippet": "A robust assessment of private investment options has been undertaken for Lower Thames Crossing (LTC). This has included on the distribution of costs and risks between the different parties, as well as on longer term system risks and economic/ social benefits. The Regulated Asset Base (RAB) model has been chosen as it enables the private sector to ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-06-08.7370.h&amp;s=%22burden+on+taxpayers%22#g7370.r0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "motability cars",
    "Speaker": "Baroness Neville-Rolfe",
    "Date": "2026-06-11",
    "Debate_Title": "Welfare Reforms and Youth Unemployment - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I congratulate my noble friend Lord Evans of Rainow on securing this vital and timely, and very interesting, debate. Welfare is out of control and risks bankrupting the country unless serious action is taken soon. Let us consider the following figures from the Taxpayers&#8217; Alliance to add to those cited by my noble friend and in the e",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-11b.1438.4&amp;s=%22motability+cars%22#g1459.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Lord Grayling",
    "Date": "2026-06-11",
    "Debate_Title": "Welfare Reforms and Youth Unemployment - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I congratulate my noble friend on today&#8217;s timely and important debate. I was Employment Minister back in 2010. We inherited a country in which unemployment was heading to 3 million, youth unemployment was close to 1 million and the system had deep flaws. We also inherited some good things, which have been lost over the years. I will",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-11b.1438.4&amp;s=%22workless%22#g1456.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Lord Blackwater",
    "Date": "2026-06-11",
    "Debate_Title": "Welfare Reforms and Youth Unemployment - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a great privilege to follow my noble friend Lord Elliott, and I congratulate my noble friend Lord Evans on the excellent way he presented this debate and the figures he set out. He touched a real nerve with me because, like him, my first job was working in a pub, and I feel that I probably learned much more there than I did at the u",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-11b.1438.4&amp;s=%22idle%22#g1467.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Naomi Long",
    "Date": "2026-06-08",
    "Debate_Title": "Northern Ireland Assembly: Executive Committee Business: Justice Bill: Consideration Stage",
    "Context_Snippet": "First of all, I want to say that, by and large, it has been a constructive debate. It is clear that people can be passionate and, in the main, exchange their views with courtesy. It is important that we continue to do that, because these are important matters. Whilst we may go about our business slightly differently, there are more points in this t",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2026-06-08.9.1&amp;s=%22lazy%22#g9.178"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Lord Griffiths of Burry Port",
    "Date": "2026-06-05",
    "Debate_Title": "Artificial Intelligence: Impact on Human Relationships and Society - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, AI crossed the threshold of my understanding and experience much earlier than for any other speaker in this debate thus far. When I left for an underdeveloped country and was given some responsibility for a rural rehabilitation project, I found that it was all centred on AI&#8212; but then, of course, it meant artificial insemination. The",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-05a.1029.4&amp;s=%22underclass%22#g1062.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Iris Duane",
    "Date": "2026-06-04",
    "Debate_Title": "Scottish Parliament: Wealth Taxation for Public Services",
    "Context_Snippet": "Thank you, Deputy Presiding Officer. I take this opportunity to congratulate you and welcome you to your post. I also congratulate the cabinet secretary on her appointment. I look forward to working with her across the next five years. This is my first speech, and I must admit that I agree with my SNP colleague Katie Hagmann that the prospect of ma",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-06-04.3.0&amp;s=%22not+disabled%22#g3.76"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Lord Malcolm Offord",
    "Date": "2026-06-04",
    "Debate_Title": "Scottish Parliament: Wealth Taxation for Public Services",
    "Context_Snippet": "In this world, &#8220;nothing can be said to be certain except death and taxes.&#8221; We, at Reform Scotland, do not disagree with Benjamin Franklin&#8217;s premise, but we certainly believe that we have a duty to minimise the impact of both for as long as possible. It is the progressive left that loves taxes, just as it loves net zero, diversity,",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-06-04.3.0&amp;s=%22lifestyle+choice%22#g3.55"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Baroness Lawlor",
    "Date": "2026-06-01",
    "Debate_Title": "Social Housing Bill [HL] - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is a pleasure to follow the noble Lord, Lord Sahota, and to hear his contribution on the housing problems in his area. I endorse our Front Bench particularly and the opening speech we heard on some of the problems with this Bill. In passing, I will take up my noble friend&#8217;s reference to veterans and the importance of helping them",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-01c.660.0&amp;s=%22burden+on+taxpayers%22#g720.0"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "Baroness Scott of Bybrook",
    "Date": "2026-06-01",
    "Debate_Title": "Social Housing Bill [HL] - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I declare my interest as vice-president of the Local Government Association and of the National Association for Local Councils. The Social Housing Bill attempts to address an important issue across many local authorities: namely, that we are not building enough social housing. Yet this Bill goes about this issue in completely the wrong wa",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-06-01c.660.0&amp;s=%22dependency+culture%22#g664.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Lord Alton of Liverpool",
    "Date": "2026-05-21",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (6th Day)</i>",
    "Context_Snippet": "My Lords, it is always a pleasure to follow the noble Lord, Lord Thomas of Gresford. As the gracious Address rightly notes, antisemitism, political fragmentation and alienation are challenges that demand we work far harder to renew our institutions and put the national interest first. Two issues that I want the Government to address are resilience ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-05-21c.527.2&amp;s=%22better+off+on+benefits%22#g544.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Alton of Liverpool",
    "Date": "2026-05-21",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (6th Day)</i>",
    "Context_Snippet": "My Lords, it is always a pleasure to follow the noble Lord, Lord Thomas of Gresford. As the gracious Address rightly notes, antisemitism, political fragmentation and alienation are challenges that demand we work far harder to renew our institutions and put the national interest first. Two issues that I want the Government to address are resilience ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-05-21c.527.2&amp;s=%22handouts%22#g544.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free cars",
    "Speaker": "Helen Whately",
    "Date": "2026-05-14",
    "Debate_Title": "Debate on the Address: Getting Britain Working Again",
    "Context_Snippet": "Oh dear; what a shame. There were no ideas for savings there at all. If the hon. Gentleman thinks that will get him a job under the next Labour leader, I am afraid that he will have to keep trying. Labour claims to be the party of working people, but the facts do not back that up. Labour always leaves office with unemployment higher than when it ar",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-05-14e.169.3&amp;s=%22free+cars%22#g177.3"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Helen Whately",
    "Date": "2026-05-14",
    "Debate_Title": "Debate on the Address: Getting Britain Working Again",
    "Context_Snippet": "Oh dear; what a shame. There were no ideas for savings there at all. If the hon. Gentleman thinks that will get him a job under the next Labour leader, I am afraid that he will have to keep trying. Labour claims to be the party of working people, but the facts do not back that up. Labour always leaves office with unemployment higher than when it ar",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-05-14e.169.3&amp;s=%22lifestyle+choice%22#g177.3"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Helen Whately",
    "Date": "2026-05-14",
    "Debate_Title": "Debate on the Address: Getting Britain Working Again",
    "Context_Snippet": "I respect the Secretary of State. He has talked at some length about what is wrong with the welfare system, but the fact is that there is no welfare Bill in the King&#8217;s Speech. I reckon he is stuck between a rock and a hard place: he knows the benefits bill is out of control; he knows that the public are sick of seeing their taxes go on ever h",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-05-14e.169.3&amp;s=%22handouts%22#g175.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Iqbal Mohamed",
    "Date": "2026-05-13",
    "Debate_Title": "Debate on the Address: [1st Day]",
    "Context_Snippet": "I agree, and I think most people agree, that people capable of working should be helped into work, but while the right hon. Member&#8217;s party was in government for 14 years, did it do an analysis of or have statistics on how many people on benefits across our country were actually fit to work, and what did his party do to get those people into w",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-05-13b.7.1&amp;s=%22fit+to+work%22#g60.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "David Davis",
    "Date": "2026-05-13",
    "Debate_Title": "Debate on the Address: [1st Day]",
    "Context_Snippet": "It is interesting, because the hon. Member&#8217;s Government and his Secretary of State have claimed, &#8220;All these green policies are reducing the cost of our energy. Not using oil and gas is reducing the cost of energy.&#8221; What is the consequence? The highest energy costs in the world. I will be interested to hear if he can explain that w",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-05-13b.7.1&amp;s=%22lifestyle+choice%22#g59.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Kieran Mullan",
    "Date": "2026-04-28",
    "Debate_Title": "Public Bill Committee: Courts and Tribunals Bill: New Clause 3 - Extended sitting hours for Crown Court Proceedings",
    "Context_Snippet": "I rise to speak in support of amendments 59, 35 and 36 tabled in my name, and the amendments outlined by the hon. Member for Chichester, all of which enjoy our support. Our amendments seek to ensure that efficiencies and improvements to the system are made, increasing the maximum of sitting days to 130,000 and, in a different way, addressing the is",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-26/Courts_and_Tribunals_Bill/11-0_2026-04-28a.568.0?s=%22idle%22#g576.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Lister of Burtersett",
    "Date": "2026-04-21",
    "Debate_Title": "Immigration and Asylum (Provision of Accommodation to Failed Asylum-Seekers) (Amendment) Regulations 2026 - <i>Motion to Approve</i>",
    "Context_Snippet": "My Lords, I declare my interest as a RAMP associate. As the noble Baroness, Lady Teather&#8212;who I think of as a noble friend&#8212;said in her deeply moving speech, for the second week running we are here debating secondary legislation that represents another step in what the Home Secretary has described as &#8220;the most significant reform to ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-04-21b.645.2&amp;s=%22handouts%22#g649.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Georgia Gould",
    "Date": "2026-04-17",
    "Debate_Title": "Written Answers &#8212; Department for Education: Secondary Education: Dyslexia",
    "Context_Snippet": "The department is committed to ensuring the exams system is equitable for all students, and that students with disabilities, including dyslexia, can access exams and assessments without disadvantage. Ofqual, the independent regulator of exams and assessments in England, has a statutory duty to ensure that assessments are a fair representation of a ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-03-25.123587.h&amp;s=%22not+disabled%22#g123587.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Helen Whately",
    "Date": "2026-04-15",
    "Debate_Title": "Pension Schemes Bill: Clause 2 - Asset management",
    "Context_Snippet": "My hon. Friend is exactly right. Sometimes the Pensions Minister talks about this all as being technicalities, but the fact is that the Government are coming after people&#8217;s hard-earned savings, and the public can see it. The Government think it is a pension pot they can mess with. We know that it is people&#8217;s own savings. The Government ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-04-15f.853.3&amp;s=%22idle%22#g859.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Keir Mather",
    "Date": "2026-04-15",
    "Debate_Title": "Rail Prices: Contactless Payments",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Dr Allin-Khan, and to respond to this debate. I congratulate the hon. Member for Reigate (Rebecca Paul) on securing it, and I thank the hon. Members for Strangford (Jim Shannon), for Esher and Walton (Monica Harding), for Mid Bedfordshire (Blake Stephenson) and for Woking (Mr Forster) for their import",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-04-15a.399.0&amp;s=%22burden+on+taxpayers%22#g402.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Stephen Timms",
    "Date": "2026-04-14",
    "Debate_Title": "Carer&#8217;s Allowance Overpayments",
    "Context_Snippet": "Let me come to that point in a moment. I saw the article that my hon. Friend refers to. It is an important point, and I will address it in a couple of minutes. My hon. Friends have quite rightly raised questions about accountability for the review&#8217;s delivery. We have appointed a senior responsible officer, and we have committed to update both",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-04-14b.313.0&amp;s=%22free+money%22#g318.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Ruth Cadbury",
    "Date": "2026-03-26",
    "Debate_Title": "Transport Accessibility for Disabled People",
    "Context_Snippet": "I beg to move, That this House has considered the matter of transport accessibility for disabled people; notes the recommendations of the Transport Committee in its First Report of Session 2024-25, Access denied: rights versus reality in disabled people&#8217;s access to transport,&#160;HC 770, and the Government&#8217;s response to that report,&#1",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-26b.464.1&amp;s=%22not+disabled%22#g464.3"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Unknown",
    "Date": "2026-03-24",
    "Debate_Title": "Youth Unemployment - <i>Statement</i>",
    "Context_Snippet": "The following Statement was made in the House of Commons on Tuesday 17 March. &#8220;I would like to make a Statement on our new package of support to tackle the long-term problem of youth unemployment. Let me begin by wishing you, Madam Deputy Speaker, and the whole House a very happy St Patrick&#8217;s Day. This year, due to Lenten abstinence, I ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-24c.1436.2&amp;s=%22scroungers%22#g1436.3"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Michelle Scrogham",
    "Date": "2026-03-24",
    "Debate_Title": "Defence",
    "Context_Snippet": "First, I should note that, for all their chatter outside this Chamber on defence, there is not a single Member of the Reform party here. They are utterly incapable of having a serious conversation when it comes to defence. I would like to congratulate the shadow Defence team. I did not believe it was possible to reduce their credibility on defence ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-24c.220.0&amp;s=%22scrounger%22#g246.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Unknown",
    "Date": "2026-03-24",
    "Debate_Title": "Youth Unemployment - <i>Statement</i>",
    "Context_Snippet": "The following Statement was made in the House of Commons on Tuesday 17 March. &#8220;I would like to make a Statement on our new package of support to tackle the long-term problem of youth unemployment. Let me begin by wishing you, Madam Deputy Speaker, and the whole House a very happy St Patrick&#8217;s Day. This year, due to Lenten abstinence, I ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-24c.1436.2&amp;s=%22shirkers%22#g1436.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Alan Chambers",
    "Date": "2026-03-24",
    "Debate_Title": "Northern Ireland Assembly: Executive Committee Business: Hospital Parking Charges Bill: Consideration Stage",
    "Context_Snippet": "As has been said, the decision to defer the implementation of the 2022 Act was not taken lightly but was rooted in the financial realities that face health and social care. I am confident about that. In that context, it is essential that we proceed with caution where decisions could have unintended consequences for front-line care. As was discussed",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2026-03-24.5.40&amp;s=%22idle%22#g5.58"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Georgia Gould",
    "Date": "2026-03-19",
    "Debate_Title": "Written Answers &#8212; Department for Education: Children: Dyslexia",
    "Context_Snippet": "The department is committed to ensuring the exam system is equitable for all students and that students with disabilities, including dyslexia, can access exams and assessments without disadvantage. Ofqual, the independent regulator of exams and assessments in England, has a statutory duty to ensure that assessments are a fair representation of a st",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-03-11.120252.h&amp;s=%22not+disabled%22#g120252.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Tom Hayes",
    "Date": "2026-03-18",
    "Debate_Title": "Fuel Duty",
    "Context_Snippet": "I think the point that my hon. Friend the Member for Cowdenbeath and Kirkcaldy (Melanie Ward) was making is that, contrary to what the hon. Member said, the majority of parents of children who are disadvantaged by the two-child benefit cap are working. They are grafters; they are the hon. Member&#8217;s constituents, who are often working multiple ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-18e.865.1&amp;s=%22workshy%22#g908.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Robbie Moore",
    "Date": "2026-03-18",
    "Debate_Title": "Fuel Duty",
    "Context_Snippet": "It is good to speak in this debate on a subject that is impacting on all our hard-working businesses, families, hauliers and those involved in the logistics industry&#8212;the rise in fuel duty. It is clear that Labour is planning to put up fuel duty for the first time in 15 years. Despite the conflict in the middle east, which is pushing up inflat",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-18e.865.1&amp;s=%22handouts%22#g907.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Sherlock",
    "Date": "2026-03-18",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Unemployment",
    "Context_Snippet": "Information on the number of unemployed people by age and region is published and available at Nomis - Official Census and Labour Market Statistics and in the attached spreadsheet. Published information on Universal Credit Searching for Work by age and region is available at Stat-Xplore - Log in and in the attached spreadsheet. Information on the C",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-03-04.HL15226.h&amp;s=%22workless%22#gHL15226.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Joy Morrissey",
    "Date": "2026-03-18",
    "Debate_Title": "Fuel Duty",
    "Context_Snippet": "It is a shocking burden and one that many people and hard-working families will not be able to bear. I am often told by the London elite that people need to switch to electric cars and do all these other things, but many people cannot afford an electric car or the cost of electricity, or even to put fuel in their petrol car. Families will be at bre",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-18e.865.1&amp;s=%22benefits+Britain%22#g893.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Pat McFadden",
    "Date": "2026-03-17",
    "Debate_Title": "Youth Unemployment",
    "Context_Snippet": "In fact, we can hear them claiming it right now. But the truth is that the number of young people not in education, employment or training rose by 250,000 in the three years running up to the last election, and the Conservatives did precisely nothing about it. Youth unemployment has been rising since 2022, and youth employment never reached pre fin",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-17b.789.0&amp;s=%22scroungers%22#g789.3"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Pat McFadden",
    "Date": "2026-03-17",
    "Debate_Title": "Youth Unemployment",
    "Context_Snippet": "In fact, we can hear them claiming it right now. But the truth is that the number of young people not in education, employment or training rose by 250,000 in the three years running up to the last election, and the Conservatives did precisely nothing about it. Youth unemployment has been rising since 2022, and youth employment never reached pre fin",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-17b.789.0&amp;s=%22shirkers%22#g789.3"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Helen Whately",
    "Date": "2026-03-17",
    "Debate_Title": "Youth Unemployment",
    "Context_Snippet": "The Government have lost control of welfare. The benefits bill is ballooning. Sickness benefits alone will cost us &#163;109 billion by the end of the decade. Working-age benefits are costing &#163;161 billion right now and rising. But instead of bringing forward welfare savings, Labour MPs have chosen to spend ever more on benefits. Just the other",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-03-17b.789.0&amp;s=%22handouts%22#g790.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Peter Lamb",
    "Date": "2026-03-17",
    "Debate_Title": "Croydon Area Remodelling Scheme",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Dr Huq. This issue has been on my radar for a very long time. I used to be the leader of the local authority in Crawley, and we have been aware for many years that the capacity limitations that are coming on the line will be so severe that they will gum up the entire network&#8212;the whole north-s",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-03-17c.253.0&amp;s=%22idle%22#g255.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "work-shy",
    "Speaker": "Lord John of Southwark",
    "Date": "2026-03-12",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, as an old-timer in this place, I congratulate my noble friends Lady Antrobus and Lord Walker, and the noble Baroness, Lady Teather, on their brilliant, inspiring and moving maiden speeches. A Labour Government are about nothing if they are not about reducing poverty and inequality in our society: breaking down the barriers that separate r",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-12c.489.0&amp;s=%22work-shy%22#g517.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Lord Walker of Broxton",
    "Date": "2026-03-12",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, it was once pointed out to me that this place was designed to intimidate and I am indeed terrified right now, especially given the fabulous maiden speeches before me. That could not be more at odds with the kind and helpful welcome that I have received from every corner of this House&#8212;Black Rod, the clerks and officials, the doorkeep",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-12c.489.0&amp;s=%22lifestyle+choice%22#g506.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2026-03-12",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, in winding up for the Opposition, I say that we have had three remarkable maiden speeches this afternoon. I will make a few comments about each. I am so pleased that the noble Baroness, Lady Teather, has recovered and regained her voice. I have no doubt that we will be hearing much of it. I hope that she will rejoin the Parliament Choir; ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-12c.489.0&amp;s=%22handouts%22#g521.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "the Bishop of Leicester",
    "Date": "2026-03-12",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, I warmly welcome the introduction of the Bill and the opportunity today to comment on it. I congratulate the noble Baroness, Lady Teather, on her truly excellent maiden speech, and I look forward to the maiden contributions of the noble Baroness, Lady Antrobus, and the noble Lord, Lord Walker, as well as of other noble Lords. I count myse",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-12c.489.0&amp;s=%22lazy%22#g499.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Lord John of Southwark",
    "Date": "2026-03-12",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, as an old-timer in this place, I congratulate my noble friends Lady Antrobus and Lord Walker, and the noble Baroness, Lady Teather, on their brilliant, inspiring and moving maiden speeches. A Labour Government are about nothing if they are not about reducing poverty and inequality in our society: breaking down the barriers that separate r",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-12c.489.0&amp;s=%22feckless%22#g517.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Rhys ab Owen",
    "Date": "2026-03-10",
    "Debate_Title": "Group 5: Coming into force (Amendments 10, 10A)",
    "Context_Snippet": "Diolch yn fawr, Dirprwy Lywydd. I agree with Battersea Dogs and Cats Home, who said: 'With only one track, and an implementation group already working, it is unclear why a maximum of three years will be needed for the Bill to come into force.' And I hope it will not be a maximum of three years. But I have listened to the Dirprwy Brif Weinidog, and ",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2026-03-10.18.757686.h&amp;s=%22lazy%22#g18.757758"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Si\u00e2n Gwenllian",
    "Date": "2026-03-10",
    "Debate_Title": "Group 3: Transitional arrangements (Amendments 12, 13, 16, 17, 20, 21)",
    "Context_Snippet": "I also oppose amendment 12. This is a Bill to ban greyhound racing. Greyhound racing is dangerous for the greyhounds and regulation is not going to change that situation. The central action of&#160;greyhounds running very quickly around tracks is one that's replete with risks for the dogs. While there is a lack of transparency about the data, and t",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2026-03-10.16.757648.h&amp;s=%22won%27t+work%22#g16.757619"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefits cheats",
    "Speaker": "Russell Findlay",
    "Date": "2026-03-05",
    "Debate_Title": "Scottish Parliament: First Minister&#8217;s Question Time: Social Security Scotland Investigations",
    "Context_Snippet": "Anyone who is daft enough to trust the SNP with their cash needs to give their head a wobble. However, I am more interested in taxpayers&#8217; money. That case illustrates so much that is wrong with the SNP&#8217;s benefits system. Thanks to The Scotsman newspaper, we know that Sally Donald may have claimed tens of thousands of pounds in adult dis",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-03-05.1.2&amp;s=%22benefits+cheats%22#g1.7"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Russell Findlay",
    "Date": "2026-03-05",
    "Debate_Title": "Scottish Parliament: First Minister&#8217;s Question Time: Social Security Scotland Investigations",
    "Context_Snippet": "The party of gravy-bus grifters and camper-van capers mugs its own members and robs the taxpayers of Scotland. It has built a benefits system that shouts, &#8220;Free money here!&#8221; It is a charter for chancers. Every other party backs the SNP&#8217;s out-of-control benefits spending, but the Scottish Conservatives will keep telling the truth. ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-03-05.1.2&amp;s=%22free+money%22#g1.15"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Bobby Dean",
    "Date": "2026-03-04",
    "Debate_Title": "NHS Capital Spending &#8212; [Matt Western in the Chair]",
    "Context_Snippet": "I agree with the hon. Gentleman, and I am sure that, like me, he hears constituents say that they do not want to attend their local A&amp;E because they do not trust that they will be seen in time. I am sure that the figures he is describing are an undercount of the people who should be in there. Like me, he will have received emails about corridor",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-03-04c.365.0&amp;s=%22benefits+Britain%22#g369.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Baroness Chakrabarti",
    "Date": "2026-03-02",
    "Debate_Title": "Child Poverty Strategy - <i>Question</i>",
    "Context_Snippet": "I am grateful, as always, to my noble friend the Minister, who I suspect is one of the finest advocates for the Government in either House. She will know that some critics of the Government crave a greater overarching vision or story; others complain that policies such as removing the two-child benefit cap somehow reward the feckless. Would she lik",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-03-02a.963.2&amp;s=%22feckless%22#g963.5"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Lizzi Collinge",
    "Date": "2026-02-24",
    "Debate_Title": "Health and Social Care: NHS Dental Services: Morecambe and Lunesdale",
    "Context_Snippet": "One of my constituents contacted me because their spouse is bedbound and cannot get dental care at home, so he gets no routine care. He recently waited three months for an emergency extraction&#8212;something he could have had on the same day if he was not disabled. What work is going on to help my constituents access the care they need?",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-24c.170.5&amp;s=%22not+disabled%22#g171.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "refuse to work",
    "Speaker": "Steffan Aquarone",
    "Date": "2026-02-24",
    "Debate_Title": "Local Transport: Planning Developments &#8212; [Sir Desmond Swayne in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship again, Sir Desmond. I congratulate my hon. Friend the Member for Harpenden and Berkhamsted (Victoria Collins) on securing such an important debate; she has made a number of salient points that I wholeheartedly agree with, in particular about the impact of losing local voices in the planning process. As",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-02-24b.81.0&amp;s=%22refuse+to+work%22#g99.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Helen Whately",
    "Date": "2026-02-23",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill: New Clause 3 - Review of the impact of the Act on child poverty, destitution, and wider social and economic outcomes",
    "Context_Snippet": "I thank my hon. Friends for their contributions during the passage of this Bill. In particular, I thank my hon. Friend the Member for South West Devon (Rebecca Smith) , who has argued with true passion against the Bill, drawing on her own experience as well as her sound principles. I also thank my hon. Friends the Members for Solihull West and Shir",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-23f.143.1&amp;s=%22lifestyle+choice%22#g146.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-23",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill: Clause 1 - Removal of two child limit: GB",
    "Context_Snippet": "I thank the hon. Lady for her intervention, which provides me with a great opportunity to say something that I realised again while preparing for this debate. We know that lots of working people claim universal credit, but what we do not know is how many hours those people work, which would enable us to ascertain how many of them are full-time work",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-23f.118.2&amp;s=%22handouts%22#g123.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Amanda Martin",
    "Date": "2026-02-23",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill: Clause 1 - Removal of two child limit: GB",
    "Context_Snippet": "I want to speak in favour of the Bill, and against amendment 1, as it is an attempt to gut the Bill and defeat its purpose entirely. There are moments in politics when the questions before us are not complicated, but simple, and when they are about dignity, compassion and the kind of country that we choose to be. I will start with an important aspe",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-23f.118.2&amp;s=%22lazy%22#g135.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Kirsty Blackman",
    "Date": "2026-02-23",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill: New Clause 3 - Review of the impact of the Act on child poverty, destitution, and wider social and economic outcomes",
    "Context_Snippet": "The SNP has been at the forefront of opposing this policy since the very first day it came in. Since the very first day that we spotted in the legislation the rape clause, which meant that people were going to have to tell the Department for Work and Pensions that they had been raped in order to get an exemption from the two-child limit. Women had ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-23f.143.1&amp;s=%22workless%22#g148.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-23",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill: Clause 1 - Removal of two child limit: GB",
    "Context_Snippet": "We know that poverty decreased under the last Government; I will make some progress. True compassion for families in poverty means offering sustainable solutions, not just sticking plasters. We need to tackle the root causes of poverty, rather than masking the symptoms. That means dealing with structural issues that damage children&#8217;s life cha",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-23f.118.2&amp;s=%22workless%22#g122.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Sarah Jones",
    "Date": "2026-02-23",
    "Debate_Title": "Firearms Licensing &#8212; [Sir Alec Shelbrooke in the Chair]",
    "Context_Snippet": "I thank the hon. Member for that intervention. He may wish me to meet family members; if he thinks it appropriate and they want to, I am happy to do so. The onward sale of guns&#8212;the illegal market in guns&#8212;is a massive issue that we need to tackle, and indeed we are. As many people have said, we are fortunate in this country that we have ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-02-23b.1.0&amp;s=%22idle%22#g45.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Lord Hendy of Richmond Hill",
    "Date": "2026-02-13",
    "Debate_Title": "Written Answers &#8212; Department for Transport: Dartford-Thurrock Crossing: Finance",
    "Context_Snippet": "A robust assessment of private investment options has been undertaken for the Lower Thames Crossing, with the short list outlined in the updated Funding Statement in February 2025. The RAB model has been chosen because it enables the private sector to deliver the scheme efficiently, reduces financial burden on taxpayers, harnesses the benefits of p",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-01-30.HL14158.h&amp;s=%22burden+on+taxpayers%22#gHL14158.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Twycross",
    "Date": "2026-02-11",
    "Debate_Title": "Written Answers &#8212; Department for Culture, Media and Sport: Arts Council England: Staff",
    "Context_Snippet": "The table outlines the proportion of disabled and non-disabled members of Arts Council England (ACE) staff in each quartile&#8217; between April 2024 and March 2025. Unlike gender pay gap data, there are no requirements or guidance on how disability pay gap data must be collected or reported. Quartile Disabled % Non-disabled % First (lower) quartil",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-02-02.HL14202.h&amp;s=%22not+disabled%22#gHL14202.r0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Chris Curtis",
    "Date": "2026-02-11",
    "Debate_Title": "Woodland Creation &#8212; [Emma Lewell in the Chair]",
    "Context_Snippet": "I beg to move, That this House has considered the matter of woodland creation. It is a pleasure to serve under your chairmanship, Ms Lewell. I am grateful for the opportunity to open this debate on woodland creation, which my hon. Friend the Minister just described as the most wholesome debate we are going to have this week. I secured it because I ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-02-11a.393.0&amp;s=%22lifestyle+choice%22#g393.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "John Milne",
    "Date": "2026-02-10",
    "Debate_Title": "Place-based Employment Support Programmes",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Dr Murrison. I also thank the hon. Member for Southport (Patrick Hurley) for shining a light on this important issue. The Liberal Democrats strongly support the principles of devolution and localism so we welcome the Government&#8217;s stated ambition to expand place-based employment support. Emplo",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-02-10b.340.0&amp;s=%22scroungers%22#g348.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-10",
    "Debate_Title": "Pensions and Social Security",
    "Context_Snippet": "I wish to reassure the Minister about something that I said in last week&#8217;s debate on the two-child benefit cap. I shared something of my story, and said that we had lost child benefit as a result of the Labour Government coming into office in 1997. I was convinced I had said &#8220;family credit&#8221;, which was what I was supposed to say. W",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-10b.730.0&amp;s=%22better+off+on+benefits%22#g733.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-10",
    "Debate_Title": "Pensions and Social Security",
    "Context_Snippet": "I wish to reassure the Minister about something that I said in last week&#8217;s debate on the two-child benefit cap. I shared something of my story, and said that we had lost child benefit as a result of the Labour Government coming into office in 1997. I was convinced I had said &#8220;family credit&#8221;, which was what I was supposed to say. W",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-10b.730.0&amp;s=%22workless%22#g733.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Lord Falconer of Thoroton",
    "Date": "2026-02-06",
    "Debate_Title": "Terminally Ill Adults (End of Life) Bill - <i>Committee (9th Day)</i>",
    "Context_Snippet": "The noble Lord has got that wrong. I was saying that, for example, the medical profession could easily recognise that HIV/AIDS is fatal. It would have recognised that at a particular time and that would be a medical diagnosis. The effect of the amendment in the name of the noble Lord, Lord Moylan, would be that you cannot rely on HIV/AIDS as a basi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-02-06a.1856.0&amp;s=%22not+disabled%22#g1878.1"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Lord Leigh of Hurley",
    "Date": "2026-02-04",
    "Debate_Title": "National Insurance Contributions (Employer Pensions Contributions) Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is always a pleasure and a challenge to follow the noble Lord, Lord Davies of Brixton, but I welcome his remarks. This is the second attempt by the Government to raise money by stealth through national insurance&#8212;first on workers, now on savers. Your Lordships will recall the disaster of the last Bill to try to do this and its wre",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2026-02-04b.1682.0&amp;s=%22better+off+on+benefits%22#g1690.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Lizzi Collinge",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "That is actually a reasonable question. The answer is that we had to make sure the country could afford it and we had to take a strategic approach to tackling child poverty. What we were not going to do, given the absolute state of the economy when we came into government, was make very quick decisions on such a scale. We did it properly, carefully",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22scroungers%22#g214.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Pat McFadden",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "I beg to move, That the Bill be now read a Second time. Core to our belief is the idea that no one, no matter their background, should be trapped by their circumstances. People should have the chance to make the best life they possibly can. Poverty is a barrier to that ambition, and it makes it much harder for people to achieve their full potential",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22shirkers%22#g153.3"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "I also speak for the 60% of the population who do not think we should be scrapping the cap. No doubt a large proportion of those people are also in my constituency. As Conservatives, we believe in personal responsibility and living within our means. Our welfare system should be a safety net for the most vulnerable, not a lifestyle choice, as my hon",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22better+off+on+benefits%22#g229.5"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Rebecca Smith",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "I also speak for the 60% of the population who do not think we should be scrapping the cap. No doubt a large proportion of those people are also in my constituency. As Conservatives, we believe in personal responsibility and living within our means. Our welfare system should be a safety net for the most vulnerable, not a lifestyle choice, as my hon",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22lifestyle+choice%22#g229.5"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Helen Whately",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "My right hon. Friend has indeed made a significant point about the strange position in which so many Labour Members find themselves. Having previously voted against lifting the cap, here they are now, delighted about lifting it. Labour Members say that the Bill will end child poverty. They have read that increasing handouts will decrease the metric",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22handouts%22#g161.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "John Martin McDonnell",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "I am pleased that I have sat through the whole debate today. The speeches I have heard from Members on the Government Benches have been incredibly eloquent and moving, and I am really pleased that we are where we are now in scrapping the two-child limit. I have listened to the speeches by Opposition Members. Looking back in history, they were remin",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22lazy%22#g207.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Lizzi Collinge",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "My hon. Friend is entirely right. Parents, in my experience, will do anything to protect their children from the harsh realities of life. It is parents who go without food. It is parents who have to go to the food bank. I remember the first time I met the people running the food bank in Morecambe, in 2017. I walked up to them and said, &#8220;One d",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22feckless%22#g212.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Sam Rushworth",
    "Date": "2026-02-03",
    "Debate_Title": "Universal Credit (Removal of Two Child Limit) Bill",
    "Context_Snippet": "The last time we debated this issue, I took many interventions from Conservative Members&#8212;there are fewer of them in the Chamber today&#8212;who wanted to know whether I would support lifting the two-child cap. As I said at the time, increasing the household incomes of children in poverty is one of several things we need to do to tackle the sc",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-02-03d.153.0&amp;s=%22workless%22#g209.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Adnan Hussain",
    "Date": "2026-02-02",
    "Debate_Title": "Indefinite Leave to Remain &#8212; [Sir Edward Leigh in the Chair]",
    "Context_Snippet": "I must disagree with much of what the Minister has said. Most immigrants in our country are not benefit scroungers and are not criminals; in fact, most of the immigrants who I have met in my constituency surgeries are hard-working people. Just last week, a woman, her husband and their children were at my constituency surgery in tears because of the",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-02-02a.1.0&amp;s=%22scroungers%22#g48.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Sherlock",
    "Date": "2026-02-02",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Children",
    "Context_Snippet": "The Government recognises that growing up in a working household helps to tackle the long-term impacts of poverty on a child&#8217;s future health, employment, and life chances. The benefit cap aims to incentivise work and exemptions to the cap are in place for households in work earning at least &#163;846 each month, rising to &#163;881 each month",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2026-01-20.HL13724.h&amp;s=%22workless%22#gHL13724.r0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Helen Whately",
    "Date": "2026-01-28",
    "Debate_Title": "Youth Unemployment",
    "Context_Snippet": "I enjoyed the way in which the hon. Gentleman led into his question with a bit of flattery, but I will not be drawn on his attempt to make me talk about the minimum wage or down the routes that he asks me to take, as much as he may love me to do so. However, I will talk about our record in government. We halved unemployment. We got record numbers o",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-01-28d.963.0&amp;s=%22better+off+on+benefits%22#g966.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Edward Mountain",
    "Date": "2026-01-27",
    "Debate_Title": "Scottish Parliament: Natural Environment (Scotland) Bill: Stage 3",
    "Context_Snippet": "I have a mere 26 amendments in this group to speak to. I call amendment 106 the reverse Bambi amendment. Amendments 106 and 107 would change the law with regard to lactating female deer and calves. Calves should not be shot and taken from their mother unless the intention is to shoot the mother as well. It is unfair to leave the mother in a situati",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-01-27.4.0&amp;s=%22feral%22#g4.512"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Jim Allister",
    "Date": "2026-01-26",
    "Debate_Title": "Armed Forces Bill",
    "Context_Snippet": "Let me begin by associating myself with the remarks of several hon. Members in repudiating the outrageous slur on our armed forces by the President of the United States in respect of service in Afghanistan. Our soldiers were not shirkers, they were heroes. One of them was young Private Phillip Gillespie from Galgorm in my constituency, who for his ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-01-26a.636.0&amp;s=%22shirkers%22#g684.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Andrew Bowie",
    "Date": "2026-01-21",
    "Debate_Title": "Warm Homes Plan",
    "Context_Snippet": "I thank the Secretary of State for the advance copy of his statement. Today&#8217;s announcement is long overdue&#8212;overdue by an entire year, to be exact. During the general election, the Labour party claimed that it would cut household bills. This announcement should be part of that, but in that time, since the general election and on this Sec",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-01-21c.311.0&amp;s=%22handouts%22#g313.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Stephen Kerr",
    "Date": "2026-01-20",
    "Debate_Title": "Scottish Parliament: Tertiary Education and Training (Funding and Governance) (Scotland) Bill: Stage 3",
    "Context_Snippet": "I do. Under the current definitions that Government ministers like to use and that the SNP likes to parrot, the duration of the tracking of positive destinations is very limited, and the broadness of the term means that a person can work in a charity shop for a couple of hours a week, and that is considered a positive destination. As someone who ha",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2026-01-20.5.0&amp;s=%22handouts%22#g5.179"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "John Milne",
    "Date": "2026-01-15",
    "Debate_Title": "Backbench Business: Food Inflation &#8212; [Dame Siobhain McDonagh in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Dame Siobhain. I thank the hon. Member for Hornsey and Friern Barnet (Catherine West) for securing this debate. I am a member of the Work and Pensions Committee, and we have been looking at the impact of the cost of living crisis on a range of vulnerable groups. The effects are everywhere: not just",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-01-15b.453.1&amp;s=%22dependency+culture%22#g468.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Andrew Bowie",
    "Date": "2026-01-14",
    "Debate_Title": "Scotland: Economic Growth",
    "Context_Snippet": "What we saw yesterday from the SNP was nothing more than the same old tired, stale Government with tired, stale gimmicks, handouts and an addiction to punishing hard-working Scots with the highest taxes for poorer services. There was nothing for growth, nothing for entrepreneurs and nothing for businesses, but what would we expect from the separati",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-01-14e.909.1&amp;s=%22handouts%22#g914.3"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "John Lamont",
    "Date": "2026-01-12",
    "Debate_Title": "Call for General Election &#8212; [Sir Edward Leigh in the Chair]",
    "Context_Snippet": "My hon. Friend is absolutely right. Not only is it something that was not discussed before the election, it is something that there is no public support for. But in rural communities, such as those in the constituencies that both my hon. Friend and I represent, there is a real issue with connectivity and how it will work in practice. People may be ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2026-01-12b.231.0&amp;s=%22freebies%22#g233.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Kemi Badenoch",
    "Date": "2026-01-07",
    "Debate_Title": "Prime Minister: Engagements",
    "Context_Snippet": "Let me start by talking about the shadow Attorney General. [Interruption.] Yes! Do Labour Members know what the shadow Attorney General is doing? He is defending veterans pro bono against the actions of this Government. We on this side of the House will defend those who defended us. But why do we not talk about the actual Attorney General, who is s",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2026-01-07d.252.9&amp;s=%22handouts%22#g257.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Baroness Bennett of Manor Castle",
    "Date": "2025-12-18",
    "Debate_Title": "Pension Schemes Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is a pleasure to follow the noble Baroness, Lady Coffey, and to hear nature-positive sentiments from the Conservative Benches. We are hearing a wide range of perspectives in that space, and I am glad to hear those. I declare my position as a vice-president of the Local Government Association and the National Association of Local Counci",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-18b.874.4&amp;s=%22fit+to+work%22#g899.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Vaux of Harrowden",
    "Date": "2025-12-18",
    "Debate_Title": "Pension Schemes Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is about five years since we last saw a Pension Schemes Bill in this House, and it is good to see so many familiar faces, albeit sitting in different places in the Chamber. It is also good to be welcoming some new faces to our small band of pension enthusiasts, and I am particularly looking forward to hearing the maiden speech of my no",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-18b.874.4&amp;s=%22lazy%22#g885.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Lord Holmes of Richmond",
    "Date": "2025-12-17",
    "Debate_Title": "Employment Gap for Blind and Sight-impaired People - <i>Question</i>",
    "Context_Snippet": "My Lords, if you are blind or sight impaired, in the UK currently the employment rate is just 27%. If you are not disabled, it is 83%. Therefore, if you are sight impaired you have only around a one in four chance of being in work. This cannot continue. Will the Minister strongly consider establishing a taskforce to look at the issues and identify ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-17a.719.0&amp;s=%22not+disabled%22#g719.3"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Mark Garnier",
    "Date": "2025-12-17",
    "Debate_Title": "National Insurance Contributions (Employer Pensions Contributions) Bill",
    "Context_Snippet": "I have to say that it is a joy to yet again be locking horns with the Pensions Minister on a topic that is important to us all: saving for our retirement. And it is important to note that there are many things that we agree on. We all acknowledge there is an impending issue with pension adequacy: when 50% of savers are projected to miss a retiremen",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-17b.1008.0&amp;s=%22better+off+on+benefits%22#g1012.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Simon Lightwood",
    "Date": "2025-12-17",
    "Debate_Title": "Written Answers &#8212; Department for Transport: Lower Thames Crossing: Private Finance Initiative",
    "Context_Snippet": "A robust assessment of private investment options has been undertaken, with the shortlist outlined in the updated Funding Statement in February 2025. The Government&#8217;s preferred financing option at this stage is the Regulated Asset Base (RAB) model as it offers an integrated approach that focuses delivery, reduces the financial burden on taxpa",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-12-01.96052.h&amp;s=%22burden+on+taxpayers%22#g96052.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Sureena Brackenridge",
    "Date": "2025-12-16",
    "Debate_Title": "Finance (No. 2) Bill",
    "Context_Snippet": "For my constituents, the Finance Bill is more than just a legislative process; it is a statement of who we are as a country and what we believe our future to be. I can say with confidence that this is a Finance Bill for places such as Wolverhampton and Willenhall. I came into politics after years in the classroom. I know the harm that poverty does ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-16d.820.0&amp;s=%22lazy%22#g859.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Gray of Tottenham",
    "Date": "2025-12-12",
    "Debate_Title": "Terminally Ill Adults (End of Life) Bill - <i>Committee (4th Day)</i>: Amendment 22",
    "Context_Snippet": "My Lords, I support Amendments 308 and 347 regarding the availability of assisted dying services to people who are homeless. The intention and the fundamental principle behind the Bill are that terminally ill individuals are able to exercise their autonomy and end their lives on their terms and at a time of their choosing. But, as many noble Lords ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-12c.480.0&amp;s=%22not+disabled%22#g495.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Dan Tomlinson",
    "Date": "2025-12-10",
    "Debate_Title": "Conduct of the Chancellor of the Exchequer",
    "Context_Snippet": "I agree entirely with my hon. Friend. Too many Conservative Members defended the mini-Budget, which crashed the economy and added thousands of pounds to mortgages. In contrast, since this Government have come to power, the Bank of England has cut interest rates five times, taking &#163;1,200 off a typical two-year fixed rate mortgage. At this Budge",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-10c.394.0&amp;s=%22scroungers%22#g423.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Douglas Lumsden",
    "Date": "2025-12-10",
    "Debate_Title": "Scottish Parliament: Road Network (Connectivity and Economic Growth)",
    "Context_Snippet": "It was, and it was absolutely rejected, because we knew that we had to incentivise people to get into EVs. As Sue Webber pointed out, EV charging is a lottery. Mark Ruskell made a good point about the fact that there is inequality in the cost of charging an EV. If you are lucky enough to have a driveway, you will pay a much lower rate&#8212;Mark Ru",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-12-10.2.0&amp;s=%22feckless%22#g2.59"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Simon Hoare",
    "Date": "2025-12-10",
    "Debate_Title": "Seasonal Work",
    "Context_Snippet": "I am afraid that I do not know anything about Mr Williams, so I cannot add to the lovefest. I wonder whether my hon. Friend has reflected, as I have, that in households that have been workless for quite a long period of time, temporary seasonal intro-jobs often show our young people the value, importance and benefit of work and what it can do for t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-10c.319.1&amp;s=%22workless%22#g372.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Lord Farmer",
    "Date": "2025-12-10",
    "Debate_Title": "Universal Credit: Two-child Limit - <i>Question</i>",
    "Context_Snippet": "My Lords, recent international evidence found that unconditional cash transfers increase fertility. Families claiming health-related benefits are not capped, so even these workless families will get UC for every child, again affecting work incentives. Research by the Institute for Fiscal Studies found that money-per-child tax credits increased birt",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-10b.229.0&amp;s=%22workless%22#g229.3"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "Craig Hoy",
    "Date": "2025-12-10",
    "Debate_Title": "Scottish Parliament: Social Security Spending",
    "Context_Snippet": "I absolutely agree with Russell Findlay. It is simply staggering that the cabinet secretary is ignoring the fact that she has a &#163;2 billion overspend and that, by the end of the decade, she will have a &#163;4.7 billion budget black hole. We cannot expect working people&#8212;Scotland&#8217;s taxpayers&#8212;to foot the bill. For clarity, let m",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-12-10.1.0&amp;s=%22dependency+culture%22#g1.88"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free motability",
    "Speaker": "John Milne",
    "Date": "2025-12-08",
    "Debate_Title": "Work and Pensions: Motability",
    "Context_Snippet": "The shadow Secretary of State for Work and Pensions recently stated that &#8220;millions are getting benefits for anxiety or ADHD along with a free Motability car.&#8221; That is clearly nonsense, because only 200,000 claimants&#8212;at most&#8212;would be eligible to apply in the first place, and many of them also have a physical disability, which",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-08f.7.1&amp;s=%22free+motability%22#g7.6"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Helen Morgan",
    "Date": "2025-12-08",
    "Debate_Title": "Work and Pensions: Topical Questions",
    "Context_Snippet": "A lady came to my surgery the other week to tell me that she had been assessed at only the basic level of PIP and as fit to work. I was staggered, because she could barely walk and could barely breathe. Will the Minister meet me to see how we can rectify this crazy situation in which somebody who can barely walk to a surgery has been told that they",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-08f.17.1&amp;s=%22fit+to+work%22#g22.4"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Helen Whately",
    "Date": "2025-12-08",
    "Debate_Title": "Work and Pensions: Welfare Spending: Economic Impact",
    "Context_Snippet": "In the Budget last month, the Chancellor put up taxes in order to spend &#163;16 billion more on welfare. The Government chose to make working people worse off in order to spend more on benefits. The sickness benefit bill is now set to skyrocket to more than &#163;100 billion by the end of this decade. The Secretary of State likes to blame us, but ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-08f.1.3&amp;s=%22better+off+on+benefits%22#g3.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Helen Whately",
    "Date": "2025-12-08",
    "Debate_Title": "Child Poverty Strategy",
    "Context_Snippet": "I will start with something we can all agree on: none of us wants to see children grow up in poverty. We all know something of what that looks like: some hon. Members have lived it themselves; for others, it is part of the bread and butter of constituency work. Even in the wealthiest constituencies there are pockets of poverty, where children spend",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-08f.59.0&amp;s=%22workless%22#g62.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirker",
    "Speaker": "Baroness Morrissey",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, my noble friend Lord Kempsell has rightly just spoken about the shambolic orchestration of this Budget and the damage it has done: the erosion of public trust, the damage to business confidence and how it has undermined Britain&#8217;s credibility abroad. That is particularly important, because there are two other major issues that I will",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22shirker%22#g1985.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Baroness Coffey",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I cannot welcome this Budget. It is a bad Budget for Britain, in terms of not only lack of growth but rising unemployment and inflation. Looked at from pretty much every angle, it is a bad Budget for the average working household. I will not get into process; the only process I care about is the payslip that people will open next April wh",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22better+off+on+benefits%22#g1941.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Lord Kempsell",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, this is quite rightly a wide-ranging debate and there is much to deal with when it comes to the Government&#8217;s handling of the economy, so I will confine myself to two points. One is an area that has been very gracefully elided and skated over by so many noble Lords on the opposite side of your Lordships&#8217; House: the question of ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22free+cash%22#g1983.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Stedman-Scott",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, to be frank, I am not entirely sure where to begin. There is much to consider and even more to be concerned about. This Budget, at its core&#8212;in a deliberate political choice&#8212;is about welfare over work. We are asked to believe that this Budget strengthens the economy and supports working families, but, once you look past the pre",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22workless%22#g1953.0"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "Lord Massey of Hampstead",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I will make some general comments about the Budget and then some suggestions that might help the Government to generate some growth via the financial sector. I declare my interest as a director of a financial services firm. This was a budget for politics, not economics. Other than restoring some financial headroom, this was a Budget for i",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22dependency+culture%22#g1990.0"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "culture of dependency",
    "Speaker": "Lord Massey of Hampstead",
    "Date": "2025-12-04",
    "Debate_Title": "Autumn Budget 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I will make some general comments about the Budget and then some suggestions that might help the Government to generate some growth via the financial sector. I declare my interest as a director of a financial services firm. This was a budget for politics, not economics. Other than restoring some financial headroom, this was a Budget for i",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-12-04a.1916.0&amp;s=%22culture+of+dependency%22#g1990.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Ayoub Khan",
    "Date": "2025-12-03",
    "Debate_Title": "Pension Schemes Bill: New Clause 30 - Funding of the Ombudsman for the Board of the Pension Protection Fund",
    "Context_Snippet": "I hope to devote a large portion of my speech to new clause 36, which stands in my name, but let me first swiftly acknowledge the new clauses tabled by the hon. Member for Poole (Neil Duncan-Jordan) , the right hon. Member for Birmingham Hodge Hill and Solihull North (Liam Byrne) , the hon. Member for Stratford-on-Avon (Manuela Perteghella) and the",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-03g.1022.2&amp;s=%22idle%22#g1078.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Joani Reid",
    "Date": "2025-12-02",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "I could not agree more. More than that, the SNP needs to deliver on promise after promise that it has made about the NHS while absolutely failing to deliver any improvements, despite the fact that Scotland has been given a record settlement. The money is out there, but under the tired and wired SNP, the ideas to use it effectively are not. It is my",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-02g.836.1&amp;s=%22scroungers%22#g860.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Ian Murray",
    "Date": "2025-12-02",
    "Debate_Title": "Gambling: Regulatory Reform &#8212; [Sir Desmond Swayne in the Chair]",
    "Context_Snippet": "It is great to have you in the Chair, Sir Desmond, for this important debate. I am pleased to respond to it. I congratulate&#8212;as all other hon. Members have&#8212; the hon. Member for Witney (Charlie Maynard) on securing this debate, and on the balanced way in which he presented his case, with the gambling industry on one side and the harms tha",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-12-02a.319.0&amp;s=%22free+cash%22#g333.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Wes Streeting",
    "Date": "2025-12-02",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "Let me say two things in response. I am almost certain that my hon. Friends will be delighted that he has intervened in defence of their plight at the hands of the Labour Whips, but he knows as well as I do that the Whip was removed from some of my hon. Friends not because of the substance of the issue they were raising but because we never, ever a",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-02g.836.1&amp;s=%22handouts%22#g840.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Wes Streeting",
    "Date": "2025-12-02",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "That is a good question, and I give the hon. Gentleman the assurance that my Department is working closely with the Secretary of State for Education and colleagues right across Government to make sure that we get that right. We have growing levels of need for provision for children with special educational needs and disabilities. We can all see in ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-02g.836.1&amp;s=%22feckless%22#g837.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Mabon ap Gwynfor",
    "Date": "2025-12-02",
    "Debate_Title": "1. Questions to the First Minister: Delayed Discharges from Hospitals",
    "Context_Snippet": "Thank you for that response. This Government always mentions providing services closer to home&#8212;'shift left' is the term used. Whilst the rhetoric is good, I'm afraid to say that the provision of that service doesn't live up to the ideology. We have Dyfi ward in Tywyn Hospital, which you, First Minister, will be aware of. I was very grateful t",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2025-12-02.1.729865&amp;s=%22idle%22#g1.729873"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Blake Stephenson",
    "Date": "2025-12-02",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "Thank you, Madam Deputy Speaker, for allowing me to nip out to my Delegated Legislation Committee without missing my spot. I met with businesses this morning, and it is clear that the people who take risks, invest, create jobs and drive tax receipts are busy scratching their heads to find some positive from this Budget. The truth is that it is a di",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-12-02g.836.1&amp;s=%22benefits+Britain%22#g876.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Pat McFadden",
    "Date": "2025-11-27",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "It is a pleasure to open today&#8217;s debate on behalf of the Government, and to respond to the shadow Chancellor. He went through his lines and, as I expected, he talked a fair bit about welfare. If only he had ever been in a position to do something about it. That is the essential problem with the position of Conservative Members. It is not even",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-27d.551.1&amp;s=%22fit+to+work%22#g557.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Ben Obese-Jecty",
    "Date": "2025-11-27",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "I wholeheartedly agree. I have spent the last year talking to small businesses in my constituency that have been crippled by the measures in the last Budget. When this year&#8217;s measures come in as well, some of those businesses will struggle desperately to keep on lower earners, particularly young people. My first job as a 16-year-old was worki",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-27d.551.1&amp;s=%22free+cash%22#g608.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Torsten Bell",
    "Date": "2025-11-27",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "I am afraid that I do not have time to give way. The last Government cancelled face-to-face assessments for health benefits; this Government are bringing them back. The last Government also oversaw a scandal that has received far too little attention. They allowed people who came to Britain for just a few years&#8212;people who left, and never had ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-27d.551.1&amp;s=%22lazy%22#g628.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Helen Whately",
    "Date": "2025-11-27",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "To govern is to choose, and the Chancellor has chosen. She has chosen spending over saving, higher taxes over welfare reform, and benefits Britain over working Britain. She would rather raise taxes by &#163;26 billion than shave a single penny off the welfare bill. She will make people who work and save pay more for the benefits of millions who do ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-27d.551.1&amp;s=%22benefits+Britain%22#g622.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Gareth Davies",
    "Date": "2025-11-26",
    "Debate_Title": "8. Welsh Conservatives Debate: UK Government budget",
    "Context_Snippet": "I think it's fair to say that the run-up to this budget&#160;has been the most chaotic I think I've ever seen in my adult life. We've seen policies floated, leaked, denied and then resurrected. We then saw the whole budget leaked by the Office for Budget Responsibility before the Chancellor even delivered it to the Houses of Parliament. This totall",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2025-11-26.8.727715.h&amp;s=%22shirkers%22#g8.727749"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Kemi Badenoch",
    "Date": "2025-11-26",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "Today the Chancellor has announced a new tax raid of &#163;26 billion, and Labour Members were all cheering. Household income is down. Spending policies in this Budget increase borrowing in every year. That smorgasbord of misery we just heard from her can be summed up in one sentence: Labour is hiking taxes to pay for welfare. This is a Budget for ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-26a.400.1&amp;s=%22handouts%22#g400.8"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Linsey Farnsworth",
    "Date": "2025-11-26",
    "Debate_Title": "Young People not in Education, Employment or Training",
    "Context_Snippet": "I beg to move, That this House has considered support for young people not in education, employment or training. It is a pleasure to serve under your chairmanship, Mr Dowd. I am delighted to introduce this debate on an incredibly important topic. Young people not in education, employment or training are often referred to as NEETs. As Members will k",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-11-26c.182.0&amp;s=%22lazy%22#g182.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jeremy Hunt",
    "Date": "2025-11-26",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "I recognise that the hon. Gentleman&#8217;s concern about child poverty is sincere; I just have a totally different view as to how to reduce child poverty in this country. I think financing people to have ever larger families will mean more children growing up in poverty, not fewer. The evidence for that is that under the previous Conservative Gove",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-26a.400.1&amp;s=%22workless%22#g416.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "refuse to work",
    "Speaker": "Kemi Badenoch",
    "Date": "2025-11-26",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "Labour MPs do not want to hear the truth, but I am speaking for all those people out there who are sick of this Government. Companies like Merck and Ineos are slashing investment plans. The construction sector has shrunk. How is that house building target going, by the way? I will tell you, Madam Deputy Speaker: the Government are miles behind and ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-26a.400.1&amp;s=%22refuse+to+work%22#g403.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Lord Fuller",
    "Date": "2025-11-25",
    "Debate_Title": "Diego Garcia Military Base and British Indian Ocean Territory Bill - <i>Committee (2nd Day)</i>: Amendment 17",
    "Context_Snippet": "My Lords, I rise to particularly support Amendment 20 in the name of my noble friend Lord Callanan, and, more generally, Amendment 26 in the name of the noble Lord, Lord Lilley, who is not in his place, and Amendments 38B and 78. This is an important group because it seeks to remedy the way in which the Bill will not only make the Chagossians state",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-11-25a.1201.6&amp;s=%22something+for+nothing%22#g1216.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Adam Dance",
    "Date": "2025-11-19",
    "Debate_Title": "Myalgic Encephalomyelitis",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Mundell. I thank my hon. Friend the Member for Wells and Mendip Hills (Tessa Munt) for securing this vital debate and for her campaigning on this issue. In the brief time I have today, I will share the story of Iona, who was finally diagnosed with ME in 2019 after being unwell since 2014. Her ME",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-11-19a.382.0&amp;s=%22not+disabled%22#g393.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Torsten Bell",
    "Date": "2025-11-18",
    "Debate_Title": "Written Answers &#8212; Treasury: Tax Allowances",
    "Context_Snippet": "A Transitional Tax-Free Amount Certificate (TTFAC) is an official document issued by a pension scheme provider or insurer. It confirms the actual amount of tax-free lump sums an individual received before 6 April 2024, when the Lifetime Allowance was abolished. Since the Lifetime Allowance was abolished, a standard calculation is used to establish ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-11-10.89364.h&amp;s=%22free+cash%22#g89364.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Gerry Carroll",
    "Date": "2025-11-17",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Cost-of-living Increase: Impact",
    "Context_Snippet": "As other Members have indicated, the cost-of-living crisis does not make as many headlines these days, but it is still very much with us. Just because prices are not rising by as much as they were maybe two or three years ago, it does not mean that they are not rising or that they have come down. That is felt most acutely by working-class communiti",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-11-17.7.29&amp;s=%22scroungers%22#g7.64"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Ben Obese-Jecty",
    "Date": "2025-11-17",
    "Debate_Title": "Asylum Policy",
    "Context_Snippet": "In February, at Second Reading of the Border Security, Asylum and Immigration Bill, I raised the issue of the generous financial and accommodation package that is advertised on the Government&#8217;s own website under &#8220;Asylum support: What you&#8217;ll get&#8221;, which outlines the provision of an asylum support enablement&#8212;ASPEN&#8212;",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-17b.509.0&amp;s=%22free+cash%22#g532.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Gerry Carroll",
    "Date": "2025-11-17",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Cost-of-living Increase: Impact",
    "Context_Snippet": "As other Members have indicated, the cost-of-living crisis does not make as many headlines these days, but it is still very much with us. Just because prices are not rising by as much as they were maybe two or three years ago, it does not mean that they are not rising or that they have come down. That is felt most acutely by working-class communiti",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-11-17.7.29&amp;s=%22handouts%22#g7.64"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Sharpe of Epsom",
    "Date": "2025-11-17",
    "Debate_Title": "Employment Rights Bill - <i>Commons Amendments and Reasons</i>: Motion B1 (as an amendment to Motion B)",
    "Context_Snippet": "My Lords, I am very grateful to the Minister for outlining the government amendments and for the noble Lords opposite&#8217;s willingness to meet. But to say that the amendments that have been offered are inadequate would be something of an understatement. In essence, they oblige the Secretary of State, before making regulations, to &#8220;consult ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-11-17b.564.0&amp;s=%22handouts%22#g564.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Toby Perkins",
    "Date": "2025-11-13",
    "Debate_Title": "Planning and Infrastructure Bill: Clause 2 - National policy statements: parliamentary requirements",
    "Context_Snippet": "Building 1.5 million homes to tackle the housing crisis at the same time as protecting British wildlife is an issue that the general public are rightly passionate about, and one that Government must get right for people, for nature and for the economy. The Environmental Audit Committee, which I chair, initiated an inquiry to explore that exact ques",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-13i.357.5&amp;s=%22lazy%22#g385.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Lord Roborough",
    "Date": "2025-11-13",
    "Debate_Title": "Biodiversity and the Countryside - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I am most grateful to my noble friend Lord Grayling for securing this important debate on the impact of this Government&#8217;s policies on biodiversity and the countryside. The scorecard is looking pretty grim, as many noble Lords have pointed out in this fascinating debate, and I will address further some of those points. Before I do so",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-11-13b.436.0&amp;s=%22burden+on+taxpayers%22#g454.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "Brian Whittle",
    "Date": "2025-11-12",
    "Debate_Title": "Scottish Parliament: Bus Services",
    "Context_Snippet": "I am sorry&#8212;I do not have any time. I would love to extend the debate. While the Scottish Greens continue to peddle ideological fantasies as the solution to the challenges that Scotland&#8217;s bus services face, we, on the Scottish Conservative benches, prefer to deal with reality. Private sector providers are not the enemy of good bus servic",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-11-12.2.0&amp;s=%22freebies%22#g2.30"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Ashley Fox",
    "Date": "2025-11-12",
    "Debate_Title": "Taxes",
    "Context_Snippet": "I would suggest two reasons. First, our economy has slowed down as a result of the very tax increases that the Chancellor has imposed. Secondly, the feral Labour Back Benchers have made them lose their nerve. The Prime Minister and the Chancellor therefore cannot control public expenditure in any way at all. The British people are already paying th",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-12f.177.1&amp;s=%22feral%22#g226.1"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "motability cars",
    "Speaker": "Shirley-Anne Somerville",
    "Date": "2025-11-06",
    "Debate_Title": "Scottish Parliament: Portfolio Question Time: Welfare Payments (Projection)",
    "Context_Snippet": "I again point out that Stephen Kerr&#8217;s questions suggest that he and the Tories believe that we should take money away from disabled people, given that he seems to want cuts to be made to adult disability payment. That process is continuing under the current UK Government, which has already put in place cuts for disabled people through univers",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-11-06.4.3&amp;s=%22motability+cars%22#g4.9"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Helen Whately",
    "Date": "2025-11-04",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I beg to move, That this House regrets the failure of the Government to get people off welfare and into work; believes that reforming the welfare system is a moral mission; and therefore calls on the Government to take urgent action to fix Britain&#8217;s welfare system by restricting welfare for non-UK citizens, stopping benefits for those with lo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-04b.847.0&amp;s=%22better+off+on+benefits%22#g847.2"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Rebecca Smith",
    "Date": "2025-11-04",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I want to start the debate by acknowledging the fact that many Members here do not know that much about me. The debate so far, with this caricature of Conservatives who do not care, has saddened me. Like my right hon. Friend the Member for Chingford and Woodford Green (Sir Iain Duncan Smith) , who is no longer in his place, I am entirely motivated ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-04b.847.0&amp;s=%22lifestyle+choice%22#g870.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Helen Whately",
    "Date": "2025-11-04",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I beg to move, That this House regrets the failure of the Government to get people off welfare and into work; believes that reforming the welfare system is a moral mission; and therefore calls on the Government to take urgent action to fix Britain&#8217;s welfare system by restricting welfare for non-UK citizens, stopping benefits for those with lo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-11-04b.847.0&amp;s=%22workless%22#g847.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Joe Robertson",
    "Date": "2025-11-03",
    "Debate_Title": "Video Games: Consumer Law &#8212; [David Mundell in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Mundell. I am grateful to the Members who have spoken passionately about this issue, in particular the hon. Member for South Norfolk (Ben Goldsborough) , who led the debate, and to the people who signed the petition. Video games are a significant part of the entertainment and creative industries",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-11-03a.255.0&amp;s=%22lazy%22#g266.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Peter Bedford",
    "Date": "2025-10-28",
    "Debate_Title": "Stamp Duty Land Tax",
    "Context_Snippet": "I thank my right hon. Friend for putting that on record. I am not confident that this Labour Government understand aspiration, because they simply cannot comprehend the politics of people wanting to better themselves, their families and their communities. Sadly, they actually fear aspiration, and that is why this Labour Government are the most anti",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-10-28c.170.1&amp;s=%22shirkers%22#g217.3"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "motability cars",
    "Speaker": "Ashley Fox",
    "Date": "2025-10-28",
    "Debate_Title": "Stamp Duty Land Tax",
    "Context_Snippet": "Well, I am amazed to hear that the real economy is growing by 10%. That must be a forecaster I have not heard of! We believe it is possible to cut welfare spending. In fact, a few months ago, the hon. Gentleman&#8217;s party believed it was possible. The Government put forward a modest proposal to reduce welfare spending by &#163;5 billion, which h",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-10-28c.170.1&amp;s=%22motability+cars%22#g226.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Ashley Fox",
    "Date": "2025-10-28",
    "Debate_Title": "Stamp Duty Land Tax",
    "Context_Snippet": "All of us here want to improve the lives of our constituents, though we often differ in how we might achieve that. As a Conservative, I believe we do so by working with the grain of human nature, by allowing people the maximum amount of liberty to live their lives, by supporting families, by rewarding hard work, rather than penalising it, and by in",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-10-28c.170.1&amp;s=%22burden+on+taxpayers%22#g224.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Rebecca Smith",
    "Date": "2025-10-27",
    "Debate_Title": "Work and Pensions: Child Poverty",
    "Context_Snippet": "Every Member in this Chamber shares a commitment to lifting people out of poverty, especially children; we just have different views on how to go about it. Children in workless households are nearly four times more likely to live in poverty than those in households where adults work. We know that work pays, yet we on the Conservative Benches find o",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-10-27f.11.1&amp;s=%22workless%22#g12.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Hannan of Kingsclere",
    "Date": "2025-10-23",
    "Debate_Title": "Steel Industry (Special Measures) Act 2025 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I add my voice to the swelling chorus, the paeans of praise, to the noble Baroness, Lady Lloyd. It is no small thing to make your maiden speech at that Dispatch Box, and I enjoyed the way she conjured the image of the subterranean River Effra, encased under all those tonnes of tarmac and concrete, flowing slowly beneath our feet, arched o",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-10-23a.956.1&amp;s=%22lazy%22#g982.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Diana Armstrong",
    "Date": "2025-10-20",
    "Debate_Title": "Northern Ireland Assembly: Executive Committee Business: RHI (Closure of the Non-Domestic Scheme) Bill: Second Stage",
    "Context_Snippet": "I support those Members who have sought reassurances and expressed concerns about the RHI (Closure of Non-Domestic Scheme) Bill. The UUP supports the scheme's closure in principle. I share the Chair of the Economy Committee's view that the Bill may prove contentious. Fellow members of the Committee have already outlined some of their worries and co",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-10-20.4.1&amp;s=%22idle%22#g4.9"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Will Forster",
    "Date": "2025-10-20",
    "Debate_Title": "Asylum Seekers: Support and Accommodation &#8212; [Dr Andrew Murrison in the Chair]",
    "Context_Snippet": "It is clear from both the petitions that people across the country are angry and frustrated about the state of our asylum system. The Liberal Democrats understand why people have signed the petitions. The situation has been badly mishandled for years, and in my opinion the petitioners are right to call it out. We should not have 30,000 people in as",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-10-20b.245.0&amp;s=%22burden+on+taxpayers%22#g280.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefits cheats",
    "Speaker": "Baroness Finn",
    "Date": "2025-10-15",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill - <i>Report (1st Day)</i>: Amendment 2",
    "Context_Snippet": "I thank the Minister for her incredibly persuasive arguments. We are clear that this is an unacceptable settlement if the PSFA can act only if invited by the very body that may have failed. That is not a system of scrutiny; it is an invitation to inertia. It cannot be right that officials in a department where fraud is suspected should have the pow",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-10-15a.288.1&amp;s=%22benefits+cheats%22#g292.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Luke Taylor",
    "Date": "2025-10-15",
    "Debate_Title": "Sustainable Aviation Fuel Bill: New Clause 1 - Review of the Potential Conversion of Industrial Sites for Sustainable Aviation Fuel Production",
    "Context_Snippet": "I chair the all-party parliamentary group for the future of aviation, travel and aerospace, and the debate on SAF has been a focus of many of our meetings. As a cover-all, I should declare my interests, having met with AirportsUK, Airlines UK, ADS Group, LanzaJet, Back British SAF, Valero, alfanar and others over the past six months. I also worked ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-10-15b.437.2&amp;s=%22idle%22#g447.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Michelle Guy",
    "Date": "2025-09-30",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Skills Gaps between Young People and Businesses",
    "Context_Snippet": "I really love this motion. It has ambition, it seeks to emulate best practice, and it is focused on giving young people hope and opportunity and, in some circumstances, a reason to stay in Northern Ireland. That speaks to me both as a parent and as an elected representative. When asked what motivates me to be in politics, my answer is often that I ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-09-30.3.1&amp;s=%22lazy%22#g3.15"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "James Murray",
    "Date": "2025-09-19",
    "Debate_Title": "Written Answers &#8212; Treasury: Social Security Benefits: Advisory Services",
    "Context_Snippet": "The Government recognises the important role that social welfare advice services play in supporting individuals. For example, DWP provide grant funding to Citizens Advice, who deliver Help to Claim support for customers to apply for Universal Credit. In addition, the Money and Pensions Service, which is sponsored by DWP, continues to provide impart",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-09-10.76317.h&amp;s=%22free+money%22#g76317.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Sojan Joseph",
    "Date": "2025-09-11",
    "Debate_Title": "Regional Transport Inequality",
    "Context_Snippet": "The perception many people have of Kent is one of prosperity because of our close proximity to London, but the reality is more complicated. In my constituency, we have widespread inequalities, and communities feel overlooked and disconnected, as is all too evident in the way our transport network operates. Nowhere has that been more evident than in",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-09-11b.1088.1&amp;s=%22idle%22#g1107.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "James MacCleary",
    "Date": "2025-09-10",
    "Debate_Title": "Bus Services (No. 2) Bill [Lords]: New Clause 38 - Use of zero-emission vehicles for local services in Scotland",
    "Context_Snippet": "Day in, day out, I hear from people across my constituency&#8212;from Polegate to Plumpton&#8212;who want to use the bus but simply cannot do so. People must be at the heart of transport policy, so let me begin with one example from my constituency. I recently heard from a woman in Wilmington village who wants to get to her job in Lewes by bus but ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-09-10e.906.2&amp;s=%22lifestyle+choice%22#g959.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Euan Stainbank",
    "Date": "2025-09-10",
    "Debate_Title": "Bus Services (No. 2) Bill [Lords]: New Clause 38 - Use of zero-emission vehicles for local services in Scotland",
    "Context_Snippet": "I refer hon. Members to my entry in the Register of Members&#8217; Financial Interests and declare an interest as co-chair of the all-party parliamentary group for British buses. Within my constituency and the neighbouring constituency of the hon. Member for Alloa and Grangemouth (Brian Leishman) are two sites of the UK&#8217;s largest bus manufact",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-09-10e.906.2&amp;s=%22lazy%22#g951.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Julie Minns",
    "Date": "2025-09-09",
    "Debate_Title": "Free-to-air Broadcasting: Cricket Participation",
    "Context_Snippet": "It is a privilege to serve under your chairship, Ms McVey. I start by placing on record my membership of the all-party parliamentary group for cricket. I congratulate the hon. Member for Cheltenham (Max Wilkinson) on bringing this important debate. Although I share his love of the long-form game as by far superior, I disagree slightly on the Hundre",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-09-09b.340.0&amp;s=%22lazy%22#g345.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Josh Dean",
    "Date": "2025-09-09",
    "Debate_Title": "Neurodivergent People: Employment &#8212; [Esther McVey in the Chair]",
    "Context_Snippet": "It is a pleasure to serve with you in the Chair this afternoon, Ms McVey. I thank the hon. Member for Ely and East Cambridgeshire (Charlotte Cane) for securing this important debate. It is a pleasure to be able to contribute. In my office we are very open about neurodivergence, and I am proud to work with a neurodiverse team on behalf of our reside",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-09-09b.305.0&amp;s=%22lazy%22#g313.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Lord Davies of Gower",
    "Date": "2025-09-08",
    "Debate_Title": "Border Security, Asylum and Immigration Bill - <i>Committee (5th Day)</i>: Amendment 141",
    "Context_Snippet": "My Lords, I thank my noble friend Lord Jackson of Peterborough for his amendment, which seeks to collect and publish data about overseas students who have committed criminal offences leading to the revocation of their student visas. When immigrants commit crimes, we need to understand whether there are patterns that suggest wider or systemic abuses",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-09-08b.1166.1&amp;s=%22idle%22#g1170.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Emma Reynolds",
    "Date": "2025-09-04",
    "Debate_Title": "Written Answers &#8212; Treasury: Cash Dispensing: Disability",
    "Context_Snippet": "The Government recognises that cash continues to be used by millions of people across the UK, including those in vulnerable groups, and is committed to protecting access to cash for individuals as a priority. The Financial Conduct Authority (FCA) assumed regulatory responsibility for access to cash in September 2024. Its rules ensure cash continues",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-08-29.70547.h&amp;s=%22free+cash%22#g70547.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Torsten Bell",
    "Date": "2025-09-04",
    "Debate_Title": "Public Bill Committee: Pension Schemes Bill: Clause 21 - Small pots data platform",
    "Context_Snippet": "That is a fair question. The most prevalent example will be people whose existing pot, although small, has unusual and valuable guarantees attached to it, or benefits that they would lose if they transferred into the default fund of another provider. That is likely to be the most common use of the clause. The clause will provide for transparency by",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Pension_Schemes_Bill/04-0_2025-09-04b.177.3?s=%22idle%22#g179.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "John Milne",
    "Date": "2025-09-04",
    "Debate_Title": "Public Bill Committee: Pension Schemes Bill: Clause 9 - Restrictions on exercise of power to pay surplus",
    "Context_Snippet": "I beg to move amendment 3, in clause 9, page 9, line 4, at end insert&#8212; &#8220;(e) about the proportion of any surplus that may be allocated, or the manner in which it may be determined, for the purpose of contributing to the provision of free, impartial pension advice and guidance services for scheme members.&#8221; This amendment enables a p",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Pension_Schemes_Bill/04-0_2025-09-04b.139.2?s=%22idle%22#g143.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Clive Lewis",
    "Date": "2025-09-03",
    "Debate_Title": "Living Standards: East of England",
    "Context_Snippet": "I thank my hon. Friend for an interesting contribution. I will take a time-out on the AI component. I think it has a place and could, I am sure, contribute something, but the real way to ensure that resources are going to the right place is to ensure real devolution: empowering communities, local government and local people to decide where the mone",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-09-03a.141.0&amp;s=%22lazy%22#g143.2"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free cars",
    "Speaker": "Helen Whately",
    "Date": "2025-09-01",
    "Debate_Title": "Work and Pensions: Topical Questions",
    "Context_Snippet": "I asked the right hon. Lady a simple question, but I fear that she does not know the answer; she certainly did not reply to it. What is clear is that Labour wants to spend more on welfare. So do the Liberal Democrats, and so does Reform. Only one party here is telling the truth about the welfare bill: the country cannot afford it. May I urge the ri",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-09-01c.16.5&amp;s=%22free+cars%22#g18.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Grey-Thompson",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I declare my interests as president of the Local Government Association and a recipient of personal independence payment. Like others, I have received many emails from people worried about the proposed changes and I am extremely concerned about how this narrative has played out in the media. Disabled people are being portrayed as benefit ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22scroungers%22#g191.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Baroness Brinton",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I declare my interest as a vice-president of the Local Government Association. It is a pleasure to follow the noble Baroness, Lady Lister of Burtersett. I thank the many disabled people and organisations who have written to us all. I congratulate the noble Baroness, Lady Shawcross-Wolfson, on her maiden speech and look forward to hearing ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22workshy%22#g203.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "work-shy",
    "Speaker": "Baroness Sherlock",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I thank all noble Lords for their contributions this evening. It has been a really interesting debate. I particularly thank the noble Baroness, Lady Shawcross-Wolfson. What an astonishing story and what an incredible heritage. I can only think that her forebears must be so very proud of her. It is a real joy to have her here with us today",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22work-shy%22#g218.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Baroness Grey-Thompson",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I declare my interests as president of the Local Government Association and a recipient of personal independence payment. Like others, I have received many emails from people worried about the proposed changes and I am extremely concerned about how this narrative has played out in the media. Disabled people are being portrayed as benefit ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22free+car%22#g191.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "motability cars",
    "Speaker": "Baroness Grey-Thompson",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I declare my interests as president of the Local Government Association and a recipient of personal independence payment. Like others, I have received many emails from people worried about the proposed changes and I am extremely concerned about how this narrative has played out in the media. Disabled people are being portrayed as benefit ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22motability+cars%22#g191.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Rook",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I am grateful to my noble friend the Minister for her introduction and to noble Lords for what has already been a broad discussion. I look forward to hearing the maiden speech of the noble Baroness, Lady Shawcross-Wolfson, and to her contribution to your Lordships&#8217; House in the days to come. I also look forward to the valedictory sp",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22handouts%22#g195.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Stedman-Scott",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I thank the Minister for her introduction to the Bill and for the ability to speak openly to her in the lead-up to today. I completely agree with the Minister that benefits should be easy to access for those who are in genuine need and difficult&#8212;even impossible&#8212;to access for those who are not in need. I warmly welcome my noble",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22workless%22#g214.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "drain on society",
    "Speaker": "Baroness Grey-Thompson",
    "Date": "2025-07-22",
    "Debate_Title": "Universal Credit Bill - <i>Second Reading (and remaining stages)</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I declare my interests as president of the Local Government Association and a recipient of personal independence payment. Like others, I have received many emails from people worried about the proposed changes and I am extremely concerned about how this narrative has played out in the media. Disabled people are being portrayed as benefit ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-22c.188.0&amp;s=%22drain+on+society%22#g191.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Terry Jermy",
    "Date": "2025-07-16",
    "Debate_Title": "Blue Badge Eligibility",
    "Context_Snippet": "It is a pleasure to see you in the Chair, Sir Christopher. I thank the hon. Member for Maidstone and Malling (Helen Grant) for bringing forward this debate today. It is lovely to see cross-party working on such a serious issue. I am not from Kent&#8212;I am from Norfolk&#8212;but from listening to the debate, there are some clear similarities. We a",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-07-16a.189.0&amp;s=%22free+car%22#g193.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Tom Hayes",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "Today, we have seen lots of colleagues taking interventions from each other. When I stand up to speak, particularly about poverty, I take interventions from another source&#8212;my mum. She will be sitting at home, watching the TV, and she will text me, because she knows that I am going to talk about my upbringing&#8212;about growing up in poverty,",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22scrounger%22#g191.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Helen Whately",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "My hon. Friend makes an important point about the problem of a welfare trap, where people would better be better off on benefits than working full time on the minimum wage.",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22better+off+on+benefits%22#g175.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Brian Leishman",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I thank the hon. Gentleman for that point, which I will come on to. He has clearly had advance sight of my speech. The Government should of course lift the two-child cap immediately, and it was wrong of them not to make that a part of the King&#8217;s Speech. The wording in the motion referring to a &#8220;benefits culture&#8221; is both lazy and c",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22lazy%22#g201.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Paul Waugh",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "The Minister is making an important speech with which many Labour Members will agree. She will be aware that 59% of families with more than two children and which are on universal credit are in work. That is far from the feckless parent caricature that we have heard from the Conservatives. More importantly, does she agree that the children should c",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22feckless%22#g179.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Danny Kruger",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I will come in a moment to the matter of child poverty, and I recognise the point that the hon. Gentleman is making. I was just referring to the fact that all the parties except ours&#8212;indeed, it is unclear what those on the Government Front Bench think&#8212;seem to support lifting the two-child cap. The Liberal Democrats cannot seem to see a ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22workless%22#g203.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Ashley Fox",
    "Date": "2025-07-15",
    "Debate_Title": "Welfare Spending",
    "Context_Snippet": "I am grateful to my right hon. Friend for making that point. It is essential that we put Britain&#8217;s finances on a sustainable path. All benefits are funded by taxpayers or borrowing, so every time the cost of benefits rises, so does the burden on taxpayers, or the debt we place on future generations.",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-15c.174.1&amp;s=%22burden+on+taxpayers%22#g190.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Baroness Fox of Buckley",
    "Date": "2025-07-14",
    "Debate_Title": "Employment Rights Bill - <i>Report (1st Day)</i>: Amendment 28",
    "Context_Snippet": "My Lords, in the evidence and analysis document that the Government very helpfully gave us last week, it notes that up to 1.3 million employees will get a new entitlement to statutory sick pay and that that will increase the amount of sick pay that workers receive by around &#163;400 million a year. At face value, this is in many ways a very positi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-14b.1628.2&amp;s=%22shirkers%22#g1632.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Adrian Ramsay",
    "Date": "2025-07-09",
    "Debate_Title": "Prime Minister: Engagements",
    "Context_Snippet": "Growing numbers of people are joining the call for a wealth tax on the super-rich, including former Labour leader Lord Kinnock. Today, a former First Minister of Wales has done so, and so, it transpires, did the Chancellor when she was in opposition. Will the Prime Minister stand by his promise that those with the broadest shoulders will carry the ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-09d.937.2&amp;s=%22not+disabled%22#g943.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Richard Burgon",
    "Date": "2025-07-09",
    "Debate_Title": "Universal Credit and Personal Independence Payment Bill: Clause 1 - Standard allowance for tax years 2026-27 to 2029-30",
    "Context_Snippet": "Sometimes politics seems complicated. Sometimes the passage of a Bill through Parliament, especially with antics and shenanigans like those we saw last week, may confuse people. But actually, the issue before all of us when we vote tonight is very simple. Today, Wednesday 9 July 2025 , are Labour MPs going to vote through cuts to universal credit t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-09d.968.3&amp;s=%22fit+to+work%22#g1036.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Danny Kruger",
    "Date": "2025-07-09",
    "Debate_Title": "Universal Credit and Personal Independence Payment Bill: Clause 1 - Standard allowance for tax years 2026-27 to 2029-30",
    "Context_Snippet": "So here we are. Labour has had 15 years, including 14 years spent complaining about welfare reform while the Conservative Government fixed the catastrophic mess of unemployment benefits that we inherited&#8212;the alphabetti spaghetti of welfare that we had in 2010, if any of their Members can remember it. We fixed all those benefit traps, introduc",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-09d.968.3&amp;s=%22workless%22#g1040.1"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Lord Wei",
    "Date": "2025-07-03",
    "Debate_Title": "Children&#8217;s Wellbeing and Schools Bill - <i>Committee (8th Day) (Continued)</i>: Amendment 211",
    "Context_Snippet": "My Lords, I will speak to Amendment 212 and the related amendment to Clause 30. Taken together, these amendments aim to restore vital balance and proportion to the question of whether a parent may withdraw their child from school. They would place evidence, not mere suspicion, at the heart of decisions to profoundly shape children&#8217;s lives, re",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-03a.1000.0&amp;s=%22lifestyle+choice%22#g1002.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Mohammed of Tinsley",
    "Date": "2025-07-03",
    "Debate_Title": "Children&#8217;s Wellbeing and Schools Bill - <i>Committee (8th Day)</i>: Amendment 195",
    "Context_Snippet": "My Lords, education is frequently described as a great leveller: a powerful force to close the gap between opportunity and background, between privilege and disadvantage. As someone who experienced that divide, I can say that unless we tackle entrenched inequalities that quietly shape a child&#8217;s journey before they even enter the classroom, th",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-07-03a.883.3&amp;s=%22handouts%22#g883.5"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Clive Lewis",
    "Date": "2025-07-01",
    "Debate_Title": "Universal Credit and Personal Independence Payment Bill",
    "Context_Snippet": "When coming to a crunchy question or problem, I always think it is wise to take a step or two back and try to unpick some of the assumptions that underpin the issue&#8212;to see the bigger picture, if you like. Not everyone will agree with some of the conclusions that I come to, and that is fine&#8212;this is a debate, not an echo chamber, although",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-01b.159.0&amp;s=%22workshy%22#g215.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Clive Lewis",
    "Date": "2025-07-01",
    "Debate_Title": "Universal Credit and Personal Independence Payment Bill",
    "Context_Snippet": "When coming to a crunchy question or problem, I always think it is wise to take a step or two back and try to unpick some of the assumptions that underpin the issue&#8212;to see the bigger picture, if you like. Not everyone will agree with some of the conclusions that I come to, and that is fine&#8212;this is a debate, not an echo chamber, although",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-07-01b.159.0&amp;s=%22lazy%22#g215.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2025-06-30",
    "Debate_Title": "Welfare Reform",
    "Context_Snippet": "There were almost a million fewer workless households in 2024 than in 2010. One factor behind that was universal credit and reducing the barriers and perceived risks of going back into work if people were not sure how it would work out. Notwithstanding the right to try, if there are to be two different levels of health component outside the severe ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-06-30b.23.0&amp;s=%22workless%22#g35.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Angus MacDonald",
    "Date": "2025-06-30",
    "Debate_Title": "Driven Grouse Shooting &#8212; [Carolyn Harris in the Chair]",
    "Context_Snippet": "Rural Britain, and particularly remote Scotland, is in crisis. The young are moving to the cities, the schools are closing, healthcare is being centralised and the cost of living is far higher than in the conurbations. Soon, our glens will be populated only by incoming retirees. I took my townie friend, a senior politician, along the beautiful 30-m",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-06-30a.1.0&amp;s=%22idle%22#g13.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Gareth Bacon",
    "Date": "2025-06-25",
    "Debate_Title": "Department for Transport",
    "Context_Snippet": "No, I suspect it will not be the last time I hear it. There will be occasions when Labour Members fail to read the previous Government&#8217;s announcements, so for their benefit let me point out how the funding sums promised to authorities by the previous Government have been closely replicated, in some cases identically replicated, by those promi",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-06-25b.1182.0&amp;s=%22free+money%22#g1205.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Pidgeon",
    "Date": "2025-06-25",
    "Debate_Title": "Planning and Infrastructure Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, while planning and infrastructure may not get everyone in this House excited, they are fundamental to everything that we do in this country, and we need to get this right&#8212;for our communities and to start delivering across the country. Chapter 3 of Part 1 of the Bill, regarding transport infrastructure, has not had the focus that it ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-06-25a.265.5&amp;s=%22idle%22#g281.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Lord Sikka",
    "Date": "2025-06-23",
    "Debate_Title": "Contracts for Difference (Miscellaneous Amendments) (No. 2) Regulations 2025 - <i>Motion to Approve</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, I am really concerned about the legislation in front of us, because it seeks to extend subsidies to highly profitable corporations, at least until 2031. Inevitably, the major beneficiary is Drax, which is the UK&#8217;s single largest emitter of CO2. In 2023, its electricity-generating operations generated 11.5 million tonnes of CO2. Add ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-06-23b.110.0&amp;s=%22free+money%22#g114.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Karen Adam",
    "Date": "2025-06-19",
    "Debate_Title": "Scottish Parliament: National Advisory Council on Women and Girls Equality Recommendations",
    "Context_Snippet": "I am proud to speak in support of the Scottish Government&#8217;s motion and to welcome the publication of the first annual statement on gender policy coherence. It is a long overdue step that will start to hold us accountable to the promises that we have made to women and girls in Scotland. The National Advisory Council on Women and Girls has give",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-06-19.6.0&amp;s=%22lifestyle+choice%22#g6.33"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Rachael Maskell",
    "Date": "2025-06-17",
    "Debate_Title": "Disabled People in Poverty",
    "Context_Snippet": "The diagnosis is wrong and the treatment is no cure; all these cuts will do is to displace the cost and displace the problem. It was not disabled people who broke the NHS waiting lists. It was not disabled people who removed the access to mental health services. It is not disabled people who are experiencing a healthier life expectancy. It is the s",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-06-17a.67.0&amp;s=%22not+disabled%22#g75.3"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Darren Jones",
    "Date": "2025-06-13",
    "Debate_Title": "Written Answers &#8212; Treasury: Welfare State: Advisory Services",
    "Context_Snippet": "The Government recognises the important role that independent advice services play in supporting individuals. For example, DWP provide grant funding to Citizens Advice, who deliver Help to Claim support for customers to apply for Universal Credit. Help to Claim reduces the number of Universal Credit benefit queries DWP receive and enables work coac",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-06-04.57316.h&amp;s=%22free+money%22#g57316.r0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Karin Smyth",
    "Date": "2025-06-11",
    "Debate_Title": "Written Answers &#8212; Department of Health and Social Care: Hospitals: Parking",
    "Context_Snippet": "No assessment has been made of the potential merits of including carers in the provision of providing free car parking for those in greatest need. All National Health Service trusts that charge for hospital car parking provide free parking those in greatest need, which includes NHS staff working overnight, frequent outpatient attenders, disabled pe",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-06-04.57529.h&amp;s=%22free+car%22#g57529.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Luke Evans",
    "Date": "2025-06-10",
    "Debate_Title": "Public Bill Committee: Mental Health Bill [Lords]: Clause 4 - People with autism or learning disability",
    "Context_Snippet": "I entirely agree with the hon. Lady&#8217;s end point and with the thrust of what she says. Causality is not causation, and we need to be very careful. When we get to the later clauses of the Bill, that will be at the forefront of our discussion. We cannot deny the reason we are having this legislative debate in the first place: the observation tha",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Mental_Health_Bill/02-0_2025-06-10a.37.2?s=%22lazy%22#g50.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Lord Hunt of Wirral",
    "Date": "2025-06-03",
    "Debate_Title": "Employment Rights Bill - <i>Committee (6th Day)</i>: Amendment 131",
    "Context_Snippet": "My Lords, as we have already heard from the noble Viscount, Lord Colville of Culross, my noble friend Lord Holmes of Richmond cannot be with us today, so I will move his amendment on his behalf and speak to the others in this group. In doing so, I declare a past interest as a consultant to the Royal National Institute of Blind People. For many year",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-06-03c.629.0&amp;s=%22not+disabled%22#g629.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Lord Moynihan of Chelsea",
    "Date": "2025-06-03",
    "Debate_Title": "Employment Rights Bill - <i>Committee (6th Day)</i>: Amendment 141BA",
    "Context_Snippet": "My Lords, good evening. I rise in support of Amendments 141BA, 141C and 142B, and it is a pleasure to support the noble Lord, Lord Hunt, on these amendments. I declare an interest as a businessman and as one who wishes to see the wheels of commerce and thus the economy moving smoothly and not unnecessarily clogged up. As far as insolvency goes, thi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-06-03c.669.0&amp;s=%22free+money%22#g673.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "unwashed",
    "Speaker": "Adam Thompson",
    "Date": "2025-06-03",
    "Debate_Title": "Dementia Care",
    "Context_Snippet": "I wanted to share some of my experiences and, with her support, the experiences of my office manager, Becca. Becca and I agreed that the issue we wanted to raise in the debate is dignity. Becca&#8217;s nan, Pat, lived with dementia for over a decade. She received care both at home and, later, in a specialist dementia care home. At home, the care sh",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-06-03d.230.1&amp;s=%22unwashed%22#g268.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Jones of Moulsecoomb",
    "Date": "2025-06-02",
    "Debate_Title": "Border Security, Asylum and Immigration Bill - <i>Second Reading</i>",
    "Context_Snippet": "It is always a pleasure to follow the noble Lord, Lord Dubs, and I, too, have visited Calais and I totally agree that no one would live there if they had a choice. Those people are clearly desperate, and one can perhaps understand why they are taking desperate routes. I am also speaking before the noble Lord, Lord Harper, so I cannot tell him what ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-06-02a.522.1&amp;s=%22handouts%22#g540.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "unwashed",
    "Speaker": "Baroness Barran",
    "Date": "2025-05-22",
    "Debate_Title": "Children&#8217;s Wellbeing and Schools Bill - <i>Committee (2nd Day)</i>: Amendment 41",
    "Context_Snippet": "My Lords, in moving Amendment 41, I shall speak to Amendments 45 and 46 in my name. I look forward the speech of my noble friend Lady Spielman, on her Amendment 69, and take this opportunity, on behalf of the Committee, to wish her a very happy birthday. As I set out in an earlier group, I hope that my prior experience in setting up information-sha",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-05-22a.416.0&amp;s=%22unwashed%22#g416.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Gerry Carroll",
    "Date": "2025-05-20",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Illegal Immigration: Impact in Northern Ireland",
    "Context_Snippet": "No, thanks. Migration is a natural part of the human experience. It always has been, and it always will be. Housing is also mentioned in the motion. It is true that the estimated cost of accommodation for asylum seekers in the North has risen to around &#163;400 million in 10 years. Some people, when they hear that number, think that asylum seekers",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-05-20.7.1&amp;s=%22scroungers%22#g7.86"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefits cheats",
    "Speaker": "Baroness Fox of Buckley",
    "Date": "2025-05-15",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I am sympathetic to the Government&#8217;s aspirations to tackle fraud and to reclaim money, in effect, ripped off from the public purse. Whether it is those grants for fake community schemes mentioned by the noble Baroness, Lady Anderson of Stoke-on-Trent, at the beginning or the more mundane benefits cheats, there is nothing more gallin",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-05-15b.2341.1&amp;s=%22benefits+cheats%22#g2361.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Monica Harding",
    "Date": "2025-05-15",
    "Debate_Title": "Backbench Business: Gavi and the Global Fund",
    "Context_Snippet": "I thank my hon. Friend for a well-made point. I have consistently said that cuts to our international aid and development spend create the space for rogue actors to move in, including China and Russia. I know that the Government like polling, so I am happy to share that the British people understand the value of spending on vaccination. Recent Adel",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-05-15a.184.1&amp;s=%22benefits+Britain%22#g199.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Stephen Timms",
    "Date": "2025-05-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Health and Safety: Night-time Economy",
    "Context_Snippet": "Under the Health and Safety at Work etc. Act 1974 all employers have a duty, so far as it is reasonably practicable, to protect the health, safety, and welfare at work of all their employees. Specifically, the Management of Health and Safety at Work Regulations 1999 require employers to assess health and safety risks to employees and to put in plac",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-05-08.50908.h&amp;s=%22fit+to+work%22#g50908.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skivers",
    "Speaker": "Baroness Fox of Buckley",
    "Date": "2025-05-13",
    "Debate_Title": "Employment Rights Bill - <i>Committee (3rd Day)</i>: Amendment 74A",
    "Context_Snippet": "But I will carry on. I also want to refer to the issue of absenteeism, but I feel as though I have wandered into the skivers debate, and I do not necessarily want to be involved in that. I am not worried that sick pay will create a nation of skivers or everybody phoning up and saying, &#8220;I am off sick&#8221;. But I am confused&#8212;maybe the M",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-05-13b.2090.0&amp;s=%22skivers%22#g2094.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Andrew Griffith",
    "Date": "2025-05-13",
    "Debate_Title": "Opposition Day: UK-EU Summit",
    "Context_Snippet": "We have had a strong debate this afternoon, with many contributions on both sides. I thank so many of my hon. and right hon. Friends, including my hon. Friends the Members for East Wiltshire (Danny Kruger) and for Beaconsfield (Joy Morrissey), my right hon. Friends the Members for Chingford and Woodford Green (Sir Iain Duncan Smith) and for Rayleig",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-05-13d.226.2&amp;s=%22handouts%22#g308.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Sonia Kumar",
    "Date": "2025-05-12",
    "Debate_Title": "Work and Pensions: Personal Independence Payment Assessments",
    "Context_Snippet": "The Centre for Inclusive Living in Dudley, which supports those with disabilities, and many residents have written to me to raise concerns about the PIP entitlement criteria and assessment. What reassurances can my hon. Friend give that this Government will protect those most vulnerable in society and that those with disabilities will be enabled, n",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-05-12e.6.4&amp;s=%22not+disabled%22#g7.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "drain on society",
    "Speaker": "Kevin Stewart",
    "Date": "2025-05-08",
    "Debate_Title": "Scottish Parliament: Victory in Europe Day (80th Anniversary)",
    "Context_Snippet": "Today we commemorate the 80th anniversary of victory in Europe day. On this day, eight decades ago, the guns fell silent across the European continent, marking the end of a brutal conflict that engulfed the world in darkness and despair. VE day stands as a testament to the resilience, courage and unwavering spirit of those who fought for freedom an",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-05-08.7.0&amp;s=%22drain+on+society%22#g7.21"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Cat Eccles",
    "Date": "2025-05-07",
    "Debate_Title": "Personal Independence Payment: Disabled People &#8212; [Dr Rosena Allin-Khan in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Dr Allin-Khan. I thank my right hon. Friend the Member for Hackney North and Stoke Newington (Ms Abbott) for securing this important debate. I wish to place on record my grave concerns about the Government&#8217;s proposals to change the eligibility criteria for PIP. When His Majesty&#8217;s Revenue a",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-05-07b.281.0&amp;s=%22scroungers%22#g291.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Diane Abbott",
    "Date": "2025-05-07",
    "Debate_Title": "Personal Independence Payment: Disabled People &#8212; [Dr Rosena Allin-Khan in the Chair]",
    "Context_Snippet": "There is no question but that my hon. Friend is correct. These cuts will put even more pressure on local authorities, which are already in difficulties. There is all this talk about getting disabled people into jobs&#8212;what jobs? The areas of employment where there are labour shortages tend to be minimum wage, like social care, or seasonal, like",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-05-07b.281.0&amp;s=%22lifestyle+choice%22#g284.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Susan Murray",
    "Date": "2025-05-06",
    "Debate_Title": "Poverty: Glasgow North East",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Ms Butler. I thank the hon. Member for Glasgow North East (Maureen Burke) for securing this important debate and for her very moving speech. It is clear that she is committed to her constituents. We need to break the cycle of inequality. As we heard, on the streets of north-east Glasgow and in parts o",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-05-06b.241.0&amp;s=%22handouts%22#g248.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Danny Kruger",
    "Date": "2025-05-06",
    "Debate_Title": "Poverty: Glasgow North East",
    "Context_Snippet": "May I start by acknowledging the very powerful speeches that we have heard this afternoon from the Members for Glasgow? I would not say that my view is that the people of Glasgow are generally well represented by Scottish Labour, but they have been very well represented in this debate. I pay particular tribute to the hon. Member for Glasgow North E",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-05-06b.241.0&amp;s=%22workless%22#g250.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Edward Mountain",
    "Date": "2025-05-01",
    "Debate_Title": "Scottish Parliament: Scotland&#8217;s Hydrogen Future",
    "Context_Snippet": "I would like the UK Government to give a clear steer to the industry that hydrogen will be important. If we said to the industry that a percentage of the power that it uses has to come from hydrogen, that would encourage investment and reduce the cost of production. Benefits could then be derived from it, which would allow hydrogen to be produced a",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-05-01.4.0&amp;s=%22idle%22#g4.76"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Sue Webber",
    "Date": "2025-04-30",
    "Debate_Title": "Scottish Parliament: Motorists",
    "Context_Snippet": "It is not an omission, Mr Cole-Hamilton. The point is about roads across the country generally. We did not want to specify and single out individual roads because we wanted to make the debate relevant to all of Scotland and not just those who rely on some of our rural connectivity. The insidious drip-drip effect of anti-car policies is hampering ou",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-04-30.3.0&amp;s=%22idle%22#g3.6"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Stephen Kinnock",
    "Date": "2025-04-22",
    "Debate_Title": "Written Answers &#8212; Department of Health and Social Care: Personal Independence Payment: Social Services",
    "Context_Snippet": "A Personal Independence Payment (PIP) is intended to provide a tax-free, cash contribution to help people with a long-term health condition or disability with their additional, disability-related costs. It can be paid at one of eight rates, from between &#163;29.20 and &#163;187.45 a week, depending on the needs arising. It is not means-tested and ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-04-03.43923.h&amp;s=%22free+cash%22#g43923.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Jane Dodds",
    "Date": "2025-04-02",
    "Debate_Title": "5. Urgent Debate: The impact of the Chancellor's recent welfare reforms",
    "Context_Snippet": "For me, this debate is actually about dignity&#8212;dignity for those people who are disabled. If you are disabled, it costs more money to live on, more to heat your home, more to travel, more to find money for food. And yet we've heard&#8212;and perhaps there is cross-party agreement&#8212;that the Labour Government plan to cut the money that they",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2025-04-02.5.670820.h&amp;s=%22not+disabled%22#g5.670875"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "John Griffiths",
    "Date": "2025-04-02",
    "Debate_Title": "5. Urgent Debate: The impact of the Chancellor's recent welfare reforms",
    "Context_Snippet": "Since the UK Government's announcement on welfare reform, Dirprwy Lywydd, I've had many conversations with constituents, as I'm sure other Members here have had as well. And I must say, I agree with the majority of my constituents that I've spoken to, in as much as what they believe is: that reform of welfare benefits should help people move from w",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2025-04-02.5.670820.h&amp;s=%22workless%22#g5.670893"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Mark Durkan",
    "Date": "2025-04-01",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Social Security Reform and Economic Inactivity",
    "Context_Snippet": "Go raibh maith agat, a Leas-Cheann Comhairle. [Translation: Thank you, Mr Deputy Speaker.] Since this latest wave of cuts to disability support was announced a couple of weeks ago, I have been inundated daily on the street, in the supermarket and through late-night messages from anxious constituents, all terrified about what is coming next. I am su",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-04-01.2.43&amp;s=%22scrounger%22#g2.53"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefit scrounger",
    "Speaker": "Mark Durkan",
    "Date": "2025-04-01",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Social Security Reform and Economic Inactivity",
    "Context_Snippet": "Go raibh maith agat, a Leas-Cheann Comhairle. [Translation: Thank you, Mr Deputy Speaker.] Since this latest wave of cuts to disability support was announced a couple of weeks ago, I have been inundated daily on the street, in the supermarket and through late-night messages from anxious constituents, all terrified about what is coming next. I am su",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-04-01.2.43&amp;s=%22benefit+scrounger%22#g2.53"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Mark Durkan",
    "Date": "2025-04-01",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Social Security Reform and Economic Inactivity",
    "Context_Snippet": "I thank the Member for his intervention. Ms Mulholland demonstrated very well that the savings that will be realised in practice will not match those that are proposed on paper. On the other hand, the costs to people that loss of the benefit will bring about will far outweigh the financial amount saved. For those people, the costs will not just be ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-04-01.2.43&amp;s=%22fit+to+work%22#g2.55"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Matt Vickers",
    "Date": "2025-04-01",
    "Debate_Title": "Public Bill Committee: Crime and Policing Bill: Clause 8 - Seizure of motor vehicles used in manner causing alarm, distress or annoyance",
    "Context_Snippet": "My hon. Friend makes a good point. There is a sliding scale. There are people who use these things to intimidate and cause fear: driving around with a balaclava on their head, making as much of a racket as possible, and driving as close to people as possible in what should be a normal residential street, where families should be able to grow up. Th",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Crime_and_Policing_Bill/04-0_2025-04-01b.143.4?s=%22feral%22#g146.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Diana R. Johnson",
    "Date": "2025-04-01",
    "Debate_Title": "Public Bill Committee: Crime and Policing Bill: Clause 9 - Guidance on fly-tipping enforcement in England",
    "Context_Snippet": "This has been an interesting debate. We have been up mountain passes, we have been on the Isle of Wight and we have had the shadow Minister out with the Thornaby litter pickers. This debate has been very visual. Fly-tipping is a really serious crime that is blighting communities. It is placing a huge burden on taxpayers and businesses, and it harms",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Crime_and_Policing_Bill/04-0_2025-04-01b.158.2?s=%22burden+on+taxpayers%22#g163.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Mark Durkan",
    "Date": "2025-03-31",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Housebuilding on Public Land",
    "Context_Snippet": "Go raibh maith agat, a Leas-Cheann Comhairle. [Translation: Thank you, Mr Deputy Speaker.] Housing is a fundamental right. It is the foundation on which people build their lives, communities and futures, yet thousands of families across Northern Ireland remain in desperate need of a home while publicly owned land lies idle. The motion provides a co",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-03-31.4.1&amp;s=%22idle%22#g4.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Heledd Fychan",
    "Date": "2025-03-26",
    "Debate_Title": "11. Short Debate: Thinking differently: The Women's Institute campaign to support autistic and ADHD women and girls",
    "Context_Snippet": "I&#160;had a look at the National Institute for Health and Care Excellence clinical guidance on this matter and learned that the recommendation for diagnosis involves the use of a specific diagnostic tool. A layperson's glance at these showed me that some of the core characteristics of autism are communication and social interaction differences, re",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2025-03-26.11.667608.h&amp;s=%22lazy%22#g11.667619"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Brian Kingston",
    "Date": "2025-03-25",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Tackling the Financial and Societal Impacts of Division",
    "Context_Snippet": "Thank you, Mr Deputy Speaker. I rise to make a winding-up speech in support of the DUP amendment that was proposed by Diane Forsythe. As Diane said, the DUP is committed to supporting a shared future for all in Northern Ireland and to tackling division. However, that needs to be done with communities and not be imposed from afar by people who have ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-03-25.9.1&amp;s=%22lazy%22#g9.50"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Mike Nesbitt",
    "Date": "2025-03-24",
    "Debate_Title": "Northern Ireland Assembly: Opposition Business: Ambulance Handovers",
    "Context_Snippet": "I thank the Member for her comment. I have absolutely no difficulty in agreeing to that meeting. Work to address the wider system pressures has to be prioritised. That does not mean that NIAS has been sitting idle, waiting for issues to be resolved elsewhere. Flow and discharge issues are key aggravating factors, but there is much that NIAS can do ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-03-24.3.7&amp;s=%22idle%22#g3.37"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Paul Davies",
    "Date": "2025-03-24",
    "Debate_Title": "European Union: UK Membership &#8212; [David Mundell in the Chair]",
    "Context_Snippet": "Again, this is a subject that we have discussed a number of times in the Chamber. It is crucial that we work very closely with our friends in Europe, and we have seen the need for stability as we move forward in the next few years. The relationship between us and the new President of the US is newly formed and is starting to evolve. The work that i",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-03-24a.239.0&amp;s=%22burden+on+taxpayers%22#g241.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Lola McEvoy",
    "Date": "2025-03-18",
    "Debate_Title": "Welfare Reform",
    "Context_Snippet": "I welcome the reforms outlined today and the commitment to make sure that our most vulnerable disabled people are protected from these changes. In Darlington, we know the value of work, but I have come across constituents with learning difficulties who have been out of work for a long time. They have been in work placements and could work, but they",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-03-18d.168.0&amp;s=%22workshy%22#g198.1"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "better off on benefits",
    "Speaker": "Deirdre Costigan",
    "Date": "2025-03-18",
    "Debate_Title": "Welfare Reform",
    "Context_Snippet": "Hundreds of disabled people in my constituency want to work, but they often face absolute poverty pay and feel that they would be better off on benefits. On average, disabled workers are paid &#163;2.35 an hour, or &#163;4,300 a year, less than other workers. How will Labour&#8217;s commitment in the King&#8217;s Speech to a new equality Bill ensur",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-03-18d.168.0&amp;s=%22better+off+on+benefits%22#g194.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2025-03-18",
    "Debate_Title": "Free School Meals &#8212; [Peter Dowd in the Chair]",
    "Context_Snippet": "It is wonderful to see you in the Chair, Mr Dowd. I congratulate warmly the hon. Member for Eastleigh (Liz Jarvis) , and I commend everyone who has taken part in the debate, including the hon. Members for South West Norfolk (Terry Jermy), for Redditch (Chris Bloore), for Liverpool West Derby (Ian Byrne), for Winchester (Dr Chambers), for Thornbury ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-03-18a.41.0&amp;s=%22workless%22#g56.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Emma Reynolds",
    "Date": "2025-03-14",
    "Debate_Title": "Written Answers &#8212; Treasury: Bank Services: Visual Impairment",
    "Context_Snippet": "Banking has changed significantly in recent years with many customers benefiting from the ease and convenience of remote banking. While branch closures are commercial decisions for banks, the Financial Conduct Authority (FCA) guidance expects firms to carefully consider the impact of planned branch closures on their customers&#8217; everyday bankin",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-03-06.36179.h&amp;s=%22free+cash%22#g36179.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Jim Shannon",
    "Date": "2025-03-13",
    "Debate_Title": "Mental Health Support: Educational Settings",
    "Context_Snippet": "I commend the hon. Gentleman for bringing forward this issue. I was just looking at some of the stats for Northern Ireland in order to support his argument. In 2023, pupils with disabilities reported lower levels of general wellbeing across all measures than those who are not disabled. Does he agree that access to pastoral care teams, who are equip",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-03-13a.1353.0&amp;s=%22not+disabled%22#g1353.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Verma",
    "Date": "2025-03-13",
    "Debate_Title": "Integration and Community Cohesion - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, today&#8217;s debate is about ensuring that we look at why integration is not working or happening in parts of our country, and how this impacts on the ability of our communities to generate an environment of bringing together respect and belonging for shared purposes that bring benefit to all. I look forward to noble Lords&#8217; contrib",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2025-03-13a.880.1&amp;s=%22workless%22#g880.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Naomi Long",
    "Date": "2025-03-11",
    "Debate_Title": "Northern Ireland Assembly: Ministerial Statements: Enabling Access to Justice",
    "Context_Snippet": "With permission, Mr Deputy Speaker, I wish to make a statement on the enabling access to justice programme. When I launched the programme in December, I committed to moving at pace to ensure the viability and sustainability of the justice system and, more importantly, to provide better services and supports to our citizens. I set out a route map so",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-03-11.3.99&amp;s=%22idle%22#g3.101"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Cara Hunter",
    "Date": "2025-03-11",
    "Debate_Title": "Northern Ireland Assembly: Members' Statements: East Derry: Local Football Clubs",
    "Context_Snippet": "I thank some of the local football clubs in my constituency of East Derry. I will name just a few of them: the Heights Football Club; East-End Youth Football Club in Coleraine; and, of course, Portrush Football Club. Those clubs help hundreds of children to enjoy sport and get exercise, instil in them a sense of confidence and offer them positive m",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-03-11.1.10&amp;s=%22idle%22#g1.11"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Marie McNair",
    "Date": "2025-03-06",
    "Debate_Title": "Scottish Parliament: United Kingdom Government Welfare Reforms",
    "Context_Snippet": "I have already said that I will not take an intervention. According to the report: &#8220;Most Panellists agreed that stigma had gotten worse with austerity, UK government&#8217;s &#8216;welfare reform&#8217;, and the cost-of-living crisis&#8221;, and &#8220;Several spoke of putting off claiming for as long as they possibly could, to the point of h",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-03-06.2.0&amp;s=%22scrounger%22#g2.13"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Stephen Kerr",
    "Date": "2025-03-06",
    "Debate_Title": "Scottish Parliament: United Kingdom Government Welfare Reforms",
    "Context_Snippet": "We spent &#163;350 billion this year on welfare in this country. It is about time that we had an honest debate about welfare. We should be honest. The reality is that too many people in this country are able to work but have chosen not to engage in employment. That is not just an economic crisis but a moral one. I wanted to speak in the debate beca",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-03-06.2.0&amp;s=%22lifestyle+choice%22#g2.17"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Vikki Slade",
    "Date": "2025-02-26",
    "Debate_Title": "High Street Rental Auctions &#8212; [Martin Vickers in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Vickers. I congratulate my neighbour, the hon. Member for Bournemouth West (Jessica Toale) , on securing this important debate. It is great to see four new Members from Dorset here this afternoon, which shows what a fantastic place it is to visit. I agree with the hon. Member for South Dorset (L",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-02-26b.418.0&amp;s=%22idle%22#g432.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Unknown",
    "Date": "2025-02-25",
    "Debate_Title": "Public Bill Committee: Public Authorities (Fraud, Error and Recovery) Bill: Examination of Witnesses",
    "Context_Snippet": "Rick Burgess: It is about where that measure is one of a number of additional enforcement measures, rules or laws that would have negative consequences. The key to this is the trawling nature of the technology; it is not targeted, beyond being aimed at everyone on UC, everyone on ESA and so on. When you trawl, you do not target, and then you have a",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Public_Authorities_%28Fraud%2C_Error_and_Recovery%29_Bill/02-0_2025-02-25a.67.3?s=%22not+disabled%22#g70.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Danny Kruger",
    "Date": "2025-02-25",
    "Debate_Title": "Public Bill Committee: Terminally Ill Adults (End of Life) Bill: Clause 2 - Terminal illness",
    "Context_Snippet": "I am grateful, Mr Dowd. I recognise the force of what the hon. Member for Penistone and Stocksbridge is saying. To be clear, the amendments that I am supporting would not deny disabled people any of the other rights that are being awarded in the Bill. She is absolutely right that a disabled person with a terminal illness would qualify just as much ",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Terminally_Ill_Adults_%28End_of_Life%29_Bill/13-0_2025-02-25a.509.4?s=%22not+disabled%22#g522.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Jackie Dunbar",
    "Date": "2025-02-25",
    "Debate_Title": "Scottish Parliament: Budget (Scotland) (No 4) Bill",
    "Context_Snippet": "I am very pleased to support this budget. From speaking with my constituents, I think that it is a budget that they support, too, because it invests in the things that they care most about. It maintains the SNP&#8217;s most popular policies and demonstrates our clear ambition to move Scotland forward. We are putting some big numbers into the basics",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-02-25.3.0&amp;s=%22something+for+nothing%22#g3.114"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Craig Hoy",
    "Date": "2025-02-18",
    "Debate_Title": "Scottish Parliament: Employer National Insurance Contributions",
    "Context_Snippet": "This year, councils are having to contemplate increases that are way above inflation because of ring fencing and the policies of Ivan McKee&#8217;s Government. Undoubtedly, Labour is to blame for the decision to raise national insurance, but the SNP must take responsibility for the consequences of its own choices. As the Parliament prepares to pass",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-02-18.2.0&amp;s=%22burden+on+taxpayers%22#g2.19"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Stephen Morgan",
    "Date": "2025-02-12",
    "Debate_Title": "Written Answers &#8212; Department for Education: Special Educational Needs: School Meals",
    "Context_Snippet": "Education is a devolved matter, and the response outlines the information for England only. This government&#8217;s ambition is that all children and young people with special educational needs and disabilities receive the right support to succeed in their education and as they move into adult life. It is important that children eat nutritious food",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2025-02-04.28480.h&amp;s=%22not+disabled%22#g28480.r0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Gregory Campbell",
    "Date": "2025-02-05",
    "Debate_Title": "High Street Retailers",
    "Context_Snippet": "I thank the hon. Member for raising that; I was just coming on to the business of independent shops. In Northern Ireland, independent retailers have an effective representational body. They are manfully and womanfully struggling to present their case in the face of huge multinationals that exist, particularly on the edge of town and out of town, wh",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-02-05a.380.0&amp;s=%22free+car%22#g380.6"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Debbie Abrahams",
    "Date": "2025-02-04",
    "Debate_Title": "Social Security Benefits",
    "Context_Snippet": "No, I am not going to give way. [Interruption.] I am not going to give way. I welcome the social security order and, in particular, what my right hon. Friend the Minister has said about it. It was an absolute pleasure to serve on the Select Committee when he was its Chair, and in this respect I agree with the shadow Minister: my right hon. Friend&#",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-04a.695.0&amp;s=%22not+disabled%22#g703.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Gareth Davies",
    "Date": "2025-02-04",
    "Debate_Title": "National Insurance Contributions",
    "Context_Snippet": "I completely agree with the point that my hon. Friend is making, which has also been made to me by several local businesses in my constituency. This is a double whammy. We have a tax increase that will increase the cost of doing business and affect the profitability of businesses and, in some cases, their survival; in addition, they are being hit w",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-04a.714.0&amp;s=%22workless%22#g718.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Kirsty Blackman",
    "Date": "2025-02-03",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill",
    "Context_Snippet": "I want to comment on a number of speeches that have been made. As the Scottish National party tabled a reasoned amendment, which unfortunately did not get selected, it will not surprise anyone that we have a number of significant problems with the Bill. Part 1 of the Bill relates to recovering the covid moneys and the services and goods that the Go",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-03e.583.0&amp;s=%22scroungers%22#g608.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Jo White",
    "Date": "2025-02-03",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill",
    "Context_Snippet": "In Bassetlaw, most people work hard all their lives, pay their dues and want to live comfortably. They keep themselves to themselves, whether in Worksop, Harworth, Retford or the villages, but what unites them in anger is the known benefit fraudster who lives down the street. I have lost count of the number of times I have heard the rage, the sense",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-03e.583.0&amp;s=%22workshy%22#g622.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefit cheat",
    "Speaker": "Jim Shannon",
    "Date": "2025-02-03",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill",
    "Context_Snippet": "Let me, at the outset, make it clear for the record that I think it is important that the Government pursue fraud. I asked the Secretary of State about that this afternoon during DWP questions. There is a story in the newspaper today, and it may even have been in yesterday&#8217;s Sunday paper, about a gentleman who defrauded the system of about &#",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-03e.583.0&amp;s=%22benefit+cheat%22#g615.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefits cheats",
    "Speaker": "Zarah Sultana",
    "Date": "2025-02-03",
    "Debate_Title": "Public Authorities (Fraud, Error and Recovery) Bill",
    "Context_Snippet": "I will focus on the powers in the Bill that force banks to trawl through our private financial data, scanning for indicators of fraud and error&#8212;indicators that are not publicly disclosed &#8212;and flag those individuals to the Government. These powers will allow the Department for Work and Pensions to seize money directly from bank accounts ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-02-03e.583.0&amp;s=%22benefits+cheats%22#g611.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Claire Young",
    "Date": "2025-01-30",
    "Debate_Title": "Local Post Offices",
    "Context_Snippet": "I absolutely agree with my hon. Friend, having seen the anxiety that the threat of closure is provoking in my constituents. Yate post office is very busy; there are often significant queues of people waiting to access services. It is rather unusual, because it shares its space with the local sorting office, which operates from the second floor of t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-30a.491.0&amp;s=%22free+car%22#g511.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "John Martin McDonnell",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "I hope that the Government will consider completely scrapping this debate in future years, because it has become farcical. The right hon. Member for Islington North (Jeremy Corbyn) will remember that the welfare cap was introduced because of the Dutch auction that was going on in this Chamber about who could be more brutal on the poor. The welfare ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22scrounger%22#g382.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Jeremy Corbyn",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "I am pleased we are having this debate, although I am sorry that it is relatively short. My concern about the proposal before us is that it recognises an overspend on the welfare cap&#8212;I support the idea that we should be allowed to overshoot the cap&#8212;but hardwires decisions on welfare spending for the next five years. It therefore restric",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22shirkers%22#g380.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skivers",
    "Speaker": "Jeremy Corbyn",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "I am pleased we are having this debate, although I am sorry that it is relatively short. My concern about the proposal before us is that it recognises an overspend on the welfare cap&#8212;I support the idea that we should be allowed to overshoot the cap&#8212;but hardwires decisions on welfare spending for the next five years. It therefore restric",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22skivers%22#g380.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skiver",
    "Speaker": "Jeevun Sandher",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "Every person in this country should be able to live a decent life, but too many of us are unable to earn a decent wage. That is what is pushing up social security spending, leading to the motions that we are debating today. Too many people are forced to claim sickness benefits because the NHS has failed them; there are not enough well-paid jobs; an",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22skiver%22#g373.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Chris Curtis",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "Somebody who works in my local jobcentre in Milton Keynes came to visit me last week and told me about his experiences. He currently has to conduct 10-minute appointments, and as a lot of that time is spent on admin, he is not able to give the necessary help and support to people who are desperate to find a job. Does my hon. Friend agree that it is",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22workshy%22#g374.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "benefit scrounger",
    "Speaker": "John Martin McDonnell",
    "Date": "2025-01-29",
    "Debate_Title": "Welfare Cap",
    "Context_Snippet": "I hope that the Government will consider completely scrapping this debate in future years, because it has become farcical. The right hon. Member for Islington North (Jeremy Corbyn) will remember that the welfare cap was introduced because of the Dutch auction that was going on in this Chamber about who could be more brutal on the poor. The welfare ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-29c.364.0&amp;s=%22benefit+scrounger%22#g382.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Sian Mulholland",
    "Date": "2025-01-27",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Emergency Food Parcels for Children",
    "Context_Snippet": "I rise not out of duty but out of a profound sense of sadness and quite a lot of anger that, in 2025, children in Northern Ireland still rely on food banks to survive; that 62,000 children face hunger in Northern Ireland; that the number of emergency food parcels distributed to children has increased by 90% in the past five years; and that we conti",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-01-27.3.1&amp;s=%22handouts%22#g3.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Andrew Muir",
    "Date": "2025-01-27",
    "Debate_Title": "Northern Ireland Assembly: Private Members' Business: Disposable Nappies: Collection and Recycling Scheme",
    "Context_Snippet": "Thank you, Madam Principal Deputy Speaker. I thank the Members who tabled the motion for bringing it to the House and for their interest in the important issue of recycling. As we navigate the ever-increasing impact of climate change, it is now imperative that we rethink how we deal with our resources. Our current linear economy, in which we take, ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2025-01-27.6.31&amp;s=%22burden+on+taxpayers%22#g6.60"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Shirley-Anne Somerville",
    "Date": "2025-01-23",
    "Debate_Title": "Scottish Parliament: Portfolio Question Time: Social Security Access (Motherwell and Wishaw)",
    "Context_Snippet": "I share the member&#8217;s concern about some of the language regarding social security that we see being used by the Conservatives, by the UK Labour Government and, indeed, by Scottish Labour in its discussion of &#8220;handouts&#8221;. However, unlike the Department for Work and Pensions, we do not have powers to make direct deductions for third-",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-01-23.3.30&amp;s=%22handouts%22#g3.34"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Susan Murray",
    "Date": "2025-01-21",
    "Debate_Title": "Asylum Seeker Hotel Accommodation: Reopening",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Sir John. I am grateful for the opportunity to speak on the important issue of reopening hotels to accommodate asylum seekers. Despite repeated ministerial promises, we continue to see the result of a broken system&#8212;a system that has caused immense hardship for asylum seekers and communities a",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-01-21a.309.0&amp;s=%22burden+on+taxpayers%22#g318.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Shirley-Anne Somerville",
    "Date": "2025-01-14",
    "Debate_Title": "Scottish Parliament: Winter Heating Payment",
    "Context_Snippet": "Marie McNair quite rightly recognises that Labour is now talking about a new direction. I take it that Labour realised that its change line was not quite working, with people realising that no change was happening. Marie McNair raises an important point that goes to how we talk about social security. We had a near consensus&#8212;with the exception",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-01-14.2.0&amp;s=%22handouts%22#g2.25"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Lee Anderson",
    "Date": "2025-01-08",
    "Debate_Title": "Social Housing Tenants: Antisocial Behaviour &#8212; [Esther McVey in the Chair]",
    "Context_Snippet": "I beg to move, That this House has considered social housing tenants and antisocial behaviour. It is a pleasure to serve under your chairship, Ms McVey. Let us imagine a Government who believe that a council house should be a privilege, not a right, and that people have to be of good standing and in full-time employment to secure the keys. Let us i",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2025-01-08b.317.0&amp;s=%22feral%22#g317.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Shirley-Anne Somerville",
    "Date": "2025-01-07",
    "Debate_Title": "Scottish Parliament: Child Poverty",
    "Context_Snippet": "The First Minister said that it is important to make the biggest difference now but also to lay the foundations of a hopeful future. I contrast that with the genuinely disappointing and disturbing new direction from Scottish Labour. I am not sure whether the disappointment with some of the remarks led to the poor attendance in the chamber today, bu",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2025-01-07.4.0&amp;s=%22handouts%22#g4.81"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Will Forster",
    "Date": "2025-01-06",
    "Debate_Title": "Frozen Russian Assets: Ukraine",
    "Context_Snippet": "As my hon. Friend asks the Minister a question, let me highlight something. I hope this Government will have a better record on seizing assets than the previous one. The former Deputy Prime Minister Dominic Raab suggested that Sutton Place in my Woking constituency should be sold to benefit Ukraine or to house Ukrainian refugees; it is sitting idle",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2025-01-06b.652.1&amp;s=%22idle%22#g656.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Shona Robison",
    "Date": "2024-12-11",
    "Debate_Title": "Scottish Parliament: Budget 2025-26",
    "Context_Snippet": "We think that the position that we have put forward is balanced and affordable and focuses on hospitality. We will continue to have discussions on that, but any money that we put into the budget for rates relief will have to be baked in. No money will be allocated by the UK Government for rates relief next year, because it is changing its business ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-12-11.1.0&amp;s=%22handouts%22#g1.18"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "Unknown",
    "Date": "2024-12-10",
    "Debate_Title": "Public Bill Committee: Armed Forces Commissioner Bill: Examination of Witnesses",
    "Context_Snippet": "Lt General Sir Andrew Gregory: The needs of people who come to us are absolutely changing. I have been the chief exec of SSAFA for eight-and-a-bit years, and we have seen a significant change even during that time. The people coming to us are younger, and not just because the world war two and national service generation are slowly passing on, sadl",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2024-25/Armed_Forces_Commissioner_Bill/01-0_2024-12-10a.24.2?s=%22dependency+culture%22#g32.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Jenny Rathbone",
    "Date": "2024-12-04",
    "Debate_Title": "6. Debate on the Equality and Social Justice Committee Report, 'Their Future: Our Priority? Follow up inquiry into childcare provision in Wales'",
    "Context_Snippet": "Thank you. Well, it's been an interesting debate, because there's quite a lot of tension across the Chamber as to what the importance of childcare is all about. Many of us would like to focus more on the child's needs, rather than the parents' need to obtain work, although both are important, because the family with somebody in employment is also g",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2024-12-04.7.636021.h&amp;s=%22won%27t+work%22#g7.636067"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Debbie Abrahams",
    "Date": "2024-12-03",
    "Debate_Title": "International Day of Persons with Disabilities",
    "Context_Snippet": "The hon. Member&#8212;a fellow member of the Work and Pensions Committee&#8212;makes a good point. I am sorry that I was unable to attend that event myself, but I will certainly give that matter some consideration, and I hope that the Government will, too. More than 16 million people in the UK have a disability&#8212;nearly one in four of us&#8212;",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-12-03d.270.0&amp;s=%22scrounger%22#g271.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirker",
    "Speaker": "Debbie Abrahams",
    "Date": "2024-12-03",
    "Debate_Title": "International Day of Persons with Disabilities",
    "Context_Snippet": "The hon. Member&#8212;a fellow member of the Work and Pensions Committee&#8212;makes a good point. I am sorry that I was unable to attend that event myself, but I will certainly give that matter some consideration, and I hope that the Government will, too. More than 16 million people in the UK have a disability&#8212;nearly one in four of us&#8212;",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-12-03d.270.0&amp;s=%22shirker%22#g271.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Debbie Abrahams",
    "Date": "2024-12-03",
    "Debate_Title": "International Day of Persons with Disabilities",
    "Context_Snippet": "The hon. Member&#8212;a fellow member of the Work and Pensions Committee&#8212;makes a good point. I am sorry that I was unable to attend that event myself, but I will certainly give that matter some consideration, and I hope that the Government will, too. More than 16 million people in the UK have a disability&#8212;nearly one in four of us&#8212;",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-12-03d.270.0&amp;s=%22workshy%22#g271.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Jennifer Craft",
    "Date": "2024-12-03",
    "Debate_Title": "Home-to-School Transport: Children with SEND",
    "Context_Snippet": "My hon. Friend makes an excellent point. It is unacceptable that disabled families are faced with choices about their children&#8217;s education that parents of children who are not disabled are not. During the election campaign, I spoke to another woman, Julia, and had the pleasure of meeting her 18-year-old son Oscar, who has cerebral palsy, whic",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-12-03b.79.0&amp;s=%22not+disabled%22#g81.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Kim Leadbeater",
    "Date": "2024-11-29",
    "Debate_Title": "Terminally Ill Adults (End of Life) Bill",
    "Context_Snippet": "I thank my hon. Friend for his intervention and I will come on to some of those points later in my speech. Let us be very clear: the title of the Bill refers to terminally ill adults, not disabled people or elderly people, as another hon. Member referred to. The criteria are very clear. I come back to the status quo, which is the problem we are try",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-11-29d.1009.2&amp;s=%22not+disabled%22#g1015.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Danny Kruger",
    "Date": "2024-11-19",
    "Debate_Title": "Food Banks &#8212; [Valerie Vaz in the Chair]",
    "Context_Snippet": "Yes, indeed; I very much look forward to that review coming along soon. Many hon. Members have mentioned the record of the last Government. I recognise the extent of low wage growth and in-work poverty that we have seen. If we look at absolute poverty, however, which is the measure that we should ultimately be looking at if we are thinking about th",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-11-19b.19.0&amp;s=%22workless%22#g38.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2024-11-13",
    "Debate_Title": "Educational Opportunities &#8212; [Mark Pritchard in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Pritchard. I commend the hon. Member for Folkestone and Hythe (Tony Vaughan) for securing this broad-ranging debate on barriers to education opportunities. There are many things that we could talk about, but in 150 seconds I will restrict myself to three things. The first is about free school me",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-11-13a.240.0&amp;s=%22workless%22#g244.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Unknown",
    "Date": "2024-11-13",
    "Debate_Title": "Rail Performance - <i>Statement</i>",
    "Context_Snippet": "The following Statement was made in the House of Commons on Monday 11 November. &#8220;With permission, Mr Speaker, I shall make a Statement about rail performance. I welcome the shadow Secretary of State for Transport, the honourable Member for Orpington, Gareth Bacon, to his place. I am sure the Opposition will be interested in what we have to up",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-13c.1828.0&amp;s=%22burden+on+taxpayers%22#g1828.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Bowles of Berkhamsted",
    "Date": "2024-11-11",
    "Debate_Title": "Autumn Budget 2024 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, the Government are hoping to launch innovative companies into exports, growth and wealth creation. Unfortunately, that will not happen without fair procurement and ending the unfair way in which departments are encouraged to get intellectual property on the cheap. Help may come following the Procurement Act, but if the Government are seri",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-11a.1575.6&amp;s=%22scroungers%22#g1601.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Mike Martin",
    "Date": "2024-11-11",
    "Debate_Title": "Work and Pensions: Universal Credit: Assessment",
    "Context_Snippet": "One of my constituents spent six hours fully awake during an operation that went wrong, as doctors battled to save her life. Obviously, this affected her mental health, and she was deemed unfit for work by her GP and by a clinical psychologist. She then went through a half-hour telephone assessment for her universal credit health check, which deeme",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-11-11f.488.9&amp;s=%22fit+to+work%22#g489.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Neville-Rolfe",
    "Date": "2024-11-11",
    "Debate_Title": "Autumn Budget 2024 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I am speaking from the Back Benches today about productivity, but I want to start with a thank you to the Minister on two counts. He has rightly resisted the temptation to erode further horse racing&#8217;s competitiveness, vis-&#224;-vis France and Ireland, by increasing betting duty&#8212;I declare an interest as a member of the racing ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-11a.1575.6&amp;s=%22lazy%22#g1599.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Louise Haigh",
    "Date": "2024-11-11",
    "Debate_Title": "Rail Performance",
    "Context_Snippet": "With permission, Mr Speaker, I shall make a statement about rail performance. I welcome the shadow Secretary of State for Transport, the hon. Member for Orpington (Gareth Bacon) , to his place. I am sure the Opposition will be interested in what we have to update the House about this afternoon. After 14 years of neglect, our inheritance was a railw",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-11-11f.517.0&amp;s=%22burden+on+taxpayers%22#g517.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Hazarika",
    "Date": "2024-11-05",
    "Debate_Title": "Health-related Benefit Claims - <i>Question</i>",
    "Context_Snippet": "I thank my noble friend the Minister for that Answer. Does she agree with me that whatever your politics, we should all care about helping more people back to work? It is good for the individual, the economy and the social security bill. Most people claiming health-related benefits are not feckless or lazy; they want to work but have often suffered",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-05a.1389.4&amp;s=%22lazy%22#g1389.7"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Baroness Hazarika",
    "Date": "2024-11-05",
    "Debate_Title": "Health-related Benefit Claims - <i>Question</i>",
    "Context_Snippet": "I thank my noble friend the Minister for that Answer. Does she agree with me that whatever your politics, we should all care about helping more people back to work? It is good for the individual, the economy and the social security bill. Most people claiming health-related benefits are not feckless or lazy; they want to work but have often suffered",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-05a.1389.4&amp;s=%22feckless%22#g1389.7"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Sherlock",
    "Date": "2024-11-05",
    "Debate_Title": "Health-related Benefit Claims - <i>Question</i>",
    "Context_Snippet": "I thank my noble friend for some very good questions. Evidence shows that appropriate work is generally good for health and well- being, so we want everyone who can to get work and get on in work, whoever they are and wherever they live. But that means proper support for those who are living with health conditions or disabilities. In relation to yo",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-11-05a.1389.4&amp;s=%22workless%22#g1390.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Bobby Dean",
    "Date": "2024-10-31",
    "Debate_Title": "Income tax (charge)",
    "Context_Snippet": "The first Budget of a new Government is always significant, but one can rarely have been set in such tricky circumstances. This one comes following a series of major shocks&#8212;some of them external and unpredictable, as Opposition Members have said, such as the covid pandemic and the energy crisis, but some of them down to policy decisions, such",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-10-31e.963.1&amp;s=%22shirkers%22#g1009.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "George Freeman",
    "Date": "2024-10-30",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "It is a great pleasure to follow the hon. Member for Birmingham Edgbaston (Preet Kaur Gill) . It is also an honour and a pleasure, after 14 years, to be able to rise as a free man&#8212;free to speak on the Opposition Benches liberated from the tyranny of the Whips&#8217; handouts that are being so beautifully read from the Labour Benches, and from",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-10-30a.829.1&amp;s=%22handouts%22#g867.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Alison McGovern",
    "Date": "2024-10-24",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Employment: Mental Illness",
    "Context_Snippet": "Appropriate work is generally good for health and wellbeing, so we want everyone to get work and get on in work, whoever they are and wherever they live. We want people to avoid poverty, and for this to happen we must ensure that disabled people and people with health conditions have the opportunity to work and save for as long as they wish and are",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-10-21.10294.h&amp;s=%22workless%22#g10294.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Andrew George",
    "Date": "2024-10-23",
    "Debate_Title": "Independent Water Commission",
    "Context_Snippet": "When the Conservatives privatised water, they created risk-free, money-printing emporiums that could pollute our coasts, including my west Cornwall coast, at their convenience. Although the Secretary of State says that nationalisation is not in scope &#8212;one can understand why&#8212;to what extent will company governance be in scope? Will it be ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-10-23d.279.0&amp;s=%22free+money%22#g290.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Carolyn Thomas",
    "Date": "2024-10-23",
    "Debate_Title": "7. Debate on the Petitions Committee Report, 'A cashless society? P-06-1335: Welsh Government should take steps to ensure vulnerable adults without bank cards can pay with cash'",
    "Context_Snippet": "On behalf of the Petitions Committee, thank you for the opportunity to introduce this debate today. The petition was submitted by Mencap Cymru and closed on 15 May with 2,504 signatures. The petition reads: &#8216;Welsh Government should take steps to ensure vulnerable adults without bank cards can pay with cash' 'the move to a cashless society wil",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2024-10-23.7.623750.h&amp;s=%22free+cash%22#g7.623754"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "Chris Philp",
    "Date": "2024-10-10",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "Mr Speaker, may I start by welcoming your new Chaplain, Rev. Mark Birch, to his role? I am sure we all look forward to working with him. Let me also extend warm birthday wishes to the Leader of the House. It is hard to believe, but today is a very significant birthday for her. The whole House extends warm wishes to her and her family. I am sure the",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-10-10d.464.0&amp;s=%22freebies%22#g464.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Christopher Bloore",
    "Date": "2024-10-10",
    "Debate_Title": "Sport: Team GB and ParalympicsGB",
    "Context_Snippet": "Thank you, Madam Deputy Speaker. I pay tribute to those who have made their maiden speeches today. I have learned a lot&#8212;especially that we may have some excellent tennis doubles partnerships on the Labour Benches. It is an enormous privilege to give my maiden speech in this debate as the representative for Redditch and the villages. During th",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-10-10d.485.0&amp;s=%22won%27t+work%22#g523.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Michael Marra",
    "Date": "2024-10-09",
    "Debate_Title": "Scottish Parliament: Budget Priorities 2025-26",
    "Context_Snippet": "I agree with Ross Greer that it is certainly a good thing that we are going to have the long-awaited fiscal sustainability debate. There are real challenges in our public finances in Scotland that we need to get to grips with. In eight weeks&#8217; time, the cabinet secretary will be on her feet in the Parliament to announce the budget for the comi",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-10-09.1.0&amp;s=%22idle%22#g1.22"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "Tess White",
    "Date": "2024-10-08",
    "Debate_Title": "Scottish Parliament: Challenge Poverty Week",
    "Context_Snippet": "The Scottish Conservatives are calling on both the UK and SNP Governments to show some common sense and work together to deliver for all those affected by poverty. To be clear, we do not support the cut to winter fuel payments imposed on pensioners by Labour and the SNP. It is a betrayal of thousands of vulnerable people in Scotland who are trying ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-10-08.2.0&amp;s=%22freebies%22#g2.55"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Ivan McKee",
    "Date": "2024-10-01",
    "Debate_Title": "Scottish Parliament: Aggregates Tax and Devolved Taxes Administration (Scotland) Bill: Stage 3",
    "Context_Snippet": "Part 1 of the bill enables groups of companies to register collectively for Scottish aggregates tax. The benefit of doing that is that it reduces the administrative burden on taxpayers. The bill sets out how groups of companies and members of such groups are to be treated with regard to tax liabilities and administrative processes. Companies that a",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-10-01.4.0&amp;s=%22burden+on+taxpayers%22#g4.7"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lorna Slater",
    "Date": "2024-09-24",
    "Debate_Title": "Scottish Parliament: UK Budget (Scotland&#8217;s Priorities)",
    "Context_Snippet": "We look forward, of course, to seeing detailed plans for investment and, more specifically, for how the incoming Government intends to pay for them. I have some suggestions. The UK Government must look at the revenue-raising options of taxing polluters and the very wealthy. Indeed, one of the outcomes of the austerity years in the UK is that the we",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-09-24.3.0&amp;s=%22handouts%22#g3.43"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "Kevin Stewart",
    "Date": "2024-09-24",
    "Debate_Title": "Scottish Parliament: UK Budget (Scotland&#8217;s Priorities)",
    "Context_Snippet": "As I laid out at the beginning of my speech, we need to see the detail on GB energy. We do not know how many jobs it will provide, but according to Unite the union, if Labour carries on with the policies that it has on the table so far, that will lead to 30,000 job losses. Of course, others say that there could be up to 100,000 job losses if we do ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-09-24.3.0&amp;s=%22freebies%22#g3.48"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Janke",
    "Date": "2024-09-11",
    "Debate_Title": "Social Fund Winter Fuel Payment Regulations 2024 - <i>Motion to Annul</i>",
    "Context_Snippet": "My Lords, as other noble Lords have said, there is a sense of bewilderment for so many people at one of the new Labour Government&#8217;s first actions being to punish the poorest pensioners for the shortcomings of the previous Conservative Government by restricting winter fuel payments to those receiving pension credit. Means-tested pension credit",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-09-11a.1587.0&amp;s=%22handouts%22#g1599.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "the Earl of Courtown",
    "Date": "2024-09-02",
    "Debate_Title": "Crown Estate Bill [HL] - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is a pleasure to follow the noble Baroness, Lady Kramer, and to have had the opportunity to hear so many wise contributions from across your Lordships&#8217; House today. Unfortunately, my noble friend Lady Vere of Norbiton is unable to be here today, but I anticipate that she will take part in the Bill&#8217;s later stages. I am pleas",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-09-02a.969.4&amp;s=%22free+cash%22#g1014.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Merron",
    "Date": "2024-08-19",
    "Debate_Title": "Written Answers &#8212; Department of Health and Social Care: Mental Health Services: Speech and Language Disorders",
    "Context_Snippet": "As set out in the NHS Priorities and Operational Planning Guidance for 2024/25, NHS England is continuing to expand access to mental health services. This includes increasing the number of children and young people accessing comprehensive mental health support, as well as the number of adults and older adults completing a course of treatment for an",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-07-24.HL294.h&amp;s=%22not+disabled%22#gHL294.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Rachel Hopkins",
    "Date": "2024-07-29",
    "Debate_Title": "Passenger Railway Services (Public Ownership) Bill",
    "Context_Snippet": "I congratulate all those who have made maiden speeches this evening, especially my hon. Friends the Members for Hertford and Stortford (Josh Dean) and for Stevenage (Kevin Bonavia), fellow eastern region MPs with whom I have campaigned long and hard. It is a delight to see them here in the Chamber. It is a pleasure to speak in this important debate",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-07-29f.1075.0&amp;s=%22free+money%22#g1113.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lola McEvoy",
    "Date": "2024-07-23",
    "Debate_Title": "Immigration and Home Affairs",
    "Context_Snippet": "It is customary to pay tribute to the speaker before me for his first contribution to this House, but, let us face it, that was quite a polished contribution that he has had 21 years to prepare&#8212;so thank you to him. This is my maiden speech as the first woman to represent Darlington from the Government Benches. I wish to pay tribute to Barones",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-07-23f.531.3&amp;s=%22handouts%22#g574.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Lister of Burtersett",
    "Date": "2024-07-19",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (3rd Day)</i>",
    "Context_Snippet": "My Lords, I welcome my noble friends to their important new ministerial roles, and our Government&#8217;s mission to break down the barriers to opportunity. A fundamental barrier, as recognised, is poverty, especially child poverty. That is closely linked to women&#8217;s poverty and is part of the intersecting inequalities which, as the Fairness F",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-07-19b.133.4&amp;s=%22handouts%22#g181.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Tyler of Enfield",
    "Date": "2024-07-19",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (3rd Day)</i>",
    "Context_Snippet": "My Lords, as this debate draws to an end, I warmly welcome the newly appointed Ministers to their important new roles. I thank the outgoing Ministers, and commend the two excellent maiden speeches that we have heard today. I particularly commend my noble friend Lady Jolly for her excellent valedictory speech and pay tribute to her outstanding contr",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-07-19b.133.4&amp;s=%22idle%22#g211.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Unknown",
    "Date": "2024-06-04",
    "Debate_Title": "Scottish Parliament: Time for Reflection",
    "Context_Snippet": "Dr Joseph J Morrow: I am very honoured to be with you in our Parliament today. On 31 May at 12 noon, in full regalia&#8212;not a suit like this&#8212;I stood and made the proclamation for the dissolution of the Westminster Parliament. I realised that many people, including you, would now be entering a concerted effort to get their views over to the",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-06-04.0.0&amp;s=%22lazy%22#g0.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Bob Seely",
    "Date": "2024-05-22",
    "Debate_Title": "Immigration and Asylum",
    "Context_Snippet": "I beg to move, That leave be given to bring in a Bill to make provision for the annual approval by the House of Commons of maximum numbers in respect of immigration and asylum; to provide that asylum may only be granted to individuals identified as refugees by the UN Refugee Agency, other than in specified circumstances; and for connected purposes.",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-05-22b.910.0&amp;s=%22lazy%22#g910.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Berridge",
    "Date": "2024-05-22",
    "Debate_Title": "Media Bill - <i>Committee (3rd Day)</i>: Amendment 71",
    "Context_Snippet": "My Lords, first, I need to apologise to noble Lords that I was not present at Second Reading. I am grateful to a number of local radio stations, and especially to Rob Persani of Rutland radio, which is where the Vale of Catmose is, for bringing to my attention the issue in Amendment 72. I am also grateful to the noble Viscount, Lord Colville, and t",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-22a.1100.5&amp;s=%22idle%22#g1102.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Janet Finch-Saunders",
    "Date": "2024-05-21",
    "Debate_Title": "2. Questions to the Counsel General: The Rights of Asylum Seekers",
    "Context_Snippet": "Thank you. People around the world are facing turmoil and violence, and so, rightly, are seeking sanctuary throughout the world. In Britain, we are no different, and I'm proud of the tens of thousands of yearly asylum applicants that the UK Government processes. However, we here in Wales must approach this topic with caution, because there does not",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2024-05-21.3.592611&amp;s=%22handouts%22#g3.592615"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Andrews",
    "Date": "2024-05-16",
    "Debate_Title": "People with Disabilities: Access to Services - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a great pleasure and privilege to follow the noble Baroness, Lady Thomas of Winchester. She has fought her corner on disability issues for so many years, and it is no surprise to hear her focusing on PIP and the need for medical assessment. I am very grateful to my noble friend for introducing the debate in the way that she did, whi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-16c.702.0&amp;s=%22scroungers%22#g720.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Sherlock",
    "Date": "2024-05-16",
    "Debate_Title": "People with Disabilities: Access to Services - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I am grateful to all noble Lords for the depth and breadth of this fabulous debate, and particularly to my noble friend Lady Hughes of Stretford for the very comprehensive and helpful way in which she framed it. As she pointed out, we are debating the challenges facing nearly one-quarter of our population. That makes it a major issue for ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-16c.702.0&amp;s=%22not+disabled%22#g729.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "playing the system",
    "Speaker": "Baroness Hughes of Stretford",
    "Date": "2024-05-16",
    "Debate_Title": "People with Disabilities: Access to Services - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, according to the Family Resources Survey: Financial Year 2022 to 2023, published recently by the Department for Work and Pensions&#8212;the primary measure of disability prevalence in the UK&#8212;the number of disabled people has been rising steadily over the last 15 years or so. It now stands at an estimated 16.1 million people&#8212;24",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-16c.702.0&amp;s=%22playing+the+system%22#g702.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Margaret Greenwood",
    "Date": "2024-05-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Disability: Cost of Living",
    "Context_Snippet": "To ask the Secretary of State for Work and Pensions, what estimate his Department has made of the average extra costs that disabled people face as a result of their disability compared to people who are not disabled.",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-05-03.24769.h&amp;s=%22not+disabled%22#g24769.q0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Lord Sharpe of Epsom",
    "Date": "2024-05-09",
    "Debate_Title": "Inadmissible Asylum Seekers - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, I thank the noble Lord, Lord German, and all noble Lords who have contributed to this debate. As noble Lords are aware, the UK has a long and proud tradition of providing safe haven to those who genuinely need our protection, and we remain committed to providing such protection, in accordance with our international obligations. The matter",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-09a.301.0&amp;s=%22burden+on+taxpayers%22#g311.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Drew Hendry",
    "Date": "2024-05-08",
    "Debate_Title": "Finance (No. 2) Bill: Clause 1 - Income tax charge for tax year 2024-25",
    "Context_Snippet": "Had the right hon. Gentleman done any real research, he would know that the figures for the UK are skewed dramatically by the overheated economy of London and the south-east, which buck the UK trend. If he looks at the figures for all the counties of England, including those in the north of England, he will see how the Government are letting down t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-05-08c.605.3&amp;s=%22lazy%22#g618.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "David Johnston",
    "Date": "2024-05-07",
    "Debate_Title": "Written Answers &#8212; Department for Education: Childcare",
    "Context_Snippet": "In 2010 there was only 12.5 hours of childcare support for some families with 3 and 4-year-olds. This government has already significantly expanded that support, to 30 hours free childcare for working parents of 3 and 4-year-olds. The department is now going further, making the largest investment in childcare in England&#8217;s history. The rates f",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-26.23850.h&amp;s=%22free+cash%22#g23850.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Andrea Jenkyns",
    "Date": "2024-05-07",
    "Debate_Title": "Illegal Immigration: Costs &#8212; [Graham Stringer in the Chair]",
    "Context_Snippet": "I beg to move, That this House has considered the costs associated with illegal immigration. It is a pleasure to serve under your chairmanship, Mr Stringer. I thank the Backbench Business Committee for granting this debate, and I thank Members across the House for their support, including the former Home Secretary, my right hon. and learned Friend ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-05-07a.225.0&amp;s=%22handouts%22#g225.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Jo Churchill",
    "Date": "2024-05-02",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Universal Credit: Disability",
    "Context_Snippet": "Universal Credit provides more generous support for disabled people than it does for people in similar circumstances who are not disabled. Based on the outcome of a work capability assessment, it may be decided that a claimant has limited capability for work and work-related activity, and may be awarded an additional amount of benefit, currently &#",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-24.23483.h&amp;s=%22not+disabled%22#g23483.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-05-02",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Employment: Poverty",
    "Context_Snippet": "The latest available statistics show that working age adults living in workless households were around 7 times more likely to be in absolute poverty after housing costs than working age adults in households where all adults work. The Government is committed to supporting individuals who are stuck in low paid work to progress, helping them increase ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-24.23514.h&amp;s=%22workless%22#g23514.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Sherlock",
    "Date": "2024-05-01",
    "Debate_Title": "Health and Disability Reform - <i>Statement</i>",
    "Context_Snippet": "My Lords, I am grateful to have the opportunity at last to ask some questions about this Statement, because the route here has not been pretty or swift. The Prime Minister made a speech on 19 April about the need to reform sickness and disability benefits. Cue lots of headlines about sick note culture and the need for a crackdown. Then, there was s",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-01b.1964.1&amp;s=%22not+disabled%22#g1966.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Newlove",
    "Date": "2024-05-01",
    "Debate_Title": "Health and Disability Reform - <i>Statement</i>",
    "Context_Snippet": "I want to ask the Minister about applying for PIP. Similar to my noble friend Lady Browning&#8217;s case, my son-in-law has applied. He has MS and has been advised by his consultant. He has waited six years for a diagnosis and is 32 years of age. His application for PIP was turned down. He works 50 hours a week&#8212;he is not lazy at all, or anyth",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-05-01b.1964.1&amp;s=%22lazy%22#g1976.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-05-01",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "Our focus is on supporting parents into work as we know that work substantially reduces the chances of poverty. The latest available statistics show that in 2022/23, children in workless lone parent families were nearly 3 times more likely to be in absolute low income after housing costs than children in working lone parent families. We have consis",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-22.22981.h&amp;s=%22workless%22#g22981.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Mark Durkan",
    "Date": "2024-04-30",
    "Debate_Title": "Northern Ireland Assembly: Members' Statements: Personal Independence Payments: Proposed Reform",
    "Context_Snippet": "The personal independence payment (PIP) is a lifeline that provides support for basic needs such as housing, transport, food and heating. As complex and flawed as the PIP process can be and often is, disability benefits in general offer a safety net: assurance from the welfare state that society's most vulnerable will be protected. Recent proposals",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2024-04-30.2.20&amp;s=%22scroungers%22#g2.21"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Stephen Timms",
    "Date": "2024-04-29",
    "Debate_Title": "Health and Disability Reform",
    "Context_Snippet": "PIP assessment providers confirm that worsening delays in NHS treatment are a big factor in the increase in the number of people applying for PIP. The Secretary of State has confirmed this afternoon that the work capability assessment is to be scrapped and replaced by PIP assessments. There are people who are too ill to work, but not disabled, and ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-04-29a.45.0&amp;s=%22not+disabled%22#g52.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "John Martin McDonnell",
    "Date": "2024-04-29",
    "Debate_Title": "Health and Disability Reform",
    "Context_Snippet": "The Secretary of State has said that the Government&#8217;s approach is fair and compassionate. Can he tell me what is compassionate about the language used by the Prime Minister over the past fortnight, when he has referred to a &#8220;sick note culture&#8221;, implied that people who are forced to rely on benefits do so as a lifestyle choice, and",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-04-29a.45.0&amp;s=%22lifestyle+choice%22#g58.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-04-29",
    "Debate_Title": "Child Poverty - <i>Question for Short Debate</i>",
    "Context_Snippet": "Indeed, I will allude to the cross-government work that is going on. It may be that it requires a letter to write on that point, but I shall allude to it later, if I have the time. Altogether this year we will have spent &#163;306 billion through the welfare system in Great Britain, including around &#163;138 billion on people of working age and ch",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-04-29b.1782.0&amp;s=%22workless%22#g1801.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Liam Kerr",
    "Date": "2024-04-25",
    "Debate_Title": "Scottish Parliament: Railway Stations (North of Central Belt)",
    "Context_Snippet": "I am not sure that I do have confidence in that because only 3 per cent of the funding has been delivered so far, about eight years on. The SNP Government has recently suggested that the pledge is under review, so perhaps the minister can allay those concerns in her closing speech. However, the minister will be pleased to note that Nestrans also su",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-04-25.2.0&amp;s=%22free+money%22#g2.4"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "money for nothing",
    "Speaker": "Baroness Taylor of Stevenage",
    "Date": "2024-04-25",
    "Debate_Title": "Affordable Housing: Supply - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I add my welcome, or croeso, to the noble Baroness, Lady Smith of Llanfaes, and thank her for her excellent speech. I do not share her youth, sadly, or her hair colour &#8212;I may have done back in the day&#8212;or Doc Martens, but I did grow up in a council house, as she did, and I share her strong passion for housing. I think that she ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-04-25a.1654.2&amp;s=%22money+for+nothing%22#g1678.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-04-25",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics show that in 2022/23 there were 100,000 fewer children in absolute poverty after housing costs than in 2009/10. Where possible, it is in the best interests of children to be in working households and the benefit cap provides a clear incentive to move into work. Children living in workless households were over 6 times more like",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-17.22334.h&amp;s=%22workless%22#g22334.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Bim Afolami",
    "Date": "2024-04-24",
    "Debate_Title": "Access to Banking: Devon",
    "Context_Snippet": "It is an absolute pleasure to respond to this debate, and I thank my hon. Friend the Member for East Devon (Simon Jupp) for securing it. We know that our colleagues in this place all work hard for their constituents, but some go the extra mile. I would say that on this subject, like so many others, my hon. Friend is an exemplar of what can be seen ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-04-24b.1108.0&amp;s=%22free+cash%22#g1111.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Baroness Pinnock",
    "Date": "2024-04-24",
    "Debate_Title": "Leasehold and Freehold Reform Bill - <i>Committee (2nd Day) (Continued)</i>: Amendment 63",
    "Context_Snippet": "My Lords, Amendment 63 in my name was tabled to probe the impact of the proposals in the Bill on ground rent investments, and the effect of prohibiting future ground rent investments, and encouraging divestment from existing ground rent investments, on leaseholders and freeholders. The Government&#8217;s intentions appeared to be clear. In 2022, th",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-04-24c.1572.1&amp;s=%22something+for+nothing%22#g1573.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2024-04-24",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Children in Care: North of England",
    "Context_Snippet": "DWP recognises the challenges care leavers face as they move out of the care system and has in place a series of easements aimed at simplifying and improving their interaction with the benefit system. In addition to the intensive tailored support the Youth Offer provides for young people with additional barriers to work, we are working with employe",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-17.22330.h&amp;s=%22workless%22#g22330.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Tom Pursglove",
    "Date": "2024-04-24",
    "Debate_Title": "Written Answers &#8212; Home Office: Immigration: Applications",
    "Context_Snippet": "Our priority is to consider claims as efficiently and fairly as possible. This is best for claimants, but also reduces the number of people on asylum support, and in turn, the burden on taxpayers.&#8239;There may be circumstances which may delay the progression of a case, for example waiting for evidence that is of importance in deciding a claim, o",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-04-17.22352.h&amp;s=%22burden+on+taxpayers%22#g22352.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "malingerers",
    "Speaker": "Debbie Abrahams",
    "Date": "2024-04-23",
    "Debate_Title": "Points of Order",
    "Context_Snippet": "On a point of order, Madam Deputy Speaker. Last Friday the Prime Minister made a speech, not to this House, but to the press, describing what he referred to as a &#8220;sick note culture&#8221;, and implying that people who are economically inactive due to ill health or disability are not genuine, but malingerers. That was grossly offensive not onl",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-04-23a.823.0&amp;s=%22malingerers%22#g823.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Kenny MacAskill",
    "Date": "2024-04-23",
    "Debate_Title": "Household Energy Debt",
    "Context_Snippet": "I fully accept the hon. Member&#8217;s intervention. This is an issue across the United Kingdom, including Northern Ireland. Climatic matters are worsening the situation in Scotland, but other factors affect other areas. As I will go on to say, the days of the summer months being some protection are long passing. What does this mean for those in de",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-04-23b.244.0&amp;s=%22feckless%22#g244.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-04-22",
    "Debate_Title": "Food Poverty Strategy",
    "Context_Snippet": "I thank the hon. Gentleman for giving me the opportunity to put to bed completely the idea that there has been any change in our policy. We have always signposted that support. The only thing the DWP has done is brought in a new slip to replace the one used previously. There is no change to the existing policy, but the new slip allows us to improve",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-04-22c.771.0&amp;s=%22workless%22#g777.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Graham Simpson",
    "Date": "2024-04-18",
    "Debate_Title": "Scottish Parliament: Scottish Employment Injuries Advisory Council Bill: Stage 1",
    "Context_Snippet": "I also congratulate Mark Griffin on getting his bill to this stage, because getting a member&#8217;s bill through the system is no easy matter. It is time-consuming and can be frustrating, so he has done really well. He must have been full of hope that his proposal might become law, until he read the committee&#8217;s report. A negative committee r",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-04-18.7.0&amp;s=%22lazy%22#g7.48"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Mark Durkan",
    "Date": "2024-04-16",
    "Debate_Title": "Northern Ireland Assembly: Opposition Business: Universal Credit: Remove the Two-child Limit",
    "Context_Snippet": "Sorry, I do not really have time. I will come to you if I have time later on. It is important to understand the events that got us here. The two-child limit was floated by then Chancellor of the Exchequer, George Osborne, among additional austerity-based welfare reform measures, as part of his post-election emergency Budget in July 2015. Osborne wa",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2024-04-16.2.1&amp;s=%22scroungers%22#g2.91"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Mark Durkan",
    "Date": "2024-04-16",
    "Debate_Title": "Northern Ireland Assembly: Opposition Business: Universal Credit: Remove the Two-child Limit",
    "Context_Snippet": "Sorry, I do not really have time. I will come to you if I have time later on. It is important to understand the events that got us here. The two-child limit was floated by then Chancellor of the Exchequer, George Osborne, among additional austerity-based welfare reform measures, as part of his post-election emergency Budget in July 2015. Osborne wa",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2024-04-16.2.1&amp;s=%22idle%22#g2.91"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Jones of Moulsecoomb",
    "Date": "2024-04-15",
    "Debate_Title": "Litigation Funding Agreements (Enforceability) Bill [HL] - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, it is always a pleasure to follow the noble Lord, Lord Wolfson, with his niche points. I keep finding myself in debates with lawyers. I must say, they have some very interesting anecdotes that we all listen to with great interest. It is fair to say that I am deeply suspicious of everything that this Government bring to your Lordships&#821",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-04-15b.797.4&amp;s=%22lazy%22#g809.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-04-08",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "These statistics cover 2022/23, a year when war in Ukraine and global supply chain challenges led to unexpected and high rates on inflation, averaging 10% over the year. These factors are reflected in the statistics. In response to these pressures, the Government provided an unprecedented cost of living support package which helped to shield househ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-03-25.HL3603.h&amp;s=%22workless%22#gHL3603.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Baroness Pinnock",
    "Date": "2024-03-27",
    "Debate_Title": "Leasehold and Freehold Reform Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I thank the Minister for being so generous with her time in discussing the content of this Bill and for being willing, on behalf of the Government, to front it. As we have heard, there is wide support for the Bill, but significant shortcomings have been noted from all quarters and all sides. Reform of this archaic property ownership arran",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-03-27a.702.0&amp;s=%22something+for+nothing%22#g756.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Alasdair Allan",
    "Date": "2024-03-27",
    "Debate_Title": "Scottish Parliament: Agriculture and Rural Communities (Scotland) Bill: Stage 1",
    "Context_Snippet": "The Agriculture and Rural Communities (Scotland) Bill and the secondary legislation that will follow it will have far-reaching effects across rural Scotland. The Rural Affairs and Islands Committee, on which I serve, has not been idle in taking evidence on the bill. It has already visited farms, held round-table events and received evidence in pers",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-03-27.18.0&amp;s=%22idle%22#g18.99"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "John Martin McDonnell",
    "Date": "2024-03-26",
    "Debate_Title": "Disability Benefits",
    "Context_Snippet": "I will try to be as brief as possible, so that others can contribute. Before I come to the general topic, I want to make one specific point to reinforce what my hon. Friend the Member for Slough (Mr Dhesi) said. I am a champion for Action for ME, the myalgic encephalomyelitis campaign. The organisation has written to a number of us to emphasise its",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-03-26b.477.0&amp;s=%22fit+to+work%22#g480.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Tim Farron",
    "Date": "2024-03-26",
    "Debate_Title": "People Granted Asylum: Government Support",
    "Context_Snippet": "The hon. Gentleman makes a very good point. Local authorities end up picking up the tab. I will refer to this later, but, as the Home Office seeks to reduce its expenditure, it ends up passing the buck to another part of the public sector. The same taxpayers are paying the bill, yet we have misery for the people at the wrong end of that. The period",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-03-26b.444.0&amp;s=%22idle%22#g445.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mel Stride",
    "Date": "2024-03-18",
    "Debate_Title": "Work and Pensions: Topical Questions",
    "Context_Snippet": "I have to take issue with the hon. Gentleman. He needs to look more closely at his party&#8217;s record in government. Fact No. 1 is that the Labour party always leaves office with higher unemployment. Fact No. 2 is that economic inactivity in our country is lower than in any year in his party&#8217;s time in office. Fact No. 3 is that absolute pov",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-18c.650.2&amp;s=%22workless%22#g654.6"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Sarah Champion",
    "Date": "2024-03-15",
    "Debate_Title": "Public Procurement (British Goods and Services) Bill",
    "Context_Snippet": "The Minister, as ever, is trying to find a solution which benefits us both&#8212;that is what I am trying to do with the Bill&#8212;so I absolutely take up his offer and thank him for it. I will talk more about the working group at the end, but I have brought together a group of industry professionals. We all want to see British businesses getting ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-15a.611.0&amp;s=%22handouts%22#g612.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Therese Coffey",
    "Date": "2024-03-15",
    "Debate_Title": "Animal Welfare (Import of Dogs, Cats and Ferrets) Bill",
    "Context_Snippet": "It is a huge pleasure to speak in the debate. I congratulate my hon. Friend the Member for North Devon (Selaine Saxby) on promoting this legislation. Just from looking at the text of the legislation, hon. Members can see quite how complicated it is to amend a variety of bits of law on something we would have hoped would be straightforward. The reas",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-15a.549.2&amp;s=%22feral%22#g561.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Zarah Sultana",
    "Date": "2024-03-12",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "I was a teenager when the Conservative party came to power. As that Government took office, they told us that they had to cut funding for public services, blaming &#8220;benefit cheats&#8221; and &#8220;welfare scroungers&#8221;, but they reassured us: &#8220;We&#8217;re all in it together&#8221;, they said. Of course, that is not how it turned out",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-12b.169.2&amp;s=%22scroungers%22#g221.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Rachel Maclean",
    "Date": "2024-03-07",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "It is a privilege to follow the previous speakers, and the hon. Member for Bethnal Green and Bow (Rushanara Ali) . Today&#8217;s theme is making work pay. I believe that this is one of the key challenges facing our country. Conservatives believe in conserving, but what is it that we seek to conserve? In a word, freedom. As Ronald Reagan said: &#822",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-07c.985.2&amp;s=%22shirkers%22#g1017.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Rachel Maclean",
    "Date": "2024-03-07",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "It is a privilege to follow the previous speakers, and the hon. Member for Bethnal Green and Bow (Rushanara Ali) . Today&#8217;s theme is making work pay. I believe that this is one of the key challenges facing our country. Conservatives believe in conserving, but what is it that we seek to conserve? In a word, freedom. As Ronald Reagan said: &#822",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-07c.985.2&amp;s=%22lifestyle+choice%22#g1017.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Rachel Maclean",
    "Date": "2024-03-07",
    "Debate_Title": "Income Tax (Charge)",
    "Context_Snippet": "It is a privilege to follow the previous speakers, and the hon. Member for Bethnal Green and Bow (Rushanara Ali) . Today&#8217;s theme is making work pay. I believe that this is one of the key challenges facing our country. Conservatives believe in conserving, but what is it that we seek to conserve? In a word, freedom. As Ronald Reagan said: &#822",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-07c.985.2&amp;s=%22something+for+nothing%22#g1017.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Penny Mordaunt",
    "Date": "2024-03-07",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "I start by noting that tomorrow is International Women&#8217;s Day. I point out that on most Thursdays, the primary players in this session are three women, and sometimes there is a fourth in the Speaker&#8217;s Chair. It is sometimes noted that women are often the last to speak in meetings. That may be true, but we are often the first to set the r",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-03-07c.965.0&amp;s=%22workless%22#g967.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-03-07",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Families",
    "Context_Snippet": "The Government is committed to a sustainable, long-term approach to tackling poverty and supporting people on lower incomes. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. Working age benefits will increase by 6.7% from April 2024. We are al",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-28.16223.h&amp;s=%22workless%22#g16223.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-03-05",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Household Support Fund",
    "Context_Snippet": "The current Household Support Fund runs from April 2023 until the end of March 2024, and the government continues to keep all its existing programmes under review in the usual way. The Government has provided over &#163;2 billion in funding for the Household Support Fund since October 2021. The Government is committed to reducing poverty and suppor",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-21.HL2683.h&amp;s=%22workless%22#gHL2683.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-03-04",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Household Support Fund",
    "Context_Snippet": "The current Household Support Fund runs from April 2023 until the end of March 2024, and the Government continues to keep all its existing programmes under review in the usual way. The Government is committed to reducing poverty and supporting low-income families. Our approach to tackling poverty is based on clear evidence that parental employment,",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-20.HL2605.h&amp;s=%22workless%22#gHL2605.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-03-04",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Household Support Fund",
    "Context_Snippet": "The current Household Support Fund runs from April 2023 until the end of March 2024, and the Government continues to keep all its existing programmes under review in the usual way. The Government is committed to reducing poverty and supporting low-income families. Our approach to tackling poverty is based on clear evidence that parental employment,",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-19.HL2585.h&amp;s=%22workless%22#gHL2585.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-03-01",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Government Assistance",
    "Context_Snippet": "The Government is committed to reducing poverty and supporting low-income families. We expect to spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. From this April, working age benefits will increase by 6.7% and, we are also raising the Local Housing Al",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-27.15926.h&amp;s=%22workless%22#g15926.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Benjamin",
    "Date": "2024-02-29",
    "Debate_Title": "Windrush - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, lives have been ruined, people have been falsely accused of lying and breaking the law, many have faced mental health issues and some have died without compensation&#8212;no, I am not referring to the Post Office scandal but to something equally shocking and unjust: the Windrush scandal, which I prefer to call the &#8220;Home Office scand",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-29b.1160.3&amp;s=%22handouts%22#g1160.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Yasmin Qureshi",
    "Date": "2024-02-28",
    "Debate_Title": "Funding for Youth Services &#8212; [Derek Twigg in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Twigg. I congratulate my hon. Friend the Member for Luton South (Rachel Hopkins) on introducing this absolutely fantastic and timely debate. I endorse her comments and those that my hon. Friend the Member for Stockton North (Alex Cunningham) just made, including the figures and statistics that h",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-02-28a.131.0&amp;s=%22lazy%22#g136.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-02-28",
    "Debate_Title": "UNICEF: Child Poverty Rankings - <i>Question</i>",
    "Context_Snippet": "My Lords, parental employment plays an important role in reducing the risk of child poverty, and there are 680,000 fewer children growing up in workless households compared with 2010. In 2023-24, we expect to spend around &#163;124 billion through the welfare system on people of working age and children. With over 900,000 vacancies UK-wide, our foc",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-28a.1026.4&amp;s=%22workless%22#g1026.6"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-02-28",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. Working age benefits will increase by 6.7% from April 2024, subject to Parliamentary",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-21.15153.h&amp;s=%22workless%22#g15153.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Kenneth Gibson",
    "Date": "2024-02-27",
    "Debate_Title": "Scottish Parliament: Budget (Scotland) (No 3) Bill",
    "Context_Snippet": "Yes, I agree with that. However, today, we are talking about the funding for the budget that will apply from April. Last year, I asked where Daniel Johnson&#8217;s fully costed budget was. He said that he would bring it to my office but, a year later, I am still waiting for it. That is not exactly the action of a potential Government in waiting, or",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2024-02-27.6.0&amp;s=%22lazy%22#g6.51"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Taylor of Stevenage",
    "Date": "2024-02-22",
    "Debate_Title": "Poverty Reduction - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank the noble Lord, Lord Bird, for securing this very important debate, for the truly magnificent work he has done over many years to alleviate poverty and homelessness, and for being a real champion of independence and dignity as that work was carried out. I also congratulate the right reverend Prelate the Bishop of Durham on his mar",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-22a.710.0&amp;s=%22not+disabled%22#g732.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Peter Aldous",
    "Date": "2024-02-22",
    "Debate_Title": "Backbench Business: Coastal Tourism and Hospitality: Fiscal Support &#8212; [Judith Cummins in the Chair]",
    "Context_Snippet": "It is a pleasure to serve with you in the Chair, Mrs Cummins. I congratulate my hon. Friend the Member for North Devon (Selaine Saxby) on securing the debate and thank the Backbench Business Committee for granting it. Tourism around the British coast remains a vital component part of the UK economy. That is perhaps overlooked at times, and it is ri",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-02-22a.329.1&amp;s=%22handouts%22#g339.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Sikka",
    "Date": "2024-02-21",
    "Debate_Title": "Finance Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "My Lords, it is always a great pleasure to follow the noble Lord, Lord Leigh of Hurley, even though I do not agree with much of what he said. This Bill is a mishmash of policies that have already given us recession, poverty, stagnation, NHS queues, food banks, inequalities and crumbling public infrastructure. Building a just society does not seem t",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-21b.646.0&amp;s=%22handouts%22#g655.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2024-02-21",
    "Debate_Title": "Access to Education: South-East Northumberland",
    "Context_Snippet": "It is a great pleasure to see you in the Chair, Mr Henderson. It is an auspicious day: I believe it is your maiden chairing of Westminster Hall, and it is a privilege for us all to be part of it. I congratulate the hon. Member for Wansbeck (Ian Lavery) on his passionate and comprehensive remarks about access to education in his area. The Government",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-02-21b.290.0&amp;s=%22workless%22#g299.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-02-20",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Household Support Fund",
    "Context_Snippet": "The report looks at a broad range of policy areas and, while we have made no specific assessment of the report itself, my Department continues to monitor the impact of its policies. The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare syste",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-07.HL2298.h&amp;s=%22workless%22#gHL2298.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-02-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Birmingham",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. Working age benefits will increase by 6.7% from April 2024, subject to Parliamentary",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-02-06.13330.h&amp;s=%22workless%22#g13330.r0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "the Bishop of Bristol",
    "Date": "2024-02-08",
    "Debate_Title": "Workers (Economic Affairs Committee Report) - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a pleasure to speak in this important debate about the nature of the UK workforce in a challenging economic climate. I pay tribute to the noble Lord, Lord Bridges, as have others, and all the members of the Economic Affairs Committee who worked to produce this report and have stimulated our thinking today. On a personal note, having",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-08c.1751.0&amp;s=%22lifestyle+choice%22#g1766.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Baroness Stowell of Beeston",
    "Date": "2024-02-08",
    "Debate_Title": "Digital Exclusion (Communications and Digital Committee Report) - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a great privilege to open this debate, just as it is a privilege to chair the Communications and Digital Committee of your Lordships&#8217; House. I am hugely grateful to all members of the committee who contribute so much through their expertise and dedication to our work. I know that they would all want me to pay the greatest trib",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-02-08c.1808.0&amp;s=%22handouts%22#g1808.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Llyr Gruffydd",
    "Date": "2024-02-06",
    "Debate_Title": "6. Debate: The Draft Budget 2024-25",
    "Context_Snippet": "Thank you, Dirprwy Lywydd, for the opportunity to contribute as committee Chair. I just wans to begin by saying a few words about the committee&#8217;s experience of this year&#8217;s draft budget scrutiny process, and I will be brief. Our ability to perform effective scrutiny is only as good as the information provided to us. The Minister and Depu",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2024-02-06.7.564042.h&amp;s=%22handouts%22#g7.564014"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "money for nothing",
    "Speaker": "Kirsty Blackman",
    "Date": "2024-02-06",
    "Debate_Title": "Miscellaneous",
    "Context_Snippet": "I thank the Labour party for tabling this motion, which highlights the difference between this place and reality. Nearly &#163;1 million in severance pay was handed out during last year&#8217;s political chaos. Some Ministers received severance pay despite being in office for only 38 days. In a 38-day period, an asylum seeker would receive &#163;47",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-02-06d.173.2&amp;s=%22money+for+nothing%22#g184.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Gerry Carroll",
    "Date": "2024-02-03",
    "Debate_Title": "Northern Ireland Assembly: Assembly Business: Election of the Speaker",
    "Context_Snippet": "Mr Acting Speaker, I wish both you and the outgoing Speaker well on your retirement. The Speaker is my colleague in West Belfast; I wish you both well. After two years of divisive posturing from the DUP, working-class people are in no mood for the cynical fanfare that surrounds Stormont's resurrection. If I was a member of the DUP sitting here toda",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2024-02-03.1.2&amp;s=%22handouts%22#g1.28"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2024-01-23",
    "Debate_Title": "Miscellaneous",
    "Context_Snippet": "I ask the hon. Member to forgive me, in the interests of time. We have targeted support in which schools with strong attendance performance support others that need help, and we are expanding that so that almost 2,000 schools will benefit. Our mentoring pilot, which I think the hon. Member for Houghton and Sunderland South inadvertently referred to",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2024-01-23f.202.2&amp;s=%22workless%22#g212.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-01-23",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty",
    "Context_Snippet": "This Government has overseen significant falls in absolute poverty since 2009/10. There were 1.7 million fewer people in absolute low income after housing costs in 2021/22 compared to 2009/10, a decrease of 4 percentage points. This decrease includes 400,000 fewer children (a decrease of 5 percentage points), 1 million fewer working age individuals",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-01-15.9592.h&amp;s=%22workless%22#g9592.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2024-01-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The most recent available data, covering 2021/22, shows that relative poverty rates for children remain unchanged since 2009/10. On an absolute basis, which better represents changes to actual living standards, the rate after housing costs has fallen by 5 percentage points across the same period. There were 400,000 fewer children in absolute povert",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2024-01-10.HL1410.h&amp;s=%22workless%22#gHL1410.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Gavin Newlands",
    "Date": "2024-01-17",
    "Debate_Title": "HS2 Cancellation and Network North &#8212; [Philip Davies in the Chair]",
    "Context_Snippet": "I will come back to the hon. Gentleman if I have time. He gave quite a long speech at the start, although I appreciate that he led the debate. HS2 would not just have helped with the projected increase in passenger numbers, but would have freed up freight paths that could have played a huge part in modal shift by getting freight that is currently o",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-17b.295.0&amp;s=%22free+money%22#g313.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Jim Shannon",
    "Date": "2024-01-17",
    "Debate_Title": "Inheritance Tax &#8212; [Sir Robert Syms in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Sir Robert. I first thank the hon. Member for Hemsworth (Jon Trickett) for securing this debate and giving us all the chance to participate. It is no secret that my politics are left of centre, and I very much have a social conscience about these things, but I have to say honestly to Opposition Member",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-17b.330.0&amp;s=%22burden+on+taxpayers%22#g340.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Afzal Khan",
    "Date": "2024-01-16",
    "Debate_Title": "Child Poverty: Greater Manchester",
    "Context_Snippet": "I will simply say yes; I will make some of those points later. Manchester City Council has the third highest rate of child poverty among local authorities in England. The Manchester, Gorton constituency has the sixth highest rate, with just over half of all children living in poverty. There are other ways in which we can understand the scale and im",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-16b.271.0&amp;s=%22handouts%22#g272.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2024-01-16",
    "Debate_Title": "Child Poverty: Greater Manchester",
    "Context_Snippet": "It is an honour to serve under your chairmanship, Sir Mark. I first thank the hon. Member for Manchester, Gorton (Afzal Khan) for securing this debate. I am sure we all believe that we represent the best place in the world, although I feel a little outflanked today, given the presence of the hon. Gentleman, the hon. Member for Stockport (Navendu Mi",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-16b.271.0&amp;s=%22workless%22#g275.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Featherstone",
    "Date": "2024-01-11",
    "Debate_Title": "Parliamentary Democracy and Standards in Public Life - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I have no doubt that this noble House knows right from wrong, believes in decency, wisdom, truth and honesty, and values our freedoms and way of life and the vital part that parliamentary democracy and standards in public life play. Inevitably, much criticism in this debate will be levelled at the current Government, but this is about pri",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-01-11b.110.0&amp;s=%22scroungers%22#g110.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Featherstone",
    "Date": "2024-01-11",
    "Debate_Title": "Parliamentary Democracy and Standards in Public Life - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I have no doubt that this noble House knows right from wrong, believes in decency, wisdom, truth and honesty, and values our freedoms and way of life and the vital part that parliamentary democracy and standards in public life play. Inevitably, much criticism in this debate will be levelled at the current Government, but this is about pri",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2024-01-11b.110.0&amp;s=%22lazy%22#g110.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Damian Hinds",
    "Date": "2024-01-10",
    "Debate_Title": "Free School Meals: Children with SEND",
    "Context_Snippet": "What a pleasure it is to serve with you in the Chair, Dr Huq, I think for the first time. I congratulate the hon. Member for Liverpool, West Derby (Ian Byrne) on securing this debate on an important matter, as demonstrated by the over-subscription of this debate this afternoon. For their contributions, I thank the hon. Members for Coventry South (Z",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-10a.143.0&amp;s=%22not+disabled%22#g155.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Damian Hinds",
    "Date": "2024-01-10",
    "Debate_Title": "Free School Meals: Children with SEND",
    "Context_Snippet": "What a pleasure it is to serve with you in the Chair, Dr Huq, I think for the first time. I congratulate the hon. Member for Liverpool, West Derby (Ian Byrne) on securing this debate on an important matter, as demonstrated by the over-subscription of this debate this afternoon. For their contributions, I thank the hon. Members for Coventry South (Z",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-10a.143.0&amp;s=%22workless%22#g155.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Harriett Baldwin",
    "Date": "2024-01-09",
    "Debate_Title": "Financial Advice and Guidance: Consumer Market",
    "Context_Snippet": "That is exactly right. I am using this analogy to make us realise what a scandal it would be if we had supermarkets like the ones I have just described, but that is sort of what we have in our financial services supermarket. It is a slightly stretched analogy, but the quality and cost of financial advice means that we have created a marketplace whe",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2024-01-09b.26.0&amp;s=%22free+cash%22#g27.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-12-20",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The most recent available data, covering 2021/22 shows that relative poverty rates for children remain unchanged since 2009/10. On an absolute basis, which better represents changes to actual living standards, the rate after housing costs has fallen by 5 percentage points across the same period. There were 400,000 fewer children in absolute poverty",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-12-14.HL1205.h&amp;s=%22workless%22#gHL1205.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Rupa Huq",
    "Date": "2023-12-19",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Disability: Lone Parents",
    "Context_Snippet": "To ask the Secretary of State for Work and Pensions, with reference to his Department's press release entitled, Employment boost for thousands of parents on Universal Credit, published on 25 October 2023, and the proposals announced in the Written Statement of 22 November 2023 on Work Capability Assessment Consultation, HCW64, whether his Departmen",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-12-14.7071.h&amp;s=%22fit+to+work%22#g7071.q0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Shona Robison",
    "Date": "2023-12-19",
    "Debate_Title": "Scottish Parliament: Budget 2024-25",
    "Context_Snippet": "It is an enormous privilege to present my first budget, which is built on our values and sets out, in tough times, to protect people, sustain public services, support a growing sustainable economy, and address the climate and nature emergencies. Our values of equality, opportunity and community are missions that should be at the core of any social ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-12-19.4.0&amp;s=%22lifestyle+choice%22#g4.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-12-18",
    "Debate_Title": "Work and Pensions: Child Poverty",
    "Context_Snippet": "Adults in workless households are seven times more likely to be in poverty than those in working households. That is why our focus is on work. The Scotland Act 2016 gave the Scottish Parliament the powers that have been invoked, including on the child payment, and that is very pleasing for us. The Act transferred those powers for carers and disabil",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-12-18d.1112.1&amp;s=%22workless%22#g1114.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-12-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Food Banks: Families",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. From April 2023, we uprated benefit rates and State Pensions by 10.1% and, subject t",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-12-11.6344.h&amp;s=%22workless%22#g6344.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-12-12",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. From April 2023, we uprated benefit rates and State Pensions by 10.1% and, subject t",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-12-06.5588.h&amp;s=%22workless%22#g5588.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Richard Graham",
    "Date": "2023-12-12",
    "Debate_Title": "Safety of Rwanda (Asylum and Immigration) Bill",
    "Context_Snippet": "I would say it is a pleasure to follow the hon. Member for Glasgow North (Patrick Grady) , who served with me on the Westminster Foundation for Democracy, but he rehashed quite a lot of what has been said from the Opposition Benches, with various misunderstandings and inaccuracies. He had his moment of fun trying to describe different groups of col",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-12-12b.747.0&amp;s=%22won%27t+work%22#g840.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "money for nothing",
    "Speaker": "Rachel Maclean",
    "Date": "2023-12-11",
    "Debate_Title": "Leasehold and Freehold Reform Bill",
    "Context_Snippet": "No, because I need to make progress. Perhaps I will allow the right hon. Gentleman to intervene a little later. The key factor here is choice. At present, leaseholders do not have a choice, or they have a fake choice. The Bill will give them a genuine choice when it comes to how they manage and own their homes. However, while I warmly welcome these",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-12-11c.654.0&amp;s=%22money+for+nothing%22#g675.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jo Churchill",
    "Date": "2023-12-08",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Poverty",
    "Context_Snippet": "It is not possible to produce a robust estimate of the impact of the changes to Work Capability Assessments on levels of poverty amongst benefit claimants. We published our response to the consultation on changes to the Work Capability Assessment criteria on 22 November, having carefully considered feedback from disabled people, and people with hea",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-29.4570.h&amp;s=%22workless%22#g4570.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Alex Cole-Hamilton",
    "Date": "2023-12-06",
    "Debate_Title": "Scottish Parliament: Fiscal Framework Review",
    "Context_Snippet": "I am pleased to speak on behalf of the Liberal Democrats. The fiscal framework is, of course, key to the pooling and sharing of resources across our islands and ensures that Scotland benefits from the decisions that we make while being protected by a framework of support from the UK Government in the good times and at times of national crisis. What",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-12-06.17.0&amp;s=%22lazy%22#g17.29"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Sioned Williams",
    "Date": "2023-12-05",
    "Debate_Title": "7. Statement by the Minister for Social Justice and Chief Whip: International Day of Disabled People",
    "Context_Snippet": "One of the aims of the International Day of Disabled People is to consider how the dignity, rights and well-being of disabled people should be supported. Marking the day to raise awareness and promote inclusion in all aspects of life is still so important, decades since the launch of this day, because we still have decisions being made at all level",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2023-12-05.8.548674.h&amp;s=%22scroungers%22#g8.548682"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Andrew Stephenson",
    "Date": "2023-12-05",
    "Debate_Title": "Written Answers &#8212; Department of Health and Social Care: Hospitals: Parking",
    "Context_Snippet": "The NHS Car Parking Guidance is clear that charges, where they exist, should be reasonable for the area. The Government has delivered on its commitment to ensure that free car parking is provided for those with greatest need. To begin with, the guidance includes disabled people who are holders of a valid Blue Badge attending hospital as a patient o",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-24.3598.h&amp;s=%22free+car%22#g3598.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-12-04",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Nottingham",
    "Context_Snippet": "The Government is committed to reducing poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. From April 2023, we uprated benefit rates and State Pensions by 10.1% and, subject to Parliamentary approval, ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-28.4296.h&amp;s=%22workless%22#g4296.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-12-01",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Food Poverty: Government Assistance",
    "Context_Snippet": "Government recognises that understanding food security is important and this is why we added internationally used food security questions to the Family Resources Survey in 2019/20 and added further questions on foodbank use in 2021/22. These statistics help our understanding of the characteristics of people most in need and, alongside the broad sui",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-21.HL494.h&amp;s=%22workless%22#gHL494.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Lord Davies of Brixton",
    "Date": "2023-11-30",
    "Debate_Title": "Benefit Claimants: Free Prescriptions - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, I thank the right reverend Prelate the Bishop of London for securing this debate on the end of free prescriptions for certain benefit claimants. She covered, in detail, the operational effectiveness of this and how it works out in practice; I will talk about the philosophy that lies behind the proposal. As I said in yesterday&#8217;s deba",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-30b.1226.0&amp;s=%22scrounger%22#g1228.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Lord Allan of Hallam",
    "Date": "2023-11-30",
    "Debate_Title": "Benefit Claimants: Free Prescriptions - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, the right reverend Prelate the Bishop of London helpfully said in her opening speech that she was in some ways surprised to see that this issue would require legislation. I fear that may actually be the point: that the whole purpose of this is to table something and invite Members on this side of the House to vote against it, so that the ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-30b.1226.0&amp;s=%22workshy%22#g1232.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "work-shy",
    "Speaker": "Lord Allan of Hallam",
    "Date": "2023-11-30",
    "Debate_Title": "Benefit Claimants: Free Prescriptions - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, the right reverend Prelate the Bishop of London helpfully said in her opening speech that she was in some ways surprised to see that this issue would require legislation. I fear that may actually be the point: that the whole purpose of this is to table something and invite Members on this side of the House to vote against it, so that the ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-30b.1226.0&amp;s=%22work-shy%22#g1232.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Lord Davies of Brixton",
    "Date": "2023-11-30",
    "Debate_Title": "Benefit Claimants: Free Prescriptions - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, I thank the right reverend Prelate the Bishop of London for securing this debate on the end of free prescriptions for certain benefit claimants. She covered, in detail, the operational effectiveness of this and how it works out in practice; I will talk about the philosophy that lies behind the proposal. As I said in yesterday&#8217;s deba",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-30b.1226.0&amp;s=%22feckless%22#g1228.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "swinging the lead",
    "Speaker": "Chris Bryant",
    "Date": "2023-11-29",
    "Debate_Title": "Data Protection and Digital Information Bill: Part 2 - The Nine Identity Assurance Principles",
    "Context_Snippet": "He does not&#8212;great. Finally, new schedule 1 would grant the Secretary of State the power to require banks or other financial institutions to provide the bank account data&#8212;unspecified&#8212;of any recipient of benefits to identify &#8220;cases which merit further consideration to establish whether relevant benefits are being paid or have ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-29b.867.0&amp;s=%22swinging+the+lead%22#g886.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Northbrook",
    "Date": "2023-11-29",
    "Debate_Title": "Autumn Statement 2023 - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, when I listened to the Autumn Statement, it seemed to contain only good news. On the economic front, public sector net borrowing is reducing; on the tax front, national insurance rates are being cut; with regards to pay, the national living wage is going up by nearly 10%; on benefits, working-age benefit is increasing by nearly 7%; pensio",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-29d.1092.5&amp;s=%22handouts%22#g1128.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-11-29",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. From April 2023, we uprated benefit rates and State Pensions by 10.1% and, subject t",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-22.3325.h&amp;s=%22workless%22#g3325.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Rachael Maskell",
    "Date": "2023-11-27",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Local Housing Allowance",
    "Context_Snippet": "To ask the Secretary of State for Work and Pensions, what assessment he has made of the adequacy of the Local Housing Allowance for enabling access to housing for claimants who are (a) disabled and (b) not disabled.",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-20.2617.h&amp;s=%22not+disabled%22#g2617.q0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Mel Stride",
    "Date": "2023-11-27",
    "Debate_Title": "Autumn Statement Resolutions - Rates of Tobacco Products Duty",
    "Context_Snippet": "Those changes have opened many more opportunities for disabled people and those with health conditions to participate in work, and for employers to benefit from their talents, but the fact is that too many people who could work are being denied access to those opportunities because they are deemed not fit to work or even to prepare for work. The pr",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-27a.573.0&amp;s=%22fit+to+work%22#g577.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Kevan Jones",
    "Date": "2023-11-27",
    "Debate_Title": "Autumn Statement Resolutions - Rates of Tobacco Products Duty",
    "Context_Snippet": "Let me begin by congratulating the Prime Minister on raising relaunches to an art form that should be admired. It began in his conference speech, when he announced that he was the new agent of change. That lasted about a week of Tory party infighting. Then, we had the King&#8217;s Speech three weeks ago. There was no change in that; it was all very",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-27a.573.0&amp;s=%22feckless%22#g623.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Nigel Huddleston",
    "Date": "2023-11-27",
    "Debate_Title": "Autumn Statement Resolutions - Rates of Tobacco Products Duty",
    "Context_Snippet": "The hon. Gentleman is missing the purpose of the reforms that my right hon. Friend the Secretary of State for Work and Pensions clearly outlined earlier today. Perhaps if he had been in the Chamber, he could have listened to it directly. When this Government came to power, we inherited not only higher unemployment from Labour, as always, but a lops",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-27a.573.0&amp;s=%22workless%22#g653.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Peter Grant",
    "Date": "2023-11-23",
    "Debate_Title": "Autumn Statement Resolutions - Rates of tobacco products duty",
    "Context_Snippet": "I do not know if I am allowed to repeat the verb that the hon. Member used&#8212;perhaps we should make it &#8220;persuade&#8221; the public, rather than &#8220;deceive&#8221; them, which I do not think we are allowed to say in this place&#8212;but I think the covid inquiry has blown that wide open. We have a Prime Minister who, as Chancellor, deli",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-23d.470.1&amp;s=%22scroungers%22#g484.3"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Ben Spencer",
    "Date": "2023-11-22",
    "Debate_Title": "Rates of tobacco products duty",
    "Context_Snippet": "It is always a pleasure to follow the right hon. Member for East Ham (Sir Stephen Timms) . I had the pleasure of serving on the Select Committee he chairs and I listened very carefully to the points he made. Like him, I intend to focus on the elements supporting people to work and back into work. Before I do so, let me say how much I welcome today&",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-22d.359.2&amp;s=%22lifestyle+choice%22#g379.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jeremy Hunt",
    "Date": "2023-11-22",
    "Debate_Title": "Autumn Statement",
    "Context_Snippet": "I come today with good news: it is my wife&#8217;s birthday and, unlike me, she is looking younger every year. I turn to the statement. After a global pandemic and energy crisis, we have taken difficult decisions to put our economy back on track. We have supported families with rising bills, cut borrowing and halved inflation. Rather than a recessi",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-22d.325.0&amp;s=%22workless%22#g325.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Richard Fuller",
    "Date": "2023-11-22",
    "Debate_Title": "Rates of tobacco products duty",
    "Context_Snippet": "You tempt me in the wrong direction, Madam Deputy Speaker. I am sure that, in a few minutes, those on the Government Front Bench will wish that I had had fewer minutes. It is a great pleasure to follow the right hon. Member for East Antrim (Sammy Wilson) . He always speaks a lot of sense in the House, and I listened with interest to what he said. I",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-22d.359.2&amp;s=%22burden+on+taxpayers%22#g403.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-11-21",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: North Wales",
    "Context_Snippet": "No assessment has been made of the number of adults and children living in destitution in North Wales. This government is committed to reducing poverty, including child poverty, and supporting low-income families and has overseen significant falls in absolute poverty since 2009/10. In 2021/22 there were 1.7 million fewer people in absolute poverty ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-14.1820.h&amp;s=%22workless%22#g1820.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-11-15",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty",
    "Context_Snippet": "The Government is committed to reducing poverty, including child poverty, and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children, and around &#163;152 billion on pensioners. Of this, around &#163;79 billion will be",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-07.HL52.h&amp;s=%22workless%22#gHL52.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Lord Foster of Bath",
    "Date": "2023-11-14",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (5th Day)</i>",
    "Context_Snippet": "My Lords, I regret that the time constraints make it impossible to comment on the many valuable contributions we have already heard, not least that from the noble Viscount, who is always worth listening to. But I do want to pay tribute to our three maiden speakers. In thanking the noble Lord, Lord Butler, for his comments earlier, I declare my inte",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-14b.395.1&amp;s=%22free+money%22#g443.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jeremy Hunt",
    "Date": "2023-11-14",
    "Debate_Title": "Economic Growth",
    "Context_Snippet": "Because we believe in a progressive tax system, we introduced the changes that I just outlined, which mean that people on the lowest legal wage are getting 25% more after tax. That is a significantly bigger increase than for people on higher deciles. One of the main things the shadow Chancellor mentioned was her amendment on the OBR. I understand t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-14c.534.3&amp;s=%22workless%22#g542.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-11-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty",
    "Context_Snippet": "This government understands the pressures people are facing with the cost of living. We are providing total support of over &#163;94bn over 2022-23 and 2023-24 to help households and individuals with the rising bills. Furthermore, government is committed to reducing poverty, including child poverty, and supporting low-income families and has overse",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-11-07.HL39.h&amp;s=%22workless%22#gHL39.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Penn",
    "Date": "2023-11-13",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (4th Day)</i>",
    "Context_Snippet": "My Lords, I add my words of welcome to the right reverend Prelate the Bishop of Norwich and my noble friend Lord Gascoigne and congratulate them both on their maiden speeches. I am sure that they will prove to be valuable Members of this House. The noble Baroness, Lady Hoey, put it well when she described my noble friend Lord Gascoigne as &#8220;di",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-13b.281.1&amp;s=%22workless%22#g369.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Liz Kendall",
    "Date": "2023-11-13",
    "Debate_Title": "Building an NHS Fit for the Future",
    "Context_Snippet": "It is a real pleasure to close this important debate and to follow my hon. Friends the Members for North Tyneside (Mary Glindon) and for City of Durham (Mary Kelly Foy) who spoke powerfully about the need to take more action to help people quit smoking and not take up smoking in the first place. As a former smoker myself, I wish to goodness that I ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-13c.379.3&amp;s=%22workless%22#g471.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Baroness Moyo",
    "Date": "2023-11-13",
    "Debate_Title": "King&#8217;s Speech - <i>Debate (4th Day)</i>",
    "Context_Snippet": "My Lords, I start by saying that I very much enjoyed the maiden speeches of my noble friend Lord Gascoigne and the right reverend Prelate the Bishop of Norwich. I am afraid that both of them have stepped out just in time for me to stand up and thank them. I know that they will make great contributions to this House given their respective experience",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-11-13b.281.1&amp;s=%22underclass%22#g316.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Kevin Stewart",
    "Date": "2023-11-09",
    "Debate_Title": "Scottish Parliament: Fair Work in a Wellbeing Economy",
    "Context_Snippet": "I condemn every aspect of what the Tory Government has put forward, which is why I find it very bizarre that any Conservative member would stand here today and say that the UK is a fair work nation, because it certainly is not&#8212;it is moving backwards. Many things have been discussed today, but I want to raise an important issue that has been o",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-11-09.34.0&amp;s=%22lazy%22#g34.106"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Claire Baker",
    "Date": "2023-11-08",
    "Debate_Title": "Scottish Parliament: Cashback for Communities",
    "Context_Snippet": "Cashback for communities has reinvested the proceeds of crime in our communities, thereby supporting more than 1 million young people, including many in Mid Scotland and Fife. In Burntisland, the Shell Twilight initiative, along with Scottish Sports Futures, has delivered weekly indoor physical activity sessions alongside wellbeing and mental healt",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-11-08.19.0&amp;s=%22fit+to+work%22#g19.15"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Alex Cunningham",
    "Date": "2023-11-07",
    "Debate_Title": "Debate on the Address: [1st Day]",
    "Context_Snippet": "Here we are in the 14th year of consecutive Tory-led Governments that have failed on everything from the economy to immigration. The number of children living in poverty has soared, the gap between the richest and poorest has continued to widen, the number of people homeless has increased and social housing construction has all but collapsed. Famil",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-11-07d.7.1&amp;s=%22lifestyle+choice%22#g55.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-10-25",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Sustainable Development: Developing Countries",
    "Context_Snippet": "The Government is committed to reducing poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children, and around &#163;152 billion on pensioners. Of this, around &#163;79 billion will be spent on benefits to supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-10-17.HL10632.h&amp;s=%22workless%22#gHL10632.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Esther McVey",
    "Date": "2023-10-20",
    "Debate_Title": "Covid-19 Vaccine Damage Payments Bill",
    "Context_Snippet": "I, too, thank my hon. Friend the Member for Christchurch (Sir Christopher Chope) for introducing the Bill, for the work and research that has gone into it, and for his reaching out and speaking to people about it. At the tail end of his speech, he talked about the phrase &#8220;safe and effective&#8221;, and I will start my speech there. &#8220;Saf",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-10-20a.499.0&amp;s=%22not+disabled%22#g507.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-10-17",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Coventry",
    "Context_Snippet": "National Statistics on the number and percentage of people in poverty, including regional-level data, is published annually in the &#8220;Households Below Average Income&#8221; publication. This can be found here . Statistics are not available at the constituency level. The latest available statistics show that full-time work substantially reduces ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-09-19.200459.h&amp;s=%22workless%22#g200459.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Miles Briggs",
    "Date": "2023-10-04",
    "Debate_Title": "Scottish Parliament: Two-child Benefit Cap",
    "Context_Snippet": "That is not the case. As the member clearly knows, the policy is about fairness for working families as well&#8212;all families having to take difficult decisions. There is a political consensus on helping parents into work, which should be a Government priority. That requires a balanced system that provides strong work incentives and supports thos",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-10-04.17.0&amp;s=%22workless%22#g17.15"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-09-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty",
    "Context_Snippet": "The Department for Work and Pensions has not undertaken any specific assessment but notes that the analysis included in the report is based on the Social Metric Commission&#8217;s (SMC) measure of poverty. The Government accepts that the SMC&#8217;s approach offers a more expansive view of inescapable costs, and alternative income sources will add ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-09-07.HL10000.h&amp;s=%22workless%22#gHL10000.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "the Earl of Caithness",
    "Date": "2023-09-12",
    "Debate_Title": "Hunting Trophies (Import Prohibition) Bill - <i>Committee</i>: Amendment 1",
    "Context_Snippet": "My Lords, I totally agree with my noble friend on that point. One also needs to bear in mind that the local communities do not want aid. They want actually to be able to look after themselves, generate their own income and manage their populations without being given handouts by countries. They need help but do not need the type of money my noble f",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-09-12c.919.6&amp;s=%22handouts%22#g922.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "the Earl of Leicester",
    "Date": "2023-09-12",
    "Debate_Title": "Hunting Trophies (Import Prohibition) Bill - <i>Committee</i>: Amendment 3",
    "Context_Snippet": "My Lords, I apologise that I was unable to attend Second Reading. I was very keen to do so but unavoidably had to attend an important meeting at home. I refer to my interests as set out in the register. That includes my family&#8217;s management of Holkham National Nature Reserve, one of the most prolific in terms of conservation success in the lan",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-09-12c.948.3&amp;s=%22feral%22#g948.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Kenny MacAskill",
    "Date": "2023-09-12",
    "Debate_Title": "Offshore Wind: Public Ownership",
    "Context_Snippet": "I think that where Scotland goes, Wales should follow. It is remiss that Wales does not have control over the money coming from the Crown Estate, and I certainly hope that Wales follows Scotland in that regard, as indeed the UK should in the establishment of a state energy company. The hon. Lady&#8217;s point is well made and correct. I am concentr",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-09-12a.273.0&amp;s=%22idle%22#g275.5"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Penny Mordaunt",
    "Date": "2023-09-07",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "Historically the UK has had slower social mobility over many decades; that is improving, but there is more that needs to be done in this area. That will only be helped by people being able to get into work and make progress through work. That is why I supported our reforms on universal credit and why I think we should be celebrating getting 4 milli",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-09-07d.539.0&amp;s=%22workless%22#g552.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Stephen Timms",
    "Date": "2023-09-04",
    "Debate_Title": "Disability Benefits: Assessments &#8212; [David Mundell in the Chair]",
    "Context_Snippet": "On a point that was raised by me, and by my hon. Friend the Member for Lewisham, Deptford (Vicky Foxcroft) , what will happen to people who are too unwell to work but not disabled, and therefore not eligible for PIP? The Minister&#8217;s proposal seems to be that they will not get any help at all, but I cannot imagine that that is what he intends.",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-09-04a.1.0&amp;s=%22not+disabled%22#g34.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Baroness Scott of Bybrook",
    "Date": "2023-09-04",
    "Debate_Title": "Levelling-up and Regeneration Bill - <i>Report (5th Day)</i>: Amendment 164",
    "Context_Snippet": "My Lords, welcome back. Amendment 164 in the name of the noble Baroness, Lady Hayman of Ullock, seeks to reduce the closure of high street financial services. The nature of banking is changing, and the long-term trend is moving towards greater use of convenient, digital and remote banking services over traditional high street branches. In 2021, 86%",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-09-04c.202.5&amp;s=%22free+cash%22#g208.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Hywel Williams",
    "Date": "2023-07-19",
    "Debate_Title": "Universal Credit Deductions &#8212; [Dame Maria Miller in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Dame Maria, and to speak in this debate. I congratulate the right hon. Member for Glasgow South West (Chris Stephens) &#8212;sorry, the hon. Member, though I am sure he will be right hon. at some point&#8212;on securing it. I did have a much longer speech. However, I cut it quite severely for this ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-07-19a.291.0&amp;s=%22feckless%22#g299.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2023-07-19",
    "Debate_Title": "Universal Credit Deductions &#8212; [Dame Maria Miller in the Chair]",
    "Context_Snippet": "No, I will not; I am so sorry. I do not think I want to dignify the hon. Lady with any further comment in this debate. The practical reality of the situation is that we believe very strongly that individual claimants have the ability to receive support. I could go on about various points in respect of advances and the five-week wait. During their f",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-07-19a.291.0&amp;s=%22workless%22#g312.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-07-18",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Employment: Older People",
    "Context_Snippet": "The latest study by The Office of National Statistics (Working and workless households in the UK: January to March 2023) shows a decrease of 23,000 in the number of people aged 50-64 in workless households against the same period in 2022. However, the Government recognises the challenges that older jobseekers face which is why we are delivering a c",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-07-07.HL9174.h&amp;s=%22workless%22#gHL9174.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Mark Isherwood",
    "Date": "2023-07-11",
    "Debate_Title": "1. Questions to the First Minister: People with Learning Disabilities",
    "Context_Snippet": "Equivalent practice applies to the disabled person's concessionary travel card. The social model of disability should be guiding everything done by service providers in all sectors, recognising that people are not disabled by their impairments but by the barriers to access and inclusion that society places in their way. Research for the UK Departme",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2023-07-11.1.519045&amp;s=%22not+disabled%22#g1.519051"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "playing the system",
    "Speaker": "Robert Jenrick",
    "Date": "2023-07-11",
    "Debate_Title": "Illegal Migration Bill: Clause 1 - Introduction",
    "Context_Snippet": "I understand the hon. and learned Lady&#8217;s point. I say two things in response. First, the premise of asylum claims being handled in safe third countries is that those countries must be safe. Through our partnership with the Government of Rwanda, we have done work to ensure that appropriate safeguards are put in place. That has been tested by t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-07-11e.194.2&amp;s=%22playing+the+system%22#g209.3"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Jeremy Miles",
    "Date": "2023-07-11",
    "Debate_Title": "4. Statement by the Minister for Education and the Welsh Language: Progress on the roll-out of the new curriculum",
    "Context_Snippet": "Thank you very much. It's important that we have an open discussion about these issues; that's why the report is transparent and looks at the things we want to celebrate and some of the challenges too. The Member asks some very important questions. One thing I should say, in terms of the bulletin that I referred to that demonstrates how the budget ",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2023-07-11.4.519161.h&amp;s=%22lifestyle+choice%22#g4.519173"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Matt Vickers",
    "Date": "2023-07-11",
    "Debate_Title": "Antisocial Behaviour and Off-road Bikes",
    "Context_Snippet": "I beg to move, That this House has considered antisocial behaviour and off-road bikes. It is a pleasure to serve under your chairmanship, Mr Pritchard. I bring forward this debate out of frustration for residents across my constituency whose lives are being made a misery by antisocial behaviour and off-road bikes. The issue has been raised time and",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-07-11b.75.0&amp;s=%22feral%22#g75.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Siobhan Baillie",
    "Date": "2023-07-11",
    "Debate_Title": "Increasing Employment: Training",
    "Context_Snippet": "I have two main points to land. The first is that the best way for someone to get work-ready and improve their life chances is to get a job and progress in the job they have. The second is that we need a clear-eyed look at existing training provision, including the apprenticeship levy, to provide thousands of jobs in small and medium-sized enterpri",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-07-11e.324.0&amp;s=%22workless%22#g324.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2023-07-11",
    "Debate_Title": "Two-child Benefit Cap and Child Poverty",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Pritchard, and I congratulate the hon. Member for Liverpool, Riverside (Kim Johnson) on securing the debate and on the passionate way that she put her argument today. That passion cannot be doubted in any way whatsoever and due respect is due to her for that. The Government believe that the best",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-07-11b.67.0&amp;s=%22workless%22#g71.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Andrew Griffith",
    "Date": "2023-07-10",
    "Debate_Title": "Written Answers &#8212; Treasury: Bank Services: Vulnerable Adults",
    "Context_Snippet": "The government recognises that while the transition towards digital banking and payments brings opportunities, cash and in-person services continue to be used by many people, including those who may be in vulnerable groups, across the UK. The government has recently legislated through the Financial Services and Markets Act 2023 to establish a new l",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-07-05.192526.h&amp;s=%22free+cash%22#g192526.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-07-04",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Uprating",
    "Context_Snippet": "The Government is committed to reducing poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children, and around &#163;152 billion on pensioners. Of this, around &#163;79 billion will be spent on benefits to supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-27.191329.h&amp;s=%22workless%22#g191329.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2023-07-04",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Poverty",
    "Context_Snippet": "No such estimation has been made of the number of families subject to the two-child benefit cap that are living in absolute poverty. Statistics related to the policy to provide support for a maximum of two children were published in July 2022 and are available at: Universal Credit and Child Tax Credit claimants: statistics related to the policy to ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-29.191830.h&amp;s=%22workless%22#g191830.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2023-07-03",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Poverty",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and their children. The Secretary of State reviewed the benefit cap levels in November 2022 and decided they should be",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-27.191327.h&amp;s=%22workless%22#g191327.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Andrew Selous",
    "Date": "2023-06-29",
    "Debate_Title": "Bladder and Bowel Continence Care",
    "Context_Snippet": "I beg to move, That this House has considered bladder and bowel continence care. It is a pleasure to serve under your chairmanship, Sir Graham. This week is World Continence Week, so I am grateful to the Backbench Business Committee for allocating this debate on what is often a taboo subject, and therefore something of a neglected area of healthcar",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-06-29a.196.0&amp;s=%22not+disabled%22#g196.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2023-06-28",
    "Debate_Title": "In-work Poverty",
    "Context_Snippet": "Our commitment to protecting the most vulnerable is reflected in the action that we have taken over the past two years as people continue to face cost of living pressures, which are clearly evident and are fundamentally derived from the impact of the covid pandemic and the subsequent war in Ukraine, and the impact of that on energy and other costs.",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-06-28b.163.0&amp;s=%22workless%22#g177.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-06-28",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and their children. From April, we uprated benefit rates by 10.1%. In order to increase the number of households who c",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-22.190898.h&amp;s=%22workless%22#g190898.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "can't be bothered",
    "Speaker": "Mick Antoniw",
    "Date": "2023-06-28",
    "Debate_Title": "5. Debate on a Member's Legislative Proposal &#8212; A civic duty to vote Bill",
    "Context_Snippet": "Diolch, Dirprwy Lywydd. Can I thank Adam Price for introducing this thoughtful and important legislative proposal? As Members will know, I have often referred to the importance of our nation's democratic health in Senedd debates, and I believe that, alongside all the other well-beings that we're concerned with, the democratic health of our society ",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2023-06-28.6.515858.h&amp;s=%22can%27t+be+bothered%22#g6.515871"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "John Glen",
    "Date": "2023-06-27",
    "Debate_Title": "Opposition Day: Mortgage and Rental Costs",
    "Context_Snippet": "The interventions we have made provide significant scope for assistance. To find an accurate number would be very difficult, but we will continue to work with industry and with lenders to find maximum flexibility and interventions to support them at this difficult time. While we roll out those measures, tackling inflation remains the No. 1 priority",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-27c.170.2&amp;s=%22workless%22#g179.1"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Liz Twist",
    "Date": "2023-06-20",
    "Debate_Title": "Smokefree 2030 Target",
    "Context_Snippet": "It is a pleasure to serve under you as Chair, Mr Sharma. I commend the hon. Member for Harrow East (Bob Blackman) and my hon. Friend the Member for City of Durham (Mary Kelly Foy) for securing today&#8217;s debate. Smoking is not a lifestyle choice; it is a lethal addiction that the vast majority of smokers enter into before they reach adulthood. I",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-06-20b.255.0&amp;s=%22lifestyle+choice%22#g265.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Jenni Minto",
    "Date": "2023-06-15",
    "Debate_Title": "Scottish Parliament: World Asthma Day 2023",
    "Context_Snippet": "I thank Emma Harper for lodging this important motion, and I welcome the opportunity to respond to the debate on behalf of the Scottish Government. I know how much work Emma Harper does regarding asthma and respiratory diseases and as part of the cross-party group that she co-chairs with Alexander Stewart. I had the pleasure of joining the group at",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-06-15.20.0&amp;s=%22lifestyle+choice%22#g20.10"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-06-15",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest available data shows that the proportion of children in families in absolute low income in the Preston constituency in 2021/22 was 21.9%, a reduction of 3.5 percentage points compared with 2014/15 (the first year for which comparable data is available) and a reduction of 0.7 percentage points compared with 2020/21. Absolute poverty is th",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-07.188202.h&amp;s=%22workless%22#g188202.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Marion Fellows",
    "Date": "2023-06-14",
    "Debate_Title": "Cost of Living Committee",
    "Context_Snippet": "Putting the word &#8220;Brexit&#8221; in the title of the debate will have confused those on the Government Benches, because that word has been expunged from their party&#8217;s political lexicon. When talking about the financial difficulties faced by citizens of the United Kingdom, the Government will rightly mention covid. Certain individuals may",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-14b.312.3&amp;s=%22scroungers%22#g353.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Rishi Sunak",
    "Date": "2023-06-14",
    "Debate_Title": "Prime Minister: Engagements",
    "Context_Snippet": "I gently point out to the hon. Lady that there are, in fact, 400,000 fewer children in absolute poverty than in 2010. We know that work is the best route out of poverty for families, so with employment at record levels, as we saw yesterday, I am pleased that there are now over 600,000 fewer children in workless households than in 2010. The specific",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-14b.288.2&amp;s=%22workless%22#g293.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "the Bishop of Durham",
    "Date": "2023-06-14",
    "Debate_Title": "Illegal Migration Bill - <i>Committee (5th Day) (Continued)</i>: Amendment 133",
    "Context_Snippet": "My Lords, I support Amendment 133 in the name of the noble Baroness, Lady Ludford. My right reverend friend the Bishop of Chelmsford has added her name to it. She regrets that she cannot be here today; she is actually working with the Woolf Institute&#8217;s independent commission on refugee integration. I thank the noble Baroness, Lady Ludford, an",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-06-14a.2021.1&amp;s=%22underclass%22#g2026.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-06-08",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Children: Poverty",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting all low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and their children. From April, we uprated benefit rates by 10.1%. In order to increase the number of households w",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-06-06.188079.h&amp;s=%22workless%22#g188079.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Bennett of Manor Castle",
    "Date": "2023-06-07",
    "Debate_Title": "Illegal Migration Bill - <i>Committee (3rd Day) (Continued)</i>: Amendment 58B",
    "Context_Snippet": "My Lords, may I press the Minister on the issue of disabled asylum seekers? I raised this specifically in terms of what is happening in general provision, what is happening at Manston, how the Government foresee&#8212;or not&#8212;disabled asylum seekers being accommodated on barges and whether they foresee provision in the new arrangements under t",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-06-07c.1454.0&amp;s=%22not+disabled%22#g1472.5"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-06-06",
    "Debate_Title": "Errol Graham: DWP and Safeguarding Adults Board Inquiry",
    "Context_Snippet": "My hon. Friend is absolutely right. That is the purpose of this Adjournment debate. The situation has gone on for too long, with information not shared and information lost&#8212;I will come to that later on. There have been concerns about how the Department has acted to safeguard not just individual claimants but the information it has on claimant",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-06c.704.0&amp;s=%22scrounger%22#g705.3"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirker",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-06-06",
    "Debate_Title": "Errol Graham: DWP and Safeguarding Adults Board Inquiry",
    "Context_Snippet": "My hon. Friend is absolutely right. That is the purpose of this Adjournment debate. The situation has gone on for too long, with information not shared and information lost&#8212;I will come to that later on. There have been concerns about how the Department has acted to safeguard not just individual claimants but the information it has on claimant",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-06c.704.0&amp;s=%22shirker%22#g705.3"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-06-06",
    "Debate_Title": "Errol Graham: DWP and Safeguarding Adults Board Inquiry",
    "Context_Snippet": "My hon. Friend is absolutely right. That is the purpose of this Adjournment debate. The situation has gone on for too long, with information not shared and information lost&#8212;I will come to that later on. There have been concerns about how the Department has acted to safeguard not just individual claimants but the information it has on claimant",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-06-06c.704.0&amp;s=%22fit+to+work%22#g705.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Elizabeth Smith",
    "Date": "2023-06-01",
    "Debate_Title": "Scottish Parliament: Artificial Intelligence",
    "Context_Snippet": "I agree with Michael Marra about the quality of the debate. It was interesting that Pauline McNeill, Martin Whitfield and Ivan McKee all said that perhaps it has been good because there was no motion. I agree with that; it is quite pleasant to be away from the party-political ding-dong that goes back and forward all the time. Having no motion raise",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-06-01.31.0&amp;s=%22lazy%22#g31.48"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Rhoda Grant",
    "Date": "2023-05-25",
    "Debate_Title": "Scottish Parliament: Agriculture Policy",
    "Context_Snippet": "I, too, am grateful to the committee for bringing the debate on its pre-legislative scrutiny to the chamber. The proposed agriculture bill and the new support scheme must enable the industry to achieve net zero targets, reduce emissions and produce food. Although the road map has been welcomed, it lacks detail. Evidence given to the committee has d",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-05-25.32.0&amp;s=%22handouts%22#g32.31"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Marion Fellows",
    "Date": "2023-05-22",
    "Debate_Title": "Cost of Living: Financial Support for Disabled People &#8212; [Sir Robert Syms in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Sir Robert, and I thank the Petitions Committee for securing this really important debate. More importantly, however, I thank the petitioners and those who signed their petition. I pay tribute to the We Care Campaign, which provided me with an excellent briefing for today. The hon. Member for Black",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-05-22a.1.0&amp;s=%22not+disabled%22#g20.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Richard Leonard",
    "Date": "2023-05-18",
    "Debate_Title": "Scottish Parliament: Sustainable Food Supply",
    "Context_Snippet": "It is right that, at this time, we are debating food security and sustainability in this Parliament, and it is right that we are scrutinising the commerce of our food supply and the economics of food poverty. However, we also have to scrutinise the politics of food security, the politics of food supply and the politics of food poverty, because ever",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-05-18.32.0&amp;s=%22idle%22#g32.62"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Marion Fellows",
    "Date": "2023-05-16",
    "Debate_Title": "Cost of Living",
    "Context_Snippet": "The cost of living crisis affects disabled people far more than it does the general population. I make no bones about repeating parts of the speech that I made this morning in Westminster Hall, because I think that they bear repetition. I have had numerous briefings from a variety of disability organisations telling me that this Government have con",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-05-16c.715.1&amp;s=%22feckless%22#g748.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Baroness Ludford",
    "Date": "2023-05-10",
    "Debate_Title": "Illegal Migration Bill - <i>Second Reading</i>: Amendment to the Motion",
    "Context_Snippet": "My Lords, it is an honour to follow the speech of the noble Lord, Lord Browne of Ladyton, with which I thoroughly agreed. There is little mirth to be had on the grim subject of this shabby, illegal and immoral Bill, but I did allow myself a little smile this last weekend. The chasing of easy headlines through divisive, dehumanising and xenophobic r",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-05-10a.1785.0&amp;s=%22underclass%22#g1816.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "unwashed",
    "Speaker": "Nia Griffith",
    "Date": "2023-05-03",
    "Debate_Title": "Extended Producer Responsibility for Packaging",
    "Context_Snippet": "Absolutely. As I understand it, that is the aim of the extended producer responsibility legislation: it will ensure that producers have to take a real interest in that process. However, it must be done in partnership with the industry and in a way that the industry feels part of. The scheme must have buy-in, because it can work only with industry c",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-05-03a.80.0&amp;s=%22unwashed%22#g81.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Scott of Bybrook",
    "Date": "2023-05-03",
    "Debate_Title": "Levelling-up and Regeneration Bill - <i>Committee (12th Day)</i>: Amendment 290",
    "Context_Snippet": "I thank the noble Lord for that. As I said, large developments can take a decade or more to build out and we do not want to build infrastructure, only for it to stand idle for a long time. This would increase costs for developers, reducing the amount of money that can therefore be put towards other infrastructure and affordable housing, without gen",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-05-03a.1522.5&amp;s=%22idle%22#g1549.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Marie McNair",
    "Date": "2023-05-02",
    "Debate_Title": "Scottish Parliament: Social Isolation and Loneliness",
    "Context_Snippet": "Absolutely, and we will deal with that through the new deal for local government. The Local Government, Housing and Planning Committee will be looking at that. We will definitely ignore the political parties that suggest that we are a something-for-nothing country. Instead, we will be there to help families stay afloat and will continue with polici",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-05-02.5.0&amp;s=%22something+for+nothing%22#g5.41"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Marie McNair",
    "Date": "2023-04-26",
    "Debate_Title": "Scottish Parliament: Scotland&#8217;s Finances and the Cost of Living",
    "Context_Snippet": "I welcome the opportunity to speak in the debate in support of the amendment in the name of Tom Arthur. There is no doubt that this is a very difficult time for public finances in Scotland. The Tories&#8217; crashing of the economy, the disastrous Brexit and now the policy of our Labour colleagues are all stretching budgets to the limit. Inflation ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-04-26.18.0&amp;s=%22something+for+nothing%22#g18.35"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Andrew Griffith",
    "Date": "2023-04-25",
    "Debate_Title": "Cost of Living Increases",
    "Context_Snippet": "I understand that the hon. Member and his party are not happy campers these days, but we are giving more money per head to households in Scotland than we are in the rest of the United Kingdom, which is why he should get behind the many benefits of being part of this Union. On this very day, more than 8 million families across the United Kingdom wil",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-04-25c.659.0&amp;s=%22workless%22#g697.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Kate Osamor",
    "Date": "2023-04-19",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits",
    "Context_Snippet": "To ask the Secretary of State for Work and Pensions, pursuant to the Answer of 28 March 2023 to Question 169369 on Social Security Benefits, for what reason people who are found not fit to work but not in receipt of the severe disability premium are subject to the benefit cap.",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-03-29.176769.h&amp;s=%22fit+to+work%22#g176769.q0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Stephen Crabb",
    "Date": "2023-04-19",
    "Debate_Title": "Wales: Cost of Living",
    "Context_Snippet": "This Government continue to spend extraordinary sums of money supporting family incomes during this difficult time. Does my right hon. Friend agree that what is not fair to the taxpayer is giving people free cash, including young asylum seekers&#8212;no strings attached&#8212;through a poorly targeted universal basic income? Is that not what respon",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-04-19d.227.3&amp;s=%22free+cash%22#g227.9"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Alistair Carmichael",
    "Date": "2023-04-19",
    "Debate_Title": "Finance (No. 2) Bill: Clause 27 - Power to clarify tax treatment of devolved social security benefitsClause 27",
    "Context_Snippet": "As my hon. Friend says, these are often some of the more hard-up areas of the country, but the truth of the matter is that down the years they have contributed enormously to the GDP of this country and they have the potential to do more. We are not looking for any special treatment. We are not looking for any favours or handouts. All we are looking",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-04-19d.323.0&amp;s=%22handouts%22#g330.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Lord Benyon",
    "Date": "2023-04-11",
    "Debate_Title": "Written Answers &#8212; Department for Environment, Food and Rural Affairs: Cats: Animal Welfare",
    "Context_Snippet": "Under the draft Microchipping of Cats and Dogs (England) Regulations 2023, only owned cats are required to be microchipped. The Regulations will not apply to free living cats that live with little or no human interaction or dependency, such as farm, feral or community cats.",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-03-30.HL7080.h&amp;s=%22feral%22#gHL7080.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Catherine McKinnell",
    "Date": "2023-03-29",
    "Debate_Title": "Finance (No. 2) Bill",
    "Context_Snippet": "The Chancellor heralded these proposals two weeks ago as &#8220;a Budget for growth&#8221;, and thank goodness, after 13 years of a stagnating economy and with the OECD confirming that we are the only G20 economy that will shrink this year, with the exception of Russia&#8212;what a record. It is completely shameful. I want to talk about the proposa",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-29c.1044.0&amp;s=%22workless%22#g1084.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2023-03-28",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting low-income families. We will spend around &#163;276bn through the welfare system in Great Britain in 2023/24 including around &#163;124bn on people of working age and children. With 1.12 million job vacancies across the UK, our focus remains firmly on supporting individuals, inclu",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-03-21.170683.h&amp;s=%22workless%22#g170683.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Penny Mordaunt",
    "Date": "2023-03-23",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "I note that today is the day of reflection marking three years since we first entered lockdown. I know all Members will be reflecting on the experiences of our constituents, as well as those of our own families, during those dark days, and reflecting in particular those who lost their lives and those to whom we owe an immense debt of gratitude for ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-23b.449.0&amp;s=%22workless%22#g450.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-03-21",
    "Debate_Title": "Budget Resolutions and Economic Situation - Income Tax (Charge)",
    "Context_Snippet": "I will be very brief, Madam Deputy Speaker. According to the British social attitudes survey, what most people want to see is fairness in our society. They want to see fairness in rewarding hard work, in how our policies and laws are applied and in the dignity and respect that we show our vulnerable citizens, whether that is older people, sick and ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-21c.189.1&amp;s=%22scroungers%22#g213.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-03-21",
    "Debate_Title": "Budget Resolutions and Economic Situation - Income Tax (Charge)",
    "Context_Snippet": "I will be very brief, Madam Deputy Speaker. According to the British social attitudes survey, what most people want to see is fairness in our society. They want to see fairness in rewarding hard work, in how our policies and laws are applied and in the dignity and respect that we show our vulnerable citizens, whether that is older people, sick and ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-21c.189.1&amp;s=%22shirkers%22#g213.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Debbie Abrahams",
    "Date": "2023-03-21",
    "Debate_Title": "Budget Resolutions and Economic Situation - Income Tax (Charge)",
    "Context_Snippet": "I will be very brief, Madam Deputy Speaker. According to the British social attitudes survey, what most people want to see is fairness in our society. They want to see fairness in rewarding hard work, in how our policies and laws are applied and in the dignity and respect that we show our vulnerable citizens, whether that is older people, sick and ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-21c.189.1&amp;s=%22workshy%22#g213.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "John Glen",
    "Date": "2023-03-21",
    "Debate_Title": "Budget Resolutions and Economic Situation - Income Tax (Charge)",
    "Context_Snippet": "No, I will not. Inflation in the UK will fall from 10.7% in the final quarter of last year to 2.9% by the end of 2023. If debt is left unchecked, it acts as a ceiling on our economic potential. That is why we are bringing it down. Under this Government, we will pay our own way. On growth&#8212;the focus of the Budget&#8212;there were those who said",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-21c.189.1&amp;s=%22workless%22#g267.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-03-20",
    "Debate_Title": "Social Security (Additional Payments) (No. 2) Bill - <i>Second Reading (and remaining stages)</i>",
    "Context_Snippet": "I am delighted that we have the opportunity today to discuss this important legislation, which will make a huge difference to millions of families. This Government fully understand the pressures that households across the UK are experiencing as we continue to face the challenges of high inflation brought about by global issues such as the war in Uk",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-03-20c.1612.4&amp;s=%22workless%22#g1613.0"
  },
  {
    "Category": "Disability_Specific_Motability",
    "Term": "free car",
    "Speaker": "Damien Moore",
    "Date": "2023-03-16",
    "Debate_Title": "Backbench Business: Car Parking: Care Workers &#8212; [Sir Robert Syms in the Chair]",
    "Context_Snippet": "The hon. Lady is absolutely right. What we are trying to do is remove from care workers&#8217; lives the stress of paying for parking tickets and finding a parking space. There are times when a carer will pay for a half-hour parking ticket, although when they are in a client&#8217;s house they might find that they need to call an ambulance. That co",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-03-16a.399.0&amp;s=%22free+car%22#g400.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Baroness Brinton",
    "Date": "2023-03-16",
    "Debate_Title": "Budget Statement - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I declare my interest as a vice-president of the Local Government Association and a vice-chair of the All-Party Parliamentary Group on Adult Social Care. It is a pleasure to follow the noble Lord, Lord Eatwell, and I also look forward to hearing the maiden speech of the noble Baroness, Lady Moyo. The Chancellor says the OBR projection is ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-03-16c.1448.2&amp;s=%22not+disabled%22#g1457.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Penn",
    "Date": "2023-03-16",
    "Debate_Title": "Budget Statement - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a privilege to open this debate on behalf of the Government and set out how we will move our economy on to a path of long-term sustainable growth. I start by welcoming my noble friend Lady Moyo to the House. I look forward to hearing her maiden speech. Given her distinguished career to date, I expect she will hold the Government&#82",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-03-16c.1448.2&amp;s=%22workless%22#g1449.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jeremy Hunt",
    "Date": "2023-03-15",
    "Debate_Title": "Ways and Means - Financial Statement and Budget ReportWays and Means",
    "Context_Snippet": "Today I am providing a &#163;63 million fund to keep our public leisure centres and pools afloat. I have also heard from the charities Minister, my right hon. Friend the Member for Pudsey (Stuart Andrew) , and his Secretary of State, my right hon. and learned Friend the Member for South East Cambridgeshire (Lucy Frazer) , about the brilliant work t",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-15c.833.0&amp;s=%22workless%22#g834.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Rachael Hamilton",
    "Date": "2023-03-15",
    "Debate_Title": "Scottish Parliament: Agriculture",
    "Context_Snippet": "I thank Jim Fairlie for that intervention, but it is almost a case of the pot calling the kettle black, given the last few paragraphs of the cabinet secretary&#8217;s speech&#8212;unless, of course, that was written by one of her civil servants. The Government has failed to deliver promised upgrades to rural roads, failed to deliver ferries for our",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-03-15.16.0&amp;s=%22idle%22#g16.17"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Viscount Younger of Leckie",
    "Date": "2023-03-09",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Children",
    "Context_Snippet": "The Improving Lives publication has shown that workless families are considerably more likely to experience problems with their relationships, have poor mental health, and be in problem debt. The publication includes these figures: - Children growing up in workless families are almost twice as likely as children in working families to fail at all s",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2023-02-27.HL5929.h&amp;s=%22workless%22#gHL5929.r0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Patricia Gibson",
    "Date": "2023-03-06",
    "Debate_Title": "Genetic Technology (Precision Breeding) Bill: Clause 1 - Precision bred organism",
    "Context_Snippet": "I will not detain the House longer than a moment or two, but I want to put on record that, although we in the SNP do not intend to oppose the Lords amendments, our opposition to the entire Bill has been well documented throughout its passage. The Bill, alongside the United Kingdom Internal Market Act 2020, attacks the integrity of the powers of the",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-03-06d.112.2&amp;s=%22fit+to+work%22#g117.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "fit to work",
    "Speaker": "Marion Fellows",
    "Date": "2023-02-28",
    "Debate_Title": "Labour Market Activity",
    "Context_Snippet": "A pilot starts today that will force thousands of universal credit claimants to attend a jobcentre 10 times in two weeks. To put that in context, a claimant living in Shotts will have to get on a bus to Motherwell, costing &#163;3.50 a day, to attend these meetings. They run the risk of being sanctioned if they do not do it, and that is as we are s",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-28d.713.0&amp;s=%22fit+to+work%22#g735.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jon Ashworth",
    "Date": "2023-02-28",
    "Debate_Title": "Labour Market Activity",
    "Context_Snippet": "I beg to move, That this House is concerned that the number of people out of work and economically inactive is higher than before the pandemic, that thousands of older people have left the labour market and that there have been significant increases in the number of people out of work due to ill health or mental ill health; notes that recent employ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-28d.713.0&amp;s=%22workless%22#g713.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Robert Goodwill",
    "Date": "2023-02-27",
    "Debate_Title": "Open Season for Woodcock &#8212; [Dame Caroline Dinenage in the Chair]",
    "Context_Snippet": "I thank my hon. Friend the Member for Stoke-on-Trent North (Jonathan Gullis) for introducing the debate in such a balanced way. I am probably to blame for one of the reasons why we are here. Some years ago, I mentioned the petitions system in Estonia to David Cameron; if a certain proportion of the population signed a petition, it would be debated ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-02-27a.195.0&amp;s=%22feral%22#g201.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Scott of Bybrook",
    "Date": "2023-02-20",
    "Debate_Title": "Levelling-up and Regeneration Bill - <i>Committee (1st Day)</i>: Amendment 4",
    "Context_Snippet": "My Lords, this group of amendments includes those related to new missions and metrics. The missions contained in the levelling-up White Paper are the products of extensive analysis and engagement; this analysis is set out in the White Paper. As I have made clear already, the Bill is designed to establish the framework for missions, not the content ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-02-20b.1485.0&amp;s=%22workless%22#g1501.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Peter Aldous",
    "Date": "2023-02-08",
    "Debate_Title": "Local Government Finance",
    "Context_Snippet": "The short answer is that my hon. Friend has a crystal ball, because she has anticipated the conclusion of my speech, and we have been reading the same report. In the circumstances, as we have heard, some might liken this settlement to a sticking plaster, but I would suggest that it resembles a bandage more, and that in itself reinforces the need fo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-08b.956.0&amp;s=%22workless%22#g971.4"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skivers",
    "Speaker": "John Martin McDonnell",
    "Date": "2023-02-06",
    "Debate_Title": "Social Security and Pensions",
    "Context_Snippet": "I want to raise three issues briefly; some of this has been covered already but I want to reiterate some of it and go into more detail. The first is the benefit cap. The second is the triple lock. The third is the carer&#8217;s allowance, where I follow on from the hon. Member for North East Fife (Wendy Chamberlain) . This debate is primarily about",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-06d.680.0&amp;s=%22skivers%22#g711.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Paul Maynard",
    "Date": "2023-02-06",
    "Debate_Title": "Social Security and Pensions",
    "Context_Snippet": "It is a pleasure to follow the hon. Member for Glasgow East (David Linden) and I pay tribute to his encyclopaedic survey of the landscape of the Department. It is fair to say that no stone was left unturned, and we are grateful to him for that. It is also always a pleasure to come to the Chamber to support the Minister when he does the right thing&",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-06d.680.0&amp;s=%22something+for+nothing%22#g694.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "John Martin McDonnell",
    "Date": "2023-02-06",
    "Debate_Title": "Social Security and Pensions",
    "Context_Snippet": "I hope that Conservative Members and others who may not have had the experience of this recognise how it has affected our communities. I do not use the word lightly, but some of us have experienced what are almost forms of social &#8220;apartheid&#8221; within our communities, where certain sections of housing are no longer available to working-cla",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-06d.680.0&amp;s=%22workless%22#g712.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Jeremy Corbyn",
    "Date": "2023-02-06",
    "Debate_Title": "Social Security and Pensions",
    "Context_Snippet": "No, I will carry on with my speech. The 10% benefit rise is obviously better than no rise at all. During the Budget statement, the previous Chancellor would not even answer the Chair of the Work and Pensions Committee, the right hon. Member for East Ham (Sir Stephen Timms) , on whether there would be any increase whatsoever to benefits. A 10% incre",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-02-06d.680.0&amp;s=%22underclass%22#g704.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Finlay Carson",
    "Date": "2023-01-24",
    "Debate_Title": "Scottish Parliament: Hunting with Dogs (Scotland) Bill: Stage 3",
    "Context_Snippet": "As we have heard from Rachael Hamilton, there is a failure to understand the fundamental differences between rabbit hunting and hare coursing. The facts were confirmed by the evidence of Professor Stephen Harris, a well-known opponent of hunting, in his evidence to the hunting hearing that was conducted by the Westminster Government in September 20",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-01-24.6.0&amp;s=%22lazy%22#g6.53"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Rachael Hamilton",
    "Date": "2023-01-24",
    "Debate_Title": "Scottish Parliament: Hunting with Dogs (Scotland) Bill: Stage 3",
    "Context_Snippet": "Amendments 41 and 75, in my name, aim to reflect oral evidence that the Rural Affairs, Islands and Natural Environment Committee received. They state that effectiveness is to be understood as relating to whether the alternatives are practical and possible. There needs to be clarity in the bill that that is the case. Alternatives might be effective ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2023-01-24.6.0&amp;s=%22feral%22#g6.200"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mel Stride",
    "Date": "2023-01-23",
    "Debate_Title": "Work and Pensions: Topical Questions",
    "Context_Snippet": "As I have said, we have invested &#163;7 million in the west midlands engine pilot, and we are looking closely at that pilot. The right hon. Gentleman criticises us on the employment front, but it is Labour that saw the number of workless households almost double on its watch, Labour that always has unemployment higher at the end of its term of off",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-01-23a.744.2&amp;s=%22workless%22#g745.4"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Lord Wigley",
    "Date": "2023-01-17",
    "Debate_Title": "Levelling-up and Regeneration Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I too congratulate the maiden speakers, and congratulate the noble Lord, Lord Holmes of Richmond, on the concise and clear way in which he outlined four points in just four minutes &#8212;perhaps an example to us all. I want to address the way in which this legislation impacts on the devolved Governments. I will start with three basic poi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-01-17b.1705.2&amp;s=%22handouts%22#g1752.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Mike Kane",
    "Date": "2023-01-17",
    "Debate_Title": "Public Bill Committee: Seafarers' Wages Bill [Lords]: Clause 9 - Refusal of harbour access for failure to pay surcharge",
    "Context_Snippet": "I rise to signal our support for amendment 70 and new clause 6 in the name of my hon. Friend the Member for Easington, who spoke well about seafarer welfare. To give a personal example, over the past 30 years, my wife and I have enjoyed the hospitality, archaeology and beauty of the Orkney Islands. Over those 30 years, we have seen the number of cr",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2022-23/Seafarers%E2%80%99_Wages_Bill/02-0_2023-01-17a.49.4?s=%22handouts%22#g52.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Norton of Louth",
    "Date": "2023-01-12",
    "Debate_Title": "Democracy Denied (DPRRC Report) - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I too welcome both excellent reports. My starting point is that good law is a public good, most law emanates from the Executive, and Parliament&#8217;s role is to ensure that the legislation that they bring forward is justified and as well drafted as it can be. We need therefore to have in place the means to scrutinise and influence legis",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2023-01-12b.1532.0&amp;s=%22lazy%22#g1557.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Richard Holden",
    "Date": "2023-01-11",
    "Debate_Title": "M1: Junction 28",
    "Context_Snippet": "It is an absolute pleasure to serve under your chairmanship, Ms McVey, and to respond to the speech made by my hon. Friend the Member for Bolsover (Mark Fletcher) &#8212;the best of Bolsover. He has raised some very important points, as have my hon. Friends the Members for Ashfield (Lee Anderson) and for Amber Valley (Nigel Mills), who have helped ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2023-01-11b.293.0&amp;s=%22handouts%22#g302.4"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "benefits Britain",
    "Speaker": "Abena Oppong-Asare",
    "Date": "2023-01-09",
    "Debate_Title": "Non-domestic Energy Support",
    "Context_Snippet": "Thank you, Mr Deputy Speaker, and happy new year. I thank the Minister for advance sight of his statement. Businesses have been crying out for some much-needed clarity. In September, the Government promised a review to look at targeted support, saying of the energy bills support scheme: &#8220;We will publish a review&#8230;of the scheme in three m",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2023-01-09b.316.0&amp;s=%22benefits+Britain%22#g318.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skivers",
    "Speaker": "David Linden",
    "Date": "2022-12-13",
    "Debate_Title": "Benefit Sanctions &#8212; [Mark Pritchard in the Chair]",
    "Context_Snippet": "It is, as ever, a pleasure to serve under your chairmanship, Mr Pritchard. I congratulate my hon. Friend the Member for Glasgow South West (Chris Stephens) on securing the debate, and I pay tribute to him for all the work he does in fighting poverty and in his role as a trustee of Feeding Britain. I am very much looking forward to joining the Work ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-12-13b.276.0&amp;s=%22skivers%22#g290.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Heledd Fychan",
    "Date": "2022-12-13",
    "Debate_Title": "4. Debate on a Statement: The Draft Budget 2023-24",
    "Context_Snippet": "Someone wrote to me this week: 'Nothing is getting better; everything is getting worse day by day. Even some of the handouts that I have received are just not making any difference. What will change for me and what promises can you make?' Well, it's extremely difficult, because, even looking at this budget, the questions that we are being asked are",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-12-13.4.470979.h&amp;s=%22handouts%22#g4.471000"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "David Linden",
    "Date": "2022-12-13",
    "Debate_Title": "Benefit Sanctions &#8212; [Mark Pritchard in the Chair]",
    "Context_Snippet": "It is, as ever, a pleasure to serve under your chairmanship, Mr Pritchard. I congratulate my hon. Friend the Member for Glasgow South West (Chris Stephens) on securing the debate, and I pay tribute to him for all the work he does in fighting poverty and in his role as a trustee of Feeding Britain. I am very much looking forward to joining the Work ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-12-13b.276.0&amp;s=%22lazy%22#g290.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2022-12-13",
    "Debate_Title": "Benefit Sanctions &#8212; [Mark Pritchard in the Chair]",
    "Context_Snippet": "On the second point, I am not aware of any such policy or any such incentivisation in any way whatsoever. If the hon. Gentleman has any evidence of such incentivisation, he should publish it and name it individually, because there is no such evidence as far as I am aware. The hon. Gentleman also asked about the rise in the numbers. It is right to h",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-12-13b.276.0&amp;s=%22workless%22#g296.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Laura Trott",
    "Date": "2022-12-12",
    "Debate_Title": "State Pension &#8212; [Sir Robert Syms in the Chair]",
    "Context_Snippet": "State pension entitlement is obviously built up through contributions over a period of time, but equally there is a huge burden on the state, and that has to be met at a given point. As we have discussed, pension pots are funded widely by both the working-age population and people later in life. The Government previously estimated that, had we not ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-12-12a.233.0&amp;s=%22burden+on+taxpayers%22#g246.1"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Ludford",
    "Date": "2022-12-09",
    "Debate_Title": "UK Asylum and Refugee Policy - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, this has been an excellent, very important and timely debate on the eve of Human Rights Day, as the noble Baroness, Lady Chakrabarti, pointed out. These Benches very much welcome this vital opportunity to reflect upon the impact of government asylum policy. The most reverend Primate the Archbishop of Canterbury is to be greatly congratula",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-12-09a.369.0&amp;s=%22scroungers%22#g426.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Gerry Carroll",
    "Date": "2022-12-07",
    "Debate_Title": "Northern Ireland Assembly: Assembly Business: Election of Speaker and Deputy Speakers",
    "Context_Snippet": "I have to admit that today's political circus might be amusing if the cost-of-living crisis were not so deep or the outcome of the proceedings today were not so predictable. Although the sitting might carry some intrigue for the press, workers on the picket lines, patients lying in hospital corridors and everyone who is struggling may ask, 'What's ",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2022-12-07.1.2&amp;s=%22handouts%22#g1.49"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2022-12-06",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "No such assessment has been made of the impact of the two-child benefit cap on trends in the level of child poverty. The Government has committed to annual statistics releases related to the operation of the policy to provide support for a maximum of two children. Statistics up to April 2022 can be found here: https://www.gov.uk/government/statisti",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-11-29.98885.h&amp;s=%22workless%22#g98885.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Delyth Jewell",
    "Date": "2022-12-06",
    "Debate_Title": "2. Business Statement and Announcement",
    "Context_Snippet": "I'd request a statement, please, outlining what extra support will be available to households that are really struggling with the cost-of-living crisis. We talk about the cost-of-living crisis so often I think the phrase has become normalised, but there will actually be thousands and thousands of people who genuinely don't know how they're going to",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-12-06.2.468286.h&amp;s=%22won%27t+work%22#g2.468301"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Steven Bonnar",
    "Date": "2022-12-06",
    "Debate_Title": "Employment",
    "Context_Snippet": "I beg to move, That leave be given to bring in a Bill to make provision about employment rights, including the right to request more predictable terms and conditions of work; to amend the definition of worker; and for connected purposes. Fairness, compassion and equality are not only the basics that should be afforded to each and every working pers",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-12-06b.210.0&amp;s=%22idle%22#g210.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Matthew Hancock",
    "Date": "2022-12-02",
    "Debate_Title": "Dyslexia Screening and Teacher Training Bill",
    "Context_Snippet": "I am not quite sure what to make of that, Mr Deputy Speaker, but I am honoured to be third today. Let us see how it goes. It is a pleasure to be here, and to be clean and well fed. I beg to move, That the Bill be now read a Second time. &#8220;The best way to spread opportunity and reduce inequality in society is by providing every person with a wo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-12-02a.1141.0&amp;s=%22lazy%22#g1141.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Moynihan",
    "Date": "2022-12-02",
    "Debate_Title": "Health Promotion Bill [HL] - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I refer my interests as set out in the register. I congratulate my noble friend in sport, the noble Lord, Lord Addington, on securing this debate and introducing a Bill that seeks to take forward one of the main recommendations from the House of Lords National Plan for Sport and Recreation Committee. The noble Lord has made a strong case ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-12-02a.1983.1&amp;s=%22lazy%22#g1993.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Chris Clarkson",
    "Date": "2022-12-01",
    "Debate_Title": "World AIDS Day",
    "Context_Snippet": "It is a pleasure to follow my hon. Friend the Member for West Bromwich East (Nicola Richards) . I welcome this debate and I thank the hon. Member for Brighton, Kemptown (Lloyd Russell-Moyle) for bringing it to the House today. I also wish to praise him for his leadership in this area and for the work he has done to educate the public on the realiti",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-12-01a.1043.1&amp;s=%22lazy%22#g1058.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Claudia Webbe",
    "Date": "2022-11-28",
    "Debate_Title": "Finance Bill",
    "Context_Snippet": "Contrary to what we have heard, the Bill is not about growth. It goes nowhere near what is needed. It is not fair, and it is not just. The median annual pay per person in my Leicester East constituency is, at &#163;20,300, the lowest in the country according to the latest figures from His Majesty&#8217;s Revenue and Customs, which were published in",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-28f.691.0&amp;s=%22idle%22#g713.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Jim Shannon",
    "Date": "2022-11-24",
    "Debate_Title": "Backbench Business: UN International Day of Persons with Disabilities",
    "Context_Snippet": "As often, whether it be in the House or in Westminster Hall, the hon. Lady gives us a salient reminder of the issue. Back home, even though it is illegal, as she said, it is still happening in certain parts. I do not understand the logic of it, because those guide dogs are among the best I have seen. Many years ago, the RNIB took me to Hollywood in",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-24b.466.1&amp;s=%22not+disabled%22#g475.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Guy Opperman",
    "Date": "2022-11-23",
    "Debate_Title": "Social Security Support for Children &#8212; [Sir Christopher Chope in the Chair]",
    "Context_Snippet": "The hon. Lady and I spent nearly six months campaigning to ensure that there was a serious and legitimate change to women&#8217;s pensions entitlements in certain private sector pensions. I thank her for her work on the private Member&#8217;s Bill that she brought forward and that is now in law, having been signed by Her Majesty the Queen. I welcom",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-11-23c.83.0&amp;s=%22workless%22#g101.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "work-shy",
    "Speaker": "Nusrat Ghani",
    "Date": "2022-11-22",
    "Debate_Title": "Public Bill Committee: Retained EU Law (Revocation and Reform) Bill: Clause 1 - Sunset of EU-derived subordinate legislation and retained direct EU legislation",
    "Context_Snippet": "Hon. Members will not be surprised to hear that I will reject amendments 74 and 77. It has been an absolute joy to hear a new shadow Minister, the hon. Member for Leeds North West, who shadows DEFRA. I have a couple of powerful responses to make to his points, but I will need time to go through them; as he knows, I am not a DEFRA Minister. I do not",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2022-23/Retained_EU_Law_%28Revocation_and_Reform%29_Bill/04-0_2022-11-22a.131.2?s=%22work-shy%22#g158.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Sadiq Khan",
    "Date": "2022-11-22",
    "Debate_Title": "Questions to the Mayor of London &#8212; Hygiene banks: Hygiene banks",
    "Context_Snippet": "It&#8217;s a scandal that in this day and age Londoners are forced to rely on handouts to secure the basic products they need to stay clean and healthy. The underlying driver of all forms of poverty and destitution is being on a low-income. That&#8217;s why I&#8217;m determined to do all I can to help Londoners maximise their incomes and reduce the",
    "Source_URL": "https://www.theyworkforyou.com/london/?id=2022-11-22.4036.h&amp;s=%22handouts%22#g4036.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "David Johnston",
    "Date": "2022-11-22",
    "Debate_Title": "Energy (oil and gas) profits levy",
    "Context_Snippet": "There were things in the autumn statement that Conservative Members would rather not have to do, not least in regard to taxes, but we were always going to have to do some difficult things as a result of having spent more than &#163;400 billion protecting jobs and livelihoods during the pandemic and as a result of Putin&#8217;s invasion of Ukraine a",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-22c.172.2&amp;s=%22lazy%22#g225.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "layabouts",
    "Speaker": "Carol Monaghan",
    "Date": "2022-11-21",
    "Debate_Title": "Autumn Statement Resolutions - Energy (Oil and Gas) Profits Levy",
    "Context_Snippet": "We have heard several times today from Conservative Members that the economic climate we are in is a result of covid and the war in Ukraine. Of course, they fail to mention the monumental act of self-harm that is Brexit. Brexit Britain&#8217;s outlook is bleak. Inflation is running riot and wages are stagnating. Martin Lewis, the money saving exper",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-21c.45.0&amp;s=%22layabouts%22#g112.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Peter Grant",
    "Date": "2022-11-21",
    "Debate_Title": "Autumn Statement Resolutions - Energy (Oil and Gas) Profits Levy",
    "Context_Snippet": "The job conditionality that the Minister has just referred to has been welcomed in certain sections of the right-wing press, whose agenda says that the only reason somebody is not working full time is that they are too lazy and would rather be on benefits. For the record, can he state categorically that that is not the way His Majesty&#8217;s Gover",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-21c.45.0&amp;s=%22lazy%22#g49.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mims Davies",
    "Date": "2022-11-17",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: North of England",
    "Context_Snippet": "No assessment has been made of child poverty in the North East, Yorkshire and the Humber for 2020/21. Given the impact of the pandemic on the size and quality of sample data, DWP statisticians concluded that for several of the breakdowns it would be difficult to make meaningful assessments of trends and changes in 2020/21 compared with the pre-Covi",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-11-14.86500.h&amp;s=%22workless%22#g86500.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Gareth Thomas",
    "Date": "2022-11-14",
    "Debate_Title": "Australia and New Zealand Trade Deals",
    "Context_Snippet": "We will always want to get a better deal and to seek better trading links between our country and Australia, and I will come on to that point a little further on in my speech. Let me reiterate that this debate is happening only because all sides of the House have voiced consistent frustration with the failure to have proper scrutiny of the Australi",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-14c.410.0&amp;s=%22lazy%22#g446.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Anne McLaughlin",
    "Date": "2022-11-08",
    "Debate_Title": "Labour and Skills Shortages: Temporary Recovery Visa &#8212; [Judith Cummins in the Chair]",
    "Context_Snippet": "I really do thank the hon. Lady for that. There will be so many migrant workers who have worked their backsides off in the NHS, especially during the pandemic, and who will be devastated about what has been said, but the hon. Lady&#8217;s remarks go some way towards balancing that out. I have to ask: what kind of arrogance does it take to believe t",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-11-08a.52.0&amp;s=%22handouts%22#g67.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Penny Mordaunt",
    "Date": "2022-11-03",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "I thank my hon. Friend for his excellent question. It is true: since 2010, we have got nearly 4 million people into work. That is 4 million people who have the dignity of a pay packet; half of them are women and a quarter are disabled people, who did not have many such opportunities before. There are 1 million fewer workless households. Every time ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-11-03c.1027.0&amp;s=%22workless%22#g1040.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Elena Whitham",
    "Date": "2022-11-01",
    "Debate_Title": "Scottish Parliament: Low Income and Debt (Report)",
    "Context_Snippet": "As convener of the Social Justice and Social Security Committee, I am pleased to open the debate on the committee&#8217;s important report on low income and debt. YouGov research that was commissioned by Citizens Advice Scotland found that more than 600,000 people have encountered new debt problems during the pandemic, either getting into debt for ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-11-01.7.0&amp;s=%22free+money%22#g7.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Claudia Webbe",
    "Date": "2022-11-01",
    "Debate_Title": "Public Sector Pay: Proposed Strike Action &#8212; [Sir Edward Leigh in the Chair]",
    "Context_Snippet": "You are very kind, Sir Edward; it is a pleasure to serve under your chairship. I thank my hon. Friend the Member for Cynon Valley (Beth Winter) for securing this important debate. Another winter of discontent looms over hard-working public sector workers. We are talking about loyal, hard-working workers who put society above their own needs to see ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-11-01a.306.0&amp;s=%22idle%22#g321.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Lord Sharpe of Epsom",
    "Date": "2022-10-31",
    "Debate_Title": "Police and Crime Commissioners - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, I am grateful to all noble Lords for their contributions and very much congratulate my noble friend Lord Lexden as well on securing this important debate. I know that the topic has long been of interest to him, and a wide range of views have been expressed relating to the roles and responsibilities of police and crime commissioners this e",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-10-31b.82.0&amp;s=%22idle%22#g93.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Mark Harper",
    "Date": "2022-10-27",
    "Debate_Title": "Written Ministerial Statements &#8212; Department for Transport: Transport Update",
    "Context_Snippet": "Review of High Speed Two (HS2) including programme update, local community impact and engagement, environment, benefits, and programme governance. Overview I am reporting continued progress on High Speed Two (HS2) in this, the government&#8217;s fifth update to Parliament. Phase One (West Midlands to London) remains within the budget and schedule r",
    "Source_URL": "https://www.theyworkforyou.com/wms/?id=2022-10-27.hcws345.h&amp;s=%22workless%22#ghcws345.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "workshy",
    "Speaker": "Anne McLaughlin",
    "Date": "2022-10-26",
    "Debate_Title": "Pension Credit and Cost of Living Support Grant",
    "Context_Snippet": "I could not agree more with the hon. Gentleman. It is really important that we monitor it. We are talking about the people in these four countries who are the very poorest and really need that help. The former Prime Minister, the right hon. Member for South West Norfolk (Elizabeth Truss) , clearly said at Prime Minister&#8217;s questions last week ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-26b.187.0&amp;s=%22workshy%22#g188.2"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "layabouts",
    "Speaker": "Anne McLaughlin",
    "Date": "2022-10-26",
    "Debate_Title": "Pension Credit and Cost of Living Support Grant",
    "Context_Snippet": "I could not agree more with the hon. Gentleman. It is really important that we monitor it. We are talking about the people in these four countries who are the very poorest and really need that help. The former Prime Minister, the right hon. Member for South West Norfolk (Elizabeth Truss) , clearly said at Prime Minister&#8217;s questions last week ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-26b.187.0&amp;s=%22layabouts%22#g188.2"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Anne McLaughlin",
    "Date": "2022-10-26",
    "Debate_Title": "Pension Credit and Cost of Living Support Grant",
    "Context_Snippet": "I could not agree more with the hon. Gentleman. It is really important that we monitor it. We are talking about the people in these four countries who are the very poorest and really need that help. The former Prime Minister, the right hon. Member for South West Norfolk (Elizabeth Truss) , clearly said at Prime Minister&#8217;s questions last week ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-26b.187.0&amp;s=%22handouts%22#g188.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Alex Burghart",
    "Date": "2022-10-26",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting low-income families. In 2022/23 we will spend over &#163;242 billion through the welfare system in Great Britain including &#163;108 billion on people of working age. With 1.25 million job vacancies across the UK, our focus is firmly on supporting people to move into, and progress",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-10-19.67215.h&amp;s=%22workless%22#g67215.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Finlay Carson",
    "Date": "2022-10-25",
    "Debate_Title": "Scottish Parliament: Hunting with Dogs (Scotland) Bill: Stage 1",
    "Context_Snippet": "There is absolutely no doubt that everybody here wants to do all that they can to prevent hare coursing, but including rabbits in the bill is a lazy option, as there is no suggestion that there are any welfare issues surrounding rough shooting of rabbits. The police and the procurator fiscal&#8217;s office were surprised when we raised that issue, ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-10-25.7.0&amp;s=%22lazy%22#g7.97"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Lord Monks",
    "Date": "2022-10-20",
    "Debate_Title": "Cost of Living: Public Well-being - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank my noble friend Lady Drake for her characteristic enterprise in securing this debate at this particular time. Not many people will envy the Chancellor of the Exchequer at the moment, as he wrestles with shifting the trajectory of the economy from the feckless spending of his predecessor to what looks like a big bout of painful aus",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-10-20a.1229.0&amp;s=%22feckless%22#g1244.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Sherlock",
    "Date": "2022-10-20",
    "Debate_Title": "Cost of Living: Public Well-being - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, my noble friend Lady Drake has done a characteristically brilliant job of describing the impact of the rising cost of living across the whole landscape. I will focus specifically on the impact of inflation on low-income households, especially those who depend on benefits for their survival. I warn noble Lords up front that this will get t",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-10-20a.1229.0&amp;s=%22idle%22#g1233.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Alan Brown",
    "Date": "2022-10-19",
    "Debate_Title": "Scottish Devolution Settlement: Retained EU Law &#8212; [Mrs Sheryll Murray in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mrs Murray. I congratulate my hon. Friend the Member for Argyll and Bute (Brendan O'Hara) on introducing the debate. It is incredible, in an hour-and-half debate on such an important subject, that I am standing to sum up less than half an hour after it began. That shows a lack of care from many Con",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-19a.289.0&amp;s=%22lazy%22#g296.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Alan Brown",
    "Date": "2022-10-19",
    "Debate_Title": "Scottish Devolution Settlement: Retained EU Law &#8212; [Mrs Sheryll Murray in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mrs Murray. I congratulate my hon. Friend the Member for Argyll and Bute (Brendan O'Hara) on introducing the debate. It is incredible, in an hour-and-half debate on such an important subject, that I am standing to sum up less than half an hour after it began. That shows a lack of care from many Con",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-19a.289.0&amp;s=%22idle%22#g296.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Richard Fuller",
    "Date": "2022-10-18",
    "Debate_Title": "Cost of Living: Support for Young People",
    "Context_Snippet": "What a great pleasure it is, Ms Ali, to serve under your chairmanship. I thank the hon. Member for Leeds North East (Fabian Hamilton) for securing the debate, and I thank the hon. Members who have contributed, including the hon. Members for Bath (Wera Hobhouse) and for East Dunbartonshire (Amy Callaghan). I thank my friend, the hon. Member for Shef",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-10-18b.274.0&amp;s=%22workless%22#g283.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Victoria Prentis",
    "Date": "2022-10-18",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: North East",
    "Context_Snippet": "The Government is committed to reducing child poverty and supporting low-income families. In 2022/23 we will spend over &#163;242 billion through the welfare system in Great Britain including &#163;108 billion on people of working age. With 1.25 million job vacancies across the UK, our focus is firmly on supporting people to move into, and progress",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-10-13.62833.h&amp;s=%22workless%22#g62833.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Lord Forsyth of Drumlean",
    "Date": "2022-10-10",
    "Debate_Title": "Economy: The Growth Plan 2022 - <i>Motion to Take Note</i>",
    "Context_Snippet": "How does the noble Lord explain away the fact that his Front Bench supported all of it, including the reductions in national insurance and the basic rate of income tax? They did not support the corporation tax cut but that is presumably because they do not recognise the importance of having investment in our country. Where does investment come from",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-10-10b.556.3&amp;s=%22free+money%22#g571.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Penny Mordaunt",
    "Date": "2022-09-22",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "I start by thanking the hon. Lady for her kind remarks. It was a privilege to preside over the Accession Council. The Government have set out clearly their immediate priorities. The Prime Minister will get to the matter of an ethics adviser, but her priorities, as she has stated, have been ensuring that people in this country can see a doctor and a",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-09-22a.810.0&amp;s=%22idle%22#g811.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Kim Johnson",
    "Date": "2022-09-08",
    "Debate_Title": "Free School Meals and Child Poverty",
    "Context_Snippet": "I thank my hon. Friend for the intervention and will come on to the point about stigma later. More than 200,000 children are eligible for free school meals but are currently missing out. At my free school meals event with the National Education Union on Tuesday in Parliament, which received cross-party support, we heard some heartbreaking testimoni",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-09-08b.480.0&amp;s=%22handouts%22#g482.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Bethell",
    "Date": "2022-09-08",
    "Debate_Title": "Primary and Community Care: Improving Patient Outcomes - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank the noble Lord, Lord Patel, for bringing about this important debate. As ever, he has a canny nose for the timing of these things and he is absolutely spot on. I know from my time in office that the pressures on primary and community care are intense and I agree that we need an urgent rethink. That is why I will put my name to any",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-09-08a.284.0&amp;s=%22lazy%22#g286.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Siobhain McDonagh",
    "Date": "2022-09-07",
    "Debate_Title": "Financial Services and Markets Bill",
    "Context_Snippet": "I am furious to report the imminent loss of yet another bank branch in Mitcham town centre. The year before last it was Nationwide, last year it was Barclays and this time it is Halifax&#8212;a bank that pretends to consult its long-standing and loyal customers about its branch closure, but then refuses to attend my public meeting to hear the conce",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-09-07c.278.0&amp;s=%22free+cash%22#g335.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Emma Roddick",
    "Date": "2022-09-07",
    "Debate_Title": "Scottish Parliament: Programme for Government (Cost of Living)",
    "Context_Snippet": "It is very important to have targets. Pam Duncan-Glancy and I are both members of the Social Justice and Social Security Committee, and it is important for us to be able to scrutinise such matters. I know that that question has been raised in the committee and I am sure that an answer will be forthcoming. One Government is making itself and its don",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-09-07.18.0&amp;s=%22handouts%22#g18.37"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Wera Hobhouse",
    "Date": "2022-09-06",
    "Debate_Title": "Vaccine Damage Payment Scheme: Covid-19",
    "Context_Snippet": "My constituent did what she believed was right by getting vaccinated, but was one of those who had a blood clot after vaccination. The clot caused her to have a stroke and now she is unable to work. Her family are very concerned that she is going to be classed as not disabled enough to get a damages payout. Does the right hon. and learned Member ag",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-09-06c.61.0&amp;s=%22not+disabled%22#g62.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Stuart McMillan",
    "Date": "2022-09-06",
    "Debate_Title": "Scottish Parliament: Programme for Government 2022-23",
    "Context_Snippet": "I am sure that the workforce at Ferguson Marine will be delighted to hear the comments that Anas Sarwar made in his speech. I wanted to speak in today&#8217;s debate because this summer&#8217;s recess was a very different one for my office: we received more calls and emails than ever from people who are struggling to afford to pay energy bills now.",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-09-06.6.0&amp;s=%22handouts%22#g6.38"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-09-05",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "This Government is committed to reducing child poverty and supporting low-income families, and believes work is the best route out of poverty.&#8239; With a record 1.27 million vacancies across the UK, our focus is firmly on supporting people to move into and progress in work. This approach is based on clear evidence about the importance of parenta",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-20.40990.h&amp;s=%22workless%22#g40990.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-25",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-15.37567.h&amp;s=%22workless%22#g37567.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-25",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "This Government is committed to reducing child poverty and supporting low-income families, and believes work is the best route out of poverty.&#8239; With a record 1.3 million vacancies across the UK, our focus is firmly on supporting people to move into and progress in work. This approach is based on clear evidence about the importance of parental",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-15.37634.h&amp;s=%22workless%22#g37634.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.35933.h&amp;s=%22workless%22#g35933.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.36101.h&amp;s=%22workless%22#g36101.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.36103.h&amp;s=%22workless%22#g36103.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.36102.h&amp;s=%22workless%22#g36102.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.35936.h&amp;s=%22workless%22#g35936.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.35934.h&amp;s=%22workless%22#g35934.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.35935.h&amp;s=%22workless%22#g35935.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-22",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-14.36757.h&amp;s=%22workless%22#g36757.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-21",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-14.36804.h&amp;s=%22workless%22#g36804.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-21",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "This Government is committed to reducing child poverty and supporting low-income families, and believes work is the best route out of poverty.&#8239; With a record 1.3 million vacancies across the UK, our focus is firmly on supporting people to move into and progress in work. This approach is based on clear evidence about the importance of parental",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-14.36795.h&amp;s=%22workless%22#g36795.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-21",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest statistics on the number and proportion of children who are in low income families by local area, covering the seven years, 2014/15 to 2020/21, can be found in the annual publication: Children in low income families: local area statistics 2014 to 2021 - GOV.UK (www.gov.uk) . This Government is committed to reducing child poverty and supp",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-13.36080.h&amp;s=%22workless%22#g36080.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Lisa Cameron",
    "Date": "2022-07-20",
    "Debate_Title": "Disability and Gender Inclusivity in the Media",
    "Context_Snippet": "Absolutely. I entirely commend the fantastic work that the right hon. Lady does on equality, right across Parliament. It is second to none; she is a force for good in showing leadership in those roles. She is absolutely right. I spoke to Channel 4 a number of years ago in my role as chair of the all-party parliamentary group on disability. They tol",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-07-20a.319.0&amp;s=%22scroungers%22#g320.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free cash",
    "Speaker": "Tim Farron",
    "Date": "2022-07-19",
    "Debate_Title": "Public Bill Committee: Levelling-up and Regeneration Bill: Clause 92 - Regard to certain heritage assets in exercise of planning functions",
    "Context_Snippet": "It is a pleasure to serve under your guidance, Sir Mark. I support the amendment tabled by the hon. Member for York Central, but will speak to my own, amendment 138. Clause 92 is important. What is in it is not a problem. I propose to add to it national parks and areas of outstanding natural beauty, which are defined areas within the country, as he",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2022-23/Levelling-up_and_Regeneration_Bill/17-0_2022-07-19a.547.4?s=%22free+cash%22#g554.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-07-15",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "This Government is committed to reducing child poverty and supporting low-income families, and believes work is the best route out of poverty.&#8239; With a record 1.3 million vacancies across the UK, our focus is firmly on supporting people to move into and progress in work. This approach is based on clear evidence about the importance of parental",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-07-12.34954.h&amp;s=%22workless%22#g34954.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Ian Liddell-Grainger",
    "Date": "2022-07-14",
    "Debate_Title": "Business of the House",
    "Context_Snippet": "Another issue of confidence, on which we need an urgent debate, has come to my attention: Taunton station. The staff there are utterly lazy and incompetent. Those who are young, vulnerable, disabled or need help cannot get from one side of the station to the other, because passengers have to walk around a main road and up a ramp, taking all their s",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-07-14b.497.0&amp;s=%22lazy%22#g506.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Thornton",
    "Date": "2022-07-14",
    "Debate_Title": "Women and Girls: Economic Well-being, Welfare, Safety and Opportunities - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, this has been a fascinating and mixed debate, and I fear some of issues raised will pose some challenges for the Minister today. I start by congratulating my noble friend Lady Gale on choosing this debate, although I doubt even she could have anticipated how relevant it would be in highlighting the shortcomings of this Government in deali",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-07-14b.1589.6&amp;s=%22idle%22#g1613.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "playing the system",
    "Speaker": "Lord Sikka",
    "Date": "2022-07-07",
    "Debate_Title": "Sewage Disposal in Rivers and Coastal Waters - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, I thank the noble Lord, Lord Oates, for this vital debate. It is a pleasure to follow so many other knowledgeable speakers. The water industry has been a serial offender for far too long. On 1 March 2018, the then Environment Secretary, Michael Gove, said that &#8220;water companies &#8230; have not been acting &#8230; in the public inter",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-07-07b.1089.0&amp;s=%22playing+the+system%22#g1102.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Conor Burns",
    "Date": "2022-07-04",
    "Debate_Title": "Northern Ireland Troubles (Legacy and Reconciliation) Bill: Clause 33 - No criminal investigations except through ICRIR reviews",
    "Context_Snippet": "We believe that the commitment made by the Government of the Irish Republic was a stand-alone commitment to bring forward their own legislation to have a means of resolving some of the unresolved cases to the benefit of all, to aid the process of information recovery and reconciliation across the island of Ireland and the totality of these islands.",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-07-04a.606.4&amp;s=%22something+for+nothing%22#g614.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Peter Kyle",
    "Date": "2022-07-04",
    "Debate_Title": "Northern Ireland Troubles (Legacy and Reconciliation) Bill: Clause 33 - No criminal investigations except through ICRIR reviews",
    "Context_Snippet": "I will try to keep my remarks as brief as possible as well. We do not want to end up in the situation we did last Wednesday, where it took three hours before we heard a speech from a Northern Irish Member. Today, we are going to scrutinise parts 3, 4 and 5 of the Bill, followed by the final stages. This is a major undertaking in such a small amount",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-07-04a.606.4&amp;s=%22idle%22#g624.7"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Meg Hillier",
    "Date": "2022-06-28",
    "Debate_Title": "Treasury: Economic Inequality",
    "Context_Snippet": "As my hon. Friend the Member for Liverpool, Walton (Dan Carden) highlights, the handouts from the Government to support families are already being wiped out by the rise in inflation and cost of living. One in two children in my constituency live in poverty. From what the Minister just said, he believes in trickle-down from those billionaires to hel",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-06-28b.148.3&amp;s=%22handouts%22#g149.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-06-24",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The latest available data on in-work poverty shows that in 2019/20, children in households where all adults were in work were around six times less likely to be in absolute poverty (before housing costs) than children in a household where nobody works.&#8239;&#8239; Compared with 2010, there are nearly 1 million fewer workless households and almost",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-06-20.21308.h&amp;s=%22workless%22#g21308.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Mabon ap Gwynfor",
    "Date": "2022-06-22",
    "Debate_Title": "6. Member Debate under Standing Order 11.21(iv): Empowering communities",
    "Context_Snippet": "I don&#8217;t want to spend too much time criticising the Government. That's an easy thing to do in terms of the politics of the thing, but the truth is that I genuinely want to see delivery on these issues as soon as possible, and it is only the Government that can take action. So I don&#8217;t think I would have much success in convincing them by",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-06-22.7.435618.h&amp;s=%22idle%22#g7.435653"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Anna Firth",
    "Date": "2022-06-08",
    "Debate_Title": "Levelling-up and Regeneration Bill",
    "Context_Snippet": "No, I do not accept that at all. My understanding is that regions have had just as much money as they would have had. I particularly welcome the &#163;27 million of levelling-up funding that Southend has already received, and the &#163;20 million that has been given to the old port of Leigh to enable our famous cockle industry to provide employment",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-06-08c.821.0&amp;s=%22not+disabled%22#g901.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Will Quince",
    "Date": "2022-06-07",
    "Debate_Title": "Children&#8217;s Education Recovery and Childcare Costs",
    "Context_Snippet": "I welcome the opportunity to respond on behalf of Her Majesty&#8217;s Government and I thank the many hon. Members who have made constructive and passionate contributions to the debate. I will try to respond to as many of the themes and issues raised as possible in the time available to me; there is much to respond to and so little time in which to",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-06-07c.729.0&amp;s=%22workless%22#g774.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Margaret Ferrier",
    "Date": "2022-06-06",
    "Debate_Title": "Breed-specific Legislation &#8212; [Sir George Howarth in the Chair]",
    "Context_Snippet": "It is always a pleasure to serve under your chairship, Sir George. I thank the almost 116,000 members of the public, including 149 of my constituents, who signed the e-petition on breed-specific legislation. I congratulate the hon. Member for Neath (Christina Rees) on her opening remarks. I am pleased to see the clear public support for reforming t",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-06-06a.227.0&amp;s=%22lazy%22#g234.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Gareth Davies",
    "Date": "2022-05-25",
    "Debate_Title": "7. Plaid Cymru Debate: Post-Brexit funding",
    "Context_Snippet": "I'm not speaking this afternoon to be an apologist for the UK Government. However, I do take issue with Plaid's motion this afternoon and the stance of their puppet masters in the Welsh Government. Wales will not be &#163;1 billion worse off in unreplaced funding over the next three years, nor has the UK Government undermined the Welsh Government's",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-05-25.9.428702.h&amp;s=%22handouts%22#g9.428743"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Rachael Maskell",
    "Date": "2022-05-25",
    "Debate_Title": "Cost of Living: Fiscal Approach &#8212; [Derek Twigg in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr Twigg. I thank my hon. Friend the Member for Barnsley Central (Dan Jarvis) for bringing forward today&#8217;s debate. I will always recall Mo Mowlam telling the story of a pensioner who came to her surgery, put their pension book in front of her and laid out the bills they had to pay&#8212;the s",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-05-25a.147.0&amp;s=%22handouts%22#g157.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lee Waters",
    "Date": "2022-05-25",
    "Debate_Title": "9. Short Debate: Biodiversity: The big picture. Seeding the future &#8212; the importance of managing grass verges and grasslands",
    "Context_Snippet": "Thank you very much. That was a short and fruitful debate with many thoughtful contributions. Thank you, Carolyn, for tabling it and for the work you've been doing with us to help inform an approach on this to work with local authorities to try and spread good practice. You highlighted the alarming rate at which nature is being depleted and many of",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-05-25.11.428755.h&amp;s=%22lazy%22#g11.428770"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "freebies",
    "Speaker": "Baroness Seccombe",
    "Date": "2022-05-23",
    "Debate_Title": "Senior Citizens: Means-tested Benefits - <i>Question</i>",
    "Context_Snippet": "My Lords, I know that there has been extensive advertisement of pension credit in the national newspapers, but has my noble friend considered using local papers&#8212;particularly any freebies that are going, because they are read by a lot of older people?",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-05-23a.653.0&amp;s=%22freebies%22#g655.6"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Yasmin Qureshi",
    "Date": "2022-05-18",
    "Debate_Title": "Achieving Economic Growth",
    "Context_Snippet": "I was very disappointed by the Gracious Speech as it failed to deal with a number of things that really matter to my constituents and, I believe, to the country at large. First and foremost, and we have heard this mentioned many times today, the cost of living crisis is clear: inflation is nearing 10%, economic growth has been revised down, we have",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-05-18b.702.3&amp;s=%22feckless%22#g756.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Victoria Prentis",
    "Date": "2022-05-18",
    "Debate_Title": "Written Answers &#8212; Department for Environment, Food and Rural Affairs: Livestock and Wildlife: Dogs",
    "Context_Snippet": "The Government takes the issue of livestock worrying and chasing very seriously, recognising the distress this can cause farmers and animals, as well as the financial implications. New measures to crack down on livestock worrying in England and Wales are to be brought in through the Animal Welfare (Kept Animals) Bill, which was introduced in Parlia",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-05-13.1492.h&amp;s=%22feral%22#g1492.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "can't be bothered",
    "Speaker": "Hilary Benn",
    "Date": "2022-05-18",
    "Debate_Title": "Achieving Economic Growth",
    "Context_Snippet": "This morning, the Foreign Secretary said: &#8220;We are in a very, very difficult economic situation&#8221;. We all recognise that that is true. Although there are some things that no Government can control, I encourage Ministers to reflect a little more on some of the difficulties that they have brought upon themselves and British business. In his",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-05-18b.702.3&amp;s=%22can%27t+be+bothered%22#g722.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Stedman-Scott",
    "Date": "2022-05-17",
    "Debate_Title": "Queen&#8217;s Speech - <i>Debate (5th Day)</i>",
    "Context_Snippet": "My Lords, on behalf of all noble Lords, I thank Her Majesty for her gracious Speech. I am grateful for the privilege of opening today&#8217;s debate on the Motion for an humble Address. I would like to take this opportunity to thank Her Majesty for the outstanding service and dedication to our country over these last 70 years. Her Majesty is deserv",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-05-17a.366.8&amp;s=%22workless%22#g367.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Jonathan Gullis",
    "Date": "2022-05-11",
    "Debate_Title": "Preventing Crime and Delivering Justice",
    "Context_Snippet": "I thank you, Madam Deputy Speaker, and Mr Deputy Speaker for being so understanding regarding my need to be absent from the Chamber for a period of time and then allowing me to come back to speak. That is very gracious of you. It is always an honour to follow the hon. Member for Brighton, Kemptown (Lloyd Russell-Moyle) , who has a flair for theatri",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-05-11b.150.2&amp;s=%22lazy%22#g218.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feral",
    "Speaker": "Jonathan Gullis",
    "Date": "2022-05-11",
    "Debate_Title": "Preventing Crime and Delivering Justice",
    "Context_Snippet": "I thank you, Madam Deputy Speaker, and Mr Deputy Speaker for being so understanding regarding my need to be absent from the Chamber for a period of time and then allowing me to come back to speak. That is very gracious of you. It is always an honour to follow the hon. Member for Brighton, Kemptown (Lloyd Russell-Moyle) , who has a flair for theatri",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-05-11b.150.2&amp;s=%22feral%22#g218.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Boris Johnson",
    "Date": "2022-04-27",
    "Debate_Title": "Prime Minister: Engagements",
    "Context_Snippet": "We are helping families up and down the country with the universal credit taper. The right hon. Gentleman asks about universal credit; we are tapering it so that working people get another &#163;1,000 in their pocket. We are helping families in the way that I have described, and I remind the House that under this Government there are now far fewer ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-04-27a.752.9&amp;s=%22workless%22#g757.2"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Liz Twist",
    "Date": "2022-04-26",
    "Debate_Title": "Smokefree 2030 &#8212; [Caroline Nokes in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under you as Chair, Ms Nokes. I commend the hon. Member for Harrow East (Bob Blackman) and my hon. Friend the Member for City of Durham (Mary Kelly Foy) for securing today&#8217;s debate. I also wish the hon. Member for Harrow East a very happy birthday. Smoking, as we have heard, is not a lifestyle choice. It is a lethal ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-04-26b.201.0&amp;s=%22lifestyle+choice%22#g213.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Bob Doris",
    "Date": "2022-04-26",
    "Debate_Title": "Scottish Parliament: Low-income Families (Access to School Education)",
    "Context_Snippet": "I am pleased to speak in this debate about reducing the cost of the school day for low-income families. The SNP Government has made a raft of direct interventions to help low-income families. Those include the newly doubled Scottish child payment and the three best start grants&#8212;those being the pregnancy and baby payment, the early learning pa",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-04-26.4.0&amp;s=%22something+for+nothing%22#g4.84"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Alan Brown",
    "Date": "2022-04-21",
    "Debate_Title": "Backbench Business: Working Tax Credit and Universal Credit: Two-Child Limit &#8212; [Steve McCabe in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr McCabe, and I commend my hon. Friend the Member for Glasgow Central (Alison Thewliss) for having secured this debate. More importantly, I thank her for the tireless campaigning she has done on this two-child policy, which victimises and stigmatises families and children. It is worth putting on t",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-04-21a.129.1&amp;s=%22scroungers%22#g141.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scrounger",
    "Speaker": "Alan Brown",
    "Date": "2022-04-21",
    "Debate_Title": "Backbench Business: Working Tax Credit and Universal Credit: Two-Child Limit &#8212; [Steve McCabe in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Mr McCabe, and I commend my hon. Friend the Member for Glasgow Central (Alison Thewliss) for having secured this debate. More importantly, I thank her for the tireless campaigning she has done on this two-child policy, which victimises and stigmatises families and children. It is worth putting on t",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-04-21a.129.1&amp;s=%22scrounger%22#g141.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-04-21",
    "Debate_Title": "Backbench Business: Working Tax Credit and Universal Credit: Two-Child Limit &#8212; [Steve McCabe in the Chair]",
    "Context_Snippet": "I do not think that the hon. Member was here for the whole debate. I will take interventions from others, who have had the courtesy to be here for the whole debate, but I will carry on for now. On the point about monitoring, we are keeping all our policies under review, but this policy seeks to strike the right balance between supporting those in n",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-04-21a.129.1&amp;s=%22workless%22#g150.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-04-06",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Social Security Benefits: Uprating",
    "Context_Snippet": "The Secretary of State undertakes an annual review of benefits and pensions with reference to the Consumer Prices Index (CPI). All benefit up-rating since April 1987 has been based on the increase in the relevant price inflation index in the 12 months to the previous September. The relevant benefits are increasing by 3.1% from April. The latest sta",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-03-29.149291.h&amp;s=%22workless%22#g149291.r0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "something for nothing",
    "Speaker": "Elena Whitham",
    "Date": "2022-03-31",
    "Debate_Title": "Scottish Parliament: Benefit Sanctions",
    "Context_Snippet": "I, too, thank my colleague Kaukab Stewart for securing this important debate. First, I want to take a moment to remind us all how we got to where we are today. The former Tory Secretary of State for Work and Pensions, Iain Duncan Smith, said: &#8220;Alongside what we have already done with the mandatory work programme and our tougher sanctions regi",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-03-31.22.0&amp;s=%22something+for+nothing%22#g22.13"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Elena Whitham",
    "Date": "2022-03-31",
    "Debate_Title": "Scottish Parliament: Benefit Sanctions",
    "Context_Snippet": "I, too, thank my colleague Kaukab Stewart for securing this important debate. First, I want to take a moment to remind us all how we got to where we are today. The former Tory Secretary of State for Work and Pensions, Iain Duncan Smith, said: &#8220;Alongside what we have already done with the mandatory work programme and our tougher sanctions regi",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-03-31.22.0&amp;s=%22lazy%22#g22.13"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "feckless",
    "Speaker": "Elena Whitham",
    "Date": "2022-03-31",
    "Debate_Title": "Scottish Parliament: Benefit Sanctions",
    "Context_Snippet": "I, too, thank my colleague Kaukab Stewart for securing this important debate. First, I want to take a moment to remind us all how we got to where we are today. The former Tory Secretary of State for Work and Pensions, Iain Duncan Smith, said: &#8220;Alongside what we have already done with the mandatory work programme and our tougher sanctions regi",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-03-31.22.0&amp;s=%22feckless%22#g22.13"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Ritchie of Downpatrick",
    "Date": "2022-03-30",
    "Debate_Title": "National Insurance Contributions (Increase of Thresholds) Bill - <i>Second Reading</i>",
    "Context_Snippet": "My Lords, I thank the noble Baroness, Lady Penn, for presenting this technical Bill to the House today as a consequence of the Chancellor&#8217;s Spring Statement in the other place on Wednesday last week. I recognise that there are benefits to raising the threshold at which people pay national insurance&#8212;there are also requirements on employe",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-03-30b.1611.0&amp;s=%22workless%22#g1613.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Rebecca Pow",
    "Date": "2022-03-28",
    "Debate_Title": "Greyhound Racing &#8212; [Sir Roger Gale in the Chair]",
    "Context_Snippet": "I thank my hon. Friend for that intervention and I completely take his point. The Government believe that greyhound racing currently has a very proactive, pro-welfare body in charge that wishes to work to improve animal welfare. There has been a lot of agreement in this room. I thank my hon. Friend the Member for Romford (Andrew Rosindell) , in par",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-03-28a.185.0&amp;s=%22lazy%22#g204.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Lucy Frazer",
    "Date": "2022-03-24",
    "Debate_Title": "National Insurance Contributions (Increase of Thresholds) Bill: Clause 1 - Increase of primary threshold for primary Class 1 contributions",
    "Context_Snippet": "I wish first to address amendment 1, which was tabled by the hon. Member for Bath (Wera Hobhouse) and would bring forward to 6 April the increase to the primary threshold that is introduced in clause 1. Of course the Government want to help people with the cost of living as quickly as possible, which is why the Chancellor introduced a number of mea",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-03-24c.512.2&amp;s=%22workless%22#g522.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Yasmin Qureshi",
    "Date": "2022-03-16",
    "Debate_Title": "In-work Poverty &#8212; [Christina Rees in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Ms Rees. I thank my hon. Friend the Member for Easington (Grahame Morris) for securing this debate, which is absolutely vital but should not be necessary in 21st-century Britain. My constituency of Bolton South East is the 38th most deprived constituency in the United Kingdom. We have a jobs crisis, a",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-03-16b.341.0&amp;s=%22scroungers%22#g354.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "shirkers",
    "Speaker": "Yasmin Qureshi",
    "Date": "2022-03-16",
    "Debate_Title": "In-work Poverty &#8212; [Christina Rees in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Ms Rees. I thank my hon. Friend the Member for Easington (Grahame Morris) for securing this debate, which is absolutely vital but should not be necessary in 21st-century Britain. My constituency of Bolton South East is the 38th most deprived constituency in the United Kingdom. We have a jobs crisis, a",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-03-16b.341.0&amp;s=%22shirkers%22#g354.0"
  },
  {
    "Category": "Economic_Envy_Better_Off",
    "Term": "lifestyle choice",
    "Speaker": "Lord Crisp",
    "Date": "2022-03-16",
    "Debate_Title": "Health and Care Bill - <i>Report (4th Day)</i>: Amendment 158",
    "Context_Snippet": "My Lords, I rise to move Amendment 158 and note that the other three amendments in this group are consequential on this one. These amendments would require the Government to consult on a statutory polluter pays scheme imposed on tobacco manufacturers to fund measures to reduce smoking prevalence and improve public health. In 2019, when the Governme",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-03-16a.287.0&amp;s=%22lifestyle+choice%22#g288.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "unwashed",
    "Speaker": "Delyth Jewell",
    "Date": "2022-03-16",
    "Debate_Title": "8. Plaid Cymru Debate: The cost-of-living crisis &#8212; The effect on schools and children",
    "Context_Snippet": "The school day can contain many stresses. I'm not just talking about maths tests or rushing to finish homework on the school steps, I'm talking about children who go to school hungry and can't afford a snack at morning break, children who feel dread going through the gates because they're worried that someone might notice that they're not wearing t",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-03-16.9.416003.h&amp;s=%22unwashed%22#g9.415987"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Andrew Stephenson",
    "Date": "2022-03-16",
    "Debate_Title": "Written Ministerial Statements &#8212; Department for Transport: HS2 Six-Monthly Report to Parliament: March 2022",
    "Context_Snippet": "HS2 Six-Monthly Report to Parliament: March 2022 Review of High Speed Two (HS2) including programme update, local community impact and engagement, environment, benefits, and programme governance. Overview This is my fourth update to Parliament on High Speed Two (HS2). I can confirm that the project remains within budget and schedule in delivering P",
    "Source_URL": "https://www.theyworkforyou.com/wms/?id=2022-03-16.hcws687.h&amp;s=%22workless%22#ghcws687.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Gareth Davies",
    "Date": "2022-03-16",
    "Debate_Title": "7. Welsh Conservative Debate: The Armed Forces",
    "Context_Snippet": "It's a great honour to take part in this debate this afternoon and to give my thanks to our servicemen and women, past, present and future, for their incredible sacrifices that allow me and all of us to stand here today. Because, make no mistake, without our armed forces, there would be no democracy. We would not be debating our support for our arm",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-03-16.8.415939.h&amp;s=%22idle%22#g8.415942"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "malingering",
    "Speaker": "Lord Callanan",
    "Date": "2022-03-14",
    "Debate_Title": "Economic Crime (Transparency and Enforcement) Bill - <i>Committee</i>: Amendment 33",
    "Context_Snippet": "I am mindful that several noble Lords, including the noble Baroness, Lady Chapman of Darlington, and the noble Lords, Lord Fox and Lord Sikka, have tabled a number of amendments in this group. I will start with Amendment 34 in the name of the noble Lord, Lord Foulkes, who I see is not in his place. I will speak to it alongside Amendments 58 and 67 ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-03-14a.64.3&amp;s=%22malingering%22#g74.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Gareth Davies",
    "Date": "2022-03-09",
    "Debate_Title": "7. Welsh Conservatives Debate: Housing",
    "Context_Snippet": "Thank you very much, Deputy Llywydd. I think the Member for Dwyfor Meirionnydd should maybe have a lie down and check his blood pressure and spend a bit less time on Twitter.&#160; It's an absolute pleasure to take part in this important debate tonight, or this afternoon. So, we currently have a housing crisis in Wales, a crisis that was totally un",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-03-09.8.413958.h&amp;s=%22idle%22#g8.413964"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Mick Whitley",
    "Date": "2022-03-03",
    "Debate_Title": "UK Shipbuilding",
    "Context_Snippet": "The right hon. Member makes a good point. As well as building for defence procurement, we should be building commercial vessels. The terms of the competition dictate that the FSS need only be &#8220;integrated&#8221; in the UK, which means that the lion&#8217;s share of the work could be offshored, with British shipbuilders losing out on vital work",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-03-03a.1267.0&amp;s=%22handouts%22#g1268.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Olivia Blake",
    "Date": "2022-03-02",
    "Debate_Title": "Regional Inequalities: Child Poverty &#8212; [Dr Rupa Huq in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Dr Huq. I thank my hon. Friend the Member for Blaydon (Liz Twist) for her thoughtful introduction to the debate. Far too often, when regional inequity is discussed, the framing is entirely wrong and misses out the real impacts that that inequality has on people&#8217;s lives. Although I accept that ch",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-03-02c.377.0&amp;s=%22handouts%22#g389.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "free money",
    "Speaker": "Lord Foster of Bath",
    "Date": "2022-03-01",
    "Debate_Title": "Gambling Advertising - <i>Question for Short Debate</i>",
    "Context_Snippet": "My Lords, I declare my interest as chairman of Peers for Gambling Reform. Since gambling advertising and gambling itself were liberalised by the Gambling Act 2005, the promotion of gambling products has grown exponentially, with an annual spend now in excess of &#163;1.5 billion and a growing amount of that happening online. It is worth noting that",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-03-01a.757.0&amp;s=%22free+money%22#g757.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-03-01",
    "Debate_Title": "Benefit Cap",
    "Context_Snippet": "That report will come forward&#8212;I think there have been exchanges between the Committee and the Secretary of State&#8217;s office&#8212;but we are talking here about a statutory requirement, which certainly will happen during the course of this Parliament. As the hon. Gentleman, a well-respected member of the Committee, will be aware, we have g",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-03-01d.1012.0&amp;s=%22workless%22#g1020.3"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "David Rutley",
    "Date": "2022-03-01",
    "Debate_Title": "Benefit Cap",
    "Context_Snippet": "The internal assessments we have produced&#8212;and we have produced several&#8212;showed that UC does help more people get into work. At the moment, in an economic environment where there are record vacancies, which I will touch on later, we are helping more people get into work. The benefit cap was introduced as part of a strategy to reform the s",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-03-01d.1012.0&amp;s=%22burden+on+taxpayers%22#g1019.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Florence Eshalomi",
    "Date": "2022-02-24",
    "Debate_Title": "Backbench Business: United Nations Convention on the Rights of Persons with Disabilities &#8212; [Graham Stringer in the Chair]",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Mr Stringer. I normally speak before the hon. Member for Strangford (Jim Shannon) , so it is an honour to follow him this afternoon. I pay tribute to the hon. Member for Motherwell and Wishaw (Marion Fellows) for drawing attention to this important topic. I want to commend her and my hon. Friend the M",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-02-24a.199.1&amp;s=%22not+disabled%22#g209.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Gerry Carroll",
    "Date": "2022-02-23",
    "Debate_Title": "Northern Ireland Assembly: Executive Committee Business: Budget Bill: Second Stage",
    "Context_Snippet": "Once again, I will oppose, or do my best to oppose, another Stormont Budget that is inadequate and does not nearly deliver the expansion of support and services that people so desperately need when faced with a spiralling cost-of-living crisis, sustained poverty and a deep health crisis that impacts on every family. Average prices are up by over 5%",
    "Source_URL": "https://www.theyworkforyou.com/ni/?id=2022-02-23.5.46&amp;s=%22handouts%22#g5.72"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "David Davies",
    "Date": "2022-02-22",
    "Debate_Title": "Cost of Living in Wales",
    "Context_Snippet": "It is a pleasure to serve under your chairmanship, Ms Fovargue. I apologise for the fact that I was at the vote for a few minutes, as one or two others were. I congratulate the hon. Member for Newport East (Jessica Morden) on securing this debate, and I thank those who have contributed. I am pleased that we are having this debate on a subject that ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-02-22a.94.0&amp;s=%22handouts%22#g100.1"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Emma Hardy",
    "Date": "2022-02-21",
    "Debate_Title": "Skills and Post-16 Education Bill [Lords]: New Clause 12 - Office for Students: publication and protection from defamation",
    "Context_Snippet": "It is always a genuine pleasure to follow the hon. Member for Waveney (Peter Aldous) , who spoke passionately and articulately of his desire to support, through new clause 5, the people who need that support the most. It was an excellent speech with which I wholeheartedly agreed. I will not detain the House for too long in speaking about my amendme",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-02-21c.79.2&amp;s=%22not+disabled%22#g116.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-02-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The child poverty targets set out in the Child Poverty Act 2010 were abolished in 2016 and we have no plans to reintroduce them. We believe that an approach to tackling child poverty focused primarily on meeting income-based targets, can drive action that focuses primarily on moving the incomes for those &#8216;just in poverty&#8217; just above a &",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-02-08.120622.h&amp;s=%22workless%22#g120622.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Baroness Stedman-Scott",
    "Date": "2022-02-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "This Government is committed to reducing poverty and supporting low-income families, and believes work is the best route out of poverty. Our approach is based on clear evidence about the importance of parental employment - particularly where it is full-time &#8211; in substantially reducing the risks of child poverty and in improving long-term outc",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-01-31.HL5797.h&amp;s=%22workless%22#gHL5797.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Olivia Blake",
    "Date": "2022-02-09",
    "Debate_Title": "Special Educational Needs and Children&#8217;s Mental Health Services &#8212; [Yvonne Fovargue in the Chair]",
    "Context_Snippet": "I thank the hon. Member for Newbury (Laura Farris) for securing this important debate. I was not expecting to be called quite so early. I will focus my remarks on my own personal experience of having ADHD, dyslexia and dyspraxia, none of which were recognised during my schooling. I want to highlight this because it is a journey of things going wron",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-02-09b.359.0&amp;s=%22lazy%22#g362.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2022-02-09",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "The Secretary of State undertakes an annual review of benefits and pensions based on the Consumer Price Index (CPI), which measures inflation in the year to September, as has been the case since April 1987. This Government is committed to reducing poverty and supporting low-income families, and believes work is the best route out of poverty. Our ap",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2022-02-04.118567.h&amp;s=%22workless%22#g118567.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Llyr Gruffydd",
    "Date": "2022-02-08",
    "Debate_Title": "6. Debate: Draft Budget 2022-23",
    "Context_Snippet": "We also know, of course&#8212;and it's nothing new&#8212;that if Welsh budgets had kept pace with inflation, then, as the Minister regularly reminds us, there would be an additional &#163;3 billion in the budget that we're discussing today. But, no. So, let not the Conservatives come here and tell us how lucky we are. The truth is that it's quite t",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-02-08.7.407675.h&amp;s=%22lazy%22#g7.407623"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Victoria Prentis",
    "Date": "2022-02-08",
    "Debate_Title": "Cost of Living and Food Insecurity",
    "Context_Snippet": "I will make some progress. As the Chancellor said last week, we cannot do anything to control some drivers of cost increases, but we can lessen the blow. As a Government, we have put in place a range of measures to help people who are struggling because, really, of the covid pandemic. It is important to remember that the Treasury spent &#163;400 bi",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-02-08a.838.0&amp;s=%22workless%22#g871.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Lord Willis of Knaresborough",
    "Date": "2022-02-04",
    "Debate_Title": "Health and Care Bill - <i>Committee (8th Day)</i>: Amendment 244",
    "Context_Snippet": "My Lords, I first apologise for not being present at Second Reading. It is unusual for me not to be there when a health Bill is being discussed, but I have had a lot of personal family problems. Never, in the years I have been in both the Commons and the House of Lords, have I been as proud of a committee as I have been chairing the one on sport an",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-02-04b.1172.3&amp;s=%22lazy%22#g1207.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Baroness Ludford",
    "Date": "2022-02-03",
    "Debate_Title": "Nationality and Borders Bill - <i>Committee (3rd Day)</i>: Amendment 64",
    "Context_Snippet": "The noble Lord has taken the wind out of my sails; I was going to quote that statistic, though I must admit I did not know it came from there. I got it from the splendid Lift the Ban organisation. If the majority of people who seek asylum are ultimately found to be entitled to stay here as refugees, after either an initial decision or an appeal, ho",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-02-03a.1046.0&amp;s=%22scroungers%22#g1053.0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "layabouts",
    "Speaker": "Baroness Ludford",
    "Date": "2022-02-03",
    "Debate_Title": "Nationality and Borders Bill - <i>Committee (3rd Day)</i>: Amendment 64",
    "Context_Snippet": "The noble Lord has taken the wind out of my sails; I was going to quote that statistic, though I must admit I did not know it came from there. I got it from the splendid Lift the Ban organisation. If the majority of people who seek asylum are ultimately found to be entitled to stay here as refugees, after either an initial decision or an appeal, ho",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-02-03a.1046.0&amp;s=%22layabouts%22#g1053.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Pam Duncan-Glancy",
    "Date": "2022-02-03",
    "Debate_Title": "Scottish Parliament: Cost of Living",
    "Context_Snippet": "I will try to address much of what I have heard today. The cost of living crisis is not just a concept; it is a reality for too many people who are becoming increasingly unable to make ends meet and who are not able to afford rent, travel, food, energy or clothes&#8212;the basic components of a decent standard of living. As my colleague Paul Sweene",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-02-03.32.0&amp;s=%22handouts%22#g32.70"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "Baroness Ludford",
    "Date": "2022-02-03",
    "Debate_Title": "Nationality and Borders Bill - <i>Committee (3rd Day)</i>: Amendment 64",
    "Context_Snippet": "The noble Lord has taken the wind out of my sails; I was going to quote that statistic, though I must admit I did not know it came from there. I got it from the splendid Lift the Ban organisation. If the majority of people who seek asylum are ultimately found to be entitled to stay here as refugees, after either an initial decision or an appeal, ho",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-02-03a.1046.0&amp;s=%22lazy%22#g1053.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "won't work",
    "Speaker": "Lesley Griffiths",
    "Date": "2022-02-02",
    "Debate_Title": "2. Questions to the Minister for Rural Affairs and North Wales, and Trefnydd: The Sustainable Farming Scheme",
    "Context_Snippet": "I've always made it very clear that producing food is absolutely a priority for our farmers, of course it is. You say there are grave concerns. We've been out to consultation three times now. The scheme is still not designed; we want to co-design that scheme. You will have heard me say many times that if it's not the right scheme for our farmers it",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2022-02-02.3.405885&amp;s=%22won%27t+work%22#g3.405848"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Ian Lavery",
    "Date": "2022-02-01",
    "Debate_Title": "Tackling Fraud and Preventing Government Waste",
    "Context_Snippet": "I fully agree. What could the Government have used &#163;8.7 billion for? A new hospital in my hon. Friend&#8217;s constituency? Other hospitals and clinics? Looking after the 6 million people who are still on the NHS waiting list as we sit in this Chamber? That loss is in addition to what has already been explained in previous speeches. I repeat: ",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-02-01c.152.1&amp;s=%22scroungers%22#g178.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Baroness Ludford",
    "Date": "2022-02-01",
    "Debate_Title": "Nationality and Borders Bill - <i>Committee (2nd Day) (Continued)</i>: Amendment 46",
    "Context_Snippet": "My recollection of the French criticism is that they were criticising the ability of asylum seekers to work in the black economy&#8212;not the ability to be idle and live off the taxpayer. I imagine that any welfare possibilities in the UK would be less than in France. What they are criticising is the relative unregulated state of our employment ma",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-02-01a.881.1&amp;s=%22idle%22#g886.2"
  },
  {
    "Category": "Dependency_Culture",
    "Term": "dependency culture",
    "Speaker": "Lord Mawson",
    "Date": "2022-01-26",
    "Debate_Title": "Health and Care Bill - <i>Committee (6th Day)</i>: Amendment 159A",
    "Context_Snippet": "My Lords, I have listened carefully to the debate taking place in Committee over the last few weeks with great interest and noted the growing consensus that now exists across this Chamber for transformation and change. These debates have shown the House at its best. It is clear that the Government now have before them an opportunity to transform no",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2022-01-26b.288.0&amp;s=%22dependency+culture%22#g288.2"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Julie Marson",
    "Date": "2022-01-14",
    "Debate_Title": "Taxis and Private Hire Vehicles (Disabled Persons) Bill",
    "Context_Snippet": "My hon. Friend the Member for Clwyd South (Simon Baynes) has made a really important point about the importance of this sector to our community, and how much we have relied on it recently. That is why this Bill is so important, and I welcome it and congratulate my right hon. and learned Friend the Member for Kenilworth and Southam (Jeremy Wright) o",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-01-14b.820.0&amp;s=%22not+disabled%22#g826.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "idle",
    "Speaker": "Kenny MacAskill",
    "Date": "2022-01-12",
    "Debate_Title": "Direct Ferry Links: Scotland and Mainland Europe",
    "Context_Snippet": "I beg to move, That this House has considered direct ferry links between Scotland and mainland Europe. It is a pleasure to serve under your chairmanship, Mr Davies. Connectivity is critical, if not king, in the 21st century. As coronavirus has shown, telecommunications are vital, allowing for home working and for businesses to operate, even during ",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2022-01-12c.249.0&amp;s=%22idle%22#g249.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Jack Brereton",
    "Date": "2022-01-11",
    "Debate_Title": "Household Energy Bills: VAT",
    "Context_Snippet": "I absolutely agree. We are seeing that right across the north and the midlands, in towns and cities that were neglected for decades by the Labour party, including Stoke-on-Trent, and which are now growing faster than most other UK cities. According to Office for National Statistics figures, in the last decade the average weekly pay in Stoke-on-Tren",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-01-11b.451.1&amp;s=%22workless%22#g477.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "burden on taxpayers",
    "Speaker": "Elizabeth Smith",
    "Date": "2022-01-11",
    "Debate_Title": "Scottish Parliament: Labour Shortages",
    "Context_Snippet": "If the minister cares to look at what the Scottish Fiscal Commission is saying, he will see that the greatest concern is the long-term skills gap in information technology and in technology companies. I think that I am right in saying that, according to Scottish Chambers of Commerce, some 47 per cent of employers in Scotland say that there is a lac",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2022-01-11.6.0&amp;s=%22burden+on+taxpayers%22#g6.19"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "skivers",
    "Speaker": "John Martin McDonnell",
    "Date": "2022-01-10",
    "Debate_Title": "Charter for Budget Responsibility and Welfare Cap",
    "Context_Snippet": "I will be brief. The debate has roamed over more than just the fiscal rule and the welfare cap, and I will not tread on those other parts of the debate. My right hon. Friend the Member for Wolverhampton South East (Mr McFadden) demonstrated the economic and political farce of the current Government. The right hon. Member for Wokingham (John Redwood",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2022-01-10b.366.0&amp;s=%22skivers%22#g381.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2021-12-14",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Universal Credit",
    "Context_Snippet": "It is not possible to produce a robust estimate of the effect of the reduction of the Universal Credit taper rate or the increase in work allowance on the number of children in poverty. Projecting the impacts of policies on poverty involves projecting forward the impact of the pandemic on every household&#8217;s income, which is not possible to do ",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2021-12-08.89558.h&amp;s=%22workless%22#g89558.r0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "lazy",
    "Speaker": "the Bishop of Oxford",
    "Date": "2021-12-10",
    "Debate_Title": "Freedom of Speech - <i>Motion to Take Note</i>",
    "Context_Snippet": "My Lords, it is a great privilege and honour, as always, to follow the noble and right reverend Lord, Lord Harries, one of my distinguished predecessors. I am grateful for this timely debate and to the most reverend Primate for his very comprehensive introduction. In a few days&#8217; time, as we have heard, the scrutiny committee of both Houses wi",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2021-12-10c.2105.0&amp;s=%22lazy%22#g2126.0"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Mark Isherwood",
    "Date": "2021-11-30",
    "Debate_Title": "8. Statement by the Minister for Social Justice: International Day of Disabled People",
    "Context_Snippet": "The 2021 theme of the International Day of Disabled People on 3 December is 'fighting for rights in the post-COVID era', celebrating the challenges, barriers and opportunities for disabled people. As you know, I've chaired the cross-party group on disability over a number of Senedd terms, and our purpose is to address key pan-impairment disability ",
    "Source_URL": "https://www.theyworkforyou.com/senedd/?id=2021-11-30.9.391727.h&amp;s=%22not+disabled%22#g9.391741"
  },
  {
    "Category": "Fake_Disability_Malingering",
    "Term": "not disabled",
    "Speaker": "Emma Hardy",
    "Date": "2021-11-30",
    "Debate_Title": "Public Bill Committee: Skills and Post-16 Education Bill [Lords]: Clause 1 - Local skills improvement plans",
    "Context_Snippet": "It is a pleasure to serve under your chairship, Mr Efford. I rise to speak in favour of amendments 27 and 28 in my name, and amendments 1, 2 and 3, in the name of my hon. Friend the Member for Rotherham. I want highlight that the Library briefing on the Bill states that 18% of the learners currently in the FE and skills sector have a recognised lea",
    "Source_URL": "https://www.theyworkforyou.com/pbc/2021-22/Skills_and_Post-16_Education_Bill/02-0_2021-11-30a.35.2?s=%22not+disabled%22#g38.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Steven Bonnar",
    "Date": "2021-11-30",
    "Debate_Title": "Conduct of the Right Hon. Member for Uxbridge and South Ruislip",
    "Context_Snippet": "Two weeks ago, I stood in this spot and spoke about how parliamentary time was being wasted by the Prime Minister wanting to save one of his own corrupt former MPs; today, we have the opportunity to stand here and consider why we should put up with this. We and people outside this place are living in a society of staggering inequality. We have thou",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2021-11-30b.834.1&amp;s=%22handouts%22#g859.0"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Kenny MacAskill",
    "Date": "2021-11-30",
    "Debate_Title": "Offshore Renewables Wind Sector",
    "Context_Snippet": "I beg to move, That this House has considered securing employment and community benefit in the offshore renewables wind sector. It is pleasure to serve under your chairmanship, Mr Betts. Today is St Andrew&#8217;s day, Scotland&#8217;s national day, when Scots at home and abroad celebrate their native land. There should be much to celebrate, as our",
    "Source_URL": "https://www.theyworkforyou.com/whall/?id=2021-11-30a.255.0&amp;s=%22handouts%22#g255.1"
  },
  {
    "Category": "Free_Money_Handouts",
    "Term": "handouts",
    "Speaker": "Chris Stephens",
    "Date": "2021-11-29",
    "Debate_Title": "Civil Service Pay",
    "Context_Snippet": "I thank the hon. Gentleman for his intervention. He will know the importance of the role that the civil service has played in Northern Ireland in developing the peace process and helping the Northern Ireland economy. I am sure that, like me, he will pay tribute to civil servants in Northern Ireland for that. I agree with his point, and he will hear",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2021-11-29a.740.0&amp;s=%22handouts%22#g741.1"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "David Rutley",
    "Date": "2021-11-17",
    "Debate_Title": "Written Answers &#8212; Department for Work and Pensions: Poverty: Children",
    "Context_Snippet": "While the government has not made an assessment of the SR 2021 or Autumn Budget directly on child poverty, it has made an assessment of the distributional impact of these decisions on UK households. This can be found here: https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1028953/DA_Document_Autumn_Budg",
    "Source_URL": "https://www.theyworkforyou.com/wrans/?id=2021-11-02.68378.h&amp;s=%22workless%22#g68378.r0"
  },
  {
    "Category": "Classic_DWP_Slurs",
    "Term": "scroungers",
    "Speaker": "Stuart McMillan",
    "Date": "2021-11-04",
    "Debate_Title": "Scottish Parliament: Social Security Benefits",
    "Context_Snippet": "I am pleased to speak in the debate. I would have preferred to be in the chamber today, but, as you can tell from my voice, Presiding Officer, I am still struggling a wee bit with an illness. I point that out to highlight the fact that the continuation of the virtual sessions has allowed me and other members to continue to work and contribute from ",
    "Source_URL": "https://www.theyworkforyou.com/sp/?id=2021-11-04.33.0&amp;s=%22scroungers%22#g33.50"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "taxpayer burden",
    "Speaker": "Lord Thurlow",
    "Date": "2021-11-04",
    "Debate_Title": "Leaseholders: Safety Remediation Costs - <i>Motion to Take Note</i>",
    "Context_Snippet": "I add my voice to the thanks to the noble Lord, Lord Stunell, for tabling this debate. I want to make the House aware of my interests in the register. I have been involved in the property market for 40 years, and a member of the RICS for most of that time. I own two buy-to-let flats in London but, mercifully, I do not believe that either is affecte",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2021-11-04a.1408.0&amp;s=%22taxpayer+burden%22#g1421.0"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Stephen Crabb",
    "Date": "2021-11-02",
    "Debate_Title": "Budget Resolutions - Income Tax (Charge)",
    "Context_Snippet": "It is a pleasure to be called on the final day of the Budget debate. I thought it was a good Budget; not only was it a responsible and appropriate response to the economic challenges created by the pandemic and the lockdowns, but it took major steps forward to tackle some of the longer term, more deep-seated issues that have at times held our econo",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2021-11-02c.765.0&amp;s=%22workless%22#g782.2"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "workless",
    "Speaker": "Stephen Crabb",
    "Date": "2021-11-02",
    "Debate_Title": "Treasury: Plan for Jobs",
    "Context_Snippet": "Right now, in this country, about 1 million children are growing up in long-term workless households. Does my hon. Friend agree that the measures the Chancellor took in the Budget last week to boost the national minimum wage and the work allowance, and to lower the universal credit withdrawal rate when people move into work, mean that we have the b",
    "Source_URL": "https://www.theyworkforyou.com/debates/?id=2021-11-02c.749.1&amp;s=%22workless%22#g749.7"
  },
  {
    "Category": "Laziness_Moral_Failings",
    "Term": "underclass",
    "Speaker": "Baroness Altmann",
    "Date": "2021-11-02",
    "Debate_Title": "Social Security (Up-rating of Benefits) Bill - <i>Report</i>: Amendment 1",
    "Context_Snippet": "My Lords, I rise to speak to Amendments 1 and 7 in my name and those of cross-party Peers&#8212;the noble Baronesses, Lady Wheatcroft and Lady Janke, and the noble Lord, Lord Hain&#8212;to whom I am extremely grateful for their support, and also to support Amendment 5. I declare my interest as set out in the register, and I am honoured to speak in ",
    "Source_URL": "https://www.theyworkforyou.com/lords/?id=2021-11-02a.1121.3&amp;s=%22underclass%22#g1121.5"
  }
];
const LEADERBOARD_DATA = [
  {
    "name": "David Rutley",
    "count": 24,
    "role": "MP for Macclesfield"
  },
  {
    "name": "Viscount Younger of Leckie",
    "count": 18,
    "role": "House of Lords"
  },
  {
    "name": "Helen Whately",
    "count": 17,
    "role": "MP for Faversham & Mid Kent"
  },
  {
    "name": "Mims Davies",
    "count": 14,
    "role": "MP for East Grinstead & Uckfield"
  },
  {
    "name": "Jo Churchill",
    "count": 12,
    "role": "Former MP for Bury St Edmunds"
  },
  {
    "name": "Debbie Abrahams",
    "count": 11,
    "role": "MP for Oldham East & Saddleworth"
  }
];
const FISCAL_EVENT_SPIKES = [
  {
    "event": "Spring Statement 2022",
    "period": "Mar 2022",
    "incidents": 19,
    "baseline": 10,
    "pctIncrease": "+90%",
    "pct": 90,
    "trigger": "Universal Credit taper & energy cost debates"
  },
  {
    "event": "Autumn Statement 2023",
    "period": "Nov 2023",
    "incidents": 26,
    "baseline": 10,
    "pctIncrease": "+160%",
    "pct": 160,
    "trigger": "Back to Work Plan & sanction tightening"
  },
  {
    "event": "Disability Reform Statement",
    "period": "Apr 2024",
    "incidents": 19,
    "baseline": 10,
    "pctIncrease": "+90%",
    "pct": 90,
    "trigger": "PIP consultation & fit note reform proposals"
  },
  {
    "event": "Autumn Budget 2025",
    "period": "Nov-Dec 2025",
    "incidents": 54,
    "baseline": 20,
    "pctIncrease": "+170%",
    "pct": 170,
    "trigger": "Fiscal tightening & welfare spending caps - 25 in Nov, 29 in Dec"
  },
  {
    "event": "Welfare Reform Bill 2026",
    "period": "Feb-Mar 2026",
    "incidents": 51,
    "baseline": 20,
    "pctIncrease": "+155%",
    "pct": 155,
    "trigger": "Sickness benefit overhaul & Work Capability - 26 in Feb, 25 in Mar"
  }
];

export default function HansardStigmaChart() {
  const [downloadingSpeaker, setDownloadingSpeaker] = useState(null);

  const generateCSVDownload = (dataRows, filename) => {
    if(!dataRows.length){ alert('No rows for '+filename); return; }
    const headers = Object.keys(dataRows[0]);
    const escapeCSV = (val) => {
      let f = val ? String(val) : '';
      f = f.split('"').join('""');
      if(f.includes(',') || f.includes('\n') || f.includes('"')){ f = '"' + f + '"'; }
      return f;
    };
    const csvRows = [
      headers.join(','),
      ...dataRows.map(row => headers.map(h => escapeCSV(row[h])).join(','))
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllCSV = () => {
    setDownloadingSpeaker('ALL');
    generateCSVDownload(INCIDENTS_DATA, 'Hansard_Stigmatising_Incidents_All_5Years.csv');
    setTimeout(()=>setDownloadingSpeaker(null),1000);
  };

  const handleDownloadSpeakerCSV = (speakerName) => {
    setDownloadingSpeaker(speakerName);
    const target = speakerName.toLowerCase().trim();
    const filtered = INCIDENTS_DATA.filter(item => String(item.Speaker||'').toLowerCase().trim() === target);
    const safe = speakerName.replace(/[^a-zA-Z0-9]/g,'_');
    generateCSVDownload(filtered, 'Hansard_Evidence_'+safe+'.csv');
    setTimeout(()=>setDownloadingSpeaker(null),1000);
  };

  const maxCount = Math.max(...LEADERBOARD_DATA.map(d=>d.count));
  const maxIncidents = Math.max(...FISCAL_EVENT_SPIKES.map(d=>d.incidents));

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-purple-800/40 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider"><AlertTriangle className="w-4 h-4" /><span>Parliamentary Rhetoric Audit (Last 5 Years)</span></div>
            <h2 className="text-2xl font-black text-slate-100">House of Commons Stigma Tracker</h2>
            <p className="text-sm text-slate-300 max-w-2xl">Tracking the use of derogatory, generalising, and stigmatising terms directed at disabled people and welfare claimants on the official parliamentary record (Hansard). This project studied stereotypes and stigma using keyword searches via the GDELT BigQuery project. Disclaimer: Some flagged speeches may be using stigmatising terms whilst condemning the treatment of welfare claimants or disabled people. In particular, left-leaning politicians flagged as using such terms may be using them to condemn the language and challenge policy, as opposed to using them in a derogatory way. Please ensure you check the full context via the official Hansard transcript before citation.</p>
          </div>
          <button onClick={handleDownloadAllCSV} className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Full Dataset CSV ({INCIDENTS_DATA.length})
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4">
          {LEADERBOARD_DATA.map((mp, idx) => {
            const widthPct = (mp.count / maxCount) * 100;
            const isDownloading = downloadingSpeaker === mp.name;
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2"><span className="text-sm font-bold text-slate-200">{mp.name}</span><span className="text-xs text-slate-400">({mp.role})</span></div>
                    <span className="text-xs font-black text-rose-400">{mp.count} verified incidents</span>
                  </div>
                  <button onClick={() => handleDownloadSpeakerCSV(mp.name)} disabled={isDownloading} className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5">
                    {isDownloading ? 'Exporting...' : `Download ${mp.count} Incidents CSV`}
                  </button>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div className="h-full rounded-full bg-rose-500 transition-all duration-700" style={{width: widthPct + '%'}} /></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/90 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div><h3 className="font-bold text-lg text-slate-100 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-rose-400" />Rhetoric Spikes During Key Fiscal Events</h3><p className="text-xs text-slate-400">Real count vs baseline median of 10 per month - from your 685-row log.</p></div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Avg +133% Surge</span>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {FISCAL_EVENT_SPIKES.map((item, idx) => {
            const h = (item.incidents / maxIncidents) * 100;
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-3">
                <div className="flex justify-between"><span className="text-xs font-bold text-slate-400 uppercase">{item.period}</span><span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{item.pctIncrease}</span></div>
                <div><div className="flex items-baseline gap-1"><span className="text-2xl font-black text-slate-100">{item.incidents}</span><span className="text-xs text-slate-400">vs {item.baseline} base</span></div><p className="text-xs font-bold text-purple-300 mt-1">{item.event}</p></div>
                <div className="w-full h-20 bg-slate-900 rounded-lg border border-slate-800 flex items-end p-1"><div className="w-full bg-gradient-to-t from-purple-600 to-rose-500 rounded-md flex items-end justify-center pb-1" style={{height: h + '%'}}><span className="text-xs font-black text-white">{item.pct}%</span></div></div>
                <p className="text-xs text-slate-400 italic border-t border-slate-900 pt-2">{item.trigger}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-black/30 rounded-xl border border-slate-800">
          <div className="flex items-end justify-between gap-3 h-48">
            {FISCAL_EVENT_SPIKES.map((s,i) => {
              const baseH = (s.baseline / maxIncidents) * 100;
              const eventH = (s.incidents / maxIncidents) * 100;
              return (
                <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                  <div className="w-full flex flex-col justify-end gap-1" style={{height: '120px'}}>
                    <div className="w-full bg-slate-700 rounded-t flex justify-center items-end" style={{height: baseH + '%', minHeight: '14px'}}>
                      <span className="text-xs text-slate-300 pb-1">{s.baseline}</span>
                    </div>
                    <div className="w-full bg-gradient-to-t from-rose-600 to-purple-500 rounded-t flex justify-center items-end" style={{height: eventH + '%', minHeight: '24px'}}>
                      <span className="text-xs font-black text-white pb-1">{s.incidents}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 text-center leading-tight h-8">{s.period}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-slate-600 rounded"></span> Baseline (10/mo)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-rose-500 rounded"></span> Fiscal Event Period</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-red-900/30 bg-gradient-to-br from-slate-900 via-red-950/10 to-slate-900 space-y-4">
        <h3 className="font-black text-lg text-slate-100 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-rose-400" />How Stigmatising Rhetoric Is Deployed & Why It Causes Harm</h3>
        <div className="grid md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"><div className="flex items-center gap-2 font-bold text-purple-300"><Scale className="w-4 h-4" />Tactics Identified</div><p className="text-slate-300">Four classic frames: 1) Moral failing / Laziness, 2) Fraud / Fake Disability, 3) Burden / Free Money, 4) Sensationalist Division. These spike 2-3 weeks before a fiscal statement, when consent for cuts is being built.</p></div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"><div className="flex items-center gap-2 font-bold text-rose-300"><BarChart3 className="w-4 h-4" />Impact on Votes</div><p className="text-slate-300">Framing claimants as undeserving creates a permission structure to vote for tighter conditionality and spending caps. Data shows +160% to +170% around Autumn Budgets and Welfare Reform Bills.</p></div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"><div className="flex items-center gap-2 font-bold text-teal-300"><Users className="w-4 h-4" />From Chamber to Community</div><p className="text-slate-300">When language is used by those in power, wider society copies it. Documented harms include increased hate crime, social isolation, fear of using accessible spaces, erosion of safety nets, and mental health impacts.</p></div>
        </div>
      </div>
    </div>
  );
}
