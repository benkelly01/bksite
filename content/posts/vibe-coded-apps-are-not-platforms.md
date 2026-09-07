---
title: "A working app is not a platform"
date: 2026-09-07
description: "AI has commoditised the first draft of an app. The value has moved to the platform underneath, and to the people who know how to build it. On shops in fields, shopping centres, and the city that makes them possible."
tags: ["ai", "engineering", "platforms", "opinion"]
draft: false
---

There is a growing belief that anyone can now build software. Describe what you want to Replit, Lovable, Cursor or whichever tool is trending this month, and a few minutes later you have something that runs, with a login page, a database and a front end that, honestly, looks good.

I don't have a problem with the tools. I use them every day and they are incredibly useful. What bothers me is what people conclude from the experience. Having produced something that works, they believe they now understand what building software involves, and most of them don't, because the gap between what they have made and what it takes to run something in production is almost entirely invisible from where they are standing. I've been thinking about this a lot while working with a client recently, where I was reminded again (as if I needed reminding) just how difficult and involved it is to get an application or service to production, even with AI doing a lot of the typing.

It also reminded me how much I lean on the people around me when the platform gets complex. Nobody carries all of this in one head, and I am lucky to work alongside some very talented engineers, [John Barber](https://www.linkedin.com/in/john-barber-a6214126/) in particular, who make the hard parts look easier than they are.

## A shop in a field

A vibe coded app is like a shop you built yourself. You can open the doors and take money, it is a real shop, and that is a genuine achievement you should be pleased with. But it is standing in the middle of a field, and you don't own the field. You do not control the road that leads to it, the power that runs to it, or the terms under which you are allowed to keep trading there. The platform you built on can change its pricing, deprecate the thing you depend on, or disappear.

Even if you did own the field, you would not know what you were going to need or when you were going to need it. Parking, deliveries, what happens when a hundred people turn up at once, what happens when someone tries to break in. You find out about each of these by it going wrong, and by then the shop is full of customers.

A platform is a shopping centre in the middle of a city. The centre is the thing people see and use. The city is everything that makes it possible. Roads, power, water, drainage, police, fire, planning, and the people who show up at night to fix things. None of it is glamorous, and all of it is what allows a business to open its doors on Monday and reasonably expect them to still be open on Friday.

The shopfront is the part people see. AI is now good at producing a plausible one, but a genuinely good one still takes experience and taste, and that is a craft in its own right. I am not saying this part is easy. What I am saying is that a shop with no city around it is a one off, and a one off is not a product. The city is what turns "I opened a shop" into "we can open shops, consistently and repeatedly, and keep them open". Opening one of something is usually the easy part. Doing it again, reliably, is not.

In software terms, the city is the supporting infrastructure. Source control and code review. Consistent and reliable build pipelines. Environments that are separate from each other. Identity and access. Secrets management. Networking. Backups that have actually been restored at least once. Logging, metrics, alerting. Runbooks. On call. Change management. Cost control. Compliance. Someone whose job it is to know how all of this fits together. The non-functionals.

Very little (if any!) of that appears when you ask an AI to build you an app. That isn't because the AI is bad at it. It's because you didn't ask, and you didn't ask because you didn't know it was a thing you could ask for.

And even if you do know to ask, knowing the name of a thing is not the same as knowing what a good one looks like. Should the backups be hourly or daily, and for how long? Which alerts matter at 3AM and which are noise? What does changing the network do to the build pipeline? How does this piece connect to the five others it has to work with? Every one of those is a judgement call with trade offs on either side, and every one of them has knock on effects somewhere else in the platform. The AI will happily give you an answer to all of them, and the answer will sound confident. What it can't give you is the taste and experience to know whether it's the right answer for you, which is the glue that actually holds a platform together.

What that glue looks like in practice, and how I go about laying it, is a topic for its own post. This one is about why it matters. The how is coming.

## Cool, it works. Now what?

Let's say the app is built, it functions, and people are starting to use it. This is where the harder questions start, and the tool is not going to raise any of them for you.

**How does it scale?** The prototype worked for you and three colleagues. What happens at a thousand users? Ten thousand? Where is the database, and what happens when it fills up, or worse, fails entirely? What happens when your customers are in three countries and the law in each one says their data stays put? One city has quietly become several, and now the roads between them have to work too.

**How is it secured?** Who can see what? Is the data encrypted, and where are the keys? Has anyone tested it against the sort of input a hostile actor would send rather than the sort a friendly demo would? Is there a way to revoke access when someone leaves?

**Who owns the code?** Not in the copyright sense (although that's important too!), in the practical one. Can you take it somewhere else? Is it in a repository you control, or in a workspace on someone else's service? If that service raises its prices tenfold next year, what's your move?

**Who maintains it?** Dependencies rot. Platforms deprecate APIs. Browsers change. Someone has to keep the thing running, and that someone needs to understand it well enough to change it safely. If the answer is "I will ask the AI again", you are betting that the next generated change does not quietly break the last one.

**What happens at 3AM?** It will break. Everything does. When it does, who gets alerted, how do they know what went wrong, and how do they fix it without making it worse? If nobody is on the other end of that alert, the answer is that the shop stays shut until someone notices.

None of these are edge cases. This is the job, and getting a first version working is the start of it rather than the end.

## The value has moved to experience and judgement

Which brings me to the part I think most people are missing. A passable version of the functional app, the front of shop, the thing users see and click on, is being commoditised. When anyone can produce one in an afternoon, producing one stops being where the value is. That isn't a loss, it's just what commoditisation does, it pushes the value somewhere else.

Where it has gone is underneath, but not quite where you might expect. It is tempting to say the value now sits in the infrastructure, and some of it definitely does. But infrastructure is being commoditised too. Managed databases, serverless, hosting platforms and AI assisted operations mean a great deal of the city can now be rented rather than built. And the parts that still have to be built are getting cheaper as well. AI will write Terraform far faster than I can, and I have been writing it for years. But speed of generation was never the bottleneck. Every line of that Terraform sits on top of decisions that were made before it was written. How the accounts are structured, where the network boundaries sit, what talks to what, what is allowed to fail and what is not. Get those right and the code is almost incidental. Get them wrong and no amount of fast, well formatted Terraform will save you, because it is faithfully building the wrong thing.

I have seen a lot of heavily AI generated infrastructure now and yes, it works. It also gets in a mess really quickly if you're not careful. Each change makes sense on its own and the whole thing slowly stops making sense, because the tool is answering the question in front of it without knowing about the twenty decisions that were made before it, in other conversations, by other people, on other teams. Someone has to know that, and it needs to be a person. What cannot be rented, or generated, is the judgement, knowing which parts to rent and which to build, what a good one looks like, what the trade offs are, and how the pieces fit together. That, and the experience needed to take a plausible first draft and make it good, is where the value has gone. Neither was ever cheap. AI has just made the difference obvious by making the first draft nearly free.

## You can rewire your own house

Most people are capable of changing a light fitting or wiring a socket. The information is freely available, the tools are cheap, and the job is not complicated. Almost nobody rewires their own house.

That isn't because they are incapable. It is because a professional has the test equipment, knows the regulations, has the experience to notice that the wiring behind the wall is thirty years old and about to become a problem while they are in there, and the time to give it their full attention. You have other things to do. The professional isn't valuable because they can do something you can't. They're valuable because they will do it properly, every time, and they will notice the things you would not have known to look for.

You can, in principle, vibe code your way towards reliability and scale. People are trying. What they find is that it costs a great deal of time and money to rediscover, one outage at a time, the things an experienced engineer already knows. The cheaper answer is the same as with the house. Get a professional in. And this is what the "AI replaces engineers" crowd has backwards. That professional is now supercharged by the same tools. The person who already understands the city can use AI to build it faster than ever. My belief, and it is a belief rather than something I can prove, is that the tools do not close the gap between amateur and professional. They widen it. They raise the floor for everyone, but they raise the ceiling most for the people who already know what they are looking at.

That professional has the battle scars, the depth and breadth of experience that only comes from having run things in production. Mix that with AI and you can deliver something great. They also know what to watch for when working with AI. It will confidently lead you down strange paths, and if you cannot recognise a trap when you see one, you will walk straight into it. This is where experience saves enormous amounts of time and effort, and it is the one thing the tools cannot generate for you.

The other thing experience buys you is someone who will tell you no. Not every problem needs a platform, and a professional worth paying is one who will say so, point you at the thing you should buy instead, and save you from building the city you were never going to need. I will write more about that another time, because it matters more than most people realise.

## Why build it at all?

There is a second kind of DIY thinking worth calling out. Yes, you could now build your own to-do app, project tracker or CRM. The tools make it feel almost free. But why would you?

Building it is the smallest part. You then own the hosting, the backups, the security patches, the logins, the exports, the mobile version, the integrations with the other tools your team already uses, and every bug your colleagues find at the worst possible moment. Meanwhile, for a few quid a month, you could pay a company that has spent thousands of hours building and shaping exactly that product, and has already learnt every one of those lessons, usually the hard way.

Yes, that is also a field you do not own. The difference is who is on the hook when it breaks. With a vibe coded app it is you, at 3AM, with no idea where to start. With a paid service it is a company with a contract, a status page and an on call rota, whose business depends on fixing it. You aren't avoiding dependence, you're choosing to depend on someone whose job it is.

You think you can do better than that? Maybe. But be honest about the odds. That company's entire business is this one app. Yours is not. Every hour spent maintaining a home grown CRM is an hour not spent on whatever it is your business actually does.

As before, none of this applies to a proof of concept or an experiment. Build those freely, vibe away! Nor does it apply to the large middle ground of small, low stakes internal tools. The rota generator, the report formatter, the thing that saves one team an hour a week. Businesses have always relied on tools like that, and plenty of them run happily for years with nobody on call. The test is what happens when it breaks, and what it holds, rather than whether someone relies on it. If the honest answer to the first is "someone is mildly annoyed until Monday", build it. If the answer involves customers, money or the law, that is where the cost of DIY shows up, and that is what this post is about.

The second half of that test catches people out. The rota generator holds names, shifts and maybe availability, which is personal data about employees. The moment an app holds anything that ought to be kept secure, it brings a raft of questions with it. Who can access it? Where is it stored? Is it encrypted? How long is it kept, and how is it deleted? What does the law in your jurisdiction say about all of that? What would you do if it leaked? A low stakes tool with high stakes data in it is not a low stakes tool.

## What these tools are actually good for

None of this is an argument against the tools. They are excellent for proofs of concept, for internal utilities, for exploring an idea before committing real effort to it, and for letting someone with domain knowledge but no engineering background show rather than tell what they want. That last one alone is worth a great deal.

The problem is only ever confusing one thing for the other. A proof of concept isn't a product, and a product isn't a platform, and the tools have made the first step so easy that it has become hard to see there are any further steps at all.

## Wrapping up

AI code generation will not put engineers out of work. I, for one, am busier than ever! It has, however, made the first draft much cheaper and left everything after it mostly where it was. When the first draft is close to free, the value moves to everything after it. The city, the platform, and the people who know how to build them.

I am aware that an infrastructure engineer writing "hire an infrastructure engineer" is not exactly a neutral witness, so weigh that as you see fit. But the argument does not rest on a job title. It rests on what happens at 3AM or when the auditors turn up.

This post is the why. In future posts I will get into the how, how I actually work with these tools day to day, and how I go about building the city underneath an application, piece by piece, so that the shop stays open.

If you have built something with these tools and it works, that is genuinely good. Just be honest about what you have. A shop in a field. Before you promise to open a hundred more, find the people who know how to build the city around them. It takes a village to build a city, and that is no small task. It never was.
