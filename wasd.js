var Main = "Main"
var Shop = "Shop"

var you = {
    "level": 1,
    "maxHp": 100,
    "health": 100,
    "power": 5,
    "defense": 5,
    "coins": 0,
    "xp": 0,
    currentSkill: "Strength",
    "Weapon": "none",
    "Armor": "none",
    "Necklace": "none",
    "Ring": "none",
    skillItems: [],
}

var save = {
    "you": "",
    "inv": [],
    "skills": "",
    "skillItems": [],
}

you.inv = ["Stick"]

var xpNeed = (Math.round(100*Math.pow(1.13,you.level-1)))

const Attacks = {
    "Punch": {power: 5},
}

const itemData = {
    "none": {name: "none", def: 0, atk: 0, hp: 0},

    //shop
    "Wooden Armor": {name: "Wooden Armor", price: 50, def: 5, atk: 0, hp: 0, level: 2, toolType: "armor"},
    "Wooden Sword": {name: "Wooden Sword", price: 50, def: 0, atk: 5, hp: 0, level: 2, toolType: "sword"},
    "Vitality Necklace": {name: "Vitality Necklace", price: 100, def: 0, atk: 0, hp: 50, level: 5, toolType: "neck"},
    "Iron Ring": {name: "Iron Ring", price: 600, def: 5, atk: 0, hp: 50, level: 10, toolType: "ring"},
    "Scimitar": {name: "Scimitar", price: 1100, def: 0, atk: 35, hp: 0, level: 20, toolType: "sword"},

    //skill
    "Dumbell": {name: "Dumbell", price: 1000, effect: 2, skill: "Strength", unlocked: false},
    "Ice Mountain": {name: "Ice Mountain", price: 1000, effect: 2, skill: "Endurance", unlocked: false},

    //enemy drops
    "Stick": {name: "Stick", price: 10, level: 1, def: 0, atk: 1, hp: 0, toolType: "sword"},
    "Katana": {name: "Katana", price: 250, level: 12, def: 0, atk: 23, hp: 0, toolType: "sword"},
    "Iron Longsword": {name: "Iron Longsword", price: 250, level: 15, def: 0, atk: 25, hp: 0, toolType: "sword"},
    "Pitchfork": {name: "Pitchfork", price: 200, level: 5, def: 0, atk: 10, hp: 0, toolType: "sword"},
    "Club": {name: "Club", level: 11, price: 300, def: 0, atk: 20, hp: 0, toolType: "sword"},
    "Sand Hammer": {name: "Sand Hammer", price: 1000, level: 27, def: 0, atk: 45, hp: 0, toolType: "sword"},
    "Undead Necklace": {name: "Sand Hammer", price: 600, level: 21, def: 0, atk: 10, hp: 100, toolType: "neck"},
    "Guardians Goblet": {name: "Guardians Goblet", price: 600, level: 20, def: 10, atk: 5, hp: 50, toolType: "ring"},
    "Sand Ring": {name: "Sand Ring", price: 700, level: 20, def: 5, atk: 15, hp: 0, toolType: "ring"},
}

var shopItem = ["Wooden Armor", "Wooden Sword", "Vitality Necklace", "Iron Ring", "Scimitar"]

const skillItem = ["Dumbell", "Ice Mountain"]

const itemTooltip = {
    //shop
    "Wooden Armor": "A cheap armor made of wood. Will probably break from sword slashes but still protect you from punches.",
    "Wooden Sword": "A sword made of wood. Suitable for training sword fight but will not slash like a real sword.",
    "Vitality Necklace": "A necklace with a magical gem. you are feeling better just by wearing it.",
    "Iron Ring": "An ordinary ring made out of iron. This ring has magic that can empower its user.",
    "Scimitar": "A single-edge curved blade sword made to slice through your enemies on horse back. Your not on a horse though.", 

    //enemy drops
    "Stick": "Just a tree branch. Hit your enemies with the stick until they say 'please stop'. they ususally dont.",
    "Katana": "The Katana is a single-edge curved japanese sword made to slice your enemies. Not the best at thrusting.",
    "Iron Longsword": "The Longsword is a double-edge straight sword with a long reach. Not the best at slicing.",
    "Pitchfork": "This Pitchfork obtained from goblins are stolen from unlucky farmers who were raided by goblins.",
    "Club": "A very large tree branch that has been turned into a weapon by the ogre.",
    "Sand Hammer": "A hammer made out of the sands of the Sand Golem. Very powerful.",
    "Undead Necklace": "A necklace from the undead mummy, probably more than 1000 years old.",
    "Guardians Goblet": "This goblet originally belong to powerful warriors who challenged the Desert. Unfortunately, they did not return.",
    "Sand Ring": "A ring made of the sand of the Sand Golem. Contains sand magic used by the Sand Golem",

    //skill item
    "Dumbell": "Two weights connected by a rod. Very effective in helping you get stronger.",
    "Ice Mountain": "Training here is much more challenging and will help your body become stronger.",
}

