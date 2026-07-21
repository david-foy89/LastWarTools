/** Squad 3 research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["squad-3"] = {
  "id": "squad-3",
  "name": "Squad 3",
  "slug": "squad-3",
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
          "id": "terminator-3",
          "name": "Terminator III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 6220000,
              "food": 6220000,
              "gold": 18670000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 11110000,
              "food": 11110000,
              "gold": 33560000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
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
          "id": "virus-resistance-3",
          "name": "Virus Resistance III",
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
                  "elementId": "terminator-3",
                  "minLevel": 1
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
                  "elementId": "terminator-3",
                  "minLevel": 1
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
                  "elementId": "terminator-3",
                  "minLevel": 1
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
                  "elementId": "terminator-3",
                  "minLevel": 1
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
                  "elementId": "terminator-3",
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
          "id": "assault-training-3",
          "name": "Assault Training III",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "formation-training-3",
          "name": "Formation Training III",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
                  "elementId": "virus-resistance-3",
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
          "id": "survival-training-3",
          "name": "Survival Training III",
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
                  "elementId": "assault-training-3",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-3",
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
                  "elementId": "assault-training-3",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-3",
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
                  "elementId": "assault-training-3",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-3",
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
                  "elementId": "assault-training-3",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-3",
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
                  "elementId": "assault-training-3",
                  "minLevel": 2
                },
                {
                  "elementId": "formation-training-3",
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
          "id": "resource-reaper-3",
          "name": "Resource Reaper III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "power-boost-3",
          "name": "Power Boost III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 15670000,
              "food": 15670000,
              "gold": 47110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "survival-training-3",
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
          "id": "zombie-radar-3",
          "name": "Zombie Radar III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "assault-tactics-3",
          "name": "Assault Tactics III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "fast-exploration-3",
          "name": "Fast Exploration III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "resource-reaper-3",
                  "minLevel": 2
                },
                {
                  "elementId": "power-boost-3",
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
          "id": "rapid-march-3",
          "name": "Rapid March III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 20330000,
              "food": 20330000,
              "gold": 61220000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-3",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-3",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-3",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-3",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-3",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-3",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-3",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-3",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "zombie-radar-3",
                  "minLevel": 1
                },
                {
                  "elementId": "assault-tactics-3",
                  "minLevel": 1
                },
                {
                  "elementId": "fast-exploration-3",
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
          "id": "fierce-assault-3",
          "name": "Fierce Assault III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "counter-defense-3",
          "name": "Counter Defense III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-march-3",
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
          "id": "vigilant-formation-3",
          "name": "Vigilant Formation III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fierce-assault-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "solid-defense-3",
          "name": "Solid Defense III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "counter-defense-3",
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
          "id": "final-stand-3",
          "name": "Final Stand III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "vigilant-formation-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "hold-the-line-3",
          "name": "Hold the Line III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 25440000,
              "food": 25440000,
              "gold": 76560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "solid-defense-3",
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
          "id": "physical-suppression-3",
          "name": "Physical Suppression III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 138110000,
              "food": 138110000,
              "gold": 414440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "energy-barrage-3",
          "name": "Energy Barrage III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 31890000,
              "food": 31890000,
              "gold": 95670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 138110000,
              "food": 138110000,
              "gold": 414440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "final-stand-3",
                  "minLevel": 2
                },
                {
                  "elementId": "hold-the-line-3",
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
          "id": "fatal-strike-3",
          "name": "Fatal Strike III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 54220000,
              "food": 54220000,
              "gold": 162670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-3",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 75890000,
              "food": 75890000,
              "gold": 227670000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-3",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 98670000,
              "food": 98670000,
              "gold": 296000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-3",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 138110000,
              "food": 138110000,
              "gold": 414440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-3",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-3",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 193440000,
              "food": 193440000,
              "gold": 580330000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "physical-suppression-3",
                  "minLevel": 2
                },
                {
                  "elementId": "energy-barrage-3",
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
