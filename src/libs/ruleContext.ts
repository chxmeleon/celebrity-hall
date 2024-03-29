export const ruleContext = {
  table1: [
    [
      '閒家頭兩張牌合計點數',
      '閒家',
      '莊家頭兩張牌合計點數',
      '莊家',
      '莊家補牌備註'
    ],
    ['0', '必須補牌', '0', '必須補牌', ''],
    ['1', '必須補牌', '1', '必須補牌', ''],
    ['2', '必須補牌', '2', '必須補牌', ''],
    [
      '3',
      '必須補牌',
      '3',
      '必須補牌',
      [
        '若閒家第三張牌補到8，不須補牌，',
        '若閒家第三張牌補到0.1.2.3.4.5.6.7.9必須補牌。'
      ]
    ],
    [
      '4',
      '必須補牌',
      '4',
      '必須補牌',
      [
        '若閒家第三張牌補到0.1.8.9，不須補牌，',
        '若閒家第三張牌補到2.3.4.5.6.7必須補牌。'
      ]
    ],
    [
      '5',
      '必須補牌',
      '5',
      '必須補牌',
      [
        '若閒家第三張牌補到0.1.2.3.8.9不須補牌，',
        '若閒家第三張牌補到4.5.6.7必須補牌。'
      ]
    ],
    [
      '6',
      '不須補牌',
      '6',
      '閒家不補則不須補牌',
      [
        '若閒家第三張牌補到6.7必須補牌，',
        '若閒家第三張牌補到0.1.2.3.4.5.8.9不須補牌。'
      ]
    ],
    ['7', '不須補牌', '7', '不須補牌', ''],
    ['8', '例牌，即定輸贏', '8', '例牌，即定輸贏', ''],
    ['9', '例牌，即定輸贏', '9', '例牌，即定輸贏', '']
  ],
  table2: [
    ['下注', '賠率', '抽水', '說明'],
    [
      '莊贏（標準）',
      '1賠0.95',
      '5%',
      '莊家合計點數大於閒家，開和退回當局注金。'
    ],
    ['莊贏（免水）', '1賠1', '', '莊家合計點數大於閒家，開和退回當局注金。'],
    ['閒贏', '1賠1', '', '閒家合計點數大於莊家，開和退回當局注金。'],
    ['和局', '1賠8', '', '兩家合計點數相同。'],
    ['莊對', '1賠11', '', '莊家前兩張牌發出相同的牌則為莊對例：紅心8，方塊8。'],
    ['閒對', '1賠11', '', '閒家前兩張牌發出相同的牌則為閒對例：梅花k，黑桃k。'],
    [
      '大',
      '1賠0.54',
      '',
      '閒/莊兩家牌面（包括增牌）的張數5、6張牌為大；即增牌為大。'
    ],
    [
      '小',
      '1賠1.5',
      '',
      '閒 / 莊兩家牌面（不包括增牌）的張數4張牌為小；即不增牌為小。'
    ],
    ['莊單', '1賠0.94', '', '每局莊家牌面（包括增牌）之點數相加後為單。'],
    ['莊雙', '1賠00.94', '', '每局莊家牌面（包括增牌）之點數相加後為雙。'],
    ['閒單', '1賠0.96', '', '每局閒家牌面（包括增牌）之點數相加後為單。'],
    ['閒雙', '1賠0.9', '', '每局閒家牌面（包括增牌）之點數相加後為雙。'],
    ['莊例牌', '1賠4', '', '莊家前兩張牌總點數以8或9點勝出為莊例牌。'],
    ['閒例牌', '1賠4', '', '閒家前兩張牌總點數以8或9點勝出為閒例牌。'],
    ['任意一對', '1賠5', '', '莊家或閒家前兩張牌點數相同則為任意一對。'],
    ['完美對子', '1賠25', '', '莊家或閒家前兩張牌點數和花色相同則為完美對子。'],
    ['超和', '1賠225', '', '牌局為和局，並押中對應點數，最高1賠225。'],
    ['閒龍寶', '1賠30', '', '莊閒點數差值，最高1賠30。'],
    ['莊龍寶', '1賠30', '', '莊閒點數差值，最高1賠30。'],
    [
      'Super 6',
      ['1賠12', '1賠20'],
      '',
      ['莊家以2張牌，6點勝出。', '莊家以3張牌，6點勝出。']
    ]
  ],
  table3: [
    ['超和點數', '賠率', '說明'],
    ['0', '1賠150', '當牌局為和局，並為0點時，倍數為150倍'],
    ['1', '1賠215', '當牌局為和局，並為1點時，倍數為215倍'],
    ['2', '1賠225', '當牌局為和局，並為2點時，倍數為225倍'],
    ['3', '1賠200', '當牌局為和局，並為3點時，倍數為200倍'],
    ['4', '1賠120', '當牌局為和局，並為4點時，倍數為120倍'],
    ['5', '1賠110', '當牌局為和局，並為5點時，倍數為110倍'],
    ['6', '1賠45', '當牌局為和局，並為6點時，倍數為45倍'],
    ['7', '1賠45', '當牌局為和局，並為7點時，倍數為45倍'],
    ['8', '1賠80', '當牌局為和局，並為8點時，倍數為80倍'],
    ['9', '1賠80', '當牌局為和局，並為9點時，倍數為80倍']
  ],
  table4: [
    ['勝出情況', '賠率'],
    ['勝方以(非例牌)贏9點', '1賠30'],
    ['勝方以(非例牌)贏8點', '1賠10'],
    ['勝方以(非例牌)贏7點', '1賠5'],
    ['勝方以(非例牌)贏6點', '1賠3'],
    ['勝方以(非例牌)贏5點', '1賠2'],
    ['勝方以(非例牌)贏4點', '1賠1'],
    ['勝方以(例牌)贏勝出', '1賠1'],
    ['(例牌)和局', '退回下注']
  ]
}