var skills = {
    "Strength": {name: "Strength", xp: 10, maxXp: 100, effect: 0.05, level: 0},
    "Endurance": {name: "Endurance", xp: 10, maxXp: 100, effect: 0.05, level: 0},
}

var skillsList = ["Strength", "Endurance"]

var Enemy = {
    "name": null,
    "health": 0,
    "power": 0,
    "def": 0,
    "bounty": 0,
    "xp": 0,
    "level": 0,
}

const enemyData = {
    //forest
    "Goblin": {id: "Goblin", hp: 100, power: 10, def: 3, bounty: 25, xp: 15, level: 3, item: ["Pitchfork"], itemChance: [200]},
    "Tree Monster": {id: "Tree Monster", hp: 150, power: 15, def: 1, bounty: 20, xp: 35, level: 5, item: ["Stick"], itemChance: [1]},
    "Slime": {id: "Slime", hp: 60, power: 7, def: 2, bounty: 5, xp: 10, level: 2, item: [""], itemChance: [0]},
    "Ogre": {id: "Ogre", hp: 250, power: 25, def: 7, bounty: 100, xp: 75, level: 15, item: ["Club"], itemChance: [200]},

    //desert
    "Mummy": {id: "Mummy", hp: 150, power: 14, def: 12, bounty: 65, xp: 45, level: 15, item: ["Undead Necklace"], itemChance: [100]},
    "Scorpion": {id: "Scorpion", hp: 130, power: 20, def: 10, bounty: 50, xp: 30, level: 18, item: [""], itemChance: [0]},
    "Skeleton": {id: "Skeleton", hp: 200, power: 25, def: 15, bounty: 110, xp: 65, level: 20, item: ["Guardians Goblet"], itemChance: [50]},
    "Sand Golem": {id: "Sand Golem", hp: 350, power: 35, def: 25, bounty: 225, xp: 110, level: 35, item: ["Sand Hammer", "Sand Ring"], itemChance: [100, 100]},
}

var enemys = ["Goblin", "Tree Monster", "Slime"]

var bosses = ["Ogre"]

const Areas = ["Forest", "Desert"]

const areaList = {
    "Forest": {level: 0, enemy: ["Goblin", "Tree Monster", "Slime"], boss: ["Ogre"]},
    "Desert": {level: 15, enemy: ["Mummy", "Scorpion", "Skeleton"], boss: ["Sand Golem"]},
}

function startPerson() {
    var health = document.getElementById("urHp")
    var power = document.getElementById("urPower")
    var defense = document.getElementById("urDef")

    health.innerHTML = "Health: "+you.health
    power.innerHTML = "Power: "+you.power
    defense.innerHTML = "Defense: "+you.defense
}

function getCoin() {
    you.coins += Enemy.bounty
}

function gainXp() {
    you.xp += Enemy.xp
    while (you.xp >= Math.round(100*Math.pow(1.1,(you.level-1)))) {
    you.xp -= Math.round(100*Math.pow(1.1,(you.level-1)))
    you.level += 1
    document.getElementById("level").innerHTML = "Level: "+you.level
    }
}

