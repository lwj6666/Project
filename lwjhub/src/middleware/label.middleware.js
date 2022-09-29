const service = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
    // 1.取出要添加的所有标签
    // 拿到的标签名字要判断存不存在，若不存在要创建标签
    const { labels } = ctx.request.body;
    // console.log(labels);

    // 2.判断每一个标签在label表中是否存在
    const newLabels = []
    for (let name of labels) {
        const label = { name }
        const LabelResult = await service.getLabelByName(name)
        if (!LabelResult) {
            // 不存在则创建标签数据
            const result = await service.createLabel(name)
            label.id = result.insertId
        }else{
            label.id = LabelResult.id
        }
        newLabels.push(label)
    }

    ctx.labels = newLabels

    await next()
}

module.exports = {
    verifyLabelExists
}