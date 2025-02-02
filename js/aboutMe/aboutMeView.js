function updateViewAboutMe() {
    app.innerHTML += `

        
    <!-- About Section -->
    <section id="about" class="about-me">
        <h2>Om Meg</h2>
        <p><strong>Navn:</strong> Rebecka</p>
        <p><strong>Alder:</strong> 30 år gammel</p>
        <p><strong>Hva jeg gjør:</strong> Jeg selger strikketøy.</p>
        <p>Jeg brenner for å lage koselige og vakre strikkede produkter som gir både varme og stil til livet ditt. Enten det er en håndlaget genser, skjerf eller teppe, legger jeg kjærlighet i hvert eneste sting!</p>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery">
        <h2>Galleri</h2>
        <div class="gallery-grid">
            <div class="gallery-item"><img src="source/img/floreal-top1.png" alt="Strikketøy 1"></div>
            <div class="gallery-item"><img src="source/img/floreal-top1.png" alt="Strikketøy 2"></div>
            <div class="gallery-item"><img src="source/img/floreal-top1.png" alt="Strikketøy 3"></div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <h2>Kontakt Meg</h2>
        <form action="submit_form.php" method="POST">
            <label for="name">Navn:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">E-post:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Melding:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Send Melding</button>
        </form>
    </section>



`; 
}