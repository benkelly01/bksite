---
title: "A Working App Is Not a Platform"
date: 2026-09-06
description: "AI has commoditised the first draft of an app. The value has moved to the factory, the city, the platform underneath. On car factories, and why a shop in a field is not a shopping centre."
tags: ["ai", "engineering", "platforms", "opinion"]
draft: true
---

There is a growing belief that anyone can now build software. Describe what you want to Replit, Lovable, Cursor or whichever tool is trending this month, and a few minutes later you have something that runs. It has a login page. It stores data. It looks, honestly, pretty good.

The trouble is not that these tools produce nothing useful. They do. The trouble is what people conclude from the experience. Having produced something that works, they believe they now understand what building software involves. Most do not, and the gap between what they have made and what it takes to run something in production is almost entirely invisible to them. That gap is the subject of this post. It's something I've been thinking about a lot while working with a client recently, where I was reminded again just how difficult and involved it is to build production ready applications and services, even with AI.

## The value has moved

Here is the part that I think most people are missing. A passable version of the functional app, the front of shop, the thing users see and click on, is being commoditised. When anyone can produce one in an afternoon, producing one stops being where the value is. That is not a loss. It is what commoditisation always does, it pushes the value somewhere else.

Where it has gone is underneath. The value now sits in the platform and the infrastructure that let a functional app become a reliable service, and in the experience needed to take a plausible first draft and make it genuinely good. Neither of those was ever cheap. AI has just made the difference obvious by making the first draft nearly free.

## The thing that builds the thing

Think about building a car. With enough effort you could build one in your garage. It functions, it drives from A to B. That is a genuine achievement and you should be pleased with it.

Now build a hundred. Now build a thousand, all identical, all safe, all delivered on time. You are no longer building a car. You are building the thing that builds the thing. You need a factory, supply chains, tooling, quality control, testing rigs, people who know why the line stopped and how to start it again. The factory is the platform. It is what turns "I made one" into "we can make these, consistently and repeatedly". Building one of a thing is usually the easy part, scaling it is not.

A vibe coded app is the doors, the colour, the shape of the body. It is the part people see. AI is now good at producing a plausible version of it, but a genuinely good one still takes experience and taste, and that is a craft in its own right. The point is not that this part is easy. It is that a body without a factory is a one off. The factory is what turns it into a product, and there is no vibe coding your way to one.

## A shop in a field

The same idea from a different angle.

A vibe coded app is like a shop you built yourself. You can open the doors and take money, it's a real shop. But it is standing in the middle of a field, and you don't own the field. You do not control the road that leads to it, the power that runs to it, or the terms under which you are allowed to keep trading there. The platform you built on can change its pricing, deprecate the thing you depend on, or disappear.

Even if you did own the field, you would not know what you were going to need or when. Parking? Deliveries? What happens when a hundred people turn up at once? What happens when someone tries to break in? You find out by it going wrong, and by then the shop is full of customers.

A platform is a shopping centre in the middle of a city. The centre is the thing people see and use. The city is everything that makes it possible, roads, power, water, drainage, police, fire, planning, the people who show up at night to fix things. None of it is glamorous. All of it is what allows a business to open its doors on Monday and reasonably expect them to still be open on Friday.

In software terms, the city is the supporting infrastructure. Source control and code review. Consistent and reliable build pipelines. Environments that are separate from each other. Identity and access. Secrets management. Networking. Backups that have actually been restored at least once. Logging, metrics, alerting. Runbooks. On call. Change management. Cost control. Compliance. Someone whose job it is to know how all of this fits together. The non-functionals.

Very little (if any!) of that appears when you ask an AI to build you an app. Not because the AI is bad, but because you did not ask for it, and you did not ask for it because you did not know it existed.

And even if you do know to ask, knowing the name of a thing is not the same as knowing what a good one looks like. Should the backups be hourly or daily, and for how long? Which alerts matter at 3AM and which are noise? What does changing the network do to the build pipeline? How does this piece connect to the five others it has to work with? Every one of those is a judgement call with trade offs on either side, and every one of them has knock on effects somewhere else in the platform. The AI will happily give you an answer. What it cannot give you is the taste and the experience to know whether it is the right one for you, and that is the glue that holds a platform together.

## Cool, it works. Now what?

Let's say the app is built, it functions, and people are starting to use it. This is where the real questions begin, and they are questions the tool will not raise on your behalf.

**How does it scale?** The prototype worked for you and three colleagues. What happens at a thousand users? Ten thousand? Where is the database, and what happens when it fills up, or worse, fails entirely?

**How is it secured?** Who can see what? Is the data encrypted, and where are the keys? Has anyone tested it against the sort of input a hostile person would send rather than the sort a friendly demo would? Is there a way to revoke access when someone leaves?

**Who owns the code?** Not in the copyright sense, in the practical one. Can you take it somewhere else? Is it in a repository you control, or in a workspace on someone else's service? If that service raises its prices tenfold next year, what is your move?

**Who maintains it?** Dependencies rot. Platforms deprecate APIs. Browsers change. Someone has to keep the thing running, and that someone needs to understand it well enough to change it safely. If the answer is "I will ask the AI again", you are betting that the next generated change does not quietly break the last one.

**What happens at 3AM?** It will break, everything breaks. When it does, who gets alerted, how do they know what went wrong, and how do they fix it without making it worse? If nobody is on the other end of that alert, the answer is that the shop stays shut until someone notices.

These are not edge cases. They are the job. Getting a first version working is the start of it, not the end.

## You can service your own car

Most people are capable of changing their own oil. The information is freely available, the tools are cheap, and the job is not complicated. Almost nobody does it.

That isn't because they are incapable. It is because a professional has the lift, the torque wrench, the diagnostic reader, the experience to notice that the brake pads are nearly gone while they are under there, and the time to give it their full attention. You have other things to do. The value of the professional is not that they can do something you cannot. It is that they will do it properly, every time, and notice the things you would not have known to look for.

You can, in principle, vibe code your way towards reliability and scale. People are trying. What they find is that it costs a great deal of time and money to rediscover, one outage at a time, the things an experienced engineer already knows. The cheaper answer is the same as it is with the car: get a professional in. And here is the thing the "AI replaces engineers" crowd has backwards. That professional is now supercharged by the same tools. The person who already understands the factory can use AI to build it faster than ever. The tools do not close the gap between amateur and professional. They widen it.

That professional has the battle scars, the depth and breadth of experience that only comes from having run things in production. Mix that with AI and you can deliver something great. They also know what to watch for when working with AI. It will confidently lead you down strange paths, and if you cannot recognise a trap when you see one, you will walk straight into it. This is where experience saves enormous amounts of time and effort, and it is the one thing the tools cannot generate for you.

## What these tools are actually good for

None of this is an argument against the tools. I use them every day. They are excellent for proofs of concept, for internal utilities, for exploring an idea before committing real effort to it, and for letting someone with domain knowledge but no engineering background show rather than tell what they want. That last one alone is worth a great deal.

The problem is only ever the confusion of the first thing with the second. A proof of concept is not a product. A product is not a platform. The tools have made the first step so easy that it has become hard to see there are any further steps at all.

## Wrapping up

AI code generation will not put engineers out of work. I, for one, am busier than ever! It has, however, made the first draft much cheaper and left everything after it mostly where it was. When the first draft is close to free, the value moves to everything after it, the factory, the city, the platform, and the people who know how to build them.

If you have built something with these tools and it works, that is genuinely good. Just be honest about what you have, a car in a garage, a shop in a field. Before you promise to build a thousand of them, find someone who knows how to build a factory. That is no small task, and it never was.
