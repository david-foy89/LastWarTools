/** Squad 4 research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["squad-4"] = {
  "id": "squad-4",
  "name": "Squad 4",
  "slug": "squad-4",
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
          "id": "terminator-4",
          "name": "Terminator IV",
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
          "id": "virus-resistance-4",
          "name": "Virus Resistance IV",
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
                  "elementId": "terminator-4",
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
                  "elementId": "terminator-4",
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
                  "elementId": "terminator-4",
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
                  "elementId": "terminator-4",
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
                  "elementId": "terminator-4",
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
          "id": "assault-training-4",
          "name": "Assault Training IV",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "formation-training-4",
          "name": "Formation Training IV",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
                  "elementId": "virus-resistance-4",
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
          "id": "survival-training-4",
          "name": "Survival Training IV",
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
                  "elementId": "assault-training-4",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-4",
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
                  "elementId": "assault-training-4",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-4",
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
                  "elementId": "assault-training-4",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-4",
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
                  "elementId": "assault-training-4",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-4",
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
                  "elementId": "assault-training-4",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-4",
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
          "id": "resource-reaper-4",
          "name": "Resource Reaper IV",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "power-boost-4",
          "name": "Power Boost IV",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
                  "elementId": "survival-training-4",
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
          "id": "zombie-radar-4",
          "name": "Zombie Radar IV",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "assault-tactics-4",
          "name": "Assault Tactics IV",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "fast-exploration-4",
          "name": "Fast Exploration IV",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
                  "elementId": "resource-reaper-4",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-4",
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
          "id": "rapid-march-4",
          "name": "Rapid March IV",
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
                  "elementId": "zombie-radar-4",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-4",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-4",
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
                  "elementId": "zombie-radar-4",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-4",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-4",
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
                  "elementId": "zombie-radar-4",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-4",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-4",
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
                  "elementId": "zombie-radar-4",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-4",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-4",
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
                  "elementId": "zombie-radar-4",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-4",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-4",
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
          "id": "fierce-assault-4",
          "name": "Fierce Assault IV",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-4",
          "name": "Counter Defense IV",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
                  "elementId": "rapid-march-4",
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
          "id": "vigilant-formation-4",
          "name": "Vigilant Formation IV",
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
                  "elementId": "fierce-assault-4",
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
                  "elementId": "fierce-assault-4",
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
                  "elementId": "fierce-assault-4",
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
                  "elementId": "fierce-assault-4",
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
                  "elementId": "fierce-assault-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-4",
          "name": "Solid Defense IV",
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
                  "elementId": "counter-defense-4",
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
                  "elementId": "counter-defense-4",
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
                  "elementId": "counter-defense-4",
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
                  "elementId": "counter-defense-4",
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
                  "elementId": "counter-defense-4",
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
          "id": "final-stand-4",
          "name": "Final Stand IV",
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
                  "elementId": "vigilant-formation-4",
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
                  "elementId": "vigilant-formation-4",
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
                  "elementId": "vigilant-formation-4",
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
                  "elementId": "vigilant-formation-4",
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
                  "elementId": "vigilant-formation-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "hold-the-line-4",
          "name": "Hold the Line IV",
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
                  "elementId": "solid-defense-4",
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
                  "elementId": "solid-defense-4",
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
                  "elementId": "solid-defense-4",
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
                  "elementId": "solid-defense-4",
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
                  "elementId": "solid-defense-4",
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
          "id": "physical-suppression-4",
          "name": "Physical Suppression IV",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "energy-barrage-4",
          "name": "Energy Barrage IV",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
                  "elementId": "final-stand-4",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-4",
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
          "id": "fatal-strike-4",
          "name": "Fatal Strike IV",
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
                  "elementId": "physical-suppression-4",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-4",
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
                  "elementId": "physical-suppression-4",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-4",
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
                  "elementId": "physical-suppression-4",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-4",
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
                  "elementId": "physical-suppression-4",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-4",
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
                  "elementId": "physical-suppression-4",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-4",
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
