/** Defense Fortifications research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["defense-fortifications"] = {
  "id": "defense-fortifications",
  "name": "Defense Fortifications",
  "slug": "defense-fortifications",
  "description": "Combat & Defense — Iron, Food, Gold, and Valor where used.",
  "resources": [
    "iron",
    "food",
    "gold",
    "valor"
  ],
  "hasCosts": true,
  "treeRows": [
    {
      "id": "row-1",
      "title": "Tier 1",
      "elements": [
        {
          "id": "extra-hospitals",
          "name": "Extra Hospitals",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": []
            }
          ]
        }
      ]
    },
    {
      "id": "row-2",
      "title": "Tier 2",
      "elements": [
        {
          "id": "hold-the-line-1",
          "name": "Hold the Line I",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-1",
          "name": "Counter Defense I",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-1",
          "name": "Solid Defense I",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "extra-hospitals",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-3",
      "title": "Tier 3",
      "elements": [
        {
          "id": "defense-fortifications",
          "name": "Defense Fortifications",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 11600000,
              "food": 11600000,
              "gold": 33600000,
              "valor": 400,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 6,
              "iron": 15700000,
              "food": 15700000,
              "gold": 47070000,
              "valor": 550,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 7,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 8,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 9,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 10,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                },
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 2
                },
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-4",
      "title": "Tier 4",
      "elements": [
        {
          "id": "infirmary-expansion-1",
          "name": "Infirmary Expansion I",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 2,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 3,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 4,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 5,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 6,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 7,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 8,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 9,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 10,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            }
          ]
        },
        {
          "id": "efficient-healing",
          "name": "Efficient Healing",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 2,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 3,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 4,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 5,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 6,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 7,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 8,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 9,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            },
            {
              "level": 10,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "defense-fortifications",
                  "minLevel": 7
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-5",
      "title": "Tier 5",
      "elements": [
        {
          "id": "hold-the-line-2",
          "name": "Hold the Line II",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-2",
          "name": "Counter Defense II",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-2",
          "name": "Solid Defense II",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 20417000,
              "food": 20417000,
              "gold": 61251100,
              "valor": 700,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 1
                },
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-6",
      "title": "Tier 6",
      "elements": [
        {
          "id": "resource-protection",
          "name": "Resource Protection",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 2,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 3,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 4,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 5,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 6,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 6
                },
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 6
                },
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 6
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-7",
      "title": "Tier 7",
      "elements": [
        {
          "id": "rapid-march-1",
          "name": "Rapid March I",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 25521300,
              "food": 25521300,
              "gold": 76563900,
              "valor": 900,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "resource-protection",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-8",
      "title": "Tier 8",
      "elements": [
        {
          "id": "hold-the-line-3",
          "name": "Hold the Line III",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 2,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 3,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 4,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 5,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 6,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-3",
          "name": "Counter Defense III",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 2,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 3,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 4,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 5,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 6,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-3",
          "name": "Solid Defense III",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 2,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 3,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 4,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 5,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 6,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 4
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-9",
      "title": "Tier 9",
      "elements": [
        {
          "id": "survival-skills",
          "name": "Survival Skills",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 31901600,
              "food": 31901600,
              "gold": 95704900,
              "valor": 1100,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 54232800,
              "food": 54232800,
              "gold": 162698400,
              "valor": 1850,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 75925900,
              "food": 75925900,
              "gold": 227777700,
              "valor": 2550,
              "requirements": [
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 1
                },
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                },
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