function setEnemy() {
    var name = document.getElementById("name")
    var health = document.getElementById("health")
    var power = document.getElementById("power")
    var level = document.getElementById("enemyLevel")
    var icon = document.getElementById("enemyIcon")
    
    var random = Math.floor(Math.random() * (enemys.length)) + 1
    var enemy = enemyData[enemys[(random-1)]]
    
    name.innerHTML = enemy.id
    health.innerHTML = "Health: "+enemy.hp
    power.innerHTML = "Power: "+enemy.power
    level.innerHTML = "Level: "+enemy.level
    icon.src = "img/" + enemy.id + ".jpg"

    Enemy.name = enemy.id
    Enemy.health = enemy.hp
    Enemy.power = enemy.power
    Enemy.def = enemy.def
    Enemy.bounty = enemy.bounty
    Enemy.xp = enemy.xp
    Enemy.level = enemy.level
}

function setBoss() {
    var name = document.getElementById("name")
    var health = document.getElementById("health")
    var power = document.getElementById("power")
    var level = document.getElementById("enemyLevel")
    var icon = document.getElementById("enemyIcon")
    
    var random = Math.floor(Math.random() * (bosses.length)) + 1
    var boss = enemyData[bosses[(random-1)]]
    
    name.innerHTML = boss.id
    health.innerHTML = "Health: "+boss.hp
    power.innerHTML = "Power: "+boss.power
    level.innerHTML = "Level: "+boss.level
    icon.src = "img/" + boss.id + ".jpg"

    Enemy.name = boss.id
    Enemy.health = boss.hp
    Enemy.power = boss.power
    Enemy.bounty = boss.bounty
    Enemy.xp = boss.xp
    Enemy.level = boss.level
}

function fight(attack) {
    var Coins = document.getElementById("coins")
    var xp = document.getElementById("xp")
    if (Enemy.health <= 0) {
        getCoin()
        gainXp()
        Coins.innerHTML = "Coins: "+you.coins
        xp.innerHTML = "Xp: "+you.xp+"/"+Math.round(100*Math.pow(1.1,(you.level-1)))
        itemEnemyDrop(Enemy.name)
        setEnemy()
    } else {
        if (you.health > 0) {
            you.health -= Math.ceil(Enemy.power*(Enemy.level/you.defense)*Math.random())
            Enemy.health -= Math.ceil((you.power*attack.power*getSkillEffect(skills['Strength']))/Enemy.level)
        }

        var youData = document.getElementById("urHp")
        var enemyData = document.getElementById("health")
    
        youData.innerHTML = "Health: " + you.health
        enemyData.innerHTML = "Health: " + Enemy.health
    }
}

function itemEnemyDrop(enemy) {
    var item = enemyData[enemy].item
    var chance = enemyData[enemy].itemChance

    for (let i=0; item.includes(item[i]); i++) {
        if ((Math.random()*1000) < chance[i]) {
            if (!you.inv.includes(item[i])) {
                you.inv[you.inv.length] = item[i]
                createInvItem(item[i])
                getItem(item[i])
            }
        }
    }
}

function equip(item) {
    if (itemData[item].level <= you.level) {
        if (itemData[item].toolType == "sword") {
            you.Weapon = item
            document.getElementById("weaponEquip").innerHTML = "Weapon: "+item
        } else if (itemData[item].toolType == "armor") {
            you.Armor = item
            document.getElementById("armorEquip").innerHTML = "Armor: "+item
        } else if (itemData[item].toolType == "neck") {
            you.Necklace = item
            document.getElementById("neckEquip").innerHTML = "Amulet: "+item
        } else if (itemData[item].toolType == "ring") {
            you.Ring = item
            document.getElementById("ringEquip").innerHTML = "Ring: "+item
        }
        you.power = 5 + itemData[item].atk
        you.defense = 5 + itemData[item].def
        you.maxHp = 100 + itemData[item].hp
    }
    setStats()
}

function setStats() {
    you.power = 5 + itemData[you.Weapon].atk + itemData[you.Armor].atk + itemData[you.Necklace].atk + itemData[you.Ring].atk
    you.defense = 5 + itemData[you.Weapon].def + itemData[you.Armor].def + itemData[you.Necklace].def + itemData[you.Ring].def
    you.maxHp = 100 + itemData[you.Weapon].hp + itemData[you.Armor].hp + itemData[you.Necklace].hp + itemData[you.Ring].hp
}

