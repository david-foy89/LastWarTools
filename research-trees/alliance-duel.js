/** Alliance Duel research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["alliance-duel"] = {
  "id": "alliance-duel",
  "name": "Alliance Duel",
  "slug": "alliance-duel",
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
          "id": "incentive-radar",
          "name": "Incentive - Radar",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": []
            }
          ]
        },
        {
          "id": "incentive-speed-up",
          "name": "Incentive - Speed-up",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": []
            }
          ]
        },
        {
          "id": "incentive-recruitment",
          "name": "Incentive - Recruitment",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 50,
              "requirements": []
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": []
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": []
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
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
          "id": "advanced-rewards",
          "name": "Advanced Rewards",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "incentive-radar",
                  "minLevel": 6
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
          "id": "duel-expert",
          "name": "Duel Expert",
          "maxLevel": 20,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 11,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 12,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 13,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 14,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 15,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 16,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 17,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 18,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 19,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 20,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "advanced-rewards",
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
          "id": "incentive-building",
          "name": "Incentive - Building",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 750,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1050,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1400,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1750,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "incentive-research",
          "name": "Incentive - Research",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 750,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1050,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1400,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1750,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 1
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
          "id": "incentive-training",
          "name": "Incentive - Training",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 750,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1050,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1400,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1750,
              "requirements": [
                {
                  "elementId": "incentive-building",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "incentive-enemy-kills",
          "name": "Incentive - Enemy Kills",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 750,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1050,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1400,
              "requirements": [
                {
                  "elementId": "incentive-research",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 1750,
              "requirements": [
                {
                  "elementId": "incentive-research",
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
          "id": "super-bonus",
          "name": "Super Bonus",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "duel-expert",
                  "minLevel": 20
                },
                {
                  "elementId": "incentive-training",
                  "minLevel": 6
                },
                {
                  "elementId": "incentive-enemy-kills",
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
          "id": "incentive-intercity-trade",
          "name": "Incentive - Intercity Trade",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 600,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 720,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 840,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 960,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "incentive-secret-mobile-squad",
          "name": "Incentive - Secret Mobile Squad",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 600,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 720,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 840,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 960,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "incentive-survivor-recruit",
          "name": "Incentive - Survivor Recruit",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 100,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 200,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 350,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 450,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 600,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 720,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 840,
              "requirements": [
                {
                  "elementId": "super-bonus",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 960,
              "requirements": [
                {
                  "elementId": "super-bonus",
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
          "id": "duel-master-2",
          "name": "Duel Master II",
          "maxLevel": 10,
          "levels": [
            {
              "level": 1,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 480,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 480,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 600,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 600,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 720,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 6,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 720,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 7,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 840,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 8,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 840,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 9,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 960,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 10,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 960,
              "requirements": [
                {
                  "elementId": "incentive-intercity-trade",
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
          "id": "infinite-roulette",
          "name": "Infinite Roulette",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 7777,
              "food": 7777,
              "gold": 7777,
              "valor": 77,
              "requirements": [
                {
                  "elementId": "duel-master-2",
                  "minLevel": 10
                },
                {
                  "elementId": "Becomes available later in the game",
                  "minLevel": 0
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
