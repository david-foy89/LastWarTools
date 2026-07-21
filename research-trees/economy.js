/** Economy research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["economy"] = {
  "id": "economy",
  "name": "Economy",
  "slug": "economy",
  "description": "Economy & Growth — Iron, Food, Gold, and Valor where used.",
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
          "id": "food-output-1",
          "name": "Food Output I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 500,
              "food": 500,
              "gold": 1500,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 1000,
              "food": 1000,
              "gold": 3400,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": []
            }
          ]
        },
        {
          "id": "iron-output-1",
          "name": "Iron Output I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 500,
              "food": 500,
              "gold": 1500,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 1000,
              "food": 1000,
              "gold": 3400,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
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
          "id": "coin-output-1",
          "name": "Coin Output I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1000,
              "food": 1000,
              "gold": 3400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-1",
                  "minLevel": 2
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
          "id": "gathering-food-1",
          "name": "Gathering Food I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "gathering-iron-1",
          "name": "Gathering Iron I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-1",
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
          "id": "gathering-coins-1",
          "name": "Gathering Coins I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-1",
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
          "id": "more-farmlands",
          "name": "More Farmlands",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-coins-1",
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
          "id": "food-output-2",
          "name": "Food Output II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "iron-output-2",
          "name": "Iron Output II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-farmlands",
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
          "id": "coin-output-2",
          "name": "Coin Output II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 77800,
              "food": 77800,
              "gold": 233300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-2",
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
          "id": "gathering-food-2",
          "name": "Gathering Food II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 77800,
              "food": 77800,
              "gold": 233300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "gathering-iron-2",
          "name": "Gathering Iron II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 77800,
              "food": 77800,
              "gold": 233300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-2",
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
          "id": "gathering-coins-2",
          "name": "Gathering Coins II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 93300,
              "food": 93300,
              "gold": 279900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-2",
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
          "id": "more-iron-mines",
          "name": "More Iron Mines",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-coins-2",
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
          "id": "food-output-3",
          "name": "Food Output III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "iron-output-3",
          "name": "Iron Output III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-iron-mines",
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
          "id": "coin-output-3",
          "name": "Coin Output III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-3",
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
          "id": "gathering-food-3",
          "name": "Gathering Food III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "gathering-iron-3",
          "name": "Gathering Iron III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-3",
                  "minLevel": 1
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
          "id": "gathering-coins-3",
          "name": "Gathering Coins III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-3",
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
          "id": "more-gold-mines",
          "name": "More Gold Mines",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-coins-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-16",
      "title": "Tier 16",
      "elements": [
        {
          "id": "food-output-4",
          "name": "Food Output IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "iron-output-4",
          "name": "Iron Output IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 610700,
              "food": 610700,
              "gold": 1832100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "more-gold-mines",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-17",
      "title": "Tier 17",
      "elements": [
        {
          "id": "coin-output-4",
          "name": "Coin Output IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-output-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-18",
      "title": "Tier 18",
      "elements": [
        {
          "id": "gathering-food-4",
          "name": "Gathering Food IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "gathering-iron-4",
          "name": "Gathering Iron IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 855000,
              "food": 855000,
              "gold": 2565000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "coin-output-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-19",
      "title": "Tier 19",
      "elements": [
        {
          "id": "gathering-coins-4",
          "name": "Gathering Coins IV",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4500000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-food-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-20",
      "title": "Tier 20",
      "elements": [
        {
          "id": "food-protection",
          "name": "Food Protection",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-coins-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "iron-protection",
          "name": "Iron Protection",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 4140000,
              "food": 4140000,
              "gold": 12420000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "gathering-coins-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "row-21",
      "title": "Tier 21",
      "elements": [
        {
          "id": "coin-protection",
          "name": "Coin Protection",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3400000,
              "food": 3400000,
              "gold": 10200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-protection",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 7474747,
              "food": 7474747,
              "gold": 22424242,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "food-protection",
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