function buy(element,item) {
    var coin = document.getElementById("coins")
    if (you.coins >= itemData[item].price && you.level >= itemData[item].level && !you.inv.includes(item)) {
        you.coins -= itemData[item].price
        coins.innerHTML = "Coins: "+you.coins
        you.inv.push(item)
        createInvItem(item)
    }
}

function buySkill(element,item) {
    var coin = document.getElementById("coins")
    if (you.coins >= itemData[item].price) {
        you.coins -= itemData[item].price
        itemData[item].unlocked = true
        you.skillItems.push(item)
        coins.innerHTML = "Coins: "+you.coins
        document.getElementById(element).disabled = true
    }
}

function sellItem(item) {
    if (item != "Stick") {
        you.coins += itemData[item].price * 0.6
        var i = 0
        while (you.inv[i] != item) {i += 1}
        delete you.inv[i]
        document.getElementById("inv "+item).remove()
    }
}

function resetHp() {
    if (you.coins > 0) {
        if (Enemy.health >= enemyData[Enemy.name].hp || you.health <= 0) {
            if (you.health <= 0) {Enemy.health = enemyData[Enemy.name].hp}
            you.coins -= you.health > 0 ? (5*you.level) : (10*you.level)
            getMaxHp()
            document.getElementById("urHp").innerHTML = "Health: " + you['health']
        }
    }
}

function getSkillEffect(skill) {
    var effect = 1 + (skill.effect * skill.level)
    return effect
}

function getMaxHp() {
    you.health = you["maxHp"] * getSkillEffect(skills['Endurance'])

    return you['maxHp']
}

function setTab(element, selectedTab) {

    var tabs = Array.prototype.slice.call(document.getElementsByClassName("tab"))
    tabs.forEach(function(tab) {
        tab.style.display = "none"
    })
    document.getElementById(selectedTab).style.display = "block"

    var tabButtons = document.getElementsByClassName("tabButton")
    for (tabButton of tabButtons) {
        tabButton.classList.remove("w3-blue-gray")
    }
}

function changeTab(tab) {
    var selected = document.getElementsByClassName("selected-tab")[0]
    var change = document.getElementById(tab)

    selected.classList.add("hidden")
    selected.classList.remove("selected-tab")
    change.classList.add("selected-tab")
    change.classList.remove("hidden")
}

function switchShop(shop) {
    var selected = document.getElementsByClassName("selected-shop")[0]
    var change = document.getElementById(shop)

    selected.classList.add("hidden")
    selected.classList.remove("selected-shop")
    change.classList.add("selected-shop")
    change.classList.remove("hidden")
}

function selectSkill(element) {
    document.getElementsByClassName("selected-skill")[0].classList.remove("selected-skill")
    element.getElementsByClassName("skill-button")[0].classList.add("selected-skill")
}

function train(element, skill) {
    you.currentSkill = skill
    var multi = 1
    var item = document.getElementById(element)
    var selected = document.getElementsByClassName("selected-skill")[0]

    selectSkill(item)

    for (let i=0; skillItem[i] in itemData; i++) {
        if (itemData[skillItem[i]].unlocked == true) {
            multi *= itemData[skillItem[i]].skill == skill ? itemData[skillItem[i]].effect : 1
        }
    }
    skills[skill].maxXp -= (skills[skill].xp * multi)
    if (skills[skill].maxXp <= 0) {
        skills[skill].level += 1
        skills[skill].maxXp = Math.round(100*Math.pow(1.05, skills[skill].level))
    }
    item.getElementsByClassName("level")[0].innerHTML = skills[skill].level
    item.getElementsByClassName("effect")[0].innerHTML = "x" + (1 + (skills[skill].effect*skills[skill].level)).toFixed(2)
    item.getElementsByClassName("xp")[0].innerHTML = (skills[skill].xp * multi)
    item.getElementsByClassName("xpNeed")[0].innerHTML = skills[skill].maxXp
}

function gameUpdate() {
    train("powerSkill", "strength")
}

