function dane() {
    var req = new XMLHttpRequest();
    let post1, post2;

    // Tabela 1
    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A', false);
    req.send();

    if (req.status == 200 || req.readyStatus == 4) {
        post1 = JSON.parse(req.responseText);
    } else {
        alert('Nie udało się nawiązać połączenia');
    }

    //console.log(post1[0]['rates'])


    let tablica_pomocnicza = ['Kurs']
    let tablica_nazw = ['x']


    for (x = 0; x < post1[0]['rates'].length; x++) {
 
        tablica_nazw.push(post1[0]['rates'][x]['currency'])
        tablica_pomocnicza.push(post1[0]['rates'][x]['mid'])

    }

    // Tabela 2
    req.open('GET', 'https://randomuser.me/api/?results=50&inc=dob,gender,nat', false);
    req.send();

    if (req.status == 200 || req.readyStatus == 4) {
        post2 = JSON.parse(req.responseText);
    } else {
        alert('Nie udało się nawiązać połączenia');
    }

    const exchangeRates = post1[0].rates;
//zainicjowanie tablicy exchangerate, na podstawie CONSTANT (to wlasnie znaczy const), czyli stalej referencji do post1

    const exchangeRatesHTML = document.getElementById('exchangeRates');

    exchangeRates.forEach(rate => {
        let tr = '<tr>';

        tr += '<td>' + rate.currency + '</td> <td>' + rate.code + '</td> <td>' + rate.mid + '</td> </tr>';

        exchangeRatesHTML.innerHTML += tr;
    });
//wiersz po wierszu dodaje sie to do elementu o id exchange rates, w drugiej podobnej konstrukcji tam na dole wytlumaczylam to lepiej 

    const randomUsers = post2.results;

    const usersDataHTML = document.getElementById('usersData');
    
var narodowosci ={'ES':0,'BR':0,'CH':0,'FR':0,'FI':0,'DE':0,'CA':0,'NO':0,'IR':0,'NZ':0,'AU':0,'IE':0,'NO':0,'CH':0,'TR':0,'NL':0,'US':0, 'GB':0,'DK':0}
 randomUsers.forEach(user => {
        let tr = '<tr>';

        tr += '<td>' + user.gender + '</td> <td>' + user.dob.date + '</td> <td>' + user.dob.age + '</td> <td>' + user.nat + '</td> </tr>';
        
        usersDataHTML.innerHTML += tr;
        narodowosci[user.nat] += 1
    });
    //wypelnianie sie tabelki w html, kazdy wiersz dostaje dane z post2, no i te tagi htmlowe zeby one mogly potem wejsc do tabelki i robic za table row - rzedy tabeli <tr></tr> i table data - komorki z pojedynczymi danymi tabeli <td></td> 
    
    var dane_narodowosci = new Array()
    for(key in narodowosci){
        dane_narodowosci.push([key,narodowosci[key]])
    }
    /* zainicjowanie zmiennej dane_narodowosci 
    teraz petla ktora do tego slownika ktory jest u gory, tego z nazwami krajow i zerami jedynke za kazdym razem kiedy w narodowosciach wystepuje ten klucz do ktorego ten klucz jest przypisany xD 
    liczy po prostu wystapienia kazdej narodowosci w zbiorze danych 
    */ 
bb.generate({
    bindto:"#chart2"
,data:{
    type:'pie',
    columns:dane_narodowosci
    }
})
// generujemy pierwszy wykresik typu pie, bindto znaczy tyle "do czego zwiąż wykres" i tu podajemy element ktory w HTML ma tag, w tym przypadku chart 2 to jest wazne, to jest jedyna rzecz ktora w htmlu zrobiles ty 
//dane z ktorego ten wykresik bedzie sciagal to jest ten slownik ktory wczesniej zapelnilismy liczbami we wczesniejszej petli 
bb.generate({
    bindto: "#chart1",
    data: {
        x: 'x',
        type: "bar",
        columns: [tablica_nazw, tablica_pomocnicza]
    },
    axis:{
        x:{
            type:'category',
            tick:{
                culling:false,
                rotate: 25, 
                mulitline: false
            }
        }
    }
    });
/*generujemy drugi wykresik,
znowu tutaj odwolujesz sie do tego taga chart1
 typ slupkowy 
dane, na podstawie ktorych generujemy wykres to tablica nazw i tablica pomocnicza, tablica nazw zawiera w sobie nazwy walut, tablica pomocnicza wartosci kursow 
culling - zabiera co ktoras z opisow - jest na false, wiec wylaczone
rotate - wychyla napisy 
multiline - robi wieloliniowe napisy - jest na false 
*/
}
