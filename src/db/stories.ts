import type { Story } from "../models/types";

export const getFormatedStory = (character: string): Story => {
  const main_character = character;

  const stories: Story[] = [
    {
      title: 'The Haunted Mansion\'s Dark Secret',
      paragraphs: [
        {
          index_image: 0,
          text: `It was a cold, eerie night when ${main_character} decided to explore the old abandoned mansion at the edge of town. The villagers had always warned about the place, saying that it was cursed, haunted by spirits who never found peace.`,

        },
        {
          index_image: null,
          text: `When ${main_character} approached the mansion, the wind howled through the dead trees, and the full moon cast eerie shadows on the broken windows. But ${main_character} was determined. With a deep breath, ${main_character} pushed open the heavy wooden door. It creaked loudly, as if warning ${main_character} to turn back.`,

        },
        {
          index_image: null,
          text: `Inside, the air was stale, and the floor creaked under each step. The rooms were filled with old, decaying furniture, covered in thick layers of dust. As ${main_character} walked deeper into the mansion, an unsettling feeling of being watched grew stronger.`,

        },
        {
          index_image: 1,
          text: `Suddenly, a loud crash echoed through the halls. Startled, ${main_character} turned to see a mirror had fallen off the wall. But in the broken shards, a reflection appeared—it wasn't ${main_character}'s face. It was the face of something much older, much darker. A ghostly figure, with hollow eyes and a sinister grin, stared back at ${main_character}.`,

        },
        {
          index_image: null,
          text: `Panicked, ${main_character} ran, but the mansion seemed to stretch endlessly. Every door led to another dark room, and every hallway twisted and turned in ways that made no sense. The whispers began then, soft at first, calling ${main_character}'s name, urging ${main_character} to stay. "Join us," they whispered.`,

        },
        {
          index_image: null,
          text: `Just as ${main_character} thought there was no escape, a hidden door appeared in the wall. Without thinking, ${main_character} opened it and rushed inside, slamming it shut. The room was small, filled with old books and strange symbols on the walls. In the center of the room, there was an old chest.`,

        },
        {
          index_image: 2,
          text: `Trembling, ${main_character} opened the chest, only to find a letter. The letter warned that anyone who entered the mansion would never leave unless they made a pact with the spirits. But the price was high—${main_character}'s freedom or someone else's soul.`,

        },
        {
          index_image: null,
          text: `With no other choice, ${main_character} faced the decision: to make the pact or try to escape the cursed mansion, knowing that the spirits would never stop hunting.`,

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
        },
      ]
    }, {
      title: 'The Phantom of the Clock Tower',
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
    }, {
      title: 'The Cursed Pumpkin Patch',
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
    },  {
      title: 'The Witch’s Lantern',
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
    }, {
      title: 'The Ghost Ship of Blackwater Bay',
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
    }, {
      title: 'The Whispering Forest',
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
    }, {
      title: 'The Shadow in the Mirror',
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
          prompt: "An attic with a mirror that reflects the shadow of a ghost."
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A haunted room with a mirror reflecting a shadow gosh"
        }
      ]
    }, {
      title: 'The Cemetery Keeper’s Secret',
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
          prompt: "A crypt with strange markings on the walls deep underground."
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A stone altar surrounded by coffins with a glowing-eyed figure chanting"
        }
      ]
    }, {
      title: 'The Forgotten Carnival',
      paragraphs: [
        {
          index_image: 0,
          text: `It had been years since anyone had spoken about the carnival that mysteriously disappeared one Halloween night. But ${main_character} had always been curious, and when ${main_character} heard rumors that the carnival grounds had reappeared deep in the forest, the temptation was too strong to resist.`
        },
        {
          index_image: null,
          text: `As the sun set, ${main_character} ventured into the woods, following the faint sound of distant music. The trees parted to reveal the carnival—a twisted version of what it once was. The Ferris wheel stood crooked, its rusted metal creaking in the wind, and the merry-go-round spun slowly, though no one was on it.`
        },
        {
          index_image: 1,
          text: `The air was thick with the scent of popcorn and decay, and the lights of the carnival flickered erratically. ${main_character} approached the ticket booth, where an eerie clown sat slumped in a chair, its face frozen in a grotesque grin. "Welcome back," it whispered as ${main_character} reached for a ticket.`
        },
        {
          index_image: null,
          text: `Inside the carnival, everything felt wrong. The funhouse mirrors showed distorted reflections of ${main_character}, but in one of them, the reflection began to move independently. It smiled wickedly and reached out from the mirror.`
        },
        {
          index_image: null,
          text: `${main_character} ran, but the laughter of unseen performers followed. The carnival was a trap, its attractions designed to pull in curious souls. In the distance, the Ferris wheel began to turn, and ${main_character} knew there was no easy way out.`
        },
        {
          index_image: 2,
          text: `The lights began to dim, and a shadowy figure emerged from the funhouse, its eyes glowing with malevolent energy. "You’re the main act now," it hissed. The carnival had claimed many before ${main_character}, and now it wanted a new performer.`
        },
        {
          index_image: null,
          text: `The only way to escape was to find the heart of the carnival—the source of its cursed magic. But time was running out, and every path led deeper into the nightmare. Could ${main_character} break the spell before becoming a permanent part of the show?.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "A creepy abandoned carnival in the middle of the forest, with eerie flickering lights"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "An abandoned carnival with a grotesque clown sitting on a rusty ticket booth"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A house with an open door where a shadow emerges from it"
        }
      ]
    }, {
      title: 'The Witch’s Curse',
      paragraphs: [
        {
          index_image: 0,
          text: `Long ago, a powerful witch was banished from the village, but before she disappeared, she swore revenge. It was said that she placed a curse on anyone who dared to enter the forest where she had lived. But ${main_character}, driven by curiosity, couldn’t resist exploring the forbidden woods.`
        },
        {
          index_image: null,
          text: `As ${main_character} ventured deeper into the forest, the air grew thick with mist, and strange symbols appeared carved into the trees. The further ${main_character} walked, the quieter the world became, until the only sound was the crunch of leaves beneath ${main_character}'s feet.`
        },
        {
          index_image: 1,
          text: `Suddenly, the ground shifted beneath ${main_character}, revealing a hidden path that led to an ancient stone cottage, overgrown with vines and thorns. This was where the witch had lived, where her power still lingered.`
        },
        {
          index_image: null,
          text: `${main_character} felt a cold presence watching from the shadows. Inside the cottage, the walls were lined with jars of strange ingredients, and in the center of the room, a cauldron bubbled with a dark, ominous liquid.`
        },
        {
          index_image: 2,
          text: `A voice echoed through the air: "You’ve come to break the curse, haven’t you?" The witch's spirit appeared, her eyes glowing with unnatural light. "But the curse isn’t broken—it’s passed on." With a wave of her hand, the symbols on the trees began to glow.`
        },
        {
          index_image: null,
          text: `The forest twisted and shifted around ${main_character}, trapping ${main_character} within its cursed grasp. To escape, ${main_character} had to find a way to undo the witch’s magic, but time was running out, and the forest was closing in.`
        },
        {
          index_image: null,
          text: `The witch’s spirit watched from the shadows, waiting for ${main_character} to fail, so she could claim another soul for her cursed forest. Could ${main_character} break the ancient spell before becoming the witch’s next victim?`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "twilight",
          prompt: "A dense eerie forest with mist and strange glowing symbols carved into trees"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A dark forest with an old stone hut covered in vines"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A dark forest covered with vegetation with a ghost witch"
        }
      ]
    }, {
      title: 'The Catacombs Below',
      paragraphs: [
        {
          index_image: 0,
          text: `Underneath the ancient city lay the catacombs, a maze of tunnels where the dead were buried long ago. Few dared to venture into the depths, for it was said that the spirits of the dead still walked the dark passages. But ${main_character} had heard rumors of a treasure hidden deep within the catacombs and decided to brave the journey.`
        },
        {
          index_image: null,
          text: `The entrance to the catacombs was cold and silent, the air thick with the smell of damp stone. ${main_character} descended into the darkness, the narrow passageways lined with ancient bones and forgotten tombs. The deeper ${main_character} went, the more the air seemed to press down, as if the walls were closing in.`
        },
        {
          index_image: 1,
          text: `Suddenly, a soft whisper echoed through the tunnels, growing louder with each step. Shadows danced along the walls, moving without any source of light. ${main_character} realized they weren’t alone. Something was following, something that had been buried for centuries.`
        },
        {
          index_image: null,
          text: `The whispers turned to moans, and soon, the shadows took shape—phantom figures dressed in tattered robes, their eyes hollow and glowing faintly in the dark. They moved slowly, but with purpose, as if drawn to ${main_character}'s presence.`
        },
        {
          index_image: 2,
          text: `${main_character} quickened their pace, heart racing, but the catacombs seemed endless, twisting and turning in ways that defied logic. Just when it seemed there was no escape, ${main_character} stumbled upon an ancient chamber, where a massive stone door stood, covered in strange symbols.`
        },
        {
          index_image: null,
          text: `The treasure lay beyond the door, but so did something else—something much older and more dangerous than the spirits that haunted the tunnels. With the ghosts closing in, ${main_character} had to make a choice: open the door and risk whatever lay beyond, or turn back and face the wrath of the catacombs' restless dead.`
        },
        {
          index_image: null,
          text: `As the door began to creak open, the ground shook, and a deep, guttural voice whispered from the darkness: "You’ve awakened me." The catacombs had one final secret, and ${main_character} was about to uncover it.`
        }
      ],
      images: [
        {
          effects: [],
          time_day: "night",
          prompt: "A dark ancient catacomb filled with old bones and forgotten tombs"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "An ancient and dark catacomb with shadows of phantom figures"
        },
        {
          effects: [],
          time_day: "night",
          prompt: "A dark catacomb with an ancient stone door covered in strange glowing symbols"
        }
      ]
    }
    
  ];

  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
}