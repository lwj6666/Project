const service = require('../service/label.service')

class LabelController{
    async labelCreate(ctx,next){
        const {name} = ctx.request.body;

        const result = await service.createLabel(name)

        ctx.body = result
    }

    async labelList(ctx,next){
        const {limit,offset} = ctx.query

        const result = await service.getLabels(limit,offset);
    
        ctx.body = result
    }
}

module.exports = new LabelController()