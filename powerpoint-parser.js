// Sample YAML string
const yamlString = `
presentation:
  title: "My YAML Presentation"
  slides:
    - title: "Welcome Slide"
      content:
        - type: "text"
          value: "Welcome to the Presentation"
        - type: "bullet_points"
          points:
            - "Introduction"
            - "Agenda"
            - "Goals"
    - title: "Introduction"
      content:
        - type: "text"
          value: "This slide introduces the main topics."
        - type: "image"
          src: "intro_image.png"
        - type: "bullet_points"
          points:
            - "Topic 1: Overview"
            - "Topic 2: Details"
            - "Topic 3: Summary"
    - title: "Conclusion"
      content:
        - type: "text"
          value: "Thank you for attending!"
        - type: "bullet_points"
          points:
            - "Questions"
            - "Feedback"
            - "Next Steps"
`;

// Parse the YAML string
const presentation = jsyaml.load(yamlString);

// Function to create a slide
function createSlide(slide) {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide';

    const title = document.createElement('h2');
    title.textContent = slide.title;
    slideDiv.appendChild(title);

    slide.content.forEach(item => {
        if (item.type === 'text') {
            const p = document.createElement('p');
            p.textContent = item.value;
            slideDiv.appendChild(p);
        } else if (item.type === 'bullet_points') {
            const ul = document.createElement('ul');
            ul.className = 'bullet-points';
            item.points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                ul.appendChild(li);
            });
            slideDiv.appendChild(ul);
        } else if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = slide.title;
            img.style.maxWidth = '100%';
            slideDiv.appendChild(img);
        }
    });

    return slideDiv;
}

// Function to display the presentation
function displayPresentation(presentation) {
    const presentationDiv = document.getElementById('presentation');

    presentation.slides.forEach(slide => {
        const slideDiv = createSlide(slide);
        presentationDiv.appendChild(slideDiv);
    });
}

// Display the presentation
displayPresentation(presentation);
