"use client"
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { QuotationType, PhaseType } from "./PremiumTemplate";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'flex-start',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  quotationInfo: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  quotationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  boxedSection: {
    border: '1 solid #eee',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#fafbfc',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tableSection: {
    marginBottom: 12,
  },
  summaryBox: {
    border: '1 solid #eee',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    alignSelf: 'flex-end',
    minWidth: 200,
  },
  shadedBox: {
    backgroundColor: '#f3f3f3',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: 10,
  },
  value: {
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '11%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#f3f3f3',
    padding: 4,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '11%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
  tableColDesc: {
    width: '18%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  summaryLabel: {
    color: '#444',
  },
  summaryValue: {
    fontFamily: 'Helvetica-Bold',
  },
  terms: {
    marginTop: 8,
    fontSize: 10,
    color: '#333',
  },
  notes: {
    marginTop: 8,
    fontSize: 10,
    color: '#333',
  },
  attachment: {
    fontSize: 10,
    color: '#1a56db',
    textDecoration: 'underline',
  },
});

const ClassicTemplate: React.FC<{ quotation: QuotationType; phases: PhaseType[] }> = ({ quotation, phases }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with logo and company info */}
      <View style={styles.headerRow}>
        {/* <Image src="/path/to/logo.png" style={styles.logo} /> */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>Your Company Name</Text>
          <Text>123 Business Rd, City, State</Text>
          <Text>Phone: 123-456-7890</Text>
          <Text>Email: info@company.com</Text>
        </View>
        <View style={styles.quotationInfo}>
          <Text style={styles.quotationTitle}>QUOTATION</Text>
          <Text>No: {quotation.number}</Text>
          <Text>Date: {quotation.date}</Text>
          <Text>Due: {quotation.dueDate}</Text>
        </View>
      </View>

      {/* Client Details in a box */}
      <View style={styles.boxedSection}>
        <Text style={styles.sectionTitle}>Bill To:</Text>
        <Text style={styles.label}>Company: <Text style={styles.value}>{quotation.client.name}</Text></Text>
        <Text style={styles.label}>GSTIN: <Text style={styles.value}>{quotation.client.gstin}</Text></Text>
        <Text style={styles.label}>Address: <Text style={styles.value}>{quotation.client.address}</Text></Text>
        <Text style={styles.label}>Contact: <Text style={styles.value}>{quotation.client.contact}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{quotation.client.email}</Text></Text>
      </View>

      {/* Items Table with professional styling */}
      <View style={styles.tableSection}>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Items</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Item</Text>
            <Text style={styles.tableColDesc}>Description</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>Unit</Text>
            <Text style={styles.tableColHeader}>Rate</Text>
            <Text style={styles.tableColHeader}>Discount</Text>
            <Text style={styles.tableColHeader}>IGST (%)</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
            <Text style={styles.tableColHeader}>HSN/SAC</Text>
          </View>
          {quotation.items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCol}>{item.name}</Text>
              <Text style={styles.tableColDesc}>{item.description}</Text>
              <Text style={styles.tableCol}>{item.qty}</Text>
              <Text style={styles.tableCol}>{item.unit}</Text>
              <Text style={styles.tableCol}>₹{item.rate}</Text>
              <Text style={styles.tableCol}>₹{item.discount}</Text>
              <Text style={styles.tableCol}>{item.igst}</Text>
              <Text style={styles.tableCol}>₹{item.amount.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{item.hsn}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Phase-wise Payment Table */}
      <View style={styles.tableSection}>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Phase-wise Payment</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Phase</Text>
            <Text style={styles.tableColHeader}>Due Date</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
          </View>
          {phases.map((phase, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCol}>{phase.name}</Text>
              <Text style={styles.tableCol}>{phase.dueDate}</Text>
              <Text style={styles.tableCol}>₹{phase.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 10, color: '#444', marginTop: 2 }}>
          Total of all phases: ₹{phases.reduce((sum, p) => sum + p.amount, 0).toFixed(2)} / ₹{quotation.total.toFixed(2)}
        </Text>
      </View>

      {/* Summary, right-aligned */}
      <View style={styles.summaryBox}>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{quotation.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>{quotation.discountType === "flat" ? `₹${quotation.discountValue}` : `${quotation.discountValue}%`}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>₹{quotation.tax.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping/Extra</Text>
          <Text style={styles.summaryValue}>₹{quotation.shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Round-Off</Text>
          <Text style={styles.summaryValue}>{quotation.roundOff ? "Yes" : "No"}</Text>
        </View>
        <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 4, paddingTop: 4 }]}>
          <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={[styles.summaryValue, { fontSize: 14 }]}>₹{quotation.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Terms/Notes in shaded box */}
      <View style={styles.shadedBox}>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Terms & Conditions</Text>
        <Text style={styles.terms}>{quotation.terms}</Text>
      </View>
      <View style={styles.shadedBox}>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Notes</Text>
        <Text style={styles.notes}>{quotation.notes}</Text>
      </View>

      {/* Attachments */}
      {quotation.attachments && quotation.attachments.length > 0 && (
        <View style={styles.section}>
          <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Attachments</Text>
          {quotation.attachments.map((file, i) => (
            <Text key={i} style={styles.attachment}>{file}</Text>
          ))}
        </View>
      )}
      {/* Signature */}
      {quotation.signature && (
        <View style={styles.signatureRow}>
          <Text>Authorized Signatory</Text>
          {/* <Image src={quotation.signature} style={{ height: 40 }} /> */}
        </View>
      )}
    </Page>
  </Document>
);

export default ClassicTemplate; 