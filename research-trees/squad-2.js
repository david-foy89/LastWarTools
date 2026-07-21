/** Squad 2 research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["squad-2"] = {
  "id": "squad-2",
  "name": "Squad 2",
  "slug": "squad-2",
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
          "id": "terminator-2",
          "name": "Terminator II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
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
          "id": "virus-resistance-2",
          "name": "Virus Resistance II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 916100,
              "food": 916100,
              "gold": 2670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "terminator-2",
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
          "id": "assault-training-2",
          "name": "Assault Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "formation-training-2",
          "name": "Formation Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "virus-resistance-2",
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
          "id": "survival-training-2",
          "name": "Survival Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1220000,
              "food": 1220000,
              "gold": 3780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-2",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-2",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-2",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-2",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "assault-training-2",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-2",
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
          "id": "resource-reaper-2",
          "name": "Resource Reaper II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "power-boost-2",
          "name": "Power Boost II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2220000,
              "food": 2220000,
              "gold": 6780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-2",
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
          "id": "zombie-radar-2",
          "name": "Zombie Radar II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "assault-tactics-2",
          "name": "Assault Tactics II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "fast-exploration-2",
          "name": "Fast Exploration II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-2",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-2",
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
          "id": "rapid-march-2",
          "name": "Rapid March II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2890000,
              "food": 2890000,
              "gold": 8890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-2",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-2",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-2",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-2",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-2",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-2",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-2",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-2",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-2",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-2",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-2",
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
          "id": "fierce-assault-2",
          "name": "Fierce Assault II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-2",
          "name": "Counter Defense II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-2",
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
          "id": "vigilant-formation-2",
          "name": "Vigilant Formation II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-2",
          "name": "Solid Defense II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-2",
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
          "id": "final-stand-2",
          "name": "Final Stand II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "hold-the-line-2",
          "name": "Hold the Line II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5110000,
              "food": 5110000,
              "gold": 15560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-2",
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
          "id": "physical-suppression-2",
          "name": "Physical Suppression II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "energy-barrage-2",
          "name": "Energy Barrage II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-2",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-2",
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
          "id": "fatal-strike-2",
          "name": "Fatal Strike II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-2",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-2",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-2",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-2",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-2",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-2",
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
