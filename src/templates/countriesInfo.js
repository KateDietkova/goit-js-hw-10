
<script id="entry-template" type="text/x-handlebars-template">
    {/* {{#each countries}} */}
        <ul>
            <li class="info-item">
                <img class='flag-img' src=${flags.svg} alt='${name}'>
                <p class="info-text country-name">${name}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Capital</p> 
                <p class="info-text">${capital}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Population</p> 
                <p class="info-text">${population}</p>
            </li>
            <li class="info-item">
                <p class='info-subtitle'>Languages</p>
                <p class="info-text">${languages}</p>
            </li>
        </ul>
    {/* {{/each}} */}
</script>