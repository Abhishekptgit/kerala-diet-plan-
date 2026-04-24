document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diet-form');
    const formSection = document.getElementById('form-section');
    const resultSection = document.getElementById('result-section');
    const generateAgainBtn = document.getElementById('generate-again');
    
    // Kerala Diet Options
    const vegMeals = {
        breakfast: [
            "Puttu with Kadala Curry (Black Chickpeas)",
            "Appam with Vegetable Stew",
            "Idli with Sambar and Coconut Chutney",
            "Upma with Mixed Vegetables",
            "Wheat Dosa with Tomato Chutney",
            "Oats Porridge with Fruits and Nuts"
        ],
        lunch: [
            "Kerala Matta Rice (1/2 cup), Sambar, Cabbage Thoran, Cucumber Salad",
            "Matta Rice, Moru Curry (Spiced Buttermilk), Beans Mezhukkupuratti",
            "Chapati (2), Dal Curry, Mixed Veg Avial",
            "Matta Rice, Pachadi, Pumpkin Erissery, Side Salad"
        ],
        dinner: [
            "Wheat Dosa (2) with Onion Chutney",
            "Chapati (2) with Vegetable Kurma",
            "Kanji (Rice Gruel) with Cherupayar (Green Gram) and Pappadam",
            "Upma with a side of Steamed Vegetables"
        ]
    };

    const nonVegMeals = {
        breakfast: [
            "Puttu with Egg Roast",
            "Appam with Chicken Stew (less coconut milk)",
            "Idiyappam with Egg Curry",
            "Wheat Dosa with Egg Bullseye",
            ...vegMeals.breakfast.slice(0, 3) // Add some veg breakfasts too
        ],
        lunch: [
            "Kerala Matta Rice (1/2 cup), Meen Mulakittathu (Spicy Fish Curry), Cabbage Thoran, Salad",
            "Matta Rice, Nadan Chicken Curry (less oil), Cucumber Pachadi",
            "Matta Rice, Ayala (Mackerel) Curry, Beans Mezhukkupuratti",
            "Chapati (2), Kerala Beef Ularthiyathu (small portion, lean), Salad"
        ],
        dinner: [
            "Chapati (2) with Chicken Roast",
            "Grilled Karimeen (Pearl Spot) with Steamed Veggies",
            "Wheat Dosa with Egg Curry",
            "Kanji with leftover Fish Curry and Cherupayar"
        ]
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const preference = document.getElementById('preference').value;
        const deficit = parseInt(document.getElementById('goal').value);

        // Calculate BMR (Mifflin-St Jeor Equation)
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Calculate TDEE
        const tdee = bmr * activity;

        // Target Calories
        let targetCalories = Math.round(tdee - deficit);
        
        // Safety check (Don't go too low)
        if (gender === 'male' && targetCalories < 1500) targetCalories = 1500;
        if (gender === 'female' && targetCalories < 1200) targetCalories = 1200;

        // Calculate Water Intake (approx 0.033 L per kg)
        const waterIntake = (weight * 0.033).toFixed(1);

        // Display Summary
        document.getElementById('target-calories').textContent = `${targetCalories} kcal`;
        document.getElementById('water-intake').textContent = `${waterIntake} L`;

        // Generate Plan
        generateMealPlan(preference);

        // Switch Views
        formSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        resultSection.classList.add('fade-in');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    generateAgainBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        formSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function generateMealPlan(pref) {
        const container = document.getElementById('meal-plan-container');
        container.innerHTML = '';
        
        const source = pref === 'veg' ? vegMeals : nonVegMeals;

        for (let i = 1; i <= 7; i++) {
            // Get random meals
            const bfast = source.breakfast[Math.floor(Math.random() * source.breakfast.length)];
            const lunch = source.lunch[Math.floor(Math.random() * source.lunch.length)];
            const dinner = source.dinner[Math.floor(Math.random() * source.dinner.length)];

            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            dayCard.innerHTML = `
                <h3>Day ${i}</h3>
                <div class="meal">
                    <strong>Breakfast:</strong>
                    <span>${bfast}</span>
                </div>
                <div class="meal">
                    <strong>Lunch:</strong>
                    <span>${lunch}</span>
                </div>
                <div class="meal">
                    <strong>Dinner:</strong>
                    <span>${dinner}</span>
                </div>
            `;
            container.appendChild(dayCard);
        }
    }
});
