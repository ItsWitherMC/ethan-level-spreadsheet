const Mee6LevelsApi = require('mee6-levels-api');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('11vKOoaNwXAYuSHGJPGLLZHKwp9cdTNENCmRfbTKgrZ4');
const config = require('./config.json');
var players = []
var c = 5

Mee6LevelsApi.getLeaderboardPage(config.guildId, 100, 0).then(data => {
    players = data;
})

doc.useServiceAccountAuth(require('./mcagical-credentials-thingy.json'))
doc.loadInfo().then(async function() {
    let sheets = doc.sheetsById[585106178]
    await sheets.loadCells('A1:I106')
    let y = 0
    players.forEach(async x => {
        c += 1;
        y += 1;
        sheets.getCellByA1('A' + c).value = x.rank
        sheets.getCellByA1('B' + c).value = x.tag
        sheets.getCellByA1('C' + c).value = x.id
        sheets.getCellByA1('D' + c).value = x.avatarUrl
        sheets.getCellByA1('E' + c).value = x.level
        sheets.getCellByA1('F' + c).value = x.xp.totalXp
        sheets.getCellByA1('G' + c).value = x.message
        sheets.getCellByA1('H' + c).value = x.xp.userXp
        sheets.getCellByA1('I' + c).value = x.xp.levelXp
        console.log('Updating Spreadsheet | ' + Math.floor(y / players.length * 100) + '%')
    })
    let z = new Date()
    sheets.getCellByA1('A2').value = 'Last update - ' + z;
    await sheets.saveUpdatedCells()
    console.log('Completed')

})



/*
{
    id: '569440914695782401',
    level: 10,
    username: '[Admin] Bill Cipher',
    discriminator: '6075',
    avatarUrl: 'https://cdn.discordapp.com/avatars/569440914695782401/a12d29c174e6a8161a16f77a0677871d?size=2048',
    tag: '[Admin] Bill Cipher#6075',
    xp: { userXp: 502, levelXp: 1100, totalXp: 5177 },
    rank: 100
  },
*/

