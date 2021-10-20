import { transformData } from './helpers';

const input = [
  {
    name: "Festival 1",
    bands: [
      {
        name: "Band 1",
        recordLabel: "Label 1"
      },
      {
        name: "Band 2",
        recordLabel: "Label 1"
      },
      {
        name: "Band 3",
        recordLabel: "Label 2"
      },
    ],
  },
  {
    name: "Festival 2",
    bands: [
      {
        name: "Band 2",
        recordLabel: "Label 2",
      },
      {
        name: "Band 1",
        recordLabel: "Label 1",
      }
    ],
  },
  {
    bands: [
      {
        name: "Band 1",
      }
    ]
  },
];
const output = {
  "Label 1": [
    {
      bandName: "Band 1",
      festivals: ["Festival 1", "Festival 2", "Festival Unavailable"],
    },
    {
      bandName: "Band 2",
      festivals: ["Festival 1", "Festival 2"],
    }
  ],
  "Label Unavailable": [
    {
      bandName: "Band 1",
      festivals: ["Festival 1", "Festival 2", "Festival Unavailable"]
    }
  ],
  "Label 2": [
    {
      bandName: "Band 2",
      festivals: ["Festival 1", "Festival 2"],
    },
    {
      bandName: "Band 3",
      festivals: ["Festival 1"],
    },
  ],
};

test('transformData works correctly for the given input', () => {
  const transformedData = transformData(input);
  expect(transformedData).toEqual(output);
});
