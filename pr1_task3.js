// Масив об'єктів employees
const employees = [
    {
        name: "Іван Іванов",
        position: "Front-end розробник",
        salary: 32000,
        years: 2
    },
    {
        name: "Марія Петренко",
        position: "Back-end розробник",
        salary: 38000,
        years: 4
    },
    {
        name: "Олег Коваль",
        position: "Тестер",
        salary: 25000,
        years: 3
    },
    {
        name: "Анна Шевченко",
        position: "Project Manager",
        salary: 42000,
        years: 6
    }
];

// 1) Функція getAverageSalary – середня зарплата всіх працівників
function getAverageSalary(employeesArray) {
    if (employeesArray.length === 0) {
        return 0;
    }

    const total = employeesArray.reduce((sum, employee) => {
        return sum + employee.salary;
    }, 0);

    return total / employeesArray.length;
}

// 2) Функція findMostExperiencedEmployee – працівник з найбільшим досвідом
function findMostExperiencedEmployee(employeesArray) {
    if (employeesArray.length === 0) {
        return null;
    }

    return employeesArray.reduce((mostExperienced, current) => {
        return current.years > mostExperienced.years ? current : mostExperienced;
    }, employeesArray[0]);
}

// ================== РОБОТА З DOM ==================

document.addEventListener("DOMContentLoaded", () => {
    const employeesListEl = document.getElementById("employees-list");
    const avgSalaryEl = document.getElementById("avg-salary");
    const mostExperiencedEl = document.getElementById("most-experienced");

    const avgBtn = document.getElementById("avg-salary-btn");
    const mostExpBtn = document.getElementById("most-exp-btn");

    // Виводимо список працівників у <pre>
    employeesListEl.textContent = JSON.stringify(employees, null, 2);

    // Обробник кнопки "Обчислити середню зарплату"
    avgBtn.addEventListener("click", () => {
        const avg = getAverageSalary(employees);
        avgSalaryEl.textContent = avg.toFixed(2) + " грн";
        console.log("Середня зарплата:", avg);
    });

    // Обробник кнопки "Знайти найдосвідченішого працівника"
    mostExpBtn.addEventListener("click", () => {
        const mostExperienced = findMostExperiencedEmployee(employees);
        if (mostExperienced) {
            mostExperiencedEl.textContent = JSON.stringify(mostExperienced, null, 2);
            console.log("Найдосвідченіший працівник:", mostExperienced);
        } else {
            mostExperiencedEl.textContent = "Немає працівників.";
        }
    });
});
