import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useIntl } from "react-intl";
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
});

// Create Document Component
const SellRequestTemplatePDF = ({ sellRequest, shopData }) => (
  <Document>
    {/* Compter le nombre de sell request card, eventuellement chunker en plusieurs pages le nombre de sell request card */}
    <Page style={styles.body}>
      <View>
        <Text>Hey</Text>
        <Text>Rachat n°{sellRequest.id}</Text>
        <Text>Proposition de rachat</Text>
      </View>
      <View style={styles.table}>
        {/* Table Head */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Card</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Set</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Language</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Condition</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Foil</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Signed</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
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
                  <Text style={styles.tableCell}>{card.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{card.price}€</Text>
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
              products
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Total cartes€</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>THUNES€</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.regularText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
          recusandae fuga cupiditate ut tempora cum rem iste tempore distinctio
          sunt fugiat modi aut non consequatur libero odit repudiandae qui nemo?
        </Text>
      </View>
      <View>
        <Text style={styles.regularText}>
          Je soussignée M.NOM PRENOM, domicilé au RUE, Ville, ZipCode, Pays,
          accepte de revendre mes cartes à la société SHOP pour un montant de X
          euros. Fait à BLANK, DATE SIGNATURE
        </Text>
      </View>
    </Page>
  </Document>
);

export default SellRequestTemplatePDF;
