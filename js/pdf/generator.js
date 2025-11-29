// ===== GENERAZIONE PDF CON jsPDF =====

// Logo placeholder - può essere rimosso o sostituito con base64 diretto
let logoBase64 = null;

// Funzione rimossa - causava errori CORS con file:// protocol
// Per aggiungere il logo, convertilo in base64 e inseriscilo direttamente qui:
// logoBase64 = 'data:image/png;base64,iVBORw0KG...';

// Genera PDF per un singolo ordine
async function generateOrderPDF(order) {
    try {
        showNotification('Generazione PDF in corso...', 'info');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;
        
        // ===== HEADER CON LOGO =====
        if (logoBase64) {
            try {
                doc.addImage(logoBase64, 'PNG', margin, yPos, 40, 15);
                yPos += 20;
            } catch (err) {
                console.error('Errore inserimento logo:', err);
                // Fallback senza logo
                doc.setFontSize(20);
                doc.setFont('helvetica', 'bold');
                doc.text('IPERMELA STORE', margin, yPos);
                yPos += 15;
            }
        } else {
            // Fallback senza logo
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('IPERMELA STORE', margin, yPos);
            yPos += 15;
        }
        
        // Info azienda
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Apple Premium Reseller', margin, yPos);
        yPos += 5;
        doc.text('Thiene (VI) - Cassola (VI)', margin, yPos);
        yPos += 15;
        
        // Linea separatore
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        
        // ===== TITOLO DOCUMENTO =====
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('PREVENTIVO / ORDINE', margin, yPos);
        yPos += 10;
        
        // ===== INFO ORDINE =====
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Numero: #${order.id}`, margin, yPos);
        doc.text(`Data: ${order.date}`, pageWidth - margin - 50, yPos);
        yPos += 10;
        
        // ===== INFO CLIENTE =====
        doc.setFont('helvetica', 'bold');
        doc.text('CLIENTE:', margin, yPos);
        yPos += 7;
        doc.setFont('helvetica', 'normal');
        doc.text(`Nome: ${order.customer_name}`, margin + 5, yPos);
        yPos += 5;
        
        if (order.customer_email) {
            doc.text(`Email: ${order.customer_email}`, margin + 5, yPos);
            yPos += 5;
        }
        
        if (order.customer_phone) {
            doc.text(`Telefono: ${order.customer_phone}`, margin + 5, yPos);
            yPos += 5;
        }
        yPos += 10;
        
        // ===== TABELLA PRODOTTI =====
        doc.setFont('helvetica', 'bold');
        doc.text('PRODOTTI:', margin, yPos);
        yPos += 7;
        
        // Header tabella
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('Prodotto', margin + 2, yPos);
        doc.text('Qt\u00e0', pageWidth - margin - 60, yPos);
        doc.text('Prezzo Cad.', pageWidth - margin - 40, yPos);
        doc.text('Totale', pageWidth - margin - 15, yPos, { align: 'right' });
        yPos += 8;
        
        // Righe prodotti
        doc.setFont('helvetica', 'normal');
        order.items.forEach((item, index) => {
            // Check se serve nuova pagina
            if (yPos > pageHeight - 50) {
                doc.addPage();
                yPos = margin;
            }
            
            const itemTotal = item.price * item.quantity;
            
            // Sfondo alternato per righe
            if (index % 2 === 1) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 7, 'F');
            }
            
            // Testo prodotto (max 70 caratteri)
            const productName = item.name.length > 70 ? item.name.substring(0, 67) + '...' : item.name;
            doc.text(productName, margin + 2, yPos);
            doc.text(item.quantity.toString(), pageWidth - margin - 60, yPos);
            doc.text(`\u20ac${item.price.toFixed(2)}`, pageWidth - margin - 40, yPos);
            doc.text(`\u20ac${itemTotal.toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
            yPos += 7;
        });
        
        yPos += 5;
        
        // ===== TOTALI =====
        // Linea separatore
        doc.setDrawColor(200, 200, 200);
        doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        doc.setFont('helvetica', 'normal');
        doc.text('Subtotale:', pageWidth - margin - 60, yPos);
        doc.text(`\u20ac${parseFloat(order.subtotal).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
        yPos += 6;
        
        doc.text('IVA (22%):', pageWidth - margin - 60, yPos);
        doc.text(`\u20ac${parseFloat(order.tax).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
        yPos += 6;
        
        // Linea prima del totale
        doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('TOTALE:', pageWidth - margin - 60, yPos);
        doc.text(`\u20ac${parseFloat(order.total).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
        yPos += 10;
        
        // ===== NOTE (se presenti) =====
        if (order.notes) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('NOTE:', margin, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            
            // Split notes in multiple lines if needed
            const splitNotes = doc.splitTextToSize(order.notes, pageWidth - 2 * margin - 10);
            doc.text(splitNotes, margin + 5, yPos);
            yPos += splitNotes.length * 5;
        }
        
        // ===== FOOTER =====
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Documento generato automaticamente da Ipermela Store Management System', pageWidth / 2, pageHeight - 10, { align: 'center' });
        
        // Salva PDF
        const fileName = `Ordine_${order.id}_${order.customer_name.replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);
        
        showNotification('PDF scaricato con successo! \u2713', 'success');
    } catch (err) {
        console.error('Errore generazione PDF:', err);
        showNotification('Errore nella generazione del PDF', 'error');
    }
}

// Genera PDF con tutti gli ordini
async function generateAllOrdersPDF() {
    try {
        if (savedOrders.length === 0) {
            alert('Nessun ordine da esportare!');
            return;
        }
        
        showNotification(`Generazione PDF di ${savedOrders.length} ordini...`, 'info');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;
        let isFirstPage = true;
        
        // ===== HEADER PRIMA PAGINA =====
        if (logoBase64) {
            try {
                doc.addImage(logoBase64, 'PNG', margin, yPos, 40, 15);
                yPos += 20;
            } catch (err) {
                console.error('Errore inserimento logo:', err);
                doc.setFontSize(20);
                doc.setFont('helvetica', 'bold');
                doc.text('IPERMELA STORE', margin, yPos);
                yPos += 15;
            }
        } else {
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('IPERMELA STORE', margin, yPos);
            yPos += 15;
        }
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Apple Premium Reseller', margin, yPos);
        yPos += 5;
        doc.text('Thiene (VI) - Cassola (VI)', margin, yPos);
        yPos += 15;
        
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        
        // Titolo documento
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('REPORT TUTTI GLI ORDINI', margin, yPos);
        yPos += 7;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Data generazione: ${new Date().toLocaleString('it-IT')}`, margin, yPos);
        yPos += 10;
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
        
        // ===== SUMMARY TABLE =====
        doc.setFont('helvetica', 'bold');
        doc.text('RIEPILOGO ORDINI:', margin, yPos);
        yPos += 7;
        
        // Header tabella summary
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('#', margin + 2, yPos);
        doc.text('Cliente', margin + 15, yPos);
        doc.text('Data', pageWidth - margin - 80, yPos);
        doc.text('Prodotti', pageWidth - margin - 40, yPos);
        doc.text('Totale', pageWidth - margin - 15, yPos, { align: 'right' });
        yPos += 8;
        
        // Ordini summary
        doc.setFont('helvetica', 'normal');
        savedOrders.forEach((order, index) => {
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = margin;
            }
            
            if (index % 2 === 1) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 7, 'F');
            }
            
            const customerName = order.customer_name.length > 30 ? order.customer_name.substring(0, 27) + '...' : order.customer_name;
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
            doc.text(`#${order.id}`, margin + 2, yPos);
            doc.text(customerName, margin + 15, yPos);
            doc.text(order.date.substring(0, 10), pageWidth - margin - 80, yPos);
            doc.text(itemCount.toString(), pageWidth - margin - 40, yPos);
            doc.text(`\u20ac${parseFloat(order.total).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
            yPos += 7;
        });
        
        // Totale generale
        yPos += 5;
        doc.setDrawColor(200, 200, 200);
        doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
        yPos += 7;
        
        const grandTotal = savedOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('TOTALE GENERALE:', pageWidth - margin - 80, yPos);
        doc.text(`\u20ac${grandTotal.toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
        
        // ===== DETTAGLI ORDINI (nuove pagine) =====
        for (let i = 0; i < savedOrders.length; i++) {
            const order = savedOrders[i];
            
            doc.addPage();
            yPos = margin;
            
            // Header ordine dettaglio
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`ORDINE #${order.id}`, margin, yPos);
            yPos += 10;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Data: ${order.date}`, margin, yPos);
            yPos += 7;
            
            // Cliente
            doc.setFont('helvetica', 'bold');
            doc.text('CLIENTE:', margin, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            doc.text(`${order.customer_name}`, margin + 5, yPos);
            yPos += 5;
            if (order.customer_email) {
                doc.text(`Email: ${order.customer_email}`, margin + 5, yPos);
                yPos += 5;
            }
            if (order.customer_phone) {
                doc.text(`Tel: ${order.customer_phone}`, margin + 5, yPos);
                yPos += 5;
            }
            yPos += 5;
            
            // Prodotti
            doc.setFont('helvetica', 'bold');
            doc.text('PRODOTTI:', margin, yPos);
            yPos += 7;
            
            // Header tabella prodotti
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text('Prodotto', margin + 2, yPos);
            doc.text('Qt\u00e0', pageWidth - margin - 60, yPos);
            doc.text('Prezzo', pageWidth - margin - 40, yPos);
            doc.text('Totale', pageWidth - margin - 15, yPos, { align: 'right' });
            yPos += 8;
            
            // Righe prodotti
            doc.setFont('helvetica', 'normal');
            order.items.forEach((item, idx) => {
                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = margin;
                }
                
                if (idx % 2 === 1) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 7, 'F');
                }
                
                const productName = item.name.length > 70 ? item.name.substring(0, 67) + '...' : item.name;
                const itemTotal = item.price * item.quantity;
                
                doc.text(productName, margin + 2, yPos);
                doc.text(item.quantity.toString(), pageWidth - margin - 60, yPos);
                doc.text(`\u20ac${item.price.toFixed(2)}`, pageWidth - margin - 40, yPos);
                doc.text(`\u20ac${itemTotal.toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
                yPos += 7;
            });
            
            // Totali ordine
            yPos += 5;
            doc.setDrawColor(200, 200, 200);
            doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
            yPos += 7;
            
            doc.text('Subtotale:', pageWidth - margin - 60, yPos);
            doc.text(`\u20ac${parseFloat(order.subtotal).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
            yPos += 6;
            doc.text('IVA:', pageWidth - margin - 60, yPos);
            doc.text(`\u20ac${parseFloat(order.tax).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
            yPos += 6;
            doc.line(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.text('TOTALE:', pageWidth - margin - 60, yPos);
            doc.text(`\u20ac${parseFloat(order.total).toFixed(2)}`, pageWidth - margin - 15, yPos, { align: 'right' });
            
            // Note
            if (order.notes) {
                yPos += 10;
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text('NOTE:', margin, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                const splitNotes = doc.splitTextToSize(order.notes, pageWidth - 2 * margin - 10);
                doc.text(splitNotes, margin + 5, yPos);
            }
        }
        
        // Footer ultima pagina
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Report generato automaticamente da Ipermela Store Management System', pageWidth / 2, pageHeight - 10, { align: 'center' });
        
        // Salva PDF
        const fileName = `Tutti_gli_ordini_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showNotification(`PDF di ${savedOrders.length} ordini scaricato! \u2713`, 'success');
    } catch (err) {
        console.error('Errore generazione PDF:', err);
        showNotification('Errore nella generazione del PDF', 'error');
    }
}

// Carica logo all'avvio dell'app
if (document.readyState === 'loading') {
    // Logo loading removed - caused CORS errors
} else {
    // Logo loading removed - caused CORS errors
}