function createSkills(skill) {
        var copy = document.getElementById("skill2").cloneNode(true)
        copy.getElementsByClassName("name")[0].innerHTML = skills[skill].name
        copy.getElementsByClassName("level")[0] = skills[skill].level
        copy.getElementsByClassName("effect")[0] = "x1.00"
        copy.getElementsByClassName("xp")[0] = skills[skill].xp
        copy.getElementsByClassName("xpNeed")[0] = skills[skill].maxXp
        copy.getElementsByClassName("tooltiptext")[0].innerHTML = "test yes"

        copy.id = "skill " + skills[skill].name
        copy.getElementsByClassName("skill-button")[0].onclick = (function() {train("skill " + skills[skill].name, skills[skill].name)})
        copy.classList.remove("hidden")
        if (skills[skill].name == "Strength") {copy.getElementsByClassName("skill-button")[0].classList.add("selected-skill")}

        document.getElementById("Train").children[1].appendChild(copy)
}

function createShopItems(item) {
        var copy = document.getElementById("ShopTemplate").cloneNode(true)
        copy.getElementsByClassName("name")[0].innerHTML = itemData[item].name
        copy.getElementsByClassName("shop-button")[0].id = itemData[item].name
        copy.getElementsByClassName("tooltiptext")[0].innerHTML = itemTooltip[item]

        copy.getElementsByClassName("effect")[0].innerHTML = "+" + itemData[item].def + " Defense " + "+" + itemData[item].atk + " Attack " + "+" + itemData[item].hp + " Health"
        copy.getElementsByClassName("level")[0].innerHTML = "Level "+itemData[item].level
        copy.getElementsByClassName("price")[0].innerHTML = itemData[item].price + " Coins"
        copy.id = "shop " + itemData[item].name
        copy.classList.remove("hidden")
        copy.getElementsByClassName("shop-button")[0].onclick = (function() {buy(itemData[item].name, itemData[item].name)})

        document.getElementById("itemShop").children[0].appendChild(copy)
}

function createSkillItems(item) {
        var copy = document.getElementById("skillShopTemplate").cloneNode(true)
        copy.getElementsByClassName("name")[0].innerHTML = itemData[item].name
        copy.getElementsByClassName("shop-button")[0].id = itemData[item].name
        copy.getElementsByClassName("tooltiptext")[0].innerHTML = itemTooltip[item]

        if (itemData[item].skill == "Strength") {
            copy.getElementsByClassName("effect")[0].innerHTML = "x" + itemData[item].effect + " Strength"
        } if (itemData[item].skill == "Endurance") {
            copy.getElementsByClassName("effect")[0].innerHTML = "x" + itemData[item].effect + " Endurance"
        }

        copy.getElementsByClassName("price")[0].innerHTML = itemData[item].price + " Coins"
        copy.id = "shop " + itemData[item].name
        copy.classList.remove("hidden")
        copy.getElementsByClassName("shop-button")[0].onclick = (function() {buySkill(itemData[item].name, itemData[item].name)})

        document.getElementById("skillShop").children[0].appendChild(copy)
}

function createInvItem(item) {
    var copy = document.getElementById("inv Stick").cloneNode(true)
    var inventory = document.getElementById("items")

    copy.id = "inv " + item
    copy.getElementsByClassName("level")[0].innerHTML = "Level: "+itemData[item].level
    copy.getElementsByClassName("atk")[0].innerHTML = "Attack: "+itemData[item].atk
    copy.getElementsByClassName("def")[0].innerHTML = "Defense: "+itemData[item].def
    copy.getElementsByClassName("hp")[0].innerHTML = "Health: "+itemData[item].hp
    copy.getElementsByClassName("icon")[0].src = "img/" + item + ".jpg"
    copy.getElementsByClassName("tooltiptext")[0].innerHTML = itemTooltip[item]
    copy.getElementsByClassName("equip")[0].onclick = (function() {equip(item)})
    copy.getElementsByClassName("sell")[0].onclick = (function() {sellItem(item)})

    inventory.appendChild(copy)
}

function getItem(item) {
    var element = document.createElement("div")
    var message = document.createTextNode("You got "+item+" from "+Enemy.name+"!")
    var invUpdate = document.getElementById("invUpdate")
    element.appendChild(message)
    invUpdate.appendChild(element)

    if (invUpdate.children.length >= 10) {
        invUpdate.children[0].remove()
    }
}

function switchArea(area) {
    if (you.level >= areaList[area].level) {
        enemys = areaList[area].enemy
        bosses = areaList[area].boss
    }
    setEnemy()
    changeTab('Main')
}

