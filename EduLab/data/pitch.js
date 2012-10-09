lesson_data={
	"Reference":"Root",
	"Type":"Container",
	"Title": "Pitch Planning",
	"SkillLevels":[
		{"Name":"1-min Pitch","Image":"new.png"},
		{"Name":"3-min Pitch","Image":"dev.png"},
		{"Name":"5-min Pitch","Image":"fly.png"}
		],
	"Tasks":
	[
		{
			"Reference":"Brief",
			"Type":"Reading",
			"Title": "Introduction",
			"Instruction" : {
			"1-min Pitch": "<h2>1-minute pitching</h2><br/><p>A 1-minute pitch is an introduction to you, your idea, your business, whatever. It's very punchy, a minute is not long when you're talking, and it needs to be entertaining.</p>", 		
			"3-min Pitch":"<h2>3-minute pitching</h2><br/><p>A 3-minute pitch is an overview of your idea or plan, and an explanation of a challenge you're facing in achieving it.</p>",			
			"5-min Pitch":"<h2>5-minute pitching</h2><br/><p>A51-minute pitch is a concise summary of your idea and plan. It needs to cover the essentials but no more, and you need to be able to dsitill your subject down to the barest bones to communicate it effectively.</p><p>Creating a 5-minute pitch for a complicated subject is hard, but good practice. The essential thing to remember is that you're not trying to educate your audience, but interest them. If they're interested, they'll want to be educated later. Getting your audience interested is difficult, but if you can't interest them in 5 minutes, you won't interest them at all, and your business depends on people being interested"
			},
			"Navigation":[
				{"Ref":"Intro","Label":"The Introduction"}
			]
		},
		{
            "Reference":"Intro",
            "Type":"Writing",
            "Title":"The Introduction",
            "Instruction" : {
            "1-min Pitch":"<p>You have approximately 10 seconds to get across who you are and what you're talking about.</p><p>The obvious and most direct method is the 'AA Introduction': <q>Hi, my name's Whoever, I'm a Whichever and here to talk to you about Whatever</q></p><p>The less obvious and more risky approach is to start by addressing your problem: <q>So how many of you have a problem with your Whatevers? A few of you, that's good, because my name's Whoever and I'm here to talk about how we solve that for you</q></p>",        
            "3-min Pitch":"<p>Your introduction needs to mentally prepare your audience for the content you're about to give them. The plan here is to tell them what you're going to tell them, tell them it, then tell them what you told them.</p><p>So your introduction will tell them three things:<ul><li>who you are</li><li>what your background is</li><li>what you're going to talk to them about</li></ul>Your background is a simple, onle-line summary of how you're connected to your subject matter. e.g: <blockquote>My name's Whoever, I've been working in the Whatever industry for the past X years, and I've come up with a new way of doing Whatevers that I think will revolutionalise the Whatever industry and make everyone involved very rich'</blockquote></p>",           
            "5-min Pitch":"<p>Your introduction needs to mentally prepare your audience for the content you're about to give them. The plan here is to tell them what you're going to tell them, tell them it, then tell them what you told them.</p><p>So your introduction will tell them three things:<ul><li>who you are</li><li>what your background is </li><li>what you're going to talk to them about</li></ul>In a 5-minute pitch you've got time to quickly establish how you're connected to your subject matter and why your audience should be listening to you talk about it. e.g: <blockquote>My name's Whoever, I've been working in the Whatever industry for the past X years, and I've spotted a few problems in the way that the industry currently does Whatevers. I've come up with some solutions for those problems that will really go down well with the customers.</blockquote></p>"            
            },
            "Response":"Hi my name's _____ and I'm here today to talk to you about _____",
            "Navigation":[
                {"Ref":"Problem","Label":"Next: The Problem"}
            ]
 		},
         {
            "Reference":"Problem",
            "Type":"Writing",
            "Title":"The Problem",
            "Instruction" : {
            "1-min Pitch":"<p>In a 1-minute pitch you may not need to go over the problem</p><p>But if you do, remember to try and connect the problem to your audience. ",        
            "3-min Pitch":"<p>Your introduction needs to mentally prepare your audience for the content you're about to give them. The plan here is to tell them what you're going to tell them, tell them it, then tell them what you told them.</p><p>So your introduction will tell them three things:<ul><li>who you are</li><li>what your background is</li><li>what you're going to talk to them about</li></ul>Your background is a simple, onle-line summary of how you're connected to your subject matter. e.g: <blockquote>My name's Whoever, I've been working in the Whatever industry for the past X years, and I've come up with a new way of doing Whatevers that I think will revolutionalise the Whatever industry and make everyone involved very rich'</blockquote></p>",           
            "5-min Pitch":"<p>Your introduction needs to mentally prepare your audience for the content you're about to give them. The plan here is to tell them what you're going to tell them, tell them it, then tell them what you told them.</p><p>So your introduction will tell them three things:<ul><li>who you are</li><li>what your background is</li><li>what you're going to talk to them about</li></ul>Your background is a simple, onle-line summary of how you're connected to your subject matter. e.g: <blockquote>My name's Whoever, I've been working in the Whatever industry for the past X years, and I've come up with a new way of doing Whatevers that I think will revolutionalise the Whatever industry and make everyone involved very rich'</blockquote></p>"            
            },
            "Response":"",
            "Navigation":[
                {"Ref":"Solution","Label":"Next: The Solution"}
            ]
        },
        {
            "Reference":"Solution",
            "Type":"Writing",
            "Title":"The Solution",
            "Instruction" : {
            "1-min Pitch":"<p>In a 1-minute pitch your solution is the meat of your pitch </p><p>But if you do, remember to try and connect the problem to your audience. ",        
            "3-min Pitch":"<p>Solution</p>",           
            "5-min Pitch":"<p>Solution</p>"            
            },
            "Response":"Our solution to this  ",
            "Navigation":[
                {"Ref":"Problem","Label":"Next: The Problem"}
            ]
        },
		{
			"Reference":"Decode",
			"Type":"Container",
			"Title":"Decode the question",
			"Tasks":
			[
				{
					"Reference":"Decode1",
					"Type":"Writing",
					"Title":"Topic words",
					"Instruction" : {
					"Newbie":"<p>What is your question asking you to do? Your question tells you what to write about and how to write about it. So, read your question carefully and think about what it is asking you to do. </p><p>To do this, look at the KEY WORDS in the question. Most essay questions have two kinds of key words. Let's look at topic words first. There are TOPIC words. These words tell you the topic you are to write about. There are almost as many topic words in the world as there are words in the dictionary. That's a lot! Imagine that your essay question is 'Explain why teenagers like Facebook?', then the topic words are 'why', 'teenagers', 'like', and 'Facebook'. These words are the things you would write your essay about - why teenagers like Facebook. 'Explain' is not a topic word because it doesn't tell you the topic - it tells you what to do with it.</p><p>- Topic words short video embed</p>",						
					"Developing":"<p>What is your question asking you to do? Your question tells you what to write about and how to write about it. So, read the question carefully and think about what it is asking you to do. </p><p>To help you understand your question, you should look at the KEY WORDS in the question. Most essay questions have two kinds of key words. These are TOPIC words and TASK words. Let's first look at topic words. </p><p>Topic words tell you the topic or ISSUE that you are to write about. There are almost as many topic words in the world as there are words in the dictionary. That's a lot! Imagine that your essay question is 'Explain why celebrity magazines are so popular?'; then the topic words are 'why', 'celebrity', 'magazines' and 'popular'. These words are the things you would write your essay about. 'Explain' is not a topic word because it doesn't tell you the topic - it tells you what to do with the topic.</p><p>- Topic words short video embed</p>",							
					"Flying":"<p>What is your question asking you to do? Your question is very important because it tells you what to write about and how to write about it. Therefore, it is very important to read the question carefully and to think about what it is asking you to do. </p><p>To help you understand your question, carefully look at its KEY WORDS. Most essay questions have two types of key words. These are TOPIC (or issue) words and TASK (or command) words. Let's first look at topic words. </p><p>Topic words tell you the topic, ISSUE or subject matter that you are to write about. There are almost as many topic words in the world as there are words in the dictionary. That's a lot! Imagine that your essay question is, 'Celebrity magazines are very popular in our culture. Describe their history and explain what makes them so appealing.'.  The topic words in the question are 'celebrity magazines', 'are popular' 'in our culture', 'their history' 'makes them appealing'. These words are the things you would write your essay about - the history of celebrity magazines and their appeal to people.'Describe' and 'explain' are not topic words because these don't tell you the what the topic is - it tells you what to do with the topic - describe and explain</p><p>- Topic words short video embed</p>"
					},
					"Response":"Write the topic words of your question here...",
					"Navigation":[
						{"Ref":"TaskWords1","Label":"Finding the task words"}]
				},
				{
					"Reference":"TaskWords1",
					"Type":"Writing",
					"Title":"Task words",
					"Instruction" : {
					"Newbie":"<p>While topic words tell you what to write about, task words are words in the question that tell you how you should write about the topic, issue or subject matter. The task words tell you what your essay should do. Often used task words are: DESCRIBE, EXPLAIN, ARGUE and COMPARE. If your question is, 'Explain why teenagers like Facebook?' the task word is 'explain'. This task word tells you that you must explain the reasons why Facebook is popular with teenagers. If your question is, 'Describe what made the dinosaurs extinct', the task word is 'describe'. This tells you that you should list and describe the things that killed the dinosaurs.</p>",
					"Developing":"<p>While topic words tell you what to write about, task words are words tell you how you should write about the topic or issue. The task words tell you what your essay should do. Often used task words are: DESCRIBE, EXPLAIN, DISCUSS, ARGUE, COMPARE and ANALYSE. If your question is, 'Explain why celebrity magazines are so popular?' the task word is 'explain'. These task words tell you that you must explain the reasons why celebrity magazines are read by many people. If your question is, 'Describe what made the dinosaurs extinct', the task word is 'describe'. This tells you that you should list and describe the things that made dinosaurs extinct.</p>",
					"Flying":"<p>While topic words tell you what to write about, task words are words in the question that tell you how you should write about the topic, issue or subject matter. The task words tell you what your essay should do. Often used task words are: DESCRIBE, EXPLAIN, DISCUSS, ARGUE, COMPARE, JUSTIFY and ANALYSE. If your question is, 'Celebrity magazines are very popular in our culture. Describe their history and explain what makes them so appealing', then the task words are 'describe' and 'explain'. These task words tell you that you must describe the history of celebrity magazines and then explain some reasons they appeal to so many people. If your question is, 'Describe what made the dinosaurs extinct', the tasks word is 'describe'. This tells you that you should list and describe the things that made dinosaurs extinct. If the question did not contain a task word, like 'What made dinosaurs extinct?', then it is IMPLIED that you should describe the main reasons that dinosaurs became extinct</p>"
					},
					"Response":"Write the task word/s of your question here...",
					"Navigation":[
						{"Ref":"RestateQuestion","Label":"Restating the Question"}]
				},
				{
					"Reference":"RestateQuestion",
					"Type":"Writing",
					"Title":"Re-write your question",
					"Instruction" : {
					"Newbie":"<p>Now that you have thought about the topic and task words, it's time to think about and write down what your question is asking you to do. Practice re-writing the question in different ways and then write a sentence that describes what the question is asking you to do .</p><p>Restate the question short video embed.<p>",
					"Developing":"<p>Now that you have thought about the topic and task words, it's time to think carefully about what your question is asking you to do. Practice re-writing the question in as many different ways as you can and then write a sentence that describes what the question is asking you to do.</p><p>Restate the question short video embed.<p>",
					"Flying":"<p>Now that you have thought about the topic and task words, it's time to think carefully about just what exactly your question is asking you to do. Practice re-writing the question in as many different ways as you can and then write a sentence that describes what the question is asking you to do</p><p>Restate the question short video embed.<p>"
					},
					"Response":"This question is asking me to...",
					"Navigation":[
						{"Ref":"Opinions","Label":"Expressing your opinions"}]
				}
			]
		},
		{
			"Reference":"Ideas",
			"Type":"Writing",
			"Title":"My thoughts",
			"Instruction" : {
			"Newbie":"<p>If you want to be a good writer, you need to learn what good writers do. Before they write, many writers create a brainstorm of ideas they have about the topic they are going to write about. This helps them to think clearly about the topic, to come up with some strong ideas, and to sort through their ideas so they don't repeat them in their essay. Brainstorms can also help to answer the essay question. To begin thinking about the question and topic, ask these yourself these questions:</p><ul><li>What do I know for sure about the topic?</li><li>What do I sort of know about the topic?</li><li>What do I not know about the topic?</li><li>What is or what could be other people's opinions of the topic?</li><li>What is my opinion of the topic?</li><li>What is not known about the topic?</li></ul>Write down a list of thoughts that you have about the topic and essay question. You can use the above questions to help you.",
			"Developing":"<p>Before they write, many people create a brainstorm of ideas they have about the topic they are going to write about. This can help writers to think clearly about the topic, to come up with some strong ideas, to think about how strong their ideas are and then to decide what their main ideas will be. You can begin to think about the question and topic by asking yourself questions like:</p><ul><li>What do I know for sure about the topic?</li><li>What do I sort of know about the topic?</li><li>What do I not know about the topic?</li><li>What is or what could be other people's opinions of the topic?</li><li>What is my opinion of the topic?</li><li>What is not known about the topic?</li></ul>Write down a list of thoughts that you have about the topic and essay question. You can use the above questions to help you.",
			"Flying":"<p>Before they write, many effective writers create a brainstorm of ideas they have about the topic of their writing. This can help writers to think clearly about the topic, to come up with some strong ideas, to EVALUATE how strong their ideas sound, to organise where they will put their ideas in the essay, and to decide the order of their main ideas. Brainstorms can also help writers to answer the question that their writing seeks to answer. Teachers often complain that students have written great essays, but they have not answered the question. You can begin to think about the question and topic by asking yourself questions like:</p><ul><li>What do I know for sure about the topic?</li><li>What do I sort of know about the topic?</li><li>What do I not know about the topic?</li><li>What is or what could be other people's opinions of the topic?</li><li>What is my opinion of the topic?</li><li>What is not known about the topic?</li></ul>Write down a list of thoughts that you have about the topic and essay question. You can use the above questions to help you.<p>"
			},
			"Response":"I think...","Navigation":[
			{"Ref":"Thoughts","Label":"Writing your thoughts down"}]
		},

		{
			"Reference":"Thoughts",
			"Type":"Writing",
			"Title":"My big idea",
			"Instruction" : {
			"Newbie":"Now that you have thought about the question, you need to use these idea to plan your essay. One place to start is to create the 'big idea' that your essay says to the reader. Every good essay has a strong main idea. If you could write a one sentence answer to your essay question, what would it be?Think about it carefully! For example, if the essay question is 'Explain why teenagers like Facebook', my big idea may be 'Teenagers like Facebook because it keeps them connected with their friends'. I would then put this big idea at the beginning of my essay. All of my other points would link to this big idea. So, if you had to write an answer to your essay question in one sentence, and this sentence was your main idea, what would that sentence be? Remember, you can change this at any time.</p>",
			"Developing":"<p>Now that you have thought about the question, you need to begin using these ideas to plan your essay. It is your ideas that will make up the essay. One place to start is to create the 'big idea' that you want your writing to say. Every good essay has a strong main idea. What is going to be your big idea? How can you come up with this? If you could write a one sentence answer to your essay question, what would it be? Think about it carefully! For example, if you essay question is 'Explain why celebrity magazines are so popular', my big idea could be 'Celebrity magazines as popular because they enable people to escape their boring lives'.</p><p> In essay writing, we call this big idea the THESIS STATEMENT. A thesis statement is the main point that your essay makes. This is your essay's big idea! Your thesis statement should be a clearly written sentence found in the first paragraph of an essay. It tells the reader the main point the writer wants to make. All of the other ideas in the essay link to this big idea. So, if you had to write an answer to your essay question in one sentence, and this sentence was your main idea, what would that sentence be? Remember, you can change this at any time.</p>",
			"Flying":"<p>Now that you have thought about the question, you need to begin using these ideas and thoughts to plan your essay about the topic. It is your ideas that will comprise the essay. One place to start is to create the 'big idea' that you want your writing to express. Every effective essay has a strong main idea. How can you do this? If you could write a one sentence answer to your essay question, what would it be? Think about it carefully! For example, if you essay question is 'Explain why celebrity magazines are so popular', my big idea could be 'Celebrity magazines as popular because they enable people to escape their boring lives'.</p><p>In essay writing, we call this big idea a THESIS STATEMENT. A thesis statement is the main point that your essay seeks to make. This is your essay's big idea! Usually your thesis statement is a clearly written sentence, often found in the first paragraph of an essay. It clearly tells the reader from the outset the main point the writer wants to make in the essay. All of the other ideas in the essay support this thesis statement. So, if you had to write an answer to the essay question in one sentence, and this sentence was your main idea, what would that sentence be? Remember, you can change this at any time.</p>"
			},
			"Response":"I think...",
			"Navigation":[
			{"Ref":"Ideas1","Label":"Organise my essay"}]
		},
		{
			"Reference":"Ideas1",
			"Type":"Writing",
			"Title":"Organising my ideas",
			"Instruction" : {
			"Newbie":"<p>Too often people have OPINIONS and ideas but they can't explain why they have them. Or they can't give points to back them up. The key to a good essay is having a main idea and then points that support that main idea. So, for example, if you had to prove that 'Teenagers like Facebook because it keeps them connected with their friends', can you think of 3 good points, or find any evidence, to support this opinion? Sometimes you may be able to think of 3 strong ideas. Sometimes you may need to ask others. Sometimes you may need to RESEARCH things to support your ideas.</p><p>Image of structured framework</p><p>You need to write down 3 good points to support your big idea. You may have already written ideas down in your brainstorm. Your points need to be strong. Each of these points should make up one paragraph each in your essay. If you are not sure whether your points are good, share it with a partner or your teacher.<p/><p>Watch this short video embed.</p>",			
			"Developing":"<p>Too often people have OPINIONS and ideas but they cannot explain why they have them, or they cannot give powerful points to support them. To write a good essay, you need to have a main idea (your big idea) and then points or evidence that support that main idea. So, for example, if you had to prove that 'Celebrity magazines as popular because they enable people to escape their boring lives' can you think of 3 good points, or find any evidence, to support this opinion? Sometimes you may be able to think of 3 strong ideas. Sometimes you may need to ask others. Sometimes you may need to RESEARCH to support your ideas.</p><p>Image of structured framework</p><p>You need to think of, or find through researching, at least three good points to support your big idea. You may have already written these down in your brainstorm, or maybe you need to find EVIDENCE to support an idea. Your main points or evidence need to be strong. They need to sound convincing. Can you think of examples to support your ideas? Each of these points should make up one paragraph each in your essay. If you are not sure whether your points are good, share it with a partner or your teacher<p/><p>Watch this short video embed.</p>",
			"Flying":"<p>Too often people have OPINIONS and ideas but they cannot explain why they have them, or they cannot give powerful points to support them. To write an effective essay, you need to have a main idea (your thesis statement) and then points or evidence that support that main idea. So, for example, if you had to prove that 'Celebrity magazines as popular because they enable people to escape their boring lives' can you think of 3 good points, or find any evidence, to support this opinion? Sometimes you may be able to think of 3 strong ideas. Sometimes you may need to ask others. Sometimes you may need to RESEARCH to support your ideas.</p><p>Image of structured framework</p><p>You need to think of, or find through researching, at least three good points to support your big idea. You may have already written these down in your brainstorm, or maybe you need to find EVIDENCE to support an idea. Your main points or evidence need to be strong. They need to sound convincing. They should also be supported with examples or REASON. Each of these points should make up one paragraph each in your essay. If you are unsure whether your points are good, share it with a partner or your teacher and ask for their feedback.<p/><p>Watch this short video embed.</p>"
			},
			"Response":"Using full sentences, write your points here",
			"Navigation":[
				{"Ref":"Writing","Label":"Writing it down"}]
		},
		{
			"Reference":"Writing",
			"Title":"Writing it all down",
			"Type":"Container",
			"Tasks":
			[
				{
					"Reference":"Introduction",
					"Type":"Writing",
					"Title":"Writing the introduction",
					"Instruction" : {
					"Newbie":"<p>Now we need to put your ideas and points into an essay for others to read. This is your first go, so you can change  it at any time. Let�s DRAFT your essay using these 6 parts:</p><ul><li>Introduction (introduce your main idea)</li><li>Paragraph 1 (supporting point)</li><li>Paragraph 2 (supporting point)</li><li>Paragraph 3 (supporting point)</li><li>Paragraph 4 (other ideas optional)</li><li>Conclusion (sum up your ideas)</li<ul></p><p>An essay's INTRODUCTION is the first PARAGRAPH of the essay. The introduction tells the reader what your essay is about. It tells the reader your big idea. It answers the question. It should be about 4 to 6 sentences. After you have had a go at writing it, read it and ask yourself whether it tells the reader what your essay is about and what your main idea is.</p><p>Read some introduction here at the reference page</p>",
					"Developing":"<p>Now we need to put your ideas and supporting points into an essay for others to read. This is your first go, sod you can change and review it at any time. Let�s draft your essay using these 6 parts:</p><ul><li>Introduction (introduce your main idea)</li><li>Paragraph 1 (supporting point)</li><li>Paragraph 2 (supporting point)</li><li>Paragraph 3 (supporting point)</li><li>Paragraph 4 (other ideas optional)</li><li>Conclusion (sum up your ideas)</li<ul></p><p>An essay's INTRODUCTION is the opening PARAGRAPH of the essay. Your first paragraph should tell the reader what your essay is about and what your main idea is. It introduces your topic and your opinion in a short paragraph and should be about 4 to 6 sentences long. Try to make your introduction engaging for your reader, although make sure it contains your main point, your big idea - your reader will want to know what your essay is arguing or telling them. After you have written your introduction, read it and ask yourself whether a reader would know what your essay is about and what your main idea is. </p><p>Read some introductions here at the reference page</p>",
					"Flying":"<p>Now we need to organise your ideas, opinions and supporting points into an essay for others to read. This is only a draft and you can change and review your writing at any time. Let�s draft your essay using the following 6 parts:</p><ul><li>Introduction (introduce your main idea)</li><li>Paragraph 1 (supporting point/evidence)</li><li>Paragraph 2 (supporting point/evidence)</li><li>Paragraph 3 (supporting point/evidence)</li><li>Paragraph 4 (other ideas optional)</li><li>Conclusion (sum up your ideas)</li<ul></p><p>An essay's INTRODUCTION is the opening PARAGRAPH of the essay. Your first paragraph should tell the reader what your essay is about and what your main idea is. It introduces your topic and your opinion in a short paragraph and should be about 4 to 6 sentences long. Try to make your introduction engaging for your reader, although make sure it contains your main point, your big idea - your reader will want to know what your essay is arguing or telling them. After you have written your introduction, read it and ask yourself whether a reader would know what your essay is about and what your main idea is. </p><p>Read some introductions here at the reference page</p>"
					},
					"Response":"Write your introduction here...",
					"Navigation":[
						{"Ref":"Para1","Label":"Writing the first paragraph"}]
				},
				{
					"Reference":"Para1",
					"Type":"Writing",
					"Title":"Writing paragraph 1",
					"Instruction" : {
					"Newbie":"<p>The introduction is followed by 'body' PARAGRAPHS - this is the main part of your essay. It often has three or more paragraphs. Each paragraph makes a different point related to the main idea. Look at the ideas you wrote down earlier and choose one to write your first paragraph about.</p><p>Have your first point? Great, let's start writing your paragraph with a TOPIC SENTENCE. The topic sentence is a short sentence that tells your reader the first point you would like to make. The topic sentence tells your reader what your paragraph is about. After your topic sentence, you can add more sentences. These sentences explain your point in more detail, or provide examples related to your point. Read the following example paragraph as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p><p>Watch the video here on essay paragraphs</p>",
					"Developing":"<p>The introduction is followed by 'body' PARAGRAPHS - this is the body of your essay. The body often has three or more paragraphs. Each paragraph in your essay makes a different point. But each point supports your main idea. Often the strongest point goes into the first body paragraph. Look at the ideas you wrote down earlier and choose one to write your first paragraph about.</p><p>Have your first point? Great, let's start writing your paragraph with a TOPIC SENTENCE. This is a short sentence that tells your reader what your paragraph is about. Your topic sentence is a short sentence describing your first main point. After your topic sentence, you add more sentences. These can explain your point in more detail, or provide examples and evidence to support your point. Read the following example paragraph as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p><p>Watch the video here on essay paragraphs</p>",
					"Flying":"<p>The introduction is followed by 'body' PARAGRAPHS - this is referred to as the body of your essay. Each paragraph in your essay makes a different point in support of your main idea or opinion. Often the strongest point goes into your first paragraph. Look at the ideas you wrote down earlier and choose one to write your first paragraph about.</p><p>Once you have selected your first point, begin writing your paragraph with a TOPIC SENTENCE. This is a short sentence that tells your reader what your paragraph is about. In this case your topic sentence is a short sentence describing your first main point. Sometimes a topic sentence can be after the first sentence. After your topic sentence, you then add more sentences. These can explain your point in greater detail, or provide examples and evidence to support your point. Read the following example paragraph as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p><p>Watch the video here on essay paragraphs</p>"
					},
					"Response":"The first point I would like to make is...",
					"Navigation":[
						{"Ref":"Para2","Label":"Writing the second paragraph"}]
				},
				{
					"Reference":"Para2",
					"Type":"Writing",
					"Title":"Writing paragraph 2",
					"Instruction": {
					"Newbie":"<p>Your second paragraph should be made up of more than four sentences and it should make a point not covered in your first paragraph. The following example paragraph can be used as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p>",
					"Developing":"<p>Your second paragraph should be made up of more than four sentences and it should make a point not covered in your first paragraph. The following example paragraph can be used as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p>",					
					"Flying":"<p>Your second paragraph should consist of more than four sentences and it should make a point not covered in your first paragraph. The following example paragraph can be used as a guide</p><p>Year nines are the naughtiest group of students because they are not near the end of their schooling. When students in year 11 and 12 are at school they are starting to think about and plan their future. For many of these students, they want to get the best grades they can because this will help them get good jobs or help them get into TAFE or university. Year nines do not have that pressure on them yet, so many of them muck about.</p>"
					},					
					"Response":"Write your paragraph here...",
					"Navigation":[
						{"Ref":"Para3","Label":"Writing the third paragraph"}]
				},
				{
					"Reference":"Para3",
					"Type":"Writing",
					"Title":"Writing paragraph 3",
					"Instruction" : {
					"Newbie":"<p>Your third paragraph should make another point in support of your big idea</p>",
					"Developing":"<p>Your third paragraph should make another point in support of your big idea</p>",
					"Flying":"<p>Your third paragraph should make another point in support of your big idea</p>"
					},
					"Response":"Write your paragraph here...",
					"Navigation":[
						{"Ref":"Para4","Label":"Writing the counter point"}]
				},
				{
					"Reference":"Para4",
					"Type":"Writing",
					"Title":"Writing a counter point",
					"Instruction" : {
					"Newbie":"<p>You can write another paragraph here. You could also write an idea that goes against your main idea. This is called a counter-idea. The counter idea paragraph can come near the end of an essay. You don't need to have one. While you describe the counter idea you also explain why it is not a powerful, correct or valid point. If you are unsure, you could ask a partner what ideas could be made against your main idea.</p>",
					"Developing":"<p>Some essay writing is good because it recognises ideas or points that challenge the essay's main idea. These are called counter-arguments or counter-points because they counter, or go against, an idea. You don't need to have one. In this paragraph you can describe a point against your opinion. However, while you describe the counter idea you also explain why it is not a powerful or correct point. If you are unsure, you can ask a partner what points could be made against your main idea.</p>",
					"Flying":"<p>Some essay writing is effective because it recognises and anticipates other ideas or points that challenge the essay's main idea. These are called counter-arguments or counter-points because they counter, or go against, your opinion. The counter idea paragraph comes near the end of the essay. It is optional. In the counter-idea paragraph you describe a point against your opinion. Importantly, while you describe the counter idea you also explain why it is not a powerful, correct or valid point or opinion. If you are unsure, you can ask a partner what counter-argument could be made against your opinion.</p>"
					},
					"Response":"Many people disagree with the idea being made by this essay. Some people argue __ . However, this is not a strong point because ___ . ",
					"Navigation":[
						{"Ref":"Conclusion","Label":"Writing the conclusion"}]
				},
				{
					"Reference":"Conclusion",
					"Type":"Writing",
					"Title":"Writing the conclusion",
					"Instruction" : {
					"Newbie":"<p>Your essay should finish with a CONCLUSION. This is a paragraph that tells the reader one last time your main idea and the points you have made. It sums up your ideas. After reading it, your reader should think that you have made some very strong points. To write your conclusion, look over the main points you have made in your essay and re-write them in a 2 or 3 sentences sentences. Your last sentence should be interesting.</p>",
					"Developing":"<p>Your essay should finish with a CONCLUSION. This is a paragraph that  tells the reader one last time your main idea and the points you have made. it sums up your main ideas and leaves your reader thinking that you have made some very strong points. To write your conclusion, you should look over the main points you have made in your essay and re-write them in 2 or 3 sentences. Your last sentence should be  interesting.</p>",
					"Flying":"<p>Every essay should finish with a CONCLUSION. This is a paragraph that sums up your main ideas and leaves your reader thinking that you have made some very strong points. To do this, you should look over the main points you have made in your essay and re-state them in a few sentences. You may even mention the counter-argument and explain why that point was not compelling. Your final sentence should be thought-provoking and interesting, convincing the reader of your ideas</p>"
					},
					"Response":"Write your conclusion here...",
					"Navigation":[
						{"Ref":"Review","Label":"Review your completed essay"}]
				}
			]
		},
		{
			"Reference":"Review",
			"Type":"Review",
			"Title":"Review your completed essay",
			"ReviewList":["Introduction","Para1","Para2","Para3","Para4","Conclusion"],
			"Navigation":[
				{"Ref":"Introduction","Label":"Edit the Introduction"},
				{"Ref":"Para1","Label":"Edit the first paragraph"},
				{"Ref":"Para2","Label":"Edit the second paragraph"},
				{"Ref":"Para3","Label":"Edit the third paragraph"},
				{"Ref":"Para4","Label":"Edit the counter-point"},
				{"Ref":"Conclusion","Label":"Edit the conclusion"},
				{"Ref":"Submit","Label":"Submit your essay"}]
		},
		{
			"Reference":"Submit",
			"Type":"Submit",
			"Title":"Submit your essay",
			"Destination":"email to teacher@myschool.com.au"
		}
	],
	"References":
        [
            
            {
                "Name":"LoremIpsum",
                "Label":"Lorem Ipsum",
                "Icons":["./img/text.png"],
                "SearchWords":["lorem","ipsum","words","sample"],
                "Content":"<p class='refText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor eros, iaculis sit amet pulvinar id, scelerisque ac lorem. Lorem ipsum dolor sit amet, consectetur.</p>"
            }
        ]
    
}