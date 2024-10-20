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
          prompt: "Inside a dark clock tower, with a misty phantom figure near the clock gears"
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
          prompt: "A witch with glowing eyes in a haunted forest, reaching for a cursed lantern"
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
    }        
  ];

  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
}