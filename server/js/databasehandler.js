var cls = require('./lib/class'),
    bcrypt = require('bcrypt'),
    Player = require('./player'),
    Messages = require('./message'),
    redis = require('redis'),
    Utils = require('./utils'),
    bluebird = require('bluebird'),
    rand = require('random-key');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client = redis.createClient(6379, '127.0.0.1', {socket_nodelay: true});
module.exports = DatabaseHandler = cls.Class.extend({
    init: function(){
    },
    loadPlayer: function(player){
        var self = this;
        var userKey = "u:" + player.name;
        var curTime = new Date().getTime();
        client.smembers("usr", function(err, replies){
            for(var index = 0; index < replies.length; index++){
                if(replies[index].toString() === userKey){
                    client.multi()
                        .hget(userKey, "pw") // 0
                        .hget(userKey, "armor") // 1
                        .hget(userKey, "weapon") // 2
                        .hget(userKey, "exp") // 3
                        .hget("b:" + player.connection._connection.remoteAddress, "time") // 4
                        .hget("b:" + player.connection._connection.remoteAddress, "banUseTime") // 5
                        .hget("b:" + player.connection._connection.remoteAddress, "loginTime") // 6
                        .hget(userKey, "avatar") // 7
                        .zrange("adrank", "-1", "-1") // 8
                        .get("nextNewArmor") // 9
                        .hget(userKey, "inventory0") // 10
                        .hget(userKey, "inventory0:number") // 11
                        .hget(userKey, "inventory1") // 12
                        .hget(userKey, "inventory1:number") // 13
                        .hget(userKey, "achievement1:found") // 14
                        .hget(userKey, "achievement1:progress") // 15
                        .hget(userKey, "achievement2:found") // 16
                        .hget(userKey, "achievement2:progress") // 17
                        .hget(userKey, "achievement3:found") // 18
                        .hget(userKey, "achievement3:progress") // 19
                        .hget(userKey, "achievement4:found") // 20
                        .hget(userKey, "achievement4:progress") // 21
                        .hget(userKey, "achievement5:found") // 22
                        .hget(userKey, "achievement5:progress") // 23
                        .hget(userKey, "achievement6:found") // 24
                        .hget(userKey, "achievement6:progress") // 25
                        .smembers("adminname") // 26
                        .zscore("adrank", player.name) // 27
                        .hget(userKey, "weaponAvatar") // 28
                        .hget(userKey, "x") // 29
                        .hget(userKey, "y") // 30
                        .hget(userKey, "achievement7:found") // 31
                        .hget(userKey, "achievement7:progress") // 32
                        .hget(userKey, "achievement8:found") // 33
                        .hget(userKey, "achievement8:progress") // 34
                        .hget("cb:" + player.connection._connection.remoteAddress, "etime") // 35
                        .hget(userKey, "achievement9:found") // 36
                        .hget(userKey, "achievement9:progress") // 37
                        .hget(userKey, "achievement10:found") // 38
                        .hget(userKey, "achievement10:progress") // 39
                        .hget(userKey, "achievement11:found") // 40
                        .hget(userKey, "achievement11:progress") // 41
                        .hget(userKey, "achievement12:found") // 42
                        .hget(userKey, "achievement12:progress") // 43
                        .hget(userKey, "achievement13:found") // 44
                        .hget(userKey, "achievement13:progress") // 45
                        .hget(userKey, "achievement14:found") // 46
                        .hget(userKey, "achievement14:progress") // 47
                        .hget(userKey, "achievement15:found") // 48
                        .hget(userKey, "achievement15:progress") // 49
                        .hget(userKey, "achievement16:found") // 50
                        .hget(userKey, "achievement16:progress") // 51
                        .hget(userKey, "achievement17:found") // 52
                        .hget(userKey, "achievement17:progress") // 53
                        .hget(userKey, "achievement18:found") // 54
                        .hget(userKey, "achievement18:progress") // 55
                        .hget(userKey, "achievement19:found") // 56
                        .hget(userKey, "achievement19:progress") // 57
                        .hget(userKey, "achievement20:found") // 58
                        .hget(userKey, "achievement20:progress") // 59
                        .hget(userKey, "achievement21:found") // 58
                        .hget(userKey, "achievement21:progress") // 59
                        .hget(userKey, "achievement22:found") // 60
                        .hget(userKey, "achievement22:progress") // 61
                        .hget(userKey, "achievement23:found") // 62
                        .hget(userKey, "achievement23:progress") // 63
                        .hget(userKey, "achievement24:found") // 64
                        .hget(userKey, "achievement24:progress") // 65
                        .hget(userKey, "achievement25:found") // 66
                        .hget(userKey, "achievement25:progress") // 67
                        .hget(userKey, "achievement26:found") // 68
                        .hget(userKey, "achievement26:progress") // 69
                        .hget(userKey, "inventory2") // 72
                        .hget(userKey, "inventory2:number") // 73
                        .hget(userKey, "inventory3") // 74
                        .hget(userKey, "inventory3:number") // 75
                        .hget(userKey, "inventory4") // 76
                        .hget(userKey, "inventory4:number") // 77
                        .hget(userKey, "wallet"+Types.Entities.TOKEN_A) // 78
                        .hget(userKey, "wallet"+Types.Entities.TOKEN_B) // 79
                        .hget(userKey, "accessToken") // 80
                        .hget(userKey, "inventory5") // 81
                        .hget(userKey, "inventory5:number") // 82
                        .hget(userKey, "inventory6") // 83
                        .hget(userKey, "inventory6:number") // 84
                        .exec(function(err, replies){
                            var pw = replies[0];
                            var armor = replies[1];
                            var weapon = replies[2];
                            var exp = Utils.NaN2Zero(replies[3]);
                            var bannedTime = Utils.NaN2Zero(replies[4]);
                            var banUseTime = Utils.NaN2Zero(replies[5]);
                            var lastLoginTime = Utils.NaN2Zero(replies[6]);
                            var avatar = replies[7];
                            var pubTopName = replies[8];
                            var nextNewArmor = replies[9];
                            var inventory = [replies[10], replies[12], replies[72], replies[74], replies[76], replies[81], replies[83]];
                            var inventoryNumber = [
                                Utils.NaN2Zero(replies[11]),
                                Utils.NaN2Zero(replies[13]),
                                Utils.NaN2Zero(replies[73]),
                                Utils.NaN2Zero(replies[75]),
                                Utils.NaN2Zero(replies[77]),
                                Utils.NaN2Zero(replies[82]),
                                Utils.NaN2Zero(replies[84]),
                            ];
                            var achievementFound = [
                                null,
                                Utils.trueFalse(replies[14]),
                                Utils.trueFalse(replies[16]),
                                Utils.trueFalse(replies[18]),
                                Utils.trueFalse(replies[20]),
                                Utils.trueFalse(replies[22]),
                                Utils.trueFalse(replies[24]),
                                Utils.trueFalse(replies[31]),
                                Utils.trueFalse(replies[33]),

                                Utils.trueFalse(replies[36]),
                                Utils.trueFalse(replies[38]),
                                Utils.trueFalse(replies[40]),
                                Utils.trueFalse(replies[42]),
                                Utils.trueFalse(replies[44]),
                                Utils.trueFalse(replies[46]),
                                Utils.trueFalse(replies[48]),
                                Utils.trueFalse(replies[50]),
                                Utils.trueFalse(replies[52]),
                                Utils.trueFalse(replies[54]),
                                Utils.trueFalse(replies[56]),
                                Utils.trueFalse(replies[58]),
                                Utils.trueFalse(replies[60]),
                                Utils.trueFalse(replies[62]),
                                Utils.trueFalse(replies[64]),
                                Utils.trueFalse(replies[66]),
                                Utils.trueFalse(replies[68]),
                            ];
                            var achievementProgress = [
                                null,
                                Utils.NaN2Zero(replies[15]),
                                Utils.NaN2Zero(replies[17]),
                                Utils.NaN2Zero(replies[19]),
                                Utils.NaN2Zero(replies[21]),
                                Utils.NaN2Zero(replies[23]),
                                Utils.NaN2Zero(replies[25]),
                                Utils.NaN2Zero(replies[32]),
                                Utils.NaN2Zero(replies[34]),
                                Utils.NaN2Zero(replies[37]),
                                Utils.NaN2Zero(replies[39]),
                                Utils.NaN2Zero(replies[41]),
                                Utils.NaN2Zero(replies[43]),
                                Utils.NaN2Zero(replies[45]),
                                Utils.NaN2Zero(replies[47]),
                                Utils.NaN2Zero(replies[49]),
                                Utils.NaN2Zero(replies[51]),
                                Utils.NaN2Zero(replies[53]),
                                Utils.NaN2Zero(replies[55]),
                                Utils.NaN2Zero(replies[57]),
                                Utils.NaN2Zero(replies[59]),
                                Utils.NaN2Zero(replies[61]),
                                Utils.NaN2Zero(replies[63]),
                                Utils.NaN2Zero(replies[65]),
                                Utils.NaN2Zero(replies[67]),
                                Utils.NaN2Zero(replies[69])
                        ];
                        var wallet = {
                            [Types.Entities.TOKEN_A]: Utils.NaN2Zero(replies[78]),
                            [Types.Entities.TOKEN_B]: Utils.NaN2Zero(replies[79]),
                        };
                        var adminnames = replies[26];
                        var pubPoint =  Utils.NaN2Zero(replies[27]);
                        var weaponAvatar = replies[28] ? replies[28] : weapon;
                        var x = Utils.NaN2Zero(replies[29]);
                        var y = Utils.NaN2Zero(replies[30]);
                        var chatBanEndTime = Utils.NaN2Zero(replies[35]);
                        var accessToken = replies[80];
                        player.accessToken = accessToken;

                        // Check Password
                            if (pw !== player.tempKey) {
                                player.connection.sendUTF8('invalidlogin');
                                player.connection.close('Wrong Password: ' + player.name);
                                return;
                            }

                            var d = new Date();
                            var lastLoginTimeDate = new Date(lastLoginTime);

                            if (true) {
                                var targetInventoryNumber = -1;
                                for (var i = 0; targetInventoryNumber !== -1 &&
                                i < inventory.length; i++) {
                                    if (inventory[i] === 'burger') {
                                        targetInventoryNumber = i;
                                    }
                                }
                                for (var i = 0; targetInventoryNumber !== -1 &&
                                i < inventory.length; i++) {
                                    if (inventory[i] === null) {
                                        targetInventoryNumber = i;
                                    }
                                }

                                if (targetInventoryNumber >= 0) {
                                    if (pubPoint > 100) {
                                        pubPoint = 100;
                                    }
                                }

                                // Check Ban
                                d.setDate(d.getDate() - d.getDay());
                                d.setHours(0, 0, 0);
                                if (lastLoginTime < d.getTime()) {
                                    log.info(player.name +
                                        'ban is initialized.');
                                    bannedTime = 0;
                                    client.hset('b:' +
                                        player.connection._connection.remoteAddress,
                                        'time', bannedTime);
                                }
                                client.hset('b:' +
                                    player.connection._connection.remoteAddress,
                                    'loginTime', curTime);

                                if (player.name === pubTopName.toString()) {
                                    avatar = nextNewArmor;
                                }

                                var admin = null;
                                var i = 0;
                                for (i = 0; i < adminnames.length; i++) {
                                    if (adminnames[i] === player.name) {
                                        admin = 1;
                                        log.info('Admin ' + player.name +
                                            'login');
                                    }
                                }
                                log.info('Player name: ' + player.name);
                                log.info('Armor: ' + armor);
                                log.info('Weapon: ' + weapon);
                                log.info('Experience: ' + exp);
                                log.info('Banned Time: ' + (new Date(bannedTime)).toString());
                                log.info('Ban Use Time: ' + (new Date(banUseTime)).toString());
                                log.info('Last Login Time: ' + lastLoginTimeDate.toString());
                                log.info('Chatting Ban End Time: ' + (new Date(chatBanEndTime)).toString());

                                player.sendWelcome(armor, weapon,
                                    avatar, weaponAvatar, exp, admin,
                                    bannedTime, banUseTime,
                                    inventory, inventoryNumber,
                                    achievementFound, achievementProgress,
                                    wallet,
                                    x, y,
                                    chatBanEndTime);
                            }
                        });
                    return;
                }
            }
        });
    },

    existsPlayer: function(gxcKey) {
        const userKey = 'u:' + gxcKey;
        return client.sismemberAsync('usr', userKey).
            then(function(reply) {
                if (reply >= 1) return true;
                return false;
            });
    },
    setTempKey: function(gxcKey) {
        const userKey = 'u:' + gxcKey;
        const key = rand.generate();
        return client.hsetAsync(userKey, 'pw', key).then(function(res) {
            return key;
        });
    },
    setAccessToken: function(gxcKey, accessToken) {
        const userKey = 'u:' + gxcKey;
        return client.hsetAsync(userKey, 'accessToken', accessToken).then(function(res) {
            return accessToken;
        });
    },
    getAccessToken: function(gxcKey) {
        const userKey = 'u:' + gxcKey;
        return client.hgetAsync(userKey, 'accessToken', accessToken);
    },
    // createPlayer: function(player) {
    //     player.remoteAddress = player.connection._connection.remoteAddress;
    //
    //     this._createPlayer(player, function(err, reply) {
    //
    //         if (err && err === 'userexists') {
    //             player.connection.sendUTF8('userexists');
    //             player.connection.close('Username not available: ' +
    //                 player.name);
    //         } else {
    //             player.sendWelcome(
    //                 'clotharmor', 'sword1', 'clotharmor', 'sword1', 0,
    //                 null, 0, 0,
    //                 [null, null], [0, 0],
    //                 Array.apply(null, Array(20)).
    //                     map(Boolean.prototype.valueOf, false),
    //                 Array.apply(null, Array(20)).
    //                     map(Number.prototype.valueOf, 0),
    //                 player.x, player.y, 0);
    //         }
    //     });
    // },
    _createPlayer: function(player) {
        const userKey = 'u:' + player.gxcKey;
        console.log('createPlayer: ' + userKey);
        return client.sismemberAsync('usr', userKey).then(function(reply) {
            console.log('userKey : ' + userKey);
            if (reply >= 1) throw Error('alreadyExistPlayer');
            var curTime = new Date().getTime();
            return client.multi().
                sadd('usr', userKey).
                hset(userKey, 'name', player.name).
                hset(userKey, 'pw', rand.generate()).
                hset(userKey, 'email', player.email).
                hset(userKey, 'gxcAccount', player.gxcAccount).
                hset(userKey, 'armor', 'clotharmor').
                hset(userKey, 'avatar', 'clotharmor').
                hset(userKey, 'weapon', 'sword1').
                hset(userKey, 'exp', 0).
                hset(userKey, 'wallet'+Types.Entities.TOKEN_A, 0).
                hset(userKey, 'wallet'+Types.Entities.TOKEN_B, 0).
                hset('b:' + player.remoteAddress,
                    'loginTime', curTime).
                execAsync();
        });
    },
    checkBan: function(player) {
        client.smembers('ipban', function(err, replies) {
            for (var index = 0; index < replies.length; index++) {
                if (replies[index].toString() ===
                    player.connection._connection.remoteAddress) {
                    client.multi().
                        hget('b:' + player.connection._connection.remoteAddress,
                            'rtime').
                        hget('b:' + player.connection._connection.remoteAddress,
                            'time').
                        exec(function(err, replies) {
                            var curTime = new Date();
                            var banEndTime = new Date(replies[0] * 1);
                            log.info('curTime: ' + curTime.toString());
                            log.info('banEndTime: ' + banEndTime.toString());
                            if (banEndTime.getTime() > curTime.getTime()) {
                                player.connection.sendUTF8('ban');
                                player.connection.close('IP Banned player: ' +
                                    player.name + ' ' +
                                    player.connection._connection.remoteAddress);
                            }
                        });
                    return;
                }
            }
        });
    },
    banPlayer: function(adminPlayer, banPlayer, days) {
        client.smembers('adminname', function(err, replies) {
            for (var index = 0; index < replies.length; index++) {
                if (replies[index].toString() === adminPlayer.name) {
                    var curTime = (new Date()).getTime();
                    client.sadd('ipban',
                        banPlayer.connection._connection.remoteAddress);
                    adminPlayer.server.pushBroadcast(
                        new Messages.Chat(banPlayer, '/1 ' + adminPlayer.name +
                            '-- 밴 ->' + banPlayer.name + ' ' + days + '일'));
                    setTimeout(function() {
                        banPlayer.connection.close('Added IP Banned player: ' +
                            banPlayer.name + ' ' +
                            banPlayer.connection._connection.remoteAddress);
                    }, 30000);
                    client.hset('b:' +
                        banPlayer.connection._connection.remoteAddress, 'rtime',
                        (curTime + (days * 24 * 60 * 60 * 1000)).toString());
                    log.info(adminPlayer.name + '-- BAN ->' + banPlayer.name +
                        ' to ' + (new Date(curTime +
                            (days * 24 * 60 * 60 * 1000)).toString()));
                    return;
                }
            }
        });
    },
    chatBan: function(adminPlayer, targetPlayer) {
        client.smembers('adminname', function(err, replies) {
            for (var index = 0; index < replies.length; index++) {
                if (replies[index].toString() === adminPlayer.name) {
                    var curTime = (new Date()).getTime();
                    adminPlayer.server.pushBroadcast(
                        new Messages.Chat(targetPlayer, '/1 ' +
                            adminPlayer.name + '-- 채금 ->' + targetPlayer.name +
                            ' 10분'));
                    targetPlayer.chatBanEndTime = curTime + (10 * 60 * 1000);
                    client.hset('cb:' +
                        targetPlayer.connection._connection.remoteAddress,
                        'etime', (targetPlayer.chatBanEndTime).toString());
                    log.info(adminPlayer.name + '-- Chatting BAN ->' +
                        targetPlayer.name + ' to ' +
                        (new Date(targetPlayer.chatBanEndTime).toString()));
                    return;
                }
            }
        });
    },
    newBanPlayer: function(adminPlayer, banPlayer) {
        log.debug('1');
        if (adminPlayer.experience > 100000) {
            log.debug('2');
            client.hget('b:' + adminPlayer.connection._connection.remoteAddress,
                'banUseTime', function(err, reply) {
                    log.debug('3');
                    var curTime = new Date();
                    log.debug('curTime: ' + curTime.getTime());
                    log.debug('bannable Time: ' + (reply * 1) + 1000 * 60 * 60 *
                        24);
                    if (curTime.getTime() > (reply * 1) + 1000 * 60 * 60 * 24) {
                        log.debug('4');
                        banPlayer.bannedTime++;
                        var banMsg = '' + adminPlayer.name + '-- 밴 ->' +
                            banPlayer.name + ' ' + banPlayer.bannedTime +
                            '번째 ' + (Math.pow(2, (banPlayer.bannedTime)) / 2) +
                            '분';
                        client.sadd('ipban',
                            banPlayer.connection._connection.remoteAddress);
                        client.hset('b:' +
                            banPlayer.connection._connection.remoteAddress,
                            'rtime', (curTime.getTime() +
                                (Math.pow(2, (banPlayer.bannedTime)) * 500 *
                                    60)).toString());
                        client.hset('b:' +
                            banPlayer.connection._connection.remoteAddress,
                            'time', banPlayer.bannedTime.toString());
                        client.hset('b:' +
                            adminPlayer.connection._connection.remoteAddress,
                            'banUseTime', curTime.getTime().toString());
                        setTimeout(function() {
                            banPlayer.connection.close('Added IP Banned player: ' +
                                banPlayer.name + ' ' +
                                banPlayer.connection._connection.remoteAddress);
                        }, 30000);
                        adminPlayer.server.pushBroadcast(
                            new Messages.Chat(banPlayer, '/1 ' + banMsg));
                        log.info(banMsg);
                    }
                    return;
                });
        }
    },
    banTerm: function(time) {
        return Math.pow(2, time) * 500 * 60;
    },
    equipArmor: function(name, armor) {
        log.info('Set Armor: ' + name + ' ' + armor);
        client.hset('u:' + name, 'armor', armor);
    },
    equipAvatar: function(name, armor) {
        log.info('Set Avatar: ' + name + ' ' + armor);
        client.hset('u:' + name, 'avatar', armor);
    },
    equipWeapon: function(name, weapon) {
        log.info('Set Weapon: ' + name + ' ' + weapon);
        client.hset('u:' + name, 'weapon', weapon);
    },
    setExp: function(name, exp) {
        log.info('Set Exp: ' + name + ' ' + exp);
        client.hset('u:' + name, 'exp', exp);
    },
    setInventory: function(name, itemKind, inventoryNumber, itemNumber) {
        if (itemKind) {
            client.hset('u:' + name, 'inventory' + inventoryNumber,
                Types.getKindAsString(itemKind));
            client.hset('u:' + name, 'inventory' + inventoryNumber + ':number',
                itemNumber);
            log.info('SetInventory: ' + name + ', '
                + Types.getKindAsString(itemKind) + ', '
                + inventoryNumber + ', '
                + itemNumber);
        } else {
            this.makeEmptyInventory(name, inventoryNumber);
        }
    },
    setWallet: function(name, type, amount) {
        client.hset("u:" + name, "wallet" + type, amount);

        log.info("Set Wallet: " + name + " " + type + " " + amount);
    },
    makeEmptyInventory: function(name, number) {
        log.info('Empty Inventory: ' + name + ' ' + number);
        client.hdel('u:' + name, 'inventory' + number);
        client.hdel('u:' + name, 'inventory' + number + ':number');
    },
    foundAchievement: function(name, number) {
        log.info('Found Achievement: ' + name + ' ' + number);
        client.hset('u:' + name, 'achievement' + number + ':found', 'true');
    },
    progressAchievement: function(name, number, progress) {
        log.info('Progress Achievement: ' + name + ' ' + number + ' ' +
            progress);
        client.hset('u:' + name, 'achievement' + number + ':progress',
            progress);
    },
    setUsedPubPts: function(name, usedPubPts) {
        log.info('Set Used Pub Points: ' + name + ' ' + usedPubPts);
        client.hset('u:' + name, 'usedPubPts', usedPubPts);
    },
    setCheckpoint: function(name, x, y) {
        log.info('Set Check Point: ' + name + ' ' + x + ' ' + y);
        client.hset('u:' + name, 'x', x);
        client.hset('u:' + name, 'y', y);
    },
    loadBoard: function(player, command, number, replyNumber) {
        log.info('Load Board: ' + player.name + ' ' + command + ' ' + number +
            ' ' + replyNumber);
        if (command === 'view') {
            client.multi().
                hget('bo:free', number + ':title').
                hget('bo:free', number + ':content').
                hget('bo:free', number + ':writer').
                hincrby('bo:free', number + ':cnt', 1).
                smembers('bo:free:' + number + ':up').
                smembers('bo:free:' + number + ':down').
                hget('bo:free', number + ':time').
                exec(function(err, replies) {
                    var title = replies[0];
                    var content = replies[1];
                    var writer = replies[2];
                    var counter = replies[3];
                    var up = replies[4].length;
                    var down = replies[5].length;
                    var time = replies[6];
                    player.send([
                        Types.Messages.BOARD,
                        'view',
                        title,
                        content,
                        writer,
                        counter,
                        up,
                        down,
                        time]);
                });
        } else if (command === 'reply') {
            client.multi().
                hget('bo:free', number + ':reply:' + replyNumber + ':writer').
                hget('bo:free', number + ':reply:' + replyNumber + ':content').
                smembers('bo:free:' + number + ':reply:' + replyNumber + ':up').
                smembers('bo:free:' + number + ':reply:' + replyNumber +
                    ':down').
                hget('bo:free', number + ':reply:' + (replyNumber + 1) +
                    ':writer').
                hget('bo:free', number + ':reply:' + (replyNumber + 1) +
                    ':content').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 1) +
                    ':up').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 1) +
                    ':down').
                hget('bo:free', number + ':reply:' + (replyNumber + 2) +
                    ':writer').
                hget('bo:free', number + ':reply:' + (replyNumber + 2) +
                    ':content').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 2) +
                    ':up').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 2) +
                    ':down').
                hget('bo:free', number + ':reply:' + (replyNumber + 3) +
                    ':writer').
                hget('bo:free', number + ':reply:' + (replyNumber + 3) +
                    ':content').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 3) +
                    ':up').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 3) +
                    ':down').
                hget('bo:free', number + ':reply:' + (replyNumber + 4) +
                    ':writer').
                hget('bo:free', number + ':reply:' + (replyNumber + 4) +
                    ':content').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 4) +
                    ':up').
                smembers('bo:free:' + number + ':reply:' + (replyNumber + 4) +
                    ':down').
                exec(function(err, replies) {
                    player.send([
                        Types.Messages.BOARD,
                        'reply',
                        replies[0],
                        replies[1],
                        replies[2].length,
                        replies[3].length,
                        replies[4],
                        replies[5],
                        replies[6].length,
                        replies[7].length,
                        replies[8],
                        replies[9],
                        replies[10].length,
                        replies[11].length,
                        replies[12],
                        replies[13],
                        replies[14].length,
                        replies[15].length,
                        replies[16],
                        replies[17],
                        replies[18].length,
                        replies[19].length]);
                });
        } else if (command === 'up') {
            if (player.level >= 50) {
                client.sadd('bo:free:' + number + ':up', player.name);
            }
        } else if (command === 'down') {
            if (player.level >= 50) {
                client.sadd('bo:free:' + number + ':down', player.name);
            }
        } else if (command === 'replyup') {
            if (player.level >= 50) {
                client.sadd('bo:free:' + number + ':reply:' + replyNumber +
                    ':up', player.name);
            }
        } else if (command === 'replydown') {
            if (player.level >= 50) {
                client.sadd('bo:free:' + number + ':reply:' + replyNumber +
                    ':down', player.name);
            }
        } else if (command === 'list') {
            client.hget('bo:free', 'lastnum', function(err, reply) {
                var lastnum = reply;
                if (number > 0) {
                    lastnum = number;
                }
                client.multi().
                    hget('bo:free', lastnum + ':title').
                    hget('bo:free', (lastnum - 1) + ':title').
                    hget('bo:free', (lastnum - 2) + ':title').
                    hget('bo:free', (lastnum - 3) + ':title').
                    hget('bo:free', (lastnum - 4) + ':title').
                    hget('bo:free', (lastnum - 5) + ':title').
                    hget('bo:free', (lastnum - 6) + ':title').
                    hget('bo:free', (lastnum - 7) + ':title').
                    hget('bo:free', (lastnum - 8) + ':title').
                    hget('bo:free', (lastnum - 9) + ':title').
                    hget('bo:free', lastnum + ':writer').
                    hget('bo:free', (lastnum - 1) + ':writer').
                    hget('bo:free', (lastnum - 2) + ':writer').
                    hget('bo:free', (lastnum - 3) + ':writer').
                    hget('bo:free', (lastnum - 4) + ':writer').
                    hget('bo:free', (lastnum - 5) + ':writer').
                    hget('bo:free', (lastnum - 6) + ':writer').
                    hget('bo:free', (lastnum - 7) + ':writer').
                    hget('bo:free', (lastnum - 8) + ':writer').
                    hget('bo:free', (lastnum - 9) + ':writer').
                    hget('bo:free', lastnum + ':cnt').
                    hget('bo:free', (lastnum - 1) + ':cnt').
                    hget('bo:free', (lastnum - 2) + ':cnt').
                    hget('bo:free', (lastnum - 3) + ':cnt').
                    hget('bo:free', (lastnum - 4) + ':cnt').
                    hget('bo:free', (lastnum - 5) + ':cnt').
                    hget('bo:free', (lastnum - 6) + ':cnt').
                    hget('bo:free', (lastnum - 7) + ':cnt').
                    hget('bo:free', (lastnum - 8) + ':cnt').
                    hget('bo:free', (lastnum - 9) + ':cnt').
                    smembers('bo:free:' + lastnum + ':up').
                    smembers('bo:free:' + (lastnum - 1) + ':up').
                    smembers('bo:free:' + (lastnum - 2) + ':up').
                    smembers('bo:free:' + (lastnum - 3) + ':up').
                    smembers('bo:free:' + (lastnum - 4) + ':up').
                    smembers('bo:free:' + (lastnum - 5) + ':up').
                    smembers('bo:free:' + (lastnum - 6) + ':up').
                    smembers('bo:free:' + (lastnum - 7) + ':up').
                    smembers('bo:free:' + (lastnum - 8) + ':up').
                    smembers('bo:free:' + (lastnum - 9) + ':up').
                    smembers('bo:free:' + lastnum + ':down').
                    smembers('bo:free:' + (lastnum - 1) + ':down').
                    smembers('bo:free:' + (lastnum - 2) + ':down').
                    smembers('bo:free:' + (lastnum - 3) + ':down').
                    smembers('bo:free:' + (lastnum - 4) + ':down').
                    smembers('bo:free:' + (lastnum - 5) + ':down').
                    smembers('bo:free:' + (lastnum - 6) + ':down').
                    smembers('bo:free:' + (lastnum - 7) + ':down').
                    smembers('bo:free:' + (lastnum - 8) + ':down').
                    smembers('bo:free:' + (lastnum - 9) + ':down').
                    hget('bo:free', lastnum + ':replynum').
                    hget('bo:free', (lastnum + 1) + ':replynum').
                    hget('bo:free', (lastnum + 2) + ':replynum').
                    hget('bo:free', (lastnum + 3) + ':replynum').
                    hget('bo:free', (lastnum + 4) + ':replynum').
                    hget('bo:free', (lastnum + 5) + ':replynum').
                    hget('bo:free', (lastnum + 6) + ':replynum').
                    hget('bo:free', (lastnum + 7) + ':replynum').
                    hget('bo:free', (lastnum + 8) + ':replynum').
                    hget('bo:free', (lastnum + 9) + ':replynum').
                    exec(function(err, replies) {
                        var i = 0;
                        var msg = [Types.Messages.BOARD, 'list', lastnum];

                        for (i = 0; i < 30; i++) {
                            msg.push(replies[i]);
                        }
                        for (i = 30; i < 50; i++) {
                            msg.push(replies[i].length);
                        }
                        for (i = 50; i < 60; i++) {
                            msg.push(replies[i]);
                        }

                        player.send(msg);
                    });
            });
        }
    },
    writeBoard: function(player, title, content) {
        log.info('Write Board: ' + player.name + ' ' + title);
        client.hincrby('bo:free', 'lastnum', 1, function(err, reply) {
            var curTime = new Date().getTime();
            var number = reply ? reply : 1;
            client.multi().
                hset('bo:free', number + ':title', title).
                hset('bo:free', number + ':content', content).
                hset('bo:free', number + ':writer', player.name).
                hset('bo:free', number + ':time', curTime).
                exec();
            player.send([
                Types.Messages.BOARD,
                'view',
                title,
                content,
                player.name,
                0,
                0,
                0,
                curTime]);
        });
    },
    writeReply: function(player, content, number) {
        log.info('Write Reply: ' + player.name + ' ' + content + ' ' + number);
        var self = this;
        client.hincrby('bo:free', number + ':replynum', 1,
            function(err, reply) {
                var replyNum = reply ? reply : 1;
                client.multi().
                    hset('bo:free', number + ':reply:' + replyNum + ':content',
                        content).
                    hset('bo:free', number + ':reply:' + replyNum + ':writer',
                        player.name).
                    exec(function(err, replies) {
                        player.send([
                            Types.Messages.BOARD,
                            'reply',
                            player.name,
                            content]);
                    });
            });
    },
});
