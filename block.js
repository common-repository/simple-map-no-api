(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var useBlockProps = blockEditor.useBlockProps;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;

  blocks.registerBlockType("smna/simple-map-block", {
    title: "Simple Map Block",
    icon: "location-alt",
    category: "common",
    attributes: {
      latitude: {
        type: "string",
        default: "37.320605", // Default latitude
      },
      longitude: {
        type: "string",
        default: "-121.992445", // Default longitude
      },
      width: {
        type: "string",
        default: "100%", // Default width
      },
      height: {
        type: "string",
        default: "400px", // Default height
      },
      title: {
        type: "string",
        default: "Our Office", // Default title
      },
      address: {
        type: "string",
        default: "San Jose, CA", // Default address
      },
    },

    edit: function (props) {
      var attributes = props.attributes;

      // Update attributes dynamically based on user input
      function onChangeLatitude(newLatitude) {
        props.setAttributes({ latitude: newLatitude });
      }

      function onChangeLongitude(newLongitude) {
        props.setAttributes({ longitude: newLongitude });
      }

      function onChangeWidth(newWidth) {
        props.setAttributes({ width: newWidth });
      }

      function onChangeHeight(newHeight) {
        props.setAttributes({ height: newHeight });
      }

      function onChangeTitle(newTitle) {
        props.setAttributes({ title: newTitle.slice(0, 24) });
      }

      function onChangeAddress(newAddress) {
        props.setAttributes({ address: newAddress.slice(0, 50) });
      }

      // Return the editable block view with the map preview and additional info overlay
      return el(
        "div",
        useBlockProps(),
        el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: "Map Settings", initialOpen: true },
            el(TextControl, {
              label: "Latitude",
              value: attributes.latitude,
              onChange: onChangeLatitude,
            }),
            el(TextControl, {
              label: "Longitude",
              value: attributes.longitude,
              onChange: onChangeLongitude,
            }),
            el(TextControl, {
              label: "Width",
              value: attributes.width,
              onChange: onChangeWidth,
            }),
            el(TextControl, {
              label: "Height",
              value: attributes.height,
              onChange: onChangeHeight,
            }),
            el(TextControl, {
              label: "Title",
              placeholder: "25 characters max",
              value: attributes.title,
              onChange: onChangeTitle,
            }),
            el(TextControl, {
              label: "Address",
              placeholder: "50 characters max",
              value: attributes.address,
              onChange: onChangeAddress,
            })
          )
        ),
        el(
          "div",
          { style: { position: "relative", width: attributes.width, height: attributes.height, margin: "0 auto", overflow: "hidden" } },
          el(
            "div",
            { style: { paddingTop: "1px", height: attributes.height, width: "100%" } },
            el("iframe", {
              src: `https://maps.google.com/maps?q=${attributes.latitude},${attributes.longitude}&hl=en&z=14&output=embed`,
              width: "100%",
              height: "100%",
              frameborder: "0",
              style: { border: "none", padding: "0" },
              allowfullscreen: "",
            })
          ),
          attributes.title &&
            el(
              "div",
              {
                style: {
                  position: "absolute",
                  top: "11px",
                  left: "11px",
                  zIndex: 333,
                  textAlign: "left",
                  backgroundColor: "#fff",
                  padding: "5px 0 0 5px",
                  width: "220px",
                },
              },
              el(
                "span",
                {
                  style: {
                    color: "#000",
                    fontSize: ".9rem",
                    fontWeight: "bold",
                    textShadow: "2px 5px 10px rgba(0,0,0,0.65)",
                  },
                },
                attributes.title
              ),
              el("br"),
              el(
                "span",
                {
                  style: {
                    fontSize: ".7rem",
                    lineHeight: "1",
                  },
                },
                attributes.address
              )
            )
        )
      );
    },

    save: function () {
      // The block will be rendered on the server-side via PHP, so we don't save anything here.
      return null;
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);
