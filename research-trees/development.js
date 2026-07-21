/** Development research tree. */
window.LW_RESEARCH_TREES = window.LW_RESEARCH_TREES || {};
window.LW_RESEARCH_TREES["development"] = {
  "id": "development",
  "name": "Development",
  "slug": "development",
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
          "id": "fast-builder-1",
          "name": "Fast Builder I",
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
              "iron": 800,
              "food": 800,
              "gold": 2300,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 3,
              "iron": 1100,
              "food": 1100,
              "gold": 3400,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 4,
              "iron": 1700,
              "food": 1700,
              "gold": 5100,
              "valor": 0,
              "requirements": []
            },
            {
              "level": 5,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
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
          "id": "infirmary-expansion-1",
          "name": "Infirmary Expansion I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1100,
              "food": 1100,
              "gold": 3400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1700,
              "food": 1700,
              "gold": 5100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "barrack-expansion-1",
          "name": "Barrack Expansion I",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1100,
              "food": 1100,
              "gold": 3400,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1700,
              "food": 1700,
              "gold": 5100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 2500,
              "food": 2500,
              "gold": 7600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 15200,
              "food": 15200,
              "gold": 45600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-1",
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
          "id": "research-enhancement-1",
          "name": "Research Enhancement I",
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
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 2,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 3
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
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 4,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 5,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-1",
                  "minLevel": 3
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
          "id": "rapid-field-dressing-1",
          "name": "Rapid Field Dressing I",
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
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
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
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "focused-training-1",
          "name": "Focused Training I",
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
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
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
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 48600,
              "food": 48600,
              "gold": 145800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-1",
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
          "id": "master-craftsman",
          "name": "Master Craftsman",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 5100,
              "food": 5100,
              "gold": 15200,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-1",
                  "minLevel": 2
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
                  "elementId": "rapid-field-dressing-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 77800,
              "food": 77800,
              "gold": 233300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-1",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-1",
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
          "id": "fast-builder-2",
          "name": "Fast Builder II",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 30400,
              "food": 30400,
              "gold": 91100,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "master-craftsman",
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
                  "elementId": "master-craftsman",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 77800,
              "food": 77800,
              "gold": 233300,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "master-craftsman",
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
                  "elementId": "master-craftsman",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "master-craftsman",
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
          "id": "infirmary-expansion-2",
          "name": "Infirmary Expansion II",
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 3,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-2",
                  "minLevel": 3
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 5,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-2",
                  "minLevel": 3
                }
              ]
            }
          ]
        },
        {
          "id": "barrack-expansion-2",
          "name": "Barrack Expansion II",
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 3,
              "iron": 233300,
              "food": 233300,
              "gold": 699800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-2",
                  "minLevel": 3
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
                  "elementId": "fast-builder-2",
                  "minLevel": 3
                }
              ]
            },
            {
              "level": 5,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-2",
                  "minLevel": 3
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
          "id": "research-enhancement-2",
          "name": "Research Enhancement II",
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
                  "elementId": "infirmary-expansion-2",
                  "minLevel": 2
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
                  "elementId": "infirmary-expansion-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 3,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 4,
              "iron": 436200,
              "food": 436200,
              "gold": 1308600,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-2",
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
                  "elementId": "infirmary-expansion-2",
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
          "id": "rapid-field-dressing-2",
          "name": "Rapid Field Dressing II",
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 846450,
              "food": 846450,
              "gold": 2539350,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
                }
              ]
            }
          ]
        },
        {
          "id": "focused-training-2",
          "name": "Focused Training II",
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 2,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
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
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
                }
              ]
            },
            {
              "level": 5,
              "iron": 846450,
              "food": 846450,
              "gold": 2539350,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-2",
                  "minLevel": 2
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
          "id": "extra-barracks",
          "name": "Extra Barracks",
          "maxLevel": 1,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-2",
                  "minLevel": 2
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
          "id": "fast-builder-3",
          "name": "Fast Builder III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "extra-barracks",
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
          "id": "infirmary-expansion-3",
          "name": "Infirmary Expansion III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "barrack-expansion-3",
          "name": "Barrack Expansion III",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 396600,
              "food": 396600,
              "gold": 1189800,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-3",
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
          "id": "research-enhancement-3",
          "name": "Research Enhancement III",
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
                  "elementId": "infirmary-expansion-3",
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
          "id": "rapid-field-dressing-3",
          "name": "Rapid Field Dressing III",
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
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 846450,
              "food": 846450,
              "gold": 2539350,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1890000,
              "food": 1890000,
              "gold": 5890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "focused-training-3",
          "name": "Focused Training III",
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
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 846450,
              "food": 846450,
              "gold": 2539350,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 1890000,
              "food": 1890000,
              "gold": 5890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-3",
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
          "id": "efficient-healing",
          "name": "Efficient Healing",
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
                  "elementId": "rapid-field-dressing-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1440000,
              "food": 1440000,
              "gold": 4560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-3",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 17000000,
              "food": 17000000,
              "gold": 51000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-3",
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
          "id": "fast-builder-4",
          "name": "Fast Builder IV",
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
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1440000,
              "food": 1440000,
              "gold": 4560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3440000,
              "food": 3440000,
              "gold": 10330000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "efficient-healing",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 13560000,
              "food": 13560000,
              "gold": 40780000,
              "valor": 0,
              "requirements": [
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
      "id": "row-17",
      "title": "Tier 17",
      "elements": [
        {
          "id": "infirmary-expansion-4",
          "name": "Infirmary Expansion IV",
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
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1440000,
              "food": 1440000,
              "gold": 4560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3440000,
              "food": 3440000,
              "gold": 10330000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 13560000,
              "food": 13560000,
              "gold": 40780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "barrack-expansion-4",
          "name": "Barrack Expansion IV",
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
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1440000,
              "food": 1440000,
              "gold": 4560000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 3440000,
              "food": 3440000,
              "gold": 10330000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 13560000,
              "food": 13560000,
              "gold": 40780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "fast-builder-4",
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
          "id": "research-enhancement-4",
          "name": "Research Enhancement IV",
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
                  "elementId": "infirmary-expansion-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1890000,
              "food": 1890000,
              "gold": 5890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 17000000,
              "food": 17000000,
              "gold": 51000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "infirmary-expansion-4",
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
          "id": "rapid-field-dressing-4",
          "name": "Rapid Field Dressing IV",
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
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1890000,
              "food": 1890000,
              "gold": 5890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 17000000,
              "food": 17000000,
              "gold": 51000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            }
          ]
        },
        {
          "id": "focused-training-4",
          "name": "Focused Training IV",
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
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 1890000,
              "food": 1890000,
              "gold": 5890000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 17000000,
              "food": 17000000,
              "gold": 51000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "research-enhancement-4",
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
          "id": "drill-ground-expansion",
          "name": "Drill Ground Expansion",
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
                  "elementId": "rapid-field-dressing-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 3440000,
              "food": 3440000,
              "gold": 10330000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 0,
              "food": 0,
              "gold": 0,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-4",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 13560000,
              "food": 13560000,
              "gold": 40780000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "rapid-field-dressing-4",
                  "minLevel": 1
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
                  "elementId": "rapid-field-dressing-4",
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
          "id": "survival-skills",
          "name": "Survival Skills",
          "maxLevel": 5,
          "levels": [
            {
              "level": 1,
              "iron": 1900000,
              "food": 1900000,
              "gold": 5800000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "drill-ground-expansion",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 2,
              "iron": 4110000,
              "food": 4110000,
              "gold": 12440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "drill-ground-expansion",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 3,
              "iron": 10440000,
              "food": 10440000,
              "gold": 31320000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "drill-ground-expansion",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 4,
              "iron": 17000000,
              "food": 17000000,
              "gold": 51000000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "drill-ground-expansion",
                  "minLevel": 1
                }
              ]
            },
            {
              "level": 5,
              "iron": 36110000,
              "food": 36110000,
              "gold": 108440000,
              "valor": 0,
              "requirements": [
                {
                  "elementId": "drill-ground-expansion",
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
