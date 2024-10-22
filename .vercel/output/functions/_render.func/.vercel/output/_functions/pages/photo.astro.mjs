/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro } from '../chunks/astro/server_n6-e6VbM.mjs';
import { $ as $$Layout } from '../chunks/Layout_C1GBpSxu.mjs';
import { g as getCldImageUrl, $ as $$OriginalImageSection } from '../chunks/OriginalImageSection_C_6krNsV.mjs';
import $$ImageContainer from '../chunks/ImageContainer_DipIXeyW.mjs';
/* empty css                                 */
import { RiFolderDownloadFill } from 'react-icons/ri';
import { GoHomeFill } from 'react-icons/go';
import { FaRepeat } from 'react-icons/fa6';
export { renderers } from '../renderers.mjs';

const getFormatedStory = (character) => {
  const main_character = character;
  const stories = [
    {
      title: "The Haunted Mansion's Dark Secret",
      paragraphs: [
        {
          index_image: 0,
          text: `It was a cold, eerie night when ${main_character} decided to explore the old abandoned mansion at the edge of town. The villagers had always warned about the place, saying that it was cursed, haunted by spirits who never found peace.`
        },
        {
          index_image: null,
          text: `When ${main_character} approached the mansion, the wind howled through the dead trees, and the full moon cast eerie shadows on the broken windows. But ${main_character} was determined. With a deep breath, ${main_character} pushed open the heavy wooden door. It creaked loudly, as if warning ${main_character} to turn back.`
        },
        {
          index_image: null,
          text: `Inside, the air was stale, and the floor creaked under each step. The rooms were filled with old, decaying furniture, covered in thick layers of dust. As ${main_character} walked deeper into the mansion, an unsettling feeling of being watched grew stronger.`
        },
        {
          index_image: 1,
          text: `Suddenly, a loud crash echoed through the halls. Startled, ${main_character} turned to see a mirror had fallen off the wall. But in the broken shards, a reflection appeared—it wasn't ${main_character}'s face. It was the face of something much older, much darker. A ghostly figure, with hollow eyes and a sinister grin, stared back at ${main_character}.`
        },
        {
          index_image: null,
          text: `Panicked, ${main_character} ran, but the mansion seemed to stretch endlessly. Every door led to another dark room, and every hallway twisted and turned in ways that made no sense. The whispers began then, soft at first, calling ${main_character}'s name, urging ${main_character} to stay. "Join us," they whispered.`
        },
        {
          index_image: null,
          text: `Just as ${main_character} thought there was no escape, a hidden door appeared in the wall. Without thinking, ${main_character} opened it and rushed inside, slamming it shut. The room was small, filled with old books and strange symbols on the walls. In the center of the room, there was an old chest.`
        },
        {
          index_image: 2,
          text: `Trembling, ${main_character} opened the chest, only to find a letter. The letter warned that anyone who entered the mansion would never leave unless they made a pact with the spirits. But the price was high—${main_character}'s freedom or someone else's soul.`
        },
        {
          index_image: null,
          text: `With no other choice, ${main_character} faced the decision: to make the pact or try to escape the cursed mansion, knowing that the spirits would never stop hunting.`
        },
        {
          index_image: null,
          text: `The whispers grew louder. Time was running out. What would ${main_character} choose?`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "A old abandoned mansion at the edge of winter town"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "Inside an dark old abandoned mansion with a ghostly figure staring"
        },
        {
          effects: ["cartoonify", "grayscale"],
          time_day: "early morning",
          prompt: "Inside an dark old abandoned mansion with letter over an old table"
        }
      ]
    },
    {
      title: "The Phantom of the Clock Tower",
      paragraphs: [
        {
          index_image: 0,
          text: `Every year, on the eve of Halloween, ${main_character} would hear the faint chimes of the old clock tower, even though the tower had been abandoned for decades. Legend said that a phantom roamed its halls, forever trapped by time.`
        },
        {
          index_image: null,
          text: `${main_character} ventured into the tower just as the sun disappeared. The gears of the clock lay still—yet the chimes continued to echo.`
        },
        {
          index_image: 1,
          text: `As ${main_character} climbed the stairs, strange whispers filled the air. At the top, a figure appeared—shrouded in mist, staring with hollow eyes. "Free me," it whispered.`
        },
        {
          index_image: null,
          text: `The clock struck midnight. Time was running out for ${main_character} to decide—free the spirit, or leave before becoming trapped in time forever.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "An eerie old clock tower standing tall under a full moon"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "Inside a dark clock tower with a misty phantom figure near the clock gears"
        }
      ]
    },
    {
      title: "The Cursed Pumpkin Patch",
      paragraphs: [
        {
          index_image: 0,
          text: `In a quiet village, there was a pumpkin patch that no one visited after dark. But ${main_character}, drawn by curiosity, entered the field on a cold autumn night.`
        },
        {
          index_image: null,
          text: `The pumpkins glowed under the moonlight, and shadows seemed to twist around ${main_character}. Then, one pumpkin split open, revealing something dark and sinister inside.`
        },
        {
          index_image: 1,
          text: `From the pumpkin emerged a spectral figure, its hollow eyes locking onto ${main_character}. "You’ve entered my cursed patch," it hissed.`
        },
        {
          index_image: null,
          text: `Surrounded by cursed pumpkins, ${main_character} had to escape before being bound to the eerie patch forever.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "A glowing eerie pumpkin patch under a full moon"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A ghostly figure emerging from a split pumpkin in a haunted pumpkin field"
        }
      ]
    },
    {
      title: "The Witch’s Lantern",
      paragraphs: [
        {
          index_image: 0,
          text: `In a deep, dark forest, ${main_character} stumbled upon an eerie lantern that glowed with unnatural light. Legends said it belonged to a witch who captured lost souls.`
        },
        {
          index_image: null,
          text: `The forest seemed to twist and shift as ${main_character} held the lantern. Suddenly, a witch appeared, her glowing eyes fixated on ${main_character}.`
        },
        {
          index_image: 1,
          text: `"Return my lantern, or your soul will be mine," the witch hissed.`
        },
        {
          index_image: null,
          text: `${main_character} had to race against time to find the lantern's resting place before the curse bound them forever.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "An eerie glowing lantern hanging in a dark enchanted forest"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A witch with glowing eyes in a haunted forest reaching for a cursed lantern"
        }
      ]
    },
    {
      title: "The Ghost Ship of Blackwater Bay",
      paragraphs: [
        {
          index_image: 0,
          text: `On a foggy Halloween night, ${main_character} sailed into Blackwater Bay, where legends spoke of a ghost ship that haunted its waters.`
        },
        {
          index_image: null,
          text: `Through the mist, ${main_character} saw the decaying outline of the ship, its torn sails flapping in the wind. The sound of chains rattled from below deck.`
        },
        {
          index_image: 1,
          text: `Suddenly, shadowy figures appeared on the ship, calling out for ${main_character} to join them on their eternal voyage through cursed seas.`
        },
        {
          index_image: null,
          text: `Trapped on the ghostly ship, ${main_character} had to find a way to escape or be lost at sea forever.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "A ghostly pirate ship sailing in foggy waters under the moonlight"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "Shadowy figures on the deck of a haunted ship with tattered sails"
        }
      ]
    },
    {
      title: "The Whispering Forest",
      paragraphs: [
        {
          index_image: 0,
          text: `It was said that no one who entered the Whispering Forest ever returned. The trees themselves were said to be alive, whispering secrets and luring people deeper into the woods. But ${main_character} didn’t believe the old legends. Determined to uncover the truth, ${main_character} ventured into the forest as the last light of day began to fade.`
        },
        {
          index_image: null,
          text: `The air grew colder as ${main_character} walked further, the trees towering overhead like silent guardians. Strange whispers began to fill the air, soft and indistinct at first, but growing louder with every step.`
        },
        {
          index_image: null,
          text: `The deeper ${main_character} went, the more the forest seemed to close in around them. The path twisted and turned, leading into unfamiliar territory. Suddenly, a figure appeared between the trees—a woman, pale and ethereal, her eyes glowing faintly in the twilight.`
        },
        {
          index_image: 1,
          text: `"You shouldn’t be here," she whispered, her voice blending with the wind. "The forest does not forgive trespassers." Before ${main_character} could respond, she vanished, leaving only the echo of her voice behind.`
        },
        {
          index_image: null,
          text: `Unease settled over ${main_character}, but turning back wasn’t an option now. The whispers grew louder, more insistent, calling ${main_character}'s name, urging ${main_character} to go deeper into the woods.`
        },
        {
          index_image: 2,
          text: `At last, ${main_character} reached a clearing, where an ancient stone altar stood, covered in moss and ivy. Strange symbols were etched into the stones, glowing faintly in the moonlight. It was here, the whispers said, that the forest’s curse had begun.`
        },
        {
          index_image: null,
          text: `The ground began to tremble, and the trees around the clearing swayed violently. From the shadows, figures emerged—spirits of those who had been lost to the forest’s curse. Their hollow eyes locked onto ${main_character}.`
        },
        {
          index_image: null,
          text: `"Join us," they whispered in unison. ${main_character} had to find a way to escape the clearing before being claimed by the forest's ancient evil. But the path back had disappeared, and the trees loomed ever closer.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "twilight",
          prompt: "A dark eerie forest with towering trees under a setting sun"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "An ethereal woman with glowing eyes appearing between the trees in a dark forest"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A stone altar in a moonlit forest clearing covered in ancient glowing symbols"
        }
      ]
    },
    {
      title: "The Shadow in the Mirror",
      paragraphs: [
        {
          index_image: 0,
          text: `There had always been something strange about the antique mirror that ${main_character} found in the attic. It was beautifully crafted, with ornate silver framing, but its surface seemed to shimmer unnaturally in the dim light. Curious, ${main_character} decided to bring it downstairs.`
        },
        {
          index_image: null,
          text: `As ${main_character} cleaned the mirror, they noticed something odd—a dark shape flickering in the reflection. At first, it seemed like a trick of the light, but as ${main_character} looked closer, the shadow took on the form of a person.`
        },
        {
          index_image: 1,
          text: `The figure was tall, cloaked in darkness, with glowing red eyes that stared back at ${main_character}. Startled, ${main_character} turned around, but the room was empty. The shadow was only in the mirror, watching.`
        },
        {
          index_image: null,
          text: `Unease crept over ${main_character}, but they couldn’t look away. The shadow began to move, pacing slowly within the confines of the glass. Then it spoke, its voice a low whisper: "I’ve been waiting for you."`
        },
        {
          index_image: 2,
          text: `The next few nights were filled with nightmares. ${main_character} would wake in a cold sweat, only to find the shadow watching them through the mirror. Each night, it seemed to get closer, its voice growing louder, more insistent. "Free me," it demanded.`
        },
        {
          index_image: null,
          text: `Desperate to rid themselves of the haunting, ${main_character} tried to cover the mirror, but the fabric was pulled away by invisible hands. Smashing the glass only made things worse. The shadow was no longer bound to the mirror—it was free, and it wanted revenge.`
        },
        {
          index_image: null,
          text: `Now, ${main_character} had to find a way to stop the vengeful spirit before it claimed them entirely. But how do you fight something that lives in the shadows?`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "evening",
          prompt: "An ornate antique mirror in a dimly lit attic"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A dark shadowy figure with glowing red eyes visible only in a mirror"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A haunted room with a shadowy figure approaching through a mirror"
        }
      ]
    },
    {
      title: "The Cemetery Keeper’s Secret",
      paragraphs: [
        {
          index_image: 0,
          text: `Every night, the cemetery gates closed at sunset, but ${main_character} noticed that the old cemetery keeper, Mr. Graves, always stayed behind. Curious, ${main_character} decided to follow him one Halloween night, keeping to the shadows as the moon rose high in the sky.`
        },
        {
          index_image: null,
          text: `Mr. Graves moved quickly through the cemetery, weaving between the headstones until he reached an old crypt that had long been sealed shut. But to ${main_character}'s surprise, he pulled a rusty key from his pocket and unlocked the door.`
        },
        {
          index_image: 1,
          text: `Inside, the crypt was cold and musty, its stone walls covered in strange markings. As Mr. Graves descended into the darkness, ${main_character} followed cautiously, their heart pounding.`
        },
        {
          index_image: null,
          text: `Deeper inside, the air grew thick with the scent of decay. At the bottom of the crypt, a small chamber awaited. In the center stood a stone altar, and surrounding it were dozens of old, weathered coffins.`
        },
        {
          index_image: 2,
          text: `Mr. Graves began to chant in a language ${main_character} didn’t understand. Slowly, the coffins began to tremble, their lids creaking open as the dead inside stirred.`
        },
        {
          index_image: null,
          text: `Terrified, ${main_character} tried to retreat, but it was too late. Mr. Graves turned, his eyes glowing with unnatural light. "You’ve seen too much," he hissed. "Now you must join them."`
        },
        {
          index_image: null,
          text: `As the undead began to rise, ${main_character} knew there was no escaping the crypt without a fight. But the cemetery was a place of ancient magic, and not everything dead stayed dead for long.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "An old overgrown cemetery under the moonlight"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "An eerie crypt with strange markings on the walls deep underground"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A stone altar surrounded by coffins with a glowing-eyed figure chanting"
        }
      ]
    }
  ];
  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
};

const getStory = (character) => {
  return getFormatedStory(character);
};

const getImagesGenerated = (story, id) => {
  if (id === null) return [];
  let results = [];
  story.images.forEach((image) => {
    let effects = { src: id };
    if (image.effects) {
      effects = {
        src: id,
        ...image.effects.reduce((obj, effect) => {
          obj[effect] = true;
          return obj;
        }, {})
      };
    }
    const url = getCldImageUrl({
      crop: {
        type: "fill",
        source: true
      },
      format: "auto",
      flags: "attachment",
      replaceBackground: image.prompt + " at " + image.time_day,
      ...effects
    });
    results.push(url);
  });
  console.log({ results });
  return results;
};

const $$Astro$1 = createAstro();
const $$StorySection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StorySection;
  const { id, name } = Astro2.props;
  const story = getStory(name);
  const { title, paragraphs } = story;
  const images = getImagesGenerated(story, id);
  return renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-[1200px]" data-astro-cid-wyxho7sb> <div id="story" class="bg-solid" data-astro-cid-wyxho7sb> <br data-astro-cid-wyxho7sb> <article class="mx-auto max-w-[1000px] gap-[20ox] flex flex-col justify-center" data-astro-cid-wyxho7sb> <h2 id="title-story" class="text-xl md:text-2xl text-center" data-astro-cid-wyxho7sb> ${title} </h2> ${paragraphs.map((paragraph) => {
    return renderTemplate`<p class="prose dark:prose-invert text-solid text-justify mx-auto my-5 text-lg" data-astro-cid-wyxho7sb> ${paragraph.text} </p>
          <div class="flex justify-center" data-astro-cid-wyxho7sb> ${paragraph.index_image !== null && //<ImageContainer server:defer id={id} url={url} />
    renderTemplate`${renderComponent($$result, "ImageContainer", $$ImageContainer, { "server:defer": true, "id": id, "url": images[paragraph.index_image], "server:component-directive": "defer", "server:component-path": "D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro", "server:component-export": "default", "data-astro-cid-wyxho7sb": true }, { "fallback": ($$result2) => renderTemplate`<div class="bg-fallback mx-auto w-[500px] h-[500px] rounded-2xl flex flex-col justify-center items-center" data-astro-cid-wyxho7sb> ${renderComponent($$result2, "l-quantum", "l-quantum", { "size": "55", "speed": "2.0", "color": "orange", "data-astro-cid-wyxho7sb": true })} <span data-astro-cid-wyxho7sb>Generating Image</span> </div>` })}`} </div>`;
  })} </article> <br data-astro-cid-wyxho7sb> </div> </section> `;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/StorySection.astro", void 0);

const $$OptionsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[1200px]"> <div class="w-full flex flex-col justify-center"> <div class="flex justify-center"> <button id="save-story" type="button" class="flex justify-center gap-2 items-center md:w-1/2 w-full h-[50px] p-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 transition duration-200 text-white rounded-xl">
Save Story
<span> ${renderComponent($$result, "RiFolderDownloadFill", RiFolderDownloadFill, { "color": "white", "size": 30 })} </span> </button> </div> <br> <div class="flex justify-center"> <button id="change-story" type="button" class="flex justify-center gap-2 items-center md:w-1/2 w-full h-[50px] p-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 transition duration-200 text-white rounded-xl">
Change Story
<span> ${renderComponent($$result, "FaRepeat", FaRepeat, { "color": "white", "size": 30 })} </span> </button> </div> <br> <div class="flex justify-center"> <a href="/" class="flex justify-center gap-2 items-center md:w-1/2 w-full h-[50px] p-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 transition duration-200 text-white rounded-xl">
Upload other image
<span> ${renderComponent($$result, "GoHomeFill", GoHomeFill, { "color": "white", "size": 30 })} </span> </a> </div> </div> </section> `;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/OptionsSection.astro", void 0);

const commonNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Charles",
  "Sarah",
  "Thomas",
  "Karen",
  "Christopher",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Margaret",
  "Donald",
  "Sandra",
  "Mark",
  "Ashley",
  "Paul",
  "Kimberly",
  "Steven",
  "Emily",
  "Andrew",
  "Donna",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Dorothy",
  "Kevin",
  "Carol",
  "Brian",
  "Amanda",
  "George",
  "Melissa",
  "Edward",
  "Deborah"
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * commonNames.length);
  return commonNames[randomIndex];
};

const $$Astro = createAstro();
const $$Photo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Photo;
  const { searchParams } = Astro2.url;
  const id = searchParams.get("id");
  if (id === null) return Astro2.redirect("/404?reason=ID");
  let name = searchParams.get("name");
  if (name === null) name = getRandomName();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "OriginalImageSection", $$OriginalImageSection, { "server:defer": true, "id": id, "server:component-directive": "defer", "server:component-path": "@components/OriginalImageSection.astro", "server:component-export": "default" })} ${renderComponent($$result2, "StorySection", $$StorySection, { "id": id, "name": name })} ${renderComponent($$result2, "OptionsSection", $$OptionsSection, {})} ` })}`;
}, "D:/Code/Astro/hackaton-cloudinary/src/pages/photo.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/pages/photo.astro";
const $$url = "/photo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Photo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