function createArea(area) {
    var Teleport = document.getElementById("Teleport")
    var copy = document.getElementById("Forest").cloneNode(true)

    copy.id = area
    copy.getElementsByClassName("button")[0].innerHTML = area
    copy.getElementsByClassName("button")[0].onclick = function() {switchArea(area)}
    copy.getElementsByClassName("levelReq")[0].innerHTML = areaList[area].level + "+"
    Teleport.children[0].appendChild(copy)
}

function automaticTraining() {
    train("skill "+you.currentSkill, you.currentSkill)
}

function saveGame() {
    save.you = you
    save.skills = skills
    save.inv = you.inv

    if (you.skillItems.length > 0) {
        for (let i=0; you.skillItems[i] in itemData; i++) {save.skillItems.push(skillItem[i])}
    }

    localStorage.setItem("RPGKnightSaveFile", JSON.stringify(save))

    resetSave()
}

function loadGame() {
    save = JSON.parse(localStorage.getItem("RPGKnightSaveFile"))
    var items = document.getElementById("items")

    you = save.you

    for (let i=items.children.length - 1; items.children[i] != undefined && items.children[i].id != "inv Stick"; i--) {
        items.children[i].remove()
    }
    for (let i=0; save.inv[i] in itemData; i++) {
        if (save.inv[i] != "Stick") {
            createInvItem(save.inv[i])
        }
    }

    you.inv = save.inv
    skills = save.skills
    for (let i=0; skillItem.includes(save.skillItems[i]); i++) {
        itemData[skillItem[i]].unlocked = true
    }

    resetSave()
}

function resetSave() {
    save = {
        "you": "",
        "inv": [],
        "skills": "",
        "skillItems": [],
    }
}

function resetGame() {
    var areYouSure = confirm("Are you sure you want to reset the game? This action cannot be undone. You will lose all progress.")

    if (areYouSure) {
        you = {
            "level": 1,
            "maxHp": 100,
            "health": 100,
            "power": 5,
            "defense": 5,
            "coins": 0,
            "xp": 0,
            currentSkill: "Strength",
            "Weapon": "none",
            "Armor": "none",
            "Necklace": "none",
            "Ring": "none",
            "skillItems": [],
        }

        skills = {
            "Strength": {name: "Strength", xp: 10, maxXp: 100, effect: 0.05, level: 0},
            "Endurance": {name: "Endurance", xp: 10, maxXp: 100, effect: 0.05, level: 0},
        }

        for (let i=0; skillItem[0] in itemData; i++) {
            itemData[skillItem[0]].unlocked = false
        }

        resetSave()
        saveGame()
    }
}

function importData() {
    var box = document.getElementById("importExportBox")

    localStorage.setItem("RPGKnightSaveFile", box.value)
    loadGame()
}

function exportData() {
    var box = document.getElementById("importExportBox")

    saveGame()
    box.value = localStorage.getItem("RPGKnightSaveFile")
}

function updateGUI() {
    //player
    document.getElementById("coins").innerHTML = "Coins: " + you.coins
    document.getElementById("level").innerHTML = "Level: " + you.level
    document.getElementById("xp").innerHTML = "Xp: " + you.xp + "/" + Math.round(100*Math.pow(1.1,(you.level-1)))
    document.getElementById("urPower").innerHTML = "Power: "+ you.power
    document.getElementById("urDef").innerHTML = "Defense: "+ you.defense

    //enemy
    document.getElementById("name").innerHTML = Enemy.name
    document.getElementById("health").innerHTML = "Health: " + Enemy.health
    document.getElementById("power").innerHTML = "Power: " + Enemy.power
    document.getElementById("enemyLevel").innerHTML = "Level: " + Enemy.level
}

for (let i = 0; shopItem[i] in itemData; i++) {
    createShopItems(shopItem[i])
} for (let i = 0; skillsList[i] in skills; i++) {
    createSkills(skillsList[i])
} for (let i = 1; Areas[i] in areaList; i++) {
    createArea(Areas[i])
} for (let i = 0; skillItem[i] in itemData; i++) {
    createSkillItems(skillItem[i])
}
startPerson()

setInterval(automaticTraining,1000)
setInterval(updateGUI,1000)