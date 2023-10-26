import { v4 as uuidv4 } from "uuid";

export const getDefaultTags = (tagName: string) => {
  switch (tagName) {
    case 'mj-image': {
      return {
        tagName,
        attributes: {
          'width': '200px',
          'height': '200px',
          'src': 'https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg',
          'padding-left': '0px',
          'padding-right': '0px',
          'padding-top': '0px',
          'padding-bottom': '0px',

        },
        children: [],
        id: uuidv4()
      };
    }

    case 'mj-section': {
      return {
        tagName,
        attributes: {},
        "children": [],
        id: uuidv4()
      }
    }

    case 'mj-spacer': {
      return {
        tagName: 'mj-spacer',
        attributes: {
          "height": "50px",
          "line-height": "50px"
        },
        children: []
      }
    }

    case 'mj-text': {
      return {
        tagName,
        attributes: {
          'padding':"20px",
            'color':"#ffffff",
            'font-family':"Helvetica",
            'align':"center",
            'font-size':"45px",
            'line-height':"45px",
            'font-weight':"900",
            'container-background-color': 'black'
        },
        content: 'Dummy text',
        id: uuidv4()

      }
    }

    case 'mj-column': {
      return {
        tagName,
        attributes: {},
        "children": [],
        id: uuidv4()

      }
    }

    case 'mj-hero': {
      return {
        tagName,
        attributes: {
        'mode':"fixed-height",
        "height":"400px",
        'background-height':"400px",
        'background-width':"600px",
        'background-url': "https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg",
        'background-color':"#2a3448",
        'padding': "100px 0px 100px 0px",

      },
        "children": [{
          tagName: 'mj-text',
          attributes: {
            'padding':"20px",
            'color':"#ffffff",
            'font-family':"Helvetica",
            'align':"center",
            'font-size':"45px",
            'line-height':"45px",
            'font-weight':"900",
            'container-background-color': 'black'
          },
          content: "GO TO SPACE",
          children: []
        }, {
          tagName: 'mj-button',
          attributes: {
            "href":"https://mjml.io/",
            "align":"center",
            "background-color": "#008000"
          },
          content: "ORDER YOUR TICKET NOW"
        }],
        id: uuidv4()
      }
    }

    default:
      break;
  }

}
