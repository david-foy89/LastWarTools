/** Squad 1 research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["squad-1"] = {
  "id": "squad-1",
  "name": "Squad 1",
  "slug": "squad-1",
  "description": "Squad — Iron, Food, Gold, and Valor where used.",
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
          "id": "terminator-1",
          "name": "Terminator I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 45600,
              "food": 45600,
              "gold": 136700,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 72900,
              "food": 72900,
              "gold": 218700,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
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
          "id": "virus-resistance-1",
          "name": "Virus Resistance I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 45600,
              "food": 45600,
              "gold": 136700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 72900,
              "food": 72900,
              "gold": 218700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-1",
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
          "id": "assault-training-1",
          "name": "Assault Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 72900,
              "food": 72900,
              "gold": 218700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "formation-training-1",
          "name": "Formation Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 72900,
              "food": 72900,
              "gold": 218700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-1",
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
          "id": "survival-training-1",
          "name": "Survival Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 72900,
              "food": 72900,
              "gold": 218700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-1",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-1",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-1",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-1",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-1",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-1",
                  "minLevel": 2
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
          "id": "resource-reaper-1",
          "name": "Resource Reaper I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "power-boost-1",
          "name": "Power Boost I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 116600,
              "food": 116600,
              "gold": 349900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-1",
                  "minLevel": 2
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
          "id": "zombie-radar-1",
          "name": "Zombie Radar I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "assault-tactics-1",
          "name": "Assault Tactics I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "fast-exploration-1",
          "name": "Fast Exploration I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-1",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-1",
                  "minLevel": 2
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
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 140000,
              "food": 140000,
              "gold": 419900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-1",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-1",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-1",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-1",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-1",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-1",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-1",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-1",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-1",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-1",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-1",
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
          "id": "fierce-assault-1",
          "name": "Fierce Assault I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-1",
          "name": "Counter Defense I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-1",
                  "minLevel": 2
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
          "id": "vigilant-formation-1",
          "name": "Vigilant Formation I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-1",
          "name": "Solid Defense I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-10",
      "title": "Tier 10",
      "elements": [
        {
          "id": "final-stand-1",
          "name": "Final Stand I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "hold-the-line-1",
          "name": "Hold the Line I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 349900,
              "food": 349900,
              "gold": 1050000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-11",
      "title": "Tier 11",
      "elements": [
        {
          "id": "physical-suppression-1",
          "name": "Physical Suppression I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "energy-barrage-1",
          "name": "Energy Barrage I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 594900,
              "food": 594900,
              "gold": 1780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-1",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-12",
      "title": "Tier 12",
      "elements": [
        {
          "id": "fatal-strike-1",
          "name": "Fatal Strike I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 654400,
              "food": 654400,
              "gold": 1880000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-1",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-1",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-1",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-1",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-1",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
