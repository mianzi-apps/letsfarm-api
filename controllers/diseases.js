
const DiseasesController = {
    create(req,res){

        return res.status(201).send({'success':true})
    },

    update(req,res){

        return res.status(200).send({'success':true})
    },

    getOne(req,res){

        return res.status(200).send({'success':true})
    },

    delete(req,res){

        return res.status(200).send({'success':true})
    },

    getAllCategoryDiseases(req,res){

        return res.status(200).send({'success':true})
    },

    getAll(req,res){

        return res.status(200).send({'success':true})
    }

};

export default DiseasesController;
