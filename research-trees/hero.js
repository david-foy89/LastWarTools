/** Hero research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["hero"] = {
  "id": "hero",
  "name": "Hero",
  "slug": "hero",
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
          "id": "tank-mastery-1",
          "name": "Tank Mastery I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 4600,
              "food": 4600,
              "gold": 13700,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 2,
              "iron": 54700,
              "food": 54700,
              "gold": 164000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 168000,
              "food": 168000,
              "gold": 503900,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 785200,
              "food": 785200,
              "gold": 2300000,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 2700000,
              "food": 2700000,
              "gold": 8218400,
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
          "id": "cannon-enhancement-1",
          "name": "Cannon Enhancement I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 9100,
              "food": 9100,
              "gold": 27300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 87500,
              "food": 87500,
              "gold": 262400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "armor-hardening-1",
          "name": "Armor Hardening I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 9100,
              "food": 9100,
              "gold": 27300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 87500,
              "food": 87500,
              "gold": 262400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-1",
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
          "id": "track-fortification-1",
          "name": "Track Fortification I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 27300,
              "food": 27300,
              "gold": 82000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-1",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-1",
                  "minLevel": 1
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
                  "elementId": "cannon-enhancement-1",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 713800,
              "food": 713800,
              "gold": 2100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-1",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-1",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 6180000,
              "food": 6180000,
              "gold": 18696900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-1",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-1",
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
          "id": "aircraft-mastery-1",
          "name": "Aircraft Mastery I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 54700,
              "food": 54700,
              "gold": 164000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 168000,
              "food": 168000,
              "gold": 503900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 785200,
              "food": 785200,
              "gold": 2300000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 2700000,
              "food": 2700000,
              "gold": 8218400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 7430000,
              "food": 7430000,
              "gold": 22436300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-1",
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
          "id": "airborne-weapon-1",
          "name": "Airborne Weapon I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 87500,
              "food": 87500,
              "gold": 262400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "reinforced-body-1",
          "name": "Reinforced Body I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 87500,
              "food": 87500,
              "gold": 262400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-1",
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
          "id": "wingman-tactics-1",
          "name": "Wingman Tactics I",
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
                  "elementId": "airborne-weapon-1",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 713800,
              "food": 713800,
              "gold": 2100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-1",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-1",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 6180000,
              "food": 6180000,
              "gold": 18696900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-1",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 18846500,
              "food": 18846500,
              "gold": 56539500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-1",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-1",
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
          "id": "missile-mastery-1",
          "name": "Missile Mastery I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 168000,
              "food": 168000,
              "gold": 503900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 785200,
              "food": 785200,
              "gold": 2300000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 2700000,
              "food": 2700000,
              "gold": 8218400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 7430000,
              "food": 7430000,
              "gold": 22436300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 24500500,
              "food": 24500500,
              "gold": 73501400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-1",
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
          "id": "precision-targeting-1",
          "name": "Precision Targeting I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "metal-barricade-1",
          "name": "Metal Barricade I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 419000,
              "food": 419000,
              "gold": 1200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-1",
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
          "id": "missile-expansion-1",
          "name": "Missile Expansion I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 713800,
              "food": 713800,
              "gold": 2100000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-1",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-1",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 6180000,
              "food": 6180000,
              "gold": 18696900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-1",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 18846500,
              "food": 18846500,
              "gold": 56539500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-1",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 38282000,
              "food": 38282000,
              "gold": 114845900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-1",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-1",
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
          "id": "tank-mastery-2",
          "name": "Tank Mastery II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 785200,
              "food": 785200,
              "gold": 2300000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 2700000,
              "food": 2700000,
              "gold": 8218400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 7430000,
              "food": 7430000,
              "gold": 22436300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 24500500,
              "food": 24500500,
              "gold": 73501400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-1",
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
          "id": "cannon-enhancement-2",
          "name": "Cannon Enhancement II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "armor-hardening-2",
          "name": "Armor Hardening II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1000000,
              "food": 1000000,
              "gold": 3200000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10684000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 13461800,
              "food": 13461800,
              "gold": 40385400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "tank-mastery-2",
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
          "id": "track-fortification-2",
          "name": "Track Fortification II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1500000,
              "food": 1500000,
              "gold": 4600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-2",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 6180000,
              "food": 6180000,
              "gold": 18696900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-2",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 18846500,
              "food": 18846500,
              "gold": 56539500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-2",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 38282000,
              "food": 38282000,
              "gold": 114845900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-2",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "cannon-enhancement-2",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-hardening-2",
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
          "id": "aircraft-mastery-2",
          "name": "Aircraft Mastery II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 2700000,
              "food": 2700000,
              "gold": 8218400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 7430000,
              "food": 7430000,
              "gold": 22436300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 24500500,
              "food": 24500500,
              "gold": 73501400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "track-fortification-2",
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
          "id": "airborne-weapon-2",
          "name": "Airborne Weapon II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10680000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 13400000,
              "food": 13400000,
              "gold": 40310000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "reinforced-body-2",
          "name": "Reinforced Body II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 3560000,
              "food": 3560000,
              "gold": 10680000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 13400000,
              "food": 13400000,
              "gold": 40310000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "aircraft-mastery-2",
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
          "id": "wingman-tactics-2",
          "name": "Wingman Tactics II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 6180000,
              "food": 6180000,
              "gold": 18640000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-2",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 18846500,
              "food": 18846500,
              "gold": 56539500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-2",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 38282000,
              "food": 38282000,
              "gold": 114845900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-2",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-2",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "airborne-weapon-2",
                  "minLevel": 1
                },
                {
                  "elementId": "reinforced-body-2",
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
          "id": "missile-mastery-2",
          "name": "Missile Mastery II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 7430000,
              "food": 7430000,
              "gold": 22410000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 24500500,
              "food": 24500500,
              "gold": 73501400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 38282000,
              "food": 38282000,
              "gold": 114845900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "wingman-tactics-2",
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
          "id": "precision-targeting-2",
          "name": "Precision Targeting II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 13400000,
              "food": 13400000,
              "gold": 40310000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "metal-barricade-2",
          "name": "Metal Barricade II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 13400000,
              "food": 13400000,
              "gold": 40310000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-mastery-2",
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
          "id": "missile-expansion-2",
          "name": "Missile Expansion II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 18740000,
              "food": 18740000,
              "gold": 55390000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-2",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 30625600,
              "food": 30625600,
              "gold": 91876700,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-2",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-2",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-2",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "precision-targeting-2",
                  "minLevel": 1
                },
                {
                  "elementId": "metal-barricade-2",
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
          "id": "firepower-boost",
          "name": "Firepower Boost",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 24500500,
              "food": 24500500,
              "gold": 73501400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 38282000,
              "food": 38282000,
              "gold": 114845900,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-2",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "missile-expansion-2",
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
          "id": "weapons-upgrade",
          "name": "Weapons Upgrade",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 30580000,
              "food": 30580000,
              "gold": 91830000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "armor-enhancement",
          "name": "Armor Enhancement",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 30580000,
              "food": 30580000,
              "gold": 91830000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 64970000,
              "food": 64970000,
              "gold": 195140000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "firepower-boost",
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
          "id": "endurance-upgrade",
          "name": "Endurance Upgrade",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 38220000,
              "food": 38220000,
              "gold": 114760000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapons-upgrade",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-enhancement",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 91050000,
              "food": 91050000,
              "gold": 273260000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapons-upgrade",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-enhancement",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 117790011,
              "food": 117790011,
              "gold": 353370033,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapons-upgrade",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-enhancement",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 165822200,
              "food": 165822200,
              "gold": 497466500,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapons-upgrade",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-enhancement",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 230830000,
              "food": 230830000,
              "gold": 692600000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "weapons-upgrade",
                  "minLevel": 1
                },
                {
                  "elementId": "armor-enhancement",
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
