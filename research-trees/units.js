/** Units research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["units"] = {
  "id": "units",
  "name": "Units",
  "slug": "units",
  "description": "Troop Mastery — Iron, Food, Gold, and Valor where used.",
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
          "id": "weapon-training-1",
          "name": "Weapon Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 10100,
              "food": 10100,
              "gold": 30400,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 60800,
              "food": 60800,
              "gold": 182300,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 97200,
              "food": 97200,
              "gold": 291600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": []
            }
          ]
        },
        {
          "id": "defense-training-1",
          "name": "Defense Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 10100,
              "food": 10100,
              "gold": 30400,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 60800,
              "food": 60800,
              "gold": 182300,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 97200,
              "food": 97200,
              "gold": 291600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
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
          "id": "advanced-armor-1",
          "name": "Advanced Armor I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 10100,
              "food": 10100,
              "gold": 30400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 60800,
              "food": 60800,
              "gold": 182300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 97200,
              "food": 97200,
              "gold": 291600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-1",
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
          "id": "load-training-1",
          "name": "Load Training I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 10100,
              "food": 10100,
              "gold": 30400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 60800,
              "food": 60800,
              "gold": 182300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 97200,
              "food": 97200,
              "gold": 291600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-1",
                  "minLevel": 1
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
          "id": "weapon-training-2",
          "name": "Weapon Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-1",
                  "minLevel": 5
                }
              ]
            }
          ]
        },
        {
          "id": "defense-training-2",
          "name": "Defense Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-1",
                  "minLevel": 5
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
          "id": "advanced-armor-2",
          "name": "Advanced Armor II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-2",
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
          "id": "load-training-2",
          "name": "Load Training II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 155500,
              "food": 155500,
              "gold": 466600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-2",
                  "minLevel": 1
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
          "id": "weapon-training-3",
          "name": "Weapon Training III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 872500,
              "food": 872500,
              "gold": 2510000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-2",
                  "minLevel": 5
                }
              ]
            }
          ]
        },
        {
          "id": "defense-training-3",
          "name": "Defense Training III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 872500,
              "food": 872500,
              "gold": 2510000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-2",
                  "minLevel": 5
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
          "id": "advanced-armor-3",
          "name": "Advanced Armor III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 872500,
              "food": 872500,
              "gold": 2510000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-3",
                  "minLevel": 1
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
          "id": "load-training-3",
          "name": "Load Training III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 872500,
              "food": 872500,
              "gold": 2510000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-3",
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
          "id": "weapon-training-4",
          "name": "Weapon Training IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3040000,
              "food": 3040000,
              "gold": 9110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-3",
                  "minLevel": 5
                }
              ]
            }
          ]
        },
        {
          "id": "defense-training-4",
          "name": "Defense Training IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3040000,
              "food": 3040000,
              "gold": 9110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-3",
                  "minLevel": 5
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
          "id": "advanced-armor-4",
          "name": "Advanced Armor IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3040000,
              "food": 3040000,
              "gold": 9110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-4",
                  "minLevel": 1
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
          "id": "load-training-4",
          "name": "Load Training IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3040000,
              "food": 3040000,
              "gold": 9110000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-13",
      "title": "Tier 13",
      "elements": [
        {
          "id": "weapon-training-5",
          "name": "Weapon Training V",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 8270000,
              "food": 8270000,
              "gold": 24920000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-4",
                  "minLevel": 5
                }
              ]
            }
          ]
        },
        {
          "id": "defense-training-5",
          "name": "Defense Training V",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 8270000,
              "food": 8270000,
              "gold": 24920000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "load-training-4",
                  "minLevel": 5
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-14",
      "title": "Tier 14",
      "elements": [
        {
          "id": "advanced-armor-5",
          "name": "Advanced Armor V",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 14870000,
              "food": 14870000,
              "gold": 44820000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapon-training-5",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-15",
      "title": "Tier 15",
      "elements": [
        {
          "id": "load-training-5",
          "name": "Load Training V",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 20840000,
              "food": 20840000,
              "gold": 62720000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "advanced-armor-5",
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
