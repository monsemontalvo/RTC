document.addEventListener('DOMContentLoaded', () => {
    const teams = [
        'Japón', 'Irán', 'Corea del Sur', 'Australia', 'Arabia Saudita', 'Qatar', 'Irak', 'Emiratos Árabes Unidos',
        'Nigeria', 'Senegal', 'Egipto', 'Marruecos', 'Camerún', 'Argelia', 'Túnez', 'Ghana', 'Costa de Marfil',
        'México', 'Estados Unidos', 'Canadá', 'Costa Rica', 'Panamá', 'Jamaica',
        'Argentina', 'Brasil', 'Uruguay', 'Colombia', 'Ecuador', 'Perú',
        'Nueva Zelanda',
        'Francia', 'Inglaterra', 'España', 'Alemania', 'Países Bajos', 'Portugal', 'Bélgica', 'Italia', 'Croacia', 'Suiza', 'Dinamarca', 'Serbia', 'Polonia', 'Suecia', 'Noruega', 'Ucrania',
        'Chile', 'Honduras'
    ];

    const startBtn = document.getElementById('start-simulation');
    const loaderContainer = document.getElementById('loader-container');
    const loaderBar = document.getElementById('loader-bar');
    const groupsContainer = document.getElementById('groups-container');
    const knockoutContainer = document.getElementById('knockout-container');
    const groupStageSection = document.getElementById('group-stage-section');
    const knockoutSection = document.getElementById('knockout-section');
    const winnerDisplay = document.getElementById('winner-display');

    const delay = ms => new Promise(res => setTimeout(res, ms));

    startBtn.addEventListener('click', async () => {
        startBtn.disabled = true;
        await runSimulation();
        startBtn.disabled = false;
    });
    
    
    // función se encarga de animar la barra de carga 
    async function animateLoader() {
        loaderBar.textContent = '0%';
        for (let i = 0; i <= 100; i++) {
            loaderBar.style.width = `${i}%`;
            loaderBar.textContent = `${i}%`;
            await delay(100); // Aumenta este valor para hacerlo mas lento
        }
    }
    
    //No ocupa descripcion pero por si se me olvida que me conozco, funcion para resetear el simulador
    function resetSimulation() {
        groupsContainer.innerHTML = '';
        knockoutContainer.innerHTML = '';
        groupStageSection.style.display = 'none';
        knockoutSection.style.display = 'none';
        winnerDisplay.style.display = 'none';
        loaderContainer.classList.remove('visible');
        loaderBar.style.width = '0%'; // Reinicia la barra
    }

    // Funcion para mostrar los resutados 
    async function runSimulation() {
        resetSimulation();
        loaderContainer.classList.add('visible');

        await animateLoader();
        
        groupStageSection.style.display = 'block';
        const groups = createGroups(shuffleArray([...teams]));
        
        const thirdPlacedTeams = [];
        const groupWinnersAndRunnersUp = [];

        for (const groupName in groups) {
            const groupTeams = groups[groupName];
            for (let i = 0; i < groupTeams.length; i++) {
                for (let j = i + 1; j < groupTeams.length; j++) {
                    simulateMatch(groupTeams[i], groupTeams[j]);
                }
            }
            
            groupTeams.sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
                if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
                return 0;
            });

            displayGroup(groupName, groupTeams);
            
            groupWinnersAndRunnersUp.push(groupTeams[0], groupTeams[1]);
            thirdPlacedTeams.push(groupTeams[2]);
            
            await delay(250); //para dar un delay entre cada fase de gpos
        }
        
        thirdPlacedTeams.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
            return 0;
        });
        
        const bestThirds = thirdPlacedTeams.slice(0, 8);
        await delay(700); //pausa pa dar emocion

        knockoutSection.style.display = 'block';
        let currentTeams = shuffleArray([...groupWinnersAndRunnersUp, ...bestThirds]);
        const roundNames = ['Dieciseisavos de Final', 'Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'];
        
        for (let i = 0; i < roundNames.length; i++) {
            const roundName = roundNames[i];
            const nextRoundTeams = [];
            const matches = [];

            for (let j = 0; j < currentTeams.length; j += 2) {
                const matchResult = simulateKnockoutMatch(currentTeams[j], currentTeams[j+1]);
                nextRoundTeams.push(matchResult.winner);
                matches.push(matchResult);
            }
            
            displayKnockoutRound(roundName, matches);
            currentTeams = nextRoundTeams.map(name => ({ name }));
            
            // pa que tarden mas las en salir las rondas finales
            if (currentTeams.length > 0) await delay(1000); 
        }
        
        winnerDisplay.innerHTML = `🏆 ¡${currentTeams[0].name} es el Campeón de la Copa Mundial 2026! 🏆`;
        winnerDisplay.style.display = 'block';
        
        await delay(500);
        loaderContainer.classList.remove('visible');
    }

    // Funcion que mezcla la lista 
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Funcion que crea a los grupos del torneo, esta agarra el arreglo ya mezclado y crea 12 gpos de 4 equipos
    function createGroups(shuffledTeams) {
        const groups = {};
        const groupNames = 'ABCDEFGHIJKL'.split('');
        for (let i = 0; i < 12; i++) {
            groups[groupNames[i]] = shuffledTeams.slice(i * 4, i * 4 + 4).map(team => ({
                name: team, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
            }));
        }
        return groups;
    }

    // Funcion que crea los recuadros con los resultados de pa fase de gpos
    function displayGroup(groupName, teams) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('card', 'group');
        let tableHtml = `<h3>Grupo ${groupName}</h3><table>
            <thead><tr><th class="team-name">Equipo</th><th>Pts</th><th>PJ</th><th>DG</th></tr></thead>
            <tbody>`;
        teams.forEach(team => {
             tableHtml += `<tr><td class="team-name">${team.name}</td><td>${team.points}</td><td>${team.played}</td><td>${team.goalDifference}</td></tr>`;
        });
        tableHtml += `</tbody></table>`;
        groupDiv.innerHTML = tableHtml;
        groupsContainer.appendChild(groupDiv);
    }
    
    // Funcion lo mismo que la de gpos pero para las rondas eliminatorias
    function displayKnockoutRound(roundName, matches) {
        const roundDiv = document.createElement('div');
        roundDiv.classList.add('card', 'knockout-round');
        let matchesHtml = `<h3>${roundName}</h3>`;
        matches.forEach(match => {
            const winnerClassA = match.winner === match.teamA ? 'winner' : '';
            const winnerClassB = match.winner === match.teamB ? 'winner' : '';
            matchesHtml += `
                <div class="match">
                    <span class="${winnerClassA}">${match.teamA}</span>
                    <span class="score">${match.scoreA} - ${match.scoreB}</span>
                    <span class="${winnerClassB}">${match.teamB}</span>
                </div>`;
        });
        roundDiv.innerHTML = matchesHtml;
        knockoutContainer.appendChild(roundDiv);
    }
    
    //  Funcion que simula los partidos de la fase de gpos y calcula la cantidad de puntos dependiendo el resultado para sacar los equipos que avanzan
    function simulateMatch(teamA, teamB) {
        const scoreA = Math.floor(Math.random() * 5);
        const scoreB = Math.floor(Math.random() * 5);

        teamA.played++; teamB.played++;
        teamA.goalsFor += scoreA; teamB.goalsFor += scoreB;
        teamA.goalsAgainst += scoreB; teamB.goalsAgainst += scoreA;
        teamA.goalDifference = teamA.goalsFor - teamA.goalsAgainst;
        teamB.goalDifference = teamB.goalsFor - teamB.goalsAgainst;

        if (scoreA > scoreB) {
            teamA.wins++; teamB.losses++; teamA.points += 3;
        } else if (scoreB > scoreA) {
            teamB.wins++; teamA.losses++; teamB.points += 3;
        } else {
            teamA.draws++; teamB.draws++; teamA.points++; teamB.points++;
        }
    }

    // Funcion parecida a la anterior, con diferencia de que no puede haber empates, por si pasas simplemente le suma un gol a algun equipo
    function simulateKnockoutMatch(teamA, teamB) {
        let scoreA = Math.floor(Math.random() * 4);
        let scoreB = Math.floor(Math.random() * 4);
        if (scoreA === scoreB) {
            Math.random() > 0.5 ? scoreA++ : scoreB++;
        }
        return {
            teamA: teamA.name, teamB: teamB.name, scoreA, scoreB,
            winner: scoreA > scoreB ? teamA.name : teamB.name
        };
    }
});