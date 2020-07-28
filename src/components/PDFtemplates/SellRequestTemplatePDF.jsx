import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useIntl, FormattedMessage } from "react-intl";
import config from "../../services/config";

// Create styles
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "11.11%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "11.11%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 8,
    textAlign: "center",
  },
  regularText: {
    fontSize: 10,
  },
  tableColTotalProducts: {
    width: "77.77%",
  },
  signature: {
    textAlign: "right",
    fontSize: 10,
    marginTop: "50px",
    marginRight: "100px",
  },
});

// Create Document Component
const SellRequestTemplatePDF = ({ sellRequest, shopData }) => {
  //Hook Intl to translate an attribute
  const intl = useIntl();

  const date = intl.formatDate(Date.now());

  return (
    <Document>
      {/* Compter le nombre de sell request card, eventuellement chunker en plusieurs pages le nombre de sell request card */}
      <Page style={styles.body}>
        <View>
          <Text style={{ marginTop: "30px" }}>
            {intl.formatMessage({
              id: "app.shop.OneSellRequestPDF.SellRequestNumber",
              defaultMessage: "Sell Request N°",
            })}
            {sellRequest.id}
          </Text>
          <Text style={{ fontSize: "10px", marginTop: "30px" }}>
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.date1"
              defaultMessage={`On the `}
            />
            {date}
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.date2"
              defaultMessage={`On the `}
            />
            {shopData.town}
          </Text>
          <Text style={{ fontSize: "10px", margin: "20px 0" }}>
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.Sentence1"
              defaultMessage={`I, the undersigned Madam / Sir `}
            />
            <span className="pdf-username-and-firstname">
              {sellRequest.customer.prenom} {sellRequest.customer.nom}
            </span>
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.Sentence2"
              defaultMessage={`, living at `}
            />
            {sellRequest.customer.adress}, {sellRequest.customer.postalCode}{" "}
            {sellRequest.customer.town}
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.Sentence2"
              defaultMessage={`, acknowledges on honor having sold the following cards to the company `}
            />
            {shopData.legalName}.
          </Text>
        </View>
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.card"
                  defaultMessage={`Card`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.set"
                  defaultMessage={`Set`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.language"
                  defaultMessage={`Language`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.condition"
                  defaultMessage={`Condition`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.foil"
                  defaultMessage={`Foil`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.signed"
                  defaultMessage={`Signed`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.price"
                  defaultMessage={`Price`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.quantity"
                  defaultMessage={`Quantity`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.total"
                  defaultMessage={`Total`}
                />
              </Text>
            </View>
          </View>
          {/* Table Body */}

          {sellRequest.sellRequests.map((card) => {
            return (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{card.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{card.set}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {config.langDefinition[card.lang]}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {config.conditionDefinition[parseInt(card.condition)]}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {card.isFoil ? "Yes" : "No"}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {card.isSigned ? "Yes" : "No"}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{card.price}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{card.quantity}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {card.price * card.quantity}€
                    </Text>
                  </View>
                </View>
              </>
            );
          })}
          <View style={styles.tableRow}>
            <View style={styles.tableColTotalProducts}>
              <Text style={styles.regularText}>
                {sellRequest.sellRequests.reduce(
                  (total, card) => total + card.quantity,
                  0
                )}{" "}
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.products"
                  defaultMessage={`products`}
                />
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {sellRequest.sellRequests.reduce(
                  (total, card) => total + card.quantity,
                  0
                )}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {sellRequest.sellRequests.reduce(
                  (total, card) => total + card.quantity * card.price,
                  0
                )}
                €
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.signature}>
            <FormattedMessage
              id="app.shop.OneSellRequestPDF.signature"
              defaultMessage={`Signature`}
            />
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SellRequestTemplatePDF;